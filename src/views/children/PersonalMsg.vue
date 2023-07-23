<template>
    <div class="personal-message-page">
        <music-player></music-player>
        <h1>个人消息</h1>
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
                { id: 1, title: '消息1', content: '这是消息1的内容' },
                { id: 2, title: '消息2', content: '这是消息2的内容' },
                { id: 3, title: '消息3', content: '这是消息3的内容' },
                // 其他消息数据...
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
/* 样式请根据实际需求自行设计 */
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
  