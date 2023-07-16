<template>
    <div class="cart-page-container">
        <h1>购物车</h1>
        <div v-if="cartItems.length === 0">
            <p class="empty-cart-message">购物车为空</p>
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
                        <th>小计</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cartItems" :key="item.id">
                        <td>
                            <el-checkbox v-model="item.selected" @change="updateSelectAll" label=""></el-checkbox>
                        </td>
                        <td>
                            <img :src="item.coverImage" alt="课程封面" class="course-cover">
                        </td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.price }}</td>
                        <td>
                            <el-input-number v-model="item.quantity" :min="1"
                                @change="updateQuantity(item)"></el-input-number>
                        </td>
                        <td>{{ item.subtotal }}</td>
                        <td>
                            <el-button type="danger" size="small" @click="removeFromCart(item.id)">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="cart-summary">
                <p>
                    <el-checkbox v-model="selectAll" @change="updateSelectAll" label=""></el-checkbox>
                    全选
                </p>
                <p>已选数量: {{ selectedQuantity }}</p>
                <p>总金额: {{ totalAmount }}</p>
            </div>
            <el-button type="primary">结算</el-button>
        </div>
    </div>
</template>
  
<script>
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
                    selected: true,
                    coverImage: 'https://example.com/course1.jpg'
                },
                {
                    id: 2,
                    title: '商品2',
                    price: 15,
                    quantity: 1,
                    subtotal: 15,
                    selected: true,
                    coverImage: 'https://example.com/course2.jpg'
                },
                // 其他购物车商品数据...
            ],
            selectAll: true
        };
    },
    computed: {
        totalQuantity() {
            return this.cartItems.reduce((total, item) => total + item.quantity, 0);
        },
        totalAmount() {
            return this.cartItems.reduce(
                (total, item) => total + item.subtotal,
                0
            );
        },
        selectedQuantity() {
            return this.cartItems.reduce(
                (total, item) => (item.selected ? total + item.quantity : total),
                0
            );
        }
    },
    methods: {
        removeFromCart(itemId) {
            // 从购物车中移除指定商品
            this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        },
        updateSelectAll() {
            this.selectAll = this.cartItems.every(item => item.selected);
        },
        updateQuantity(item) {
            item.subtotal = item.price * item.quantity;
            this.updateSelectAll();
        },
        toggleSelectAll() {
            this.cartItems.forEach(item => (item.selected = this.selectAll));
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

.cart-summary p {
    margin-bottom: 10px;
}

.course-cover {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

.el-button {
    margin-top: 20px;
}
</style>
  