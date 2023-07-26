<template>
    <div class="note-detail">
        <router-link to="/home/note" class="back-button">返回</router-link>
        <h2>{{ note.title }}</h2>
        <div class="note-content">
            <div v-html="note.content"></div>
        </div>
        <p class="user-info">{{ note.username }} - {{ note.created_at }}</p>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: "NoteDetail",
    data() {
        return {
            note: {
                id: 1,
                title: "示例笔记标题1",
                content: "示例笔记内容1，这是一个示例内容，这里是笔记的大概内容...",
                username: "示例用户1",
                avatar:
                    "https://img0.baidu.com/it/u=4249059699,588833540&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690304400&t=54768f9fa16136e59e6b77212115969d",
                publishTime: "2023-07-24 12:34",
            },
            // 获取上一个页面传递过来的id
            articleId: this.$route.query.articleId
        };
    },
    async mounted() {
        let detailsRes = await axios.get(`http://localhost:3000/note/single/${this.articleId}`)
        console.log(detailsRes.data)
        this.note = detailsRes.data
    },
    methods: {
    },
};
</script>
  
<style scoped>
.note-detail {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

h2 {
    font-size: 24px;
    font-weight: bold;
    color: #409eff;
    margin-bottom: 20px;
}

.note-content {
    margin-bottom: 20px;
}

p {
    font-size: 16px;
    color: #333;
}

.user-info {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
}

.back-button {
    display: inline-block;
    padding: 6px 12px;
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 20px;
}

.edit-button {
    display: inline-block;
    padding: 6px 12px;
    background-color: #67c23a;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
  