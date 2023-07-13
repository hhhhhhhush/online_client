<template>
    <div class="temp" style="background-color: #F5F5F5;">
        <article class="swiper">
            <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="img in imgsInfo" :key="img.id">
                    <h3 class="medium">
                        <img :src="img.url" alt="">
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </article>
        <!-- 作者推荐 -->
        <article class="rec">
            <h2>作者推荐</h2>
            <div class="course">
                <div class="courseContent" v-for="course in filteredCourseInfo" :key="course.id"
                    @click="toDetail(course.id)">
                    <img :src="course.cover_image" alt="">
                    <section class="inner">
                        <h4 class="title">{{ course.description }}</h4>
                        <p class="teahcer">{{ course.instructor }}</p>
                        <p class="price">￥{{ course.price }}</p>
                        <p class="description">{{ course.title }}</p>
                    </section>
                </div>
            </div>
        </article>
        <!-- 鱿鱼榜单 -->
        <article class="rank">
            <div class="title">
                <h2>鱿鱼榜单</h2>
                <span class="titleCotent">以近期购买、学习相关数据为依据；每隔10分钟更新</span>
            </div>
            <div class="ranks">
                <div class="rankItem">
                    <a href="" class="top-icon icon1">畅销榜</a>
                    <div class="courseItem" v-for="(rank, index) in filteredRankInfoOne" :key="rank.id">
                        <span> {{ index + 1 }} </span>
                        <img :src="rank.cover_image" alt="">
                        <div class="courseDetail">
                            <p class="courseTitle"> {{ rank.description }}</p>
                            <p class="courseTeacher">{{ rank.instructor }}</p>
                            <p class="courseAttend">{{ rank.attend }} 人参加</p>
                        </div>
                    </div>
                </div>
                <div class="rankItem">
                    <a href="" class="top-icon icon2">新课榜</a>
                    <div class="courseItem" v-for="(rank, index) in filteredRankInfoTwo" :key="rank.id">
                        <span> {{ index + 1 }} </span>
                        <img :src="rank.cover_image" alt="">
                        <div class="courseDetail">
                            <p class="courseTitle"> {{ rank.description }}</p>
                            <p class="courseTeacher">{{ rank.instructor }}</p>
                            <p class="courseAttend">{{ rank.attend }} 人参加</p>
                        </div>
                    </div>
                </div>
                <div class="rankItem">
                    <a href="" class="top-icon icon3">学习榜</a>
                    <div class="courseItem" v-for="(rank, index) in filteredRankInfoThree" :key="rank.id">
                        <span> {{ index + 1 }} </span>
                        <img :src="rank.cover_image" alt="">
                        <div class="courseDetail">
                            <p class="courseTitle"> {{ rank.description }}</p>
                            <p class="courseTeacher">{{ rank.instructor }}</p>
                            <p class="courseAttend">{{ rank.attend }} 人参加</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <!-- 更多活动 -->
        <article class="more">
            <h2>更多活动>></h2>
            <div class="moreContent">
                <div v-for="(item, index) in more" :key="index">
                    <img :src="item" alt="">
                </div>
            </div>
        </article>

    </div>
</template>

<script>
import axios from 'axios'
import router from '@/router/index'
export default {
    name: "first",
    async mounted() {
        const resImg = await axios.get(`http://localhost:3000/swiper/images`)
        this.imgsInfo = resImg.data.data
        const resCourse = await axios.get(`http://localhost:3000/course/courselist`)
        console.log(resCourse.data.data)
        this.courseInfo = resCourse.data.data
        this.rankInfo = resCourse.data.data
    },
    data() {
        return {
            imgsInfo: null,
            courseInfo: null,
            rankInfo: null,
            more: [
                "https://static001.geekbang.org/resource/image/18/34/1878a1c02cd4yy31f48f6226b8ebe934.png?x-oss-process=image/resize,w_282,h_159/format,webp",
                "https://static001.geekbang.org/resource/image/35/47/353011eefc6e812ca7b794e3ebb61747.jpg?x-oss-process=image/resize,w_282,h_159/format,webp",
                "https://static001.geekbang.org/resource/image/8a/f4/8abc9050a7a29f1a944710b085ce2af4.jpg?x-oss-process=image/resize,w_282,h_159/format,webp",
                "https://static001.geekbang.org/resource/image/43/6a/438590da8808f3ec41d45a0df2yy496a.jpg?x-oss-process=image/resize,w_282,h_159/format,webp"
            ]
        }
    },
    methods: {
        toDetail(id) {
            router.push({
                path: '/home/coursedetail',
                query: {
                    courseId:id
                }
            })
        }
    },
    computed: {
        filteredCourseInfo() {
            // 因为是异步获取数据，所以要先判断是否为空
            if (this.courseInfo !== null) {
                const shuffled = this.courseInfo.sort(() => Math.random() - 0.5);
                // 取前五个数据
                return shuffled.slice(0, 5);
            }
            return [];
        },
        filteredRankInfoOne() {
            if (this.rankInfo !== null) {
                const shuffled = this.rankInfo.sort(() => Math.random() - 0.5);
                return shuffled.slice(0, 3);
            }
            return [];
        },
        filteredRankInfoTwo() {
            if (this.rankInfo !== null) {
                const shuffled = this.rankInfo.sort(() => Math.random() - 0.5);
                return shuffled.slice(0, 3);
            }
            return [];
        },
        filteredRankInfoThree() {
            if (this.rankInfo !== null) {
                const shuffled = this.rankInfo.sort(() => Math.random() - 0.5);
                return shuffled.slice(0, 3);
            }
            return [];
        },
    },

}
</script>

<style lang="scss" scoped>
.swiper {
    width: 1500px;
    margin: 30px auto 0;
}

.medium>img {
    width: 100%;
    height: 100%;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.rec {
    width: 1400px;
    margin: 0 auto;
}

.rec>h2 {
    font-weight: normal;
    color: #333;
}

.course {
    width: 1400px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.course>div {
    flex-basis: 18%;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}

.courseContent {
    cursor: pointer;
}

.courseContent img {
    width: 100%;
    height: 135px;
}

.courseContent .title {
    color: #333;
}

.courseContent .teahcer {
    color: #666;
    font-size: 14px;
    margin-top: 10px;
}

.courseContent .price {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}

.inner {
    padding: 10px;
}

.description {
    margin-top: 15px;
    color: #999;
    font-size: 12px;
    background-color: #f8f9fb;
    padding: 6px;
    border-radius: 4px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    /* 控制显示的行数 */
    -webkit-line-clamp: 4;
    overflow: hidden;
    /* 控制行高，根据需要调整 */
    line-height: 2;
    /* 控制最大高度，根据行数和行高计算 */
    max-height: calc(2 * 7);

}

.rank {
    width: 1400px;
    margin: 0 auto;
    margin-top: 20px;
}

.rank h2 {
    font-weight: normal;
    color: #333;
}

.rank .title {
    display: flex;
    align-items: center;
}

.rank .title .titleCotent {
    margin-left: 30px;
    font-size: 14px;
    color: #666;
}

.rank .ranks {
    display: flex;
    justify-content: space-between;
}

.rank .ranks>div {
    flex-basis: 30%;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 6px 12px 0 rgba(55, 55, 55, .2);
    border-radius: 6px;
    position: relative;
}

.ranks .rankItem {
    padding-top: 60px;
}

.ranks .rankItem>.top-icon {
    display: block;
    width: 140px;
    height: 45px;
    line-height: 32px;
    position: absolute;
    background: url(../../images/ranking1.png) no-repeat center/100%;
    left: 150px;
    top: -7px;
    font-size: 18px;
    color: #fff;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
}

.ranks .rankItem .icon2 {
    background: url(../../images/ranking2.png) no-repeat center/100%;
}

.ranks .rankItem .icon3 {
    background: url(../../images/ranking3.png) no-repeat center/100%;
}

.courseItem {
    display: flex;
    margin: 30px 0;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.courseItem span {
    font-size: 20px;
}

.courseItem img {
    width: 200px;
    height: 100px;
    margin-left: 10px;
}

.courseItem .courseDetail {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.courseItem .courseDetail .courseTitle {
    color: #333;
    font-size: 15px;
}

.courseItem .courseDetail .courseTeacher {
    color: #666;
    font-size: 14px;
    margin-top: 10px;
}

.courseItem .courseDetail .courseAttend {
    color: #999;
    font-size: 12px;
    margin-top: 10px;
}

.more {
    width: 1400px;
    margin: 0 auto;
    overflow: hidden;
}

.more h2 {
    font-weight: normal;
    margin-top: 20px;
    color: #333;
}

.more .moreContent {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.more .moreContent>div {
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
}
</style>