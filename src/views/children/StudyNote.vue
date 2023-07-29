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
                <h3 class="contentTitle" @click="toNoteDetail(note.id)">{{ note.title }}</h3>
                <p>{{ stripAndTruncate(note.content, 30) }}</p>
                <p class="user-info">{{ note.username }} - {{ note.created_at }}</p>
            </div>
            <div class="note-buttons">
                <button @click="editNote(note.id)" v-if="isCurrentUser(note.username)" class="note-button">修改</button>
                <button @click="deleteNote(note.id)" v-if="isCurrentUser(note.username)" class="note-button">删除</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import router from '@/router';
import { mapState } from 'vuex';
import { MessageBox } from 'element-ui';
export default {
    data() {
        return {
            notes: [],
        };
    },
    async mounted() {
        const notes = await axios.get(`http://localhost:3000/note/noteslist`)
        console.log(notes.data[0].content)
        this.notes = notes.data
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        toWrite() {
            router.push('/home/note/writing')
        },
        // 点击“删除”按钮的处理函数
        async deleteNote(id) {
            // 使用MessageBox确认提示框
            MessageBox.confirm('确定要删除这条笔记吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const notesDel = await axios.delete(`http://localhost:3000/note/deletenote/${id}`, {
                    params: {
                        user: this.userInfo.username
                    }
                });
                //console.log(notesDel); // 这将显示服务器返回的响应数据
                // 成功删除后更新前端数据
                if (notesDel.status === 201) {
                    this.notes = this.notes.filter((note) => note.id !== id)
                    this.$message.success({
                        message: notesDel.data,
                        duration: 500
                    })
                } else {
                    this.$message.error({
                        message: notesDel.data,
                        duration: 500
                    })
                }
            }).catch(() => {
                // 点击取消按钮时的操作，不需要额外处理
            });
        },
        // 点击“修改”按钮的处理函数
        editNote(id) {
            console.log(`修改笔记，id: ${id}`);
            router.push({
                path: '/home/note/updatenote',
                query: {
                    articleId: id
                }
            })
        },
        // 跳转到笔记详情
        toNoteDetail(id) {
            router.push({
                path: '/home/note/detail',
                query: {
                    articleId: id
                }
            })
        },
        // 判断是否为当前登录用户显示对应的删除修改按钮
        isCurrentUser(username) {
            return this.userInfo && this.userInfo.username === username;
        },
        stripAndTruncate(htmlString, maxLength) {
            // 去除HTML标签
            const textWithoutTags = htmlString.replace(/<[^>]+>/g, '');

            // 判断字符串长度是否超过指定的最大长度
            if (textWithoutTags.length <= maxLength) {
                return textWithoutTags;
            } else {
                // 截取前maxLength个字并加上省略号
                return textWithoutTags.slice(0, maxLength) + '...';
            }
        },
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
    background-image: linear-gradient(to right, #bed8f1, rgb(116, 197, 252), #1b8cf7);
    -webkit-background-clip: text;
    color: transparent;
}

.note-buttons {
    display: flex;
}

.note-button {
    margin-left: 10px;
    padding: 6px 12px;
    background-color: #fa2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.noteTitle:hover {
    cursor: pointer;
    font-weight: bold;
    background-image: linear-gradient(to right, rgb(250, 235, 211), rgb(253, 195, 101), rgb(255, 167, 26));
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
  