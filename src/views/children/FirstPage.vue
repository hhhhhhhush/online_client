<template>
    <div>
        <article class="swiper">
            <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="img in imgsInfo" :key="img.id">
                    <h3 class="medium">
                        <img :src="img.url" alt="">
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </article>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "first",
    data() {
        return {
            imgsInfo: null
        }
    },
    async mounted () {
        const res = await axios.get(`http://localhost:3000/swiper/images`)
        console.log(res.data.data)
        this.imgsInfo = res.data.data
        // console.log(this.imgsInfo)
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
</style>