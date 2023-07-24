<template>
    <div class="noteBox">
        <h2>Study Notes</h2>
        <div class="writingBtnContainer">
            <p @click="toWrite" class="writingBtn"><i class="el-icon-edit"></i>写笔记</p>
            <span class="noteTitle">笔记展示</span>
        </div>
        <div v-for="note in notes" :key="note.id" class="note-item">
            <img :src="note.avatar" alt="User Avatar" class="avatar" />
            <div class="note-info">
                <h3 class="contentTitle">{{ note.title }}</h3>
                <p>{{ note.content }}</p>
                <p class="user-info">{{ note.username }} - {{ note.publishTime }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import router from '@/router';
export default {
    data() {
        return {
            notes: [
                // Replace this array with your actual note data received from the backend
                {
                    id: 1,
                    title: '示例笔记标题1',
                    content: '示例笔记内容1，这是一个示例内容，这里是笔记的大概内容...',
                    username: '示例用户1',
                    avatar: 'https://img0.baidu.com/it/u=4249059699,588833540&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690304400&t=54768f9fa16136e59e6b77212115969d',
                    publishTime: '2023-07-24 12:34',
                },
                {
                    id: 2,
                    title: '示例笔记标题2',
                    content: '示例笔记内容2，这是另一个示例内容，这里是笔记的大概内容...',
                    username: '示例用户2',
                    avatar: 'https://img1.baidu.com/it/u=3772409731,4008680566&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690304400&t=5deeea67a0442ec3d25e007efb8d6731',
                    publishTime: '2023-07-25 10:45',
                },
                // Add more sample notes here...
            ],
        };
    },
    methods: {
        toWrite() {
            router.push('/home/note/writing')
        }
    }
};
</script>
  
<style>
.noteBox {
    width: 1400px;
    margin: 0 auto;
}
.noteBox h2 {
    margin-top: 12px;
    margin-bottom: 30px;
}
.writingBtnContainer {
    padding: 20px;
    border-bottom: 1px solid #ccc;
}
.noteTitle {
    display: inline-block;
    text-align: center;
    width: 240px;
    margin-left: 435px;
    font-size: 42px;
    font-weight: bold;
    background-image: linear-gradient(to right,#bed8f1,rgb(116, 197, 252),#1b8cf7);
    -webkit-background-clip: text;
    color: transparent;
}
.noteTitle:hover {
    cursor: pointer;
    font-weight: bold;
    background-image: linear-gradient(to right,rgb(250, 235, 211),rgb(253, 195, 101),rgb(255, 167, 26));
    -webkit-background-clip: text;
    color: transparent;
}
.writingBtn {
    display: inline-block;
    width: 110px;
    height: 24px;
    padding: 6px 4px;
    border-radius: 24px;
    text-align: center;
    background-color: rgb(243, 183, 85);
    transition: all .3s;
}
.writingBtn:hover {
    cursor: pointer;
    color: white;
}
.note-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
    border-bottom: 1px solid #ccc;
}
.contentTitle {
    font-weight: normal;
    font-size: 20px;
    color: #409EFF;
    padding-bottom: 4px;
}
.contentTitle:hover {
    cursor: pointer;
    color: #fa2;
}
.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.note-info {
    flex: 1;
}

.user-info {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
}
</style>
  