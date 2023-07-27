<template>
    <div class="personal-message-page">
        <music-player></music-player>
        <h1>系统消息</h1>
        <!-- 显示个人消息列表 -->
        <div class="message-list">
            <div v-for="message in messages" :key="message.id" class="message-item"
                :class="{ active: message.id === activeMessageId }" @click="showMessageContent(message.id)">
                {{ message.title }}
            </div>
        </div>
        <!-- 显示选中的消息内容 -->
        <div class="message-content" v-if="activeMessageId !== null">
            <h2>{{ activeMessage.title }}</h2>
            <p>{{ activeMessage.content }}</p>
        </div>
    </div>
</template>
  
<script>
//   引入音乐播放器组件
import MusicPlayer from '@/components/MusicPlayer.vue';
export default {
    components: {
        MusicPlayer
    },
    data() {
        return {
            messages: [
                { id: 1, title: '叮！恭喜你触发了限时奖励！', content: '潜力UP专属额外奖励来啦！截止2023年12月21日 16:11前，完成投稿任务可获得2元现金。' },
                { id: 2, title: '终于！你的鱿鱼须专属年度报告来了！', content: '2023你最关注的TA是？哪些视频让你N刷不断？又是什么被你刻入了DNA？' },
                { id: 3, title: '鱿鱼须隐私政策的修订通知', content: '亲爱的用户，根据业务开展的实际情况，鱿鱼须近期更新了《鱿鱼须隐私政策》中的相关内容。你可以前往鱿鱼须客户端【我的-设置-隐私政策-私政策全文】查看更新后的主要提示以及全部内容。' },
            ],
            activeMessageId: null,
        };
    },
    computed: {
        activeMessage() {
            // 根据选中的消息ID获取选中的消息对象
            return this.messages.find((message) => message.id === this.activeMessageId) || {};
        },
    },
    methods: {
        showMessageContent(messageId) {
            // 点击消息列表项时，设置选中的消息ID，显示对应消息内容
            this.activeMessageId = messageId;
        },
    },
};
</script>
  
<style>
.personal-message-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.message-list {
    border: 1px solid #ccc;
    padding: 10px;
    max-height: 400px;
    overflow-y: auto;
}

.message-item {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.message-item.active {
    background-color: #f0f0f0;
}

.message-content {
    margin-top: 20px;
}

h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

p {
    font-size: 16px;
}
</style>
  