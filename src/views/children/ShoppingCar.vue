<template>
    <div class="cart-page-container">
        <h1>我的购物车</h1>
        <div v-if="sqlCourseInfo.length === 0">
            <p class="shopcart">
                <img src="../../images/购物车.png" alt="">
            </p>
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
                    <tr v-for="item in sqlCourseInfo" :key="item.id">
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
                            <el-button type="danger" size="small" @click="removeFromCart(item)">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="cart-summary">
                <span class="selectedGood">已选择 <span class="goodsCount">{{ selectedQuantity }}</span> 件商品</span>
                <span class="desTotal">总计金额: <span class="goodsTotal">￥{{ totalAmount.toFixed(2) }}</span></span>
                <p><el-button type="primary" class="settleAccount" @click="showPaymentDialog">结算</el-button></p>
                <!-- 支付对话框 -->
                <el-dialog title="支付" :visible.sync="paymentDialogVisible" width="50%">
                    <!-- 这里放置显示二维码的内容 -->
                    <div class="payment-content">
                        <img src="../../images/wechatPay.jpg" alt="二维码">
                        <p>请使用手机扫描二维码进行支付</p>
                    </div>

                    <!-- 添加确认支付和取消按钮 -->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="closePaymentDialog">取消</el-button>
                        <!-- 这里可以添加确认支付的逻辑 -->
                        <el-button type="primary" @click="confirmPayment">确认支付</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>  
    </div>
</template>
  
<script>
import axios from 'axios';
import router from '@/router';
import { mapState } from 'vuex';
import { MessageBox } from 'element-ui';

export default {
    data() {
        return {
            selectAll: false,
            sqlCourseInfo: null,
            paymentDialogVisible: false, // 控制支付对话框的显示与隐藏
        };
    },
    mounted() {
        this.getSqlInfo();
    },
    computed: {
        ...mapState(['userInfo', 'shopcarInfo']),
        totalAmount() {
            return this.sqlCourseInfo.reduce((total, item) => (item.selected ? total + item.price * item.quantity : total), 0);
        },
        selectedQuantity() {
            return this.sqlCourseInfo.reduce((total, item) => (item.selected ? total + item.quantity : total), 0);
        }
    },
    methods: {
        // 获取当前用户在购物车中的数据
        async getSqlInfo() {
            try {
                const CarRes = await axios.get(`http://localhost:3000/cart/${this.userInfo.id}`);
                this.sqlCourseInfo = CarRes.data.data;
                // 将 cartItems 的值直接赋值为 sqlCourseInfo，保持一个数组
                this.cartItems = JSON.parse(JSON.stringify(this.sqlCourseInfo));
            } catch (error) {
                console.error(error);
                this.$message.error("获取数据库数据失败,请查看是否已登录");
            }
        },
        async removeFromCart(item) {
            // 弹出确认框，让用户确认是否要移除商品
            this.$confirm('确认要移除该商品吗?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    // 用户点击确认按钮，执行删除操作
                    this.sqlCourseInfo = this.sqlCourseInfo.filter(i => i.id !== item.id);
                    try {
                        // 从数据库中删除该商品
                        await axios.delete(`http://localhost:3000/cart/remove/${item.id}`);
                        this.$message.success({
                            message: "商品已成功移除",
                            duration: 1000
                        });
                    } catch (error) {
                        console.error(error);
                        this.$message.error("移除商品失败");
                    }
                })
                .catch(() => {
                    // 用户点击取消按钮，取消删除操作
                });
        },

        updateSelectAll() {
            this.selectAll = this.sqlCourseInfo.every(item => item.selected);
        },
        updateQuantity(item) {
            item.subtotal = item.price * item.quantity;
            this.updateSelectAll();
        },
        toggleSelectAll() {
            this.sqlCourseInfo.forEach(item => (item.selected = this.selectAll));
        },
        goToTotal() {
            router.push('/home/total')
        },
        settleCount() {
            console.log(111)
        },
        // 显示支付对话框
        showPaymentDialog() {
            this.paymentDialogVisible = true;
        },

        // 关闭支付对话框
        closePaymentDialog() {
            this.paymentDialogVisible = false;
        },

        // 确认支付
        confirmPayment() {
            // 在这里可以添加支付的逻辑
            // 当支付完成后，可以关闭支付对话框，跳转到支付成功页面或其他操作
            this.closePaymentDialog();
            // 例如：
            // this.$router.push('/payment-success');
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
.payment-content {
    text-align: center;
  }
  .payment-content img {
    width: 270px;
    height: 340px;
    margin-bottom: 10px;
  }
</style>
  