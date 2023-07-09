<template>
    <div>
        <article class="headerBox">
            <nav class="headerContent">
                <div class="left">
                    <img src="../images/logo.png" alt="">
                    <div class="headerTitle">
                        <p>鱿鱼在线</p>
                        <span>www.youyu.com</span>
                    </div>
                </div>
                <div class="center">
                    <ul>
                        <li>首页</li>
                        <li>全部课程</li>
                        <li>学校</li>
                        <li>技能</li>
                        <li>活动</li>
                    </ul>
                </div>
                <div class="right" v-if="userInfo">
                    <el-avatar :size="45" :src="circleUrl"></el-avatar>
                    <span @click="personal">
                        {{ userInfo.username }}
                    </span>
                    <el-button type="text" @click="exit" class="exit">退出</el-button>
                    <span>系统消息</span>
                </div>
                <div class="right" v-else>
                    <span @click="reLogin">请重新登录</span>
                    <span>系统消息</span>
                </div>
            </nav>
        </article>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index'
import { mapState } from 'vuex';
export default {
    name: 'home',
    data() {
        return {
            circleUrl: "https://preview.qiantucdn.com/58pic/20220311/00M58PICeYaWsZ1WF84MN_PIC2018_PIC2018.jpg%21w290_290"
        }
    },
    async mounted() {
        const courseRes = await axios.get(`http://localhost:3000/course/courselist`)
        console.log(courseRes)
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        reLogin() {
            router.push("/login")
        },
        exit() {
            this.$confirm('确定要退出登录吗?', '小鱿提示您:', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!',
                    duration: 1000
                });
                router.push("/login")
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消',
                    duration: 1000
                });
            });
        },
        personal() {
            router.push('/home/personal')
        }
    }
}
</script>

<style lang="scss" scoped>
.headerBox {
    width: 100%;
    border-bottom: 1px solid #f3f3f3;
}

.headerContent {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.headerContent .left {
    display: flex;
    align-items: center;
}

.headerContent .center ul {
    display: flex;
}

.headerContent .center ul li {
    display: flex;
    margin-left: 30px;
    font-size: 18px;
}

.headerContent .center ul li:hover {
    cursor: pointer;
    color: #fa2;
}

.headerContent .center ul li:first-child {
    margin: 0;
}

.headerContent .right {
    display: flex;
    align-items: center;
}

.headerContent .right>span {
    margin-left: 10px;
}

.headerContent .right>span:hover {
    cursor: pointer;
    color: #fa2;
}
.exit {
    color: #000;
    margin-left: 10px;
}
.exit:hover {
    cursor: pointer;
    color: #fa2;
}
.headerTitle {
    margin-left: 10px;
}

.headerTitle>p {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(to right, #00FFFF, #FFD700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

}

.headerTitle>span {
    color: #000;
    font-size: 13px;
    font-weight: bold;
}
</style>