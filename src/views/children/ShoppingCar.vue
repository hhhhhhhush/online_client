<template>
    <div class="cart-page-container">
        <h1>我的购物车</h1>
        <div v-if="cartItems.length === 0">
            <p class="shopcart"><img src="../../images/购物车.png" alt=""></p>
            <p class="empty-cart-message">您的购物车暂时没有加入商品哦~</p>
            <p class="goTotal" @click="goToTotal"><el-button class="goTotalBtn">去逛逛</el-button></p>
        </div>
        <div v-else>
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>
                            <el-checkbox v-model="selectAll" @change="toggleSelectAll" label=""></el-checkbox>
                            全选
                        </th>
                        <th>课程封面</th>
                        <th>商品名称</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in shopcarInfo" :key="item.id">
                        <td>
                            <el-checkbox v-model="item.selected" @change="updateSelectAll" label=""></el-checkbox>
                        </td>
                        <td class="course-cover">
                            <img :src="item.cover_image" alt="课程封面">
                        </td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.price }}</td>
                        <td>
                            <el-input-number v-model="item.quantity" :min="1"
                                @change="updateQuantity(item)"></el-input-number>
                        </td>
                        <td>
                            <el-button type="danger" size="small" @click="removeFromCart(item.id)">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="cart-summary">
                <span class="selectedGood">已选择 <span class="goodsCount">{{ selectedQuantity }}</span> 件商品</span>
                <span class="desTotal">总计金额: <span class="goodsTotal">￥{{ totalAmount.toFixed(2) }}</span></span>
                <p><el-button type="primary" class="settleAccount">结算</el-button></p>
            </div>

        </div>
    </div>
</template>
  
<script>
import router from '@/router';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            cartItems: [
                {
                    id: 1,
                    title: '商品1',
                    price: 10,
                    quantity: 2,
                    subtotal: 20,
                    selected: false,
                    coverImage: 'https://img3.sycdn.imooc.com/szimg/648680ed0902dfdb05400304.png'
                },
                {
                    id: 2,
                    title: '商品2',
                    price: 15,
                    quantity: 1,
                    subtotal: 15,
                    selected: true,
                    coverImage: 'https://img4.sycdn.imooc.com/szimg/64a23911094deff105400304.png'
                },
                // 其他购物车商品数据...
            ],
            selectAll: false
        };
    },
    mounted() {
        console.log(this.shopcarInfo); // 打印 shopcarInfo 的值
    },
    computed: {
        ...mapState(['shopcarInfo']),
        totalQuantity() {
            return this.shopcarInfo.reduce((total, item) => total + item.quantity, 0);
        },
        totalAmount() {
            return this.shopcarInfo.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
        },
        selectedQuantity() {
            return this.shopcarInfo.reduce(
                (total, item) => (item.selected ? total + item.quantity : total),
                0
            );
        }
    },
    methods: {
        removeFromCart(itemId) {
            // 从购物车中移除指定商品
            this.shopcarInfo = this.shopcarInfo.filter(item => item.id !== itemId);
        },
        updateSelectAll() {
            this.selectAll = this.shopcarInfo.every(item => item.selected);
        },
        updateQuantity(item) {
            item.subtotal = item.price * item.quantity;
            this.updateSelectAll();
        },
        toggleSelectAll() {
            this.cartItems.forEach(item => (item.selected = this.selectAll));
        },
        goToTotal() {
            router.push('/home/total')
        }
    }
};
</script>
  
<style scoped>
.cart-page-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.cart-page-container>h1 {
    margin-block: 30px;
    font-weight: normal;
    color: #333;
}

.empty-cart-message {
    text-align: center;
}

.cart-table {
    width: 100%;
    border-collapse: collapse;
}

.cart-table th,
.cart-table td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
}

.cart-summary {
    text-align: right;
    margin-top: 20px;
}


.course-cover {
    width: 185px;
}

.course-cover img {
    width: 100%;
    height: 100%;
}

.el-button {
    margin-top: 20px;
}

.goodsCount {
    color: #fa2;
    font-size: 18px;
    font-weight: bold;
}

.desTotal {
    font-size: 12px;
    color: #666;
    margin-left: 20px;
}

.goodsTotal {
    color: red;
    font-size: 18px;
    font-weight: bold;
}

.selectedGood {
    color: #666;
}

.settleAccount {
    background-color: #fa2;
    border: #fa2;
}

.shopcart {
    text-align: center;
    margin-bottom: 30px;
}

.shopcart img {
    width: 400px;
    height: 500px;
}

.goTotal {
    text-align: center;
}

.goTotalBtn {
    background-color: #fa2;
    border: #fa2;
    color: #fff;
}
</style>
  