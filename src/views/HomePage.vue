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
                    <span class="el-icon-shopping-cart-2 shopCar" @click="toShopCar">
                        <span class="carNum"> {{ this.sqlCourseInfo.length }} </span>
                    </span>
                    <el-avatar :size="26" :src="userInfo.avatar"></el-avatar>
                    <!-- <span @click="personal">
                        {{ userInfo.username }}
                    </span> -->

                    <el-popover placement="top-start" title="签名:" width="200" trigger="hover" :content="userInfo.signature"
                        @click.native="personal">
                        <el-button slot="reference">{{ userInfo.username }}</el-button>
                    </el-popover>
                    <el-button type="text" @click="exit" class="exit">退出</el-button>
                    <span @click="myMessage">系统消息</span>
                </div>
                <div class="right" v-else>
                    <span @click="reLogin">请重新登录</span>
                    <span @click="myMessage">系统消息</span>
                </div>
            </nav>
        </article>
        <!-- 路由出口 -->
        <router-view></router-view>
        <el-backtop :bottom="100" :right="100">
            <div class="custom-backtop">回到顶部</div>
        </el-backtop>
        <footer>Copyright© 2023 youyu.com <img src="../images/beianicon.png" alt="">京ICP备 xxxxxx号-11 京公网安备xxxxxx号
            营业执照</footer>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index';
import { mapState } from 'vuex';
import { eventBus } from '@/main';
export default {
    name: 'home',
    data() {
        return {
            userId: "",
            menus: [
                { id: 1, href: "/home/first", name: "首页" },
                { id: 2, href: "/home/total", name: "全部课程" },
                { id: 3, href: "/home/note", name: "学习笔记" },
                { id: 4, href: "/home/doit", name: "实战" },
                { id: 5, href: "/home/activity", name: "联名商城" },
            ],
            activeIndex: 0,
            courseInfo: null,
            sqlCourseInfo: null,
        }
    },
    async mounted() {
        const courseRes = await axios.get(`http://localhost:3000/course/courselist`)
        console.log(courseRes)
        this.userId = this.$route.query.userId;

        // 判断this.userInfo是否有值，如果有再获取购物车数据
        if (this.userInfo) {
            // 获取当前登录用户的购物车数据
            this.getSqlInfo();
        }

        // 监听 addToCart 事件，当事件触发时执行 getSqlInfo 方法
        eventBus.$on('addToCart', () => {
            if (this.userInfo) {
                this.getSqlInfo();
            }
        });
    },
    computed: {
        ...mapState(['userInfo', 'shopcarInfo', 'totalLength'])
    },
    methods: {
        // 添加购物车之前判断，数据库中是否存在当前课程
        async getSqlInfo() {
            const CarRes = await axios.get(`http://localhost:3000/cart/${this.userInfo.id}`)
            console.log(CarRes.data.data)
            // 赋值给sql信息
            this.sqlCourseInfo = CarRes.data.data
            console.log(this.sqlCourseInfo)
        },
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
        // 跳转购物车页面
        toShopCar() {
            router.push('/home/shopcar')
        },
        // 跳转到个人消息页面
        myMessage() {
            router.push('/home/message')
        }
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
    margin-left: 20px;
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
    height: 20px;
    line-height: 20px;
    padding: 12px 0;
}

.custom-backtop {
    background-color: #fa2;
    color: #fff;
    border-radius: 4px;
    padding: 10px;
}

.shopCar {
    font-size: 30px;
    position: relative;
}

.carNum {
    font-size: 12px;
    display: inline-block;
    position: absolute;
    color: #fa2;
    font-weight: bold;
    top: -6px;
    left: 26px;
}
</style>