export class ChatBot {
    private keywords: { [key: string]: string[] } = {
        'こんにちは': ['こんにちは！どうしましたか？', 'やあ！何かお手伝いできることはありますか？'],
        '元気': ['元気です！あなたはどうですか？', '元気ですよ！あなたは？'],
        '天気': ['今日は晴れです！', '天気は良好です！'],
        '好き': ['私も好きです！', 'それは素晴らしいですね！'],
        'ありがとう': ['どういたしまして！', 'いつでもどうぞ！'],
        'さようなら': ['さようなら！また会いましょう！', 'またね！良い一日を！'],
    };

    public getResponse(userMessage: string): string {
        for (const keyword in this.keywords) {
            if (userMessage.includes(keyword)) {
                const responses = this.keywords[keyword];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        return 'そのことについてはわかりません。';
    }
}