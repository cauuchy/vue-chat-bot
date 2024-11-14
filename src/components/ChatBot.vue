<template>
  <div class="chatbot container d-flex justify-content-center">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <strong v-if="message?.sender">{{ message.sender }}:</strong> {{ message.text }}
      </div>
      <!-- 入力中のメッセージを表示 -->
      <div v-if="isTyping" class="typing-indicator fade">あなたが入力中です...</div>
    </div>
    <input 
      v-model="userInput" 
      @keyup.enter="sendMessage" 
      @input="setTyping" 
      @blur="stopTyping" 
      placeholder="メッセージを入力..." 
      class="form-control mt-2" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChatBot } from '@/utils/bot';
const messages = ref<{ sender: string; text: string }[]>([]);
const userInput = ref('');
const bot = new ChatBot();
const isTyping = ref(false); // 入力中の状態を管理
const typingTimeout = ref<ReturnType<typeof setTimeout> | null>(null); // タイピングタイムアウト

onMounted(() => {
  console.log('チャットボットが起動しました。');
});

const sendMessage = () => {
  if (userInput.value.trim() === '') return;

  messages.value.push({ sender: 'あなた', text: userInput.value });
  getBotResponse(userInput.value);
  userInput.value = '';
  isTyping.value = false; // メッセージ送信後に入力中を解除
};

const getBotResponse = (userMessage: string) => {
  const botMessage = bot.getResponse(userMessage);
  messages.value.push({ sender: 'ボット', text: botMessage });
};

const setTyping = () => {
  isTyping.value = true; // 入力中の状態を設定
  if (typingTimeout.value !== null) clearTimeout(typingTimeout.value); // 既存のタイムアウトをクリア
  typingTimeout.value = setTimeout(() => {
    isTyping.value = false; // 一定時間後に入力中を解除
  }, 1000); // 1秒後に解除
};

const stopTyping = () => {
  isTyping.value = false; // フォーカスが外れたときに入力中を解除
  if (typingTimeout.value !== null) clearTimeout(typingTimeout.value); // タイピングタイムアウトをクリア
};
</script>

<style scoped>
.chatbot {
  border: 1px solid #ccc;
  padding: 10px;
  width: 500px;
  display: flex;
  flex-direction: column;
}
.messages {
  max-height: 500px;
  overflow-y: auto;
}
.message {
  margin: 5px 0;
}
.typing-indicator {
  font-style: italic;
  color: gray; /* ローディングメッセージの色 */
  animation: fade 1s infinite; /* アニメーションを適用 */
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>