<template>
    <div>
        <div class="dBg">
            <h1>{{ courseInfo.description }}</h1>
            <h2>帮助每一位初学者少走弯路、摆脱迷茫，告别焦虑，轻松⼯作，持续提升</h2>
        </div>
        <div class="course-details">
            <!-- 课程详情内容 -->

            <div class="courseImg"><img :src="courseInfo.cover_image" alt="课程封面"></div>
            <div class="courseDes">
                <div class="dets">
                    <div class="discount">
                        <p class="special">上新特惠截止至8月20日</p>
                        <p class="salePrice">￥{{ courseInfo.price }}</p>
                        <p class="orginPrice">原价: ￥999.00</p>
                    </div>
                    <div class="info-bar">
                        <p><span>时长：</span>{{ courseInfo.duration }}</p>
                        <p><span>难度:</span> 专业</p>
                        <p><span>综合评分:</span> 5</p>
                    </div>
                </div>
                <button class="add-to-cart-btn" @click="addToCart">加入购物车</button>
            </div>
            <div class="description">
                <div class="teachAvatar">
                    <el-avatar :size="88" :src="courseInfo.Tavatar"></el-avatar>
                    <span class="tName">讲师</span>
                    <p style="margin-top: 14px; margin-left: 15px;"> {{ courseInfo.instructor }} </p>
                    <p class="position">资深前端工程师</p>
                </div>
                <div class="vertical-line"></div>
                <div class="tInfo">
                    <h3 class="tWorlds">讲师留言:</h3>
                    <p class="desInner">{{ courseInfo.title }}</p>
                </div>
            </div>


            <!-- 课程评价 -->
            <h3 class="evaluate">课程评价</h3>
            <el-card v-for="review in course.reviews" :key="review.id" class="review-card">
                <p>评分：{{ review.rating }}</p>
                <p>{{ review.comment }}</p>
                <p>用户：{{ review.user }}</p>
            </el-card>

            <!-- 添加评价表单 -->
            <h3>添加评价</h3>
            <el-form @submit.native.prevent="submitReview" class="add-review-form">
                <el-form-item label="评分">
                    <el-rate v-model="newReview.rating" :max="5" show-text></el-rate>
                </el-form-item>
                <el-form-item label="评论">
                    <el-input v-model="newReview.comment" type="textarea" rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">提交评价</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import router from '@/router/index'
export default {
    data() {
        return {
            course: {
                reviews: [
                    { id: 1, rating: 5, comment: '很棒的课程！', user: '张三' },
                    { id: 2, rating: 4, comment: '内容很好。', user: '李四' },
                    // 添加更多评价...
                ],
            },
            newReview: {
                rating: '',
                comment: '',
            },
            tavatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F19%2F20150919190730_XWsBG.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691846063&t=a471e76e6b87f219d3a50ec3eebc355e",
            courseId: null,
            courseInfo: null,
        };
    },
    async mounted() {
        this.courseId = this.$route.query.courseId
        const resCourse = await axios.get(`http://localhost:3000/course/courseone/${this.courseId}`)
        console.log(resCourse.data.data)
        this.courseInfo = resCourse.data.data
    },
    methods: {
        // 加入购物车逻辑
        addToCart() {
            // 执行加入购物车的操作，可以将课程信息发送给后端进行处理
            console.log('加入购物车', this.course);
            // 示例：显示一个消息提示
            this.$message.success('已加入购物车');
        },
        submitReview() {
            // 添加提交评价的逻辑，可以将新评价发送给服务器或更新评价列表
            // 可以通过 this.newReview 访问新评价的数据
            console.log('提交评价：', this.newReview);
            // 重置表单
            this.newReview.rating = '';
            this.newReview.comment = '';
        },
    }
}
</script>
  
<style scoped>
.dBg {
    width: 100%;
    height: 285px;
    background: linear-gradient(to right, #6731E9, #575AEC, #4D72ED, #3F97F0);
    text-align: center;
    color: white;
    overflow: hidden;
}

.dBg h1 {
    margin-bottom: 10px;
    margin-top: 75px;
}

.dBg h2 {
    font-weight: normal;
    font-size: 22px;
}

.course-details {
    width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.course-details .courseImg {
    width: 44%;
    height: 290px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    z-index: 10;
    top: 15px;
}

.course-details .courseImg img {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
}

.course-details p {
    margin-bottom: 10px;
}

.courseDes {
    display: flex;
    justify-content: space-between;
    background: url('../../images/fixed_bg.png') no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 18px;
    box-shadow: 0 8px 16px 0 rgba(28, 31, 33, .1);
    width: 1152px;
    max-height: 128px;
    position: absolute;
    top: 285px;
    left: 335px;
    padding: 32px 40px;
}

.courseDes .discount {
    display: flex;
}

.courseDes .special {
    padding: 6px 12px;
    background-image: linear-gradient(90deg, rgba(255, 0, 105, .99) 0, #ff7a00 99%);
    border-radius: 16px;
    color: white;
    font-weight: bold;
}

.courseDes .salePrice {
    font-size: 32px;
    color: #f01414;
    line-height: 32px;
    font-weight: 700;
    margin-left: 8px;
}

.courseDes .orginPrice {
    font-size: 14px;
    color: #93999f;
    font-weight: 700;
    line-height: 32px;
    margin-left: 8px;
    margin-right: 2px;
    text-decoration: line-through;
}

.courseDes .info-bar {
    display: flex;
    margin-top: 10px;
}

.courseDes .info-bar>p {
    margin-left: 20px;
    font-size: 12px;
}

.courseDes .info-bar>p>span {
    font-size: 12px;
    color: #545c63;
    line-height: 24px;
    font-weight: 700;
    padding-right: 8px;
}



.add-to-cart-btn {
    border: none;
    font-size: 16px;
    background-color: #FF6F00;
    color: #fff;
    border-radius: 24px;
    cursor: pointer;
    width: 140px;
    height: 50px;
    margin-top: 10px;
}

.description {
    width: 100%;
    height: 220px;
    margin-top: 30px;
    border-radius: 12px;
    padding: 20px 70px;
    position: relative;
    display: flex;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #F08932, #F0973C, #EF8732, #F5952C, #ED8135, #E6713C);
}

.description .teachAvatar {
    position: relative;
    color: white;
    margin-left: 142px;
}

.description .teachAvatar .position {
    margin-top: 20px;
    font-size: 13px;
    width: 150px;
}

.description .teachAvatar .tName {
    width: 40px;
    height: 20px;
    background: #3c54f3;
    border: 1px solid rgba(255, 255, 255, .5);
    box-shadow: 0 2px 4px 0 rgba(35, 175, 255, .5);
    border-radius: 10px;
    position: absolute;
    top: 76px;
    left: 22px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #ffed00;
    letter-spacing: 0;
    text-align: center;
    text-shadow: 0 2px 4px rgba(35, 175, 255, .5);
    line-height: 20px;
    z-index: 10;
}

.vertical-line {
    border-left: 1px dashed #fff;
    height: 280px;
    /* 设置虚线的高度 */
    position: absolute;
    top: 22px;
    left: 500px;
}

.description .tInfo {
    margin-left: 240px;
    color: white;
}

.description .tInfo .tWorlds {
    font-size: 22px;
    color: #333;
}

.description .tInfo .desInner {
    margin-top: 10px;
    margin-left: 20px;
    font-size: 18px;
}
h3 {
    color: #333;
}
.evaluate {
    margin-top: 30px;
}
.review-card {
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.add-review-form {
    margin-top: 20px;
}

</style>
  