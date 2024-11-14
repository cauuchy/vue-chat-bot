<template>
  <div id="app" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div>
      <h1>チャットボット</h1>
      <ChatBot />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatBot from './components/ChatBot.vue';
</script>

<style>
#app {
  text-align: center;
}
</style>
