<template>
    <div class="bigbox">
        <article class="topBox">
            <el-avatar :size="60" shape="square" :src="circleUrl"></el-avatar>
        </article>
        <article class="personalPanel">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
        </article>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "personal",
    data() {
        return {
            circleUrl: "https://preview.qiantucdn.com/58pic/20220311/00M58PICeYaWsZ1WF84MN_PIC2018_PIC2018.jpg%21w290_290"
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
}
</script>

<style lang="scss" scoped>
.bigbox {
    background-color: #F5F5F5;
    height: 1000px;
    overflow: hidden;
}

.topBox {
    width: 1400px;
    height: 235px;
    margin: 0 auto;
    background: url('../../images/psBg.png') no-repeat;
    background-size: cover;
    margin-top: 30px;
    border-radius: 8px;
}

.personalPanel {
    width: 1400px;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 30px;
    padding: 20px 50px;
    box-sizing: border-box;
}
</style>