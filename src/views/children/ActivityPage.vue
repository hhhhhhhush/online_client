<template>
    <div>
        <!-- 轮播图 -->
        <el-carousel indicator-position="outside">
            <el-carousel-item>
                <h3>
                    <img src="../../images/union/bilibili1.png" alt="">
                </h3>
            </el-carousel-item>
            <el-carousel-item>
                <h3>
                    <img src="../../images/union/bilibili2.jpg" alt="">
                </h3>
            </el-carousel-item>
            <el-carousel-item>
                <h3>
                    <img src="../../images/union/bilibili3.png" alt="">
                </h3>
            </el-carousel-item>
        </el-carousel>
        <!-- 物品 -->
        <div class="itemBox">
            <div class="itemContainer">
                <div class="project-list-item" v-for="item in items" :key="item.id">
                    <img class="project-list-item-img" :src="item.imageUrl" alt="">
                    <div class="project-list-item-detail">
                        <div class="project-list-item-title"> {{ item.title }} </div>
                        <div class="project-list-item-time">
                            <span class="icon time-icon"></span>
                            {{ item.time }}
                        </div>
                        <div class="project-list-item-address">
                            <span class="icon address-icon"></span>
                            <span class="venue-name-and-address">{{ item.locate }}</span>
                        </div>
                        <div class="project-list-item-price">
                            <span class="price-symbol">￥</span>
                            <span class="price"> {{ item.price }} </span>
                            <span class="start">起</span>
                            <span class="promo-item">独家</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "activity",
    data() {
        return {
            items:[
                { id:1,title:"北京·IDOx梦次元动漫游戏嘉年华2nd",time:"2023.08.12 - 2023.08.13",locate:"北京展览馆",price:"80",imageUrl:require("../../images/union/item1.jpeg")},
                { id:2,title:"北京·原神同人嘉年华",time:"2023.07.29 - 2023.07.30",locate:"国家会议中心",price:"95",imageUrl:require("../../images/union/item2.jpeg")},
                { id:3,title:"北京·2023城市梦想动漫嘉年华（CDS漫展）",time:"2023.08.12 - 2023.08.13",locate:"酷车小镇",price:"9.9",imageUrl:require("../../images/union/item3.jpeg")},
                { id:4,title:"北京·国乙同好嘉年华",time:"2023.08.12 - 2023.08.13",locate:"国家会议中心",price:"82",imageUrl:require("../../images/union/item4.jpeg")},
                { id:5,title:"北京·快看漫画乐园 KKWORLD-mini",time:"2023.08.12 - 2023.08.13",locate:"北京五只猫娱乐Mall",price:"80",imageUrl:require("../../images/union/item5.jpeg")},
                { id:6,title:"北京·国乙ONLY",time:"2023.08.12 - 2023.08.13",locate:"北京五只猫娱乐Mall",price:"298",imageUrl:require("../../images/union/item6.jpeg")},
                { id:7,title:"北京·快看KKWORLD-【胡良伟、孙睿扬】配音演员专场活动【余量售卖】",time:"2023.08.12 - 2023.08.13",locate:"北京五只猫娱乐Mall",price:"298",imageUrl:require("../../images/union/item7.jpeg")},
                { id:8,title:"北京·快看KKWORLD-【锦鲤】配音演员专场活动【余量售卖】",time:"2023.08.12 - 2023.08.13",locate:"北京五只猫娱乐Mall",price:"59",imageUrl:require("../../images/union/item8.jpeg")},
                { id:9,title:"北京·原神only",time:"2023.08.12 - 2023.08.13",locate:"大兴云果国潮",price:"298",imageUrl:require("../../images/union/item9.jpeg")},
                { id:10,title:"北京·快看KKWORLD-【轩ZONE】配音演员专场活动【余量售卖】",time:"2023.08.12 - 2023.08.13",locate:"北京五只猫娱乐Mall",price:"298",imageUrl:require("../../images/union/item10.jpeg")},
                { id:11,title:"北京·快看KKWORLD-【史泽鲲&万舒心】配音演员专场活动【余量售卖】",time:"2023.08.12 - 2023.08.13",locate:"北京五只猫娱乐Mall",price:"80",imageUrl:require("../../images/union/item11.jpeg")},
                { id:12,title:"北京·AINI二次元派对【免票展会】",time:"2023.08.12 - 2023.08.13",locate:"北京远洋乐堤港",price:"188",imageUrl:require("../../images/union/item12.jpeg")},
                { id:13,title:"北京·国乙only·七夕舞会",time:"2023.08.12 - 2023.08.13",locate:"格乐利雅GALLERIA艺术中心(丰台店)",price:"80",imageUrl:require("../../images/union/item13.jpeg")},
                { id:14,title:"北京·万游引力国潮动漫嘉年华s3",time:"2023.08.12 - 2023.08.13",locate:"壹川影视(双树云店)",price:"70",imageUrl:require("../../images/union/item14.jpeg")},
                { id:15,title:"北京·Look Look动漫嘉年华",time:"2023.08.12 - 2023.08.13",locate:"耕海大厦",price:"58",imageUrl:require("../../images/union/item15.jpeg")},
                { id:16,title:"北京·GA05综合向同人展",time:"2023.08.12 - 2023.08.13",locate:"北京展览馆",price:"80",imageUrl:require("../../images/union/item16.jpeg")},
                
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.itemBox {
    width: 100%;
    background-color: #f3f3f3;
    border-top: 1px solid #ccc;
}

.itemBox .itemContainer {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;
}

.itemBox .itemContainer .items {
    width: 560px;
    height: 240px;
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    transition: all 0.2s;
}

.itemBox .itemContainer .items img {
    transition: all .1s;
    box-shadow: 3px 3px 2px 0 hsla(203, 6%, 45%, .3);
    width: 175px;
    height: 233px;
    border-radius: 8px;
}

.project-list-item {
    cursor: pointer;
    display: flex;
    position: relative;
    margin-top: 60px;
    margin-right: 40px;
    width: 560px;
    height: 237px;
    background: #fff;
    box-shadow: 0 0 15px 0 hsla(203, 6%, 45%, .09);
    border-radius: 8px;
    float: left;
    transition: transform .2s;
    margin-bottom:20px ;
}

.project-list-item-img {
    transition: transform .1s;
    background: #fff;
    box-shadow: 3px 3px 2px 0 hsla(203, 6%, 45%, .3);
    border-radius: 8px;
    left: 20px;
    bottom: 24px;
    position: absolute;
    width: 175px;
    height: 233px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.project-list-item-detail {
    margin-left: 223px;
}

.project-list-item-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    margin-top: 30px;
    width: 286px;
    height: 48px;
    font-size: 18px;
    color: #222;
    letter-spacing: 0;
    line-height: 24px;
    -webkit-box-orient: vertical;
}

.project-list-item-time {
    margin-top: 19px;
    display: flex;
    align-items: center;
    height: 17px;
    font-size: 14px;
    color: #999;
}

.project-list-item-detail .icon {
    margin-top: 1px;
    margin-right: 8px;
    display: inline-block;
    width: 12px;
    height: 13px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.time-icon {
    background-image: url('../../images/union/下载.png');
}

.address-icon {
    margin-top: 0;
    background-image: url('../../images/union/location.png');
}

.project-list-item-address {
    margin-top: 10px;
    display: flex;
    align-items: center;
    height: 17px;
    font-size: 14px;
    color: #999;
}

.venue-name-and-address {
    flex: 1 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 260px;
}

.project-list-item-price {
    display: flex;
    align-items: flex-end;
    margin-top: 40px;
    color: #f25d8e;
}

.price-symbol {
    align-self: flex-end;
    font-size: 18px;
    line-height: 18px;
}

.price {
    margin-left: 4px;
    font-size: 28px;
    letter-spacing: 1px;
    line-height: 24px;
}

.start {
    line-height: 12px;
    margin-left: 5px;
    font-size: 12px;
    color: #999;
    margin-bottom: 2px;
}

.promo-item {
    display: inline-block;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: auto;
    height: 16px;
    line-height: 16px;
    margin-left: 8px;
    color: #fb7299;
    font-size: 12px;
    text-align: center;
    border: 1px solid #fb7299;
    border-radius: 1px;
}
.project-list-item:hover {
    box-shadow: 0 15px 20px 0 hsla(203,6%,45%,.4);
}
.project-list-item:hover .project-list-item-img {
    transform: translate3d(0,-10px,0);
}
</style>