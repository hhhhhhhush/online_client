<template>
    <div class="about-us">
        <el-row :gutter="20" class="header">
            <el-col :span="24">
                <h1>关于我们</h1><br>
                <p>鱿鱼须在线教育网，致力于为学习者提供高质量的在线教育资源。</p>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="team">
            <el-col :span="24">
                <h2>我们的团队</h2>
            </el-col>
            <el-col v-for="member in teamMembers" :key="member.id" :span="6">
                <el-card>
                    <div class="team-member">
                        <img :src="member.avatar" alt="团队成员头像">
                        <div class="member-info">
                            <h3>{{ member.name }}</h3>
                            <p>{{ member.title }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="history">
            <el-col :span="24">
                <h2>公司历程</h2><br>
                <ul>
                    <li v-for="event in companyHistory" :key="event.id" style="margin-top: 10px;">
                        <span class="date">{{ event.date }}</span>
                        <p>{{ event.description }}</p>
                    </li>
                </ul>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="back-button">
            <el-col :span="24">
                <el-button type="primary" @click="goBack" style="float:left">返回上一页</el-button>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
export default {
    name: 'AboutUs',
    data() {
        return {
            teamMembers: [
                {
                    id: 1,
                    name: 'Mzz',
                    title: '创始人',
                    avatar: 'https://img1.baidu.com/it/u=1382234665,2262197273&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500',
                },
                {
                    id: 2,
                    name: 'Mzz',
                    title: '首席执行官',
                    avatar: 'https://img1.baidu.com/it/u=1382234665,2262197273&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500',
                },
                {
                    id: 3,
                    name: 'Mzz',
                    title: '首席技术官',
                    avatar: 'https://img1.baidu.com/it/u=1382234665,2262197273&fm=253&fmt=auto&app=138&f=JPEG?w=539&h=500',
                },
                // Add more team members...
            ],
            companyHistory: [
                {
                    id: 1,
                    date: '2023年6月',
                    description: '公司成立',
                },
                {
                    id: 2,
                    date: '2023年8月',
                    description: '产品发布',
                },
                // Add more company history events...
            ],
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
  
<style scoped>
.about-us {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 30px;
}

.team {
    margin-bottom: 30px;
}

.team-member {
    display: flex;
    align-items: center;
}

.team-member img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
}

.history {
    margin-bottom: 30px;
}

.history .date {
    font-size: 14px;
    color: #999;
    margin-right: 10px;
}

.back-button {
    text-align: center;
}
</style>
  