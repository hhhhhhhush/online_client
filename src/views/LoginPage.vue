<template>
    <div class="container">
        <div class="background"></div>
        <div class="nav">
            <nav>
                <img src="../images/youyuxu.png" alt="">
                <p class="banner">用 心 做 教 育</p>
                <ul>
                    <li>帮助</li>
                    <li>关于我们</li>
                    <li class="toUs">
                        联系我们
                        <div class="contact">
                            <img src="../images/contact.png" alt="">
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="content">
            <div class="panel">
                <h3 @click="showLogin" :class="{ active: activeTab === 'login' }">Login</h3>
                <h3 @click="showRegister" :class="{ active: activeTab === 'register' }">Register</h3>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-if="showPanel">
                <el-form-item label="请输入手机号" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入手机号" autofocus maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="请输入密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码由字母数字下划线组成"
                        @keyup.enter.native='toHome' show-password></el-input>
                </el-form-item>
                <el-button plain class="loginBtn" @click="toHome">登录</el-button>
            </el-form>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-else>
                <el-form-item label="请输入手机号" prop="phone"><br>
                    <el-input v-model="ruleForm.phone" placeholder="请输入11位手机号" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="请输入验证码" prop="verify"><br>
                    <el-input v-model="ruleForm.verify" placeholder="请输入验证码" class="mobileInput" maxlength="5"></el-input>
                    <span class="verify" @click="startCountdown" v-if="!isCounting">获取验证码</span>
                    <span class="verify" v-else>{{ countdown }}s 后重置</span>
                </el-form-item>
                <el-form-item label="请输入密码" prop="password"><br>
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码由字母数字下划线组成"
                        show-password></el-input>
                </el-form-item>
                <el-form-item label="请确认密码" prop="password2"><br>
                    <el-input type="password" v-model="ruleForm.password2" placeholder="密码由字母数字下划线组成"
                        show-password></el-input>
                </el-form-item>
                <el-button plain class="loginBtn" @click="toRegister">注册</el-button>
            </el-form>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index'
import { mapMutations } from 'vuex';
export default {
    name: 'login',
    data() {
        return {
            phone: "",
            showPanel: true, //登录注册面板切换
            activeTab: 'login',
            countdown: 0, // 倒计时秒数
            isCounting: false, // 是否正在倒计时,
            showQRCode: false, // 控制二维码图片的显示与隐藏
            userAavatar: "https://preview.qiantucdn.com/58pic/20220311/00M58PICeYaWsZ1WF84MN_PIC2018_PIC2018.jpg%21w290_290",
            ruleForm: {
                username: '',
                password: '',
                password2: '',
                phone: "",
                verify: ""
            },
            rules: {
                username: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '手机号格式错误!', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^\w{6,30}$/, message: '长度在 6 到 30个字符', trigger: 'blur' }
                ],
                password2: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^\w{6,30}$/, message: '长度在 6 到 30个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入11位手机号', trigger: 'blur' },
                    { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '手机号格式错误!', trigger: ['blur', 'change'] }
                ],
                verify: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 5, max: 5, message: '验证码为5为数字', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        ...mapMutations(['setUser']),
        // 登录注册面板切换
        showLogin() {
            this.showPanel = true;
            this.activeTab = 'login';
            this.$refs.ruleForm.resetFields();
        },
        showRegister() {
            this.showPanel = false;
            this.activeTab = 'register';
            this.$refs.ruleForm.resetFields();
        },
        // 验证数据库，完成登录功能
        async toHome() {
            if (this.ruleForm.username.length === 11) {
                this.phone = this.ruleForm.username
            }
            console.log(this.ruleForm.username, this.ruleForm.password)
            if (this.phone.length == 11) {
                const res = await axios.post(`http://localhost:3000/user/login`, {
                    password: this.ruleForm.password,
                    phone: this.phone
                })
                const data = res.data;
                // 判断数据库内有无头像，没有就用默认头像
                if (data.code == 200) {
                    if (data.data.avatar == '') {
                        // console.log(this.userAavatar)
                        // console.log(data.data.id)
                        const userId = data.data.id
                        data.data.avatar = this.userAavatar;
                        const res = await axios.put(`http://localhost:3000/user/update/avatar/${userId}`, {
                            avatarUrl: this.userAavatar
                        })
                        // console.log(res)
                    }
                }
                console.log(data)
                if (res.data.code === 200) {
                    // 将数据传递给vuex vuex刷新数据会消失，Vuex 中的状态是存储在内存中的，而不是持久化存储。
                    this.setUser(data.data)
                    // 把数据给本地存储
                    localStorage.setItem('userInfo', JSON.stringify(data.data));
                    // console.log(res.data.data.id)
                    // const id = res.data.data.id
                    router.push({
                        path: '/home/first',
                        query: {
                            userId: res.data.data.id
                        }
                    })
                    // console.log(data.data)
                }
                else {
                    this.$message.error(data.msg);
                }
            }
            else {
                this.$message.error("手机号为11位哦")
            }

        },
        // 验证码功能实现
        startCountdown() {
            this.countdown = 30; // 设置倒计时秒数为30
            this.isCounting = true; // 开始倒计时
            this.countdownTimer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--; // 每秒减少一秒
                } else {
                    this.resetCountdown(); // 倒计时结束，重置倒计时
                }
            }, 1000);
        },
        resetCountdown() {
            clearInterval(this.countdownTimer); // 清除定时器
            this.countdown = 0; // 重置倒计时秒数
            this.isCounting = false; // 停止倒计时
        },
        // 验证数据库，完成注册功能
        async toRegister() {
            if (this.ruleForm.phone.length === 11 && (this.ruleForm.password === this.ruleForm.password2)) {
                const res = await axios.post(`http://localhost:3000/user/register`, {
                    password: this.ruleForm.password,
                    phone: this.ruleForm.phone
                })
                var regRes = res;
            }
            else if ((this.ruleForm.password != this.ruleForm.password2) || (this.ruleForm.password == null)) {
                this.$message.error("两次输入密码不一致哦")
                return
            }
            else {
                this.$message.error("手机号格式不正确 !")
                return
            }
            // console.log(res)
            if (regRes.status === 201 && this.ruleForm.verify.length === 5) {
                // 注册成功
                // console.log(this.showPanel)
                // this.showPanel = true;
                // this.activeTab = 'login';
                // this.$refs.ruleForm.resetFields();
                const h = this.$createElement;
                this.$notify({
                    title: '注册成功啦',
                    message: h('i', { style: 'color: #fa2' }, '请点击Login按钮，重新登录吧~'),
                    offset: 90,
                    duration: 2000,
                    type: 'success'
                });
            } else {
                // 其他状态码处理
                if (this.ruleForm.verify.length != 5) {
                    this.$message.error('验证码格式错误!')
                    return
                }
                this.$message.error(regRes.data.msg);
            }
        },
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
    width: 1400px;
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

.toUs {
    position: relative;
}

.toUs:hover .contact {
    display: block;
}

.contact {
    width: 100px;
    height: 100px;
    background-color: #fff;
    display: none;
    position: absolute;
    top: 70px;
    left: -15px;
    z-index: 200;
    transition: all 0.3s;
}

.contact img {
    position: absolute;
    top: 10px;
    left: 10px;
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

.content .panel {
    display: flex;
    margin-bottom: 20px;
}

.content .panel>h3:hover {
    cursor: pointer;
    color: #FA2;
}

.content .panel>h3:last-child {
    margin-left: 20px;
}

.loginBtn {
    margin-top: 15px;
    margin-left: 60px;
    width: 70%;
}

.mobileInput {
    width: 340px;
}

.verify {
    display: inline-block;
    margin-left: 20px;
    background-color: #37A3F0;
    border-radius: 6px;
    padding: 0px 8px;
    color: white;
    cursor: pointer;
}

.active {
    border-bottom: 4px solid #FA2;
    padding-bottom: 8px;
}
</style>