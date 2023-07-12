<template>
    <div style="background-color: #F5F5F5;">
        <article class="swiper">
            <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="img in imgsInfo" :key="img.id">
                    <h3 class="medium">
                        <img :src="img.url" alt="">
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </article>
        <article class="rec">
            <h2>作者推荐</h2>
            <div class="course">
                <div class="courseContent" v-for="course in filteredCourseInfo" :key="course.id">
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "first",
    async mounted() {
        const resImg = await axios.get(`http://localhost:3000/swiper/images`)
        this.imgsInfo = resImg.data.data
        const resCourse = await axios.get(`http://localhost:3000/course/courselist`)
        console.log(resCourse.data.data)
        this.courseInfo = resCourse.data.data
    },
    data() {
        return {
            imgsInfo: null,
            courseInfo: null
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

.courseContent img {
    width: 100%;
    height: 150px;
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
    margin-top: 30px;
    color: #999;
    font-size: 12px;
    background-color: #f8f9fb;
    padding: 6px;
    border-radius: 4px;
}
</style>