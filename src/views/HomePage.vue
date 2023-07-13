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
                        <li @click="toMenu(menu.href, index)" v-for="(menu, index) in menus" :key="menu.id"
                            :class="{ active: activeIndex === index }">
                            {{ menu.name }}
                        </li>
                    </ul>
                </div>
                <div class="right" v-if="userInfo">
                    <el-avatar :size="26" :src="userInfo.avatar"></el-avatar>
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
        <el-backtop :bottom="100" :right="100">
            <div class="custom-backtop">回到顶部</div>
        </el-backtop>
        <footer>Copyright© 2023 youyu.com  <img src="../images/beianicon.png" alt="">京ICP备 12003892号-11 京公网安备11010802030151号 营业执照</footer>
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
            userId: "",
            menus: [
                { id: 1, href: "/home/first", name: "首页" },
                { id: 2, href: "/home/total", name: "全部课程" },
                { id: 3, href: "/home/skill", name: "技能" },
                { id: 4, href: "/home/doit", name: "实战" },
                { id: 5, href: "/home/activity", name: "活动" },
            ],
            activeIndex: 0,
        }
    },
    async mounted() {
        const courseRes = await axios.get(`http://localhost:3000/course/courselist`)
        console.log(courseRes)
        this.userId = this.$route.query.userId;
        // console.log(this.userId);
    },
    computed: {
        ...mapState(['userInfo'])
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
            router.push({
                path: '/home/personal',
                query: {
                    userId: this.userId
                }
            })
        },
        toMenu(href, index) {
            this.activeIndex = index;
            router.push(href)
        },
    }
}
</script>

<style lang="scss" scoped>
.headerBox {
    width: 100%;
    border-bottom: 1px solid #f3f3f3;
    overflow: hidden;
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

.active {
    color: #fa2;
}
footer {
    width: 100%;
    text-align: center;
    color: #93999F;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    padding: 20px 0;
}
.custom-backtop {
    background-color: #f56c6c;
    color: #fff;
    border-radius: 4px;
    padding: 10px;
}
</style>