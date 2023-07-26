<template>
    <div class="outsideContainer">
        <div class="title">修改笔记</div>
        <el-input placeholder="请输入标题" v-model="title" clearable></el-input>
        <div class="title">修改内容</div>
        <div class="editorBox">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="onCreated" />
        </div>
        <div class="submiting">
            <el-button type="primary" round style="backgroundColor:#fa2; border:1px solid #fa2;"
                @click="saveBack">保存提交</el-button>
            <el-button type="primary" round style="backgroundColor:#fa2; border:1px solid #fa2;"
                @click="$router.go(-1)">返回</el-button>
        </div>
    </div>
</template>
    
<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { mapState } from 'vuex'
import axios from 'axios'

export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null, //编辑器实例
            title: "", //文章标题
            html: '', //文章内容
            toolbarConfig: {
                menus: ['bold', 'italic', 'underline', 'image']
            }, //工具栏配置
            editorConfig: { placeholder: '请输入内容...' }, //编辑器配置
            mode: 'default', // or 'simple'
            articleId: this.$route.query.articleId
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        // 保存提交
        async saveBack() {
            const updateNoteRes = await axios.put(`http://localhost:3000/note/updatenote/${this.articleId}`, {
                title: this.title,
                content: this.html,
            });
            if (updateNoteRes.status === 201) {
                    this.$message.success({
                        message: updateNoteRes.data,
                        duration: 500
                    })
                }
            console.log(updateNoteRes)
        }
    },
    async mounted() {
        console.log(this.$route.query.articleId)
        const singleNote = await axios.get(`http://localhost:3000/note/single/${this.articleId}`)
        console.log(singleNote)
        this.title = singleNote.data.title
        this.html = singleNote.data.content
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },

})
</script>
    
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.outsideContainer {
    overflow: hidden;
}

.title {
    margin: 0 auto;
    text-align: center;
    margin: 20px 0;
    font-size: 32px;
}

.editorBox {
    border: 1px solid #ccc;
}

.submiting {
    margin-top: 20px;
    float: right;
    margin-right: 10%;
}
</style>
    