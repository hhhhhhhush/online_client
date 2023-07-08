<template>
    <div class="container">
        <div class="background"></div>
        <div class="nav">
            <nav>
                <img src="../images/youyuxu.png" alt="">
                <p class="banner">用 心 做 教 育</p>
                <ul>
                    <li>帮助</li>
                    <li>进入关怀模式</li>
                </ul>
            </nav>
        </div>
        <div class="content" v-if="flag">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <h3>用户登录</h3>
                <el-form-item label="请输入用户名" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名或手机号"></el-input>
                </el-form-item>
                <el-form-item label="请输入密码" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <el-button plain class="loginBtn" @keyup.enter="toHome" @click="toHome">登录</el-button>
        </div>
        <div class="content" v-else>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <h3>用户登录</h3>
                <el-form-item label="请输入手机号" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名或手机号"></el-input>
                </el-form-item>
                <el-form-item label="请输入密码" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <el-button plain class="loginBtn" @keyup.enter="toHome" @click="toHome">登录</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index'
export default {
    name: 'login',
    data() {
        return {
            phone: "",
            flag: false,
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^\w{6,12}$/, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        async toHome() {
            if (this.ruleForm.username.length === 11) {
                this.phone = this.ruleForm.username
            }
            console.log(this.ruleForm.username, this.ruleForm.password)
            const res = await axios.post(`http://localhost:3000/user/login`, {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                phone: this.phone
            })
            console.log(res.data)
            const data = res.data;
            if (res.data.code === 200) {
                // router.push('/home')
                this.$message({
                    message: '登录成功~',
                    type: 'success'
                });
                
            }
            else {
                this.$message.error(data.msg);
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.nav {
    width: 100%;
    //height: 60px;
    background-color: #000;
}

.nav nav {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-content: center;
    color: white;
}

.nav nav img {
    height: 80px;
}

.nav nav ul {
    display: flex;
    align-content: center;
}

.nav nav ul li {
    margin-left: 30px;
    line-height: 80px;
}

.nav nav ul li:hover {
    cursor: pointer;
    color: #FA2;
}

.banner {
    line-height: 80px;
    background: linear-gradient(45deg, #00f0ff, #0080ff, #00f0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 42px;
    font-weight: bold;

}

.background {
    position: absolute;
    top: 0;
    left: 0;
    background: url('../images/login.jpg');
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(12px);
    z-index: -10;
}

.content {
    width: 450px;
    margin: 180px auto;
    background-color: #f3f3f3;
    padding: 30px 40px 40px 40px;
    border-radius: 10px;
}

.content h3 {
    color: #333;
}

.loginBtn {
    margin-top: 15px;
    margin-left: 60px;
    width: 70%;
}
</style>