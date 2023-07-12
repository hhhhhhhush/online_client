<template>
    <div>
        <article class="bgBox">
            <section class="headContent">
                <h2>实战</h2>
                <p>基于真实业务场景，通过项目式驱动学习与挑战闯关式练习，快速提升职业技能</p>
                <p>0 个实战营 | 0 个项目 | 0 个挑战</p>
            </section>
        </article>
        <main>
            <article class="mainBody">
                <div class="header">
                    <h1>实战营</h1>
                </div>
                <div class="content">
                    <img src="../../images/工作.png" alt="">
                    <p>内容正在快马加鞭建设中～</p>
                </div>
                <div class="header">
                    <h1>项目</h1>
                </div>
                <div class="content">
                    <img src="../../images/工作.png" alt="">
                    <p>内容正在快马加鞭建设中～</p>
                </div>
                <div class="header">
                    <h1>挑战</h1>
                </div>
                <div class="content">
                    <img src="../../images/工作.png" alt="">
                    <p>内容正在快马加鞭建设中～</p>
                </div>
            </article>
        </main>
        <article class="explainBox">
            <section class="explain">
                <article class="left">
                    <h2>什么是实战营?</h2>
                    <section>
                        <ul>
                            <li v-for="(explain, index) in explains" :key="index"> {{ explain }} </li>
                        </ul>
                    </section>
                </article>
                <article class="right" v-show="false">
                    <section class="contentLeft">
                        <div class="slogan">
                            <h3>基于目标的任务驱动式学习</h3>
                            <p> 聚焦技能，设计项目</p>
                            <p>任务拆解，融会贯通</p>
                            <p>多场景设计，快速提升</p>
                        </div>
                    </section>
                    <section class="contentRight">
                        <img src="../../images/工作计划.png" alt="">
                    </section>
                </article>
                <article class="right" v-show="false">
                    <section class="contentLeft">
                        <div class="slogan">
                            <h3>基于目标的任务驱动式学习</h3>
                            <p> 聚焦技能，设计项目</p>
                            <p>任务拆解，融会贯通</p>
                            <p>多场景设计，快速提升</p>
                        </div>
                    </section>
                    <section class="contentRight">
                        <img src="../../images/工作计划.png" alt="">
                    </section>
                </article>
                <article class="right">
                    <section class="contentLeft">
                        <div class="slogan">
                            <h3>基于目标的任务驱动式学习</h3>
                            <p> 聚焦技能，设计项目</p>
                            <p>任务拆解，融会贯通</p>
                            <p>多场景设计，快速提升</p>
                        </div>
                    </section>
                    <section class="contentRight">
                        <img src="../../images/工作计划.png" alt="">
                    </section>
                </article>
            </section>
        </article>
    </div>
</template>

<script>
export default {
    name: "doit",
    data() {
        return {
            explains: ['基于目标的任务驱动式学习', '基于输出的挑战实操式训练', '基于“营”的沉浸式学习系统']
        }
    },
}
</script>

<style lang="scss" scoped>
.bgBox {
    width: 100%;
    height: 220px;
    background: url('../../images/bgbox.jpg') no-repeat;
    background-size: cover;
}

.headContent {
    width: 1400px;
    height: 100%;
    margin: 0 auto;
    color: #1685CA;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

main {
    width: 100%;
    background-color: #F5F5F5;
}

main .mainBody {
    width: 1400px;
    margin: 0 auto;
    padding: 30px;
}

main .header {
    margin-top: 15px;
}

main .content {
    text-align: center;
    margin-top: 15px;
}

main .content>p {
    font-size: 13px;
    color: #999;
}

.explain {
    width: 1400px;
    margin: 0 auto;
    padding: 70px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
    display: flex;
    justify-content: space-between;
}

.explain .left {
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.explain .left>section {
    margin-top: 20px;
}

.explain .left>section ul li {
    width: 385px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
    padding: 15px 0 15px 15px;
}

.right {
    padding: 60px;
    border: 1px solid rgba(0, 0, 0, .06);
    display: flex;
}

.right .contentLeft {
    width: 50%;
}

.slogan {
    display: flex;
    flex-direction: column;
}

.right .contentLeft .slogan h3 {
    margin-top: 20px;
}

.right .contentLeft .slogan>p {
    margin-top: 30px;
}

.right .contentRight {
    width: 50%;
}

.right .contentRight img {
    width: 100%;
    height: 230px;
    margin-left: 10px;
}
.last {
    width: 1400px;
    margin: 0 auto;
    margin-top: 30px;
    text-align: center;
}
</style>