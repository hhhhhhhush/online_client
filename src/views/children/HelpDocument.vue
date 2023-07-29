<template>
    <div>
        <header>
            <h1 class="title">鱿鱼须帮助文档</h1>
            <button @click="$router.go(-1)">返回</button>
        </header>
        <div class="help-doc">
            <div class="catalogue">
                <el-tree :data="helpDocData" :props="treeProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="doc-content" v-html="currentDocContent"></div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            helpDocData: [
                {
                    label: '用户手册',
                    children: [
                        {
                            label: '网站介绍',
                            content: `<p border-bottom: 1px solid #ccc; padding-bottom: 20px;">为了帮助同学们更快更好地入门编程，让同学们在编程路上少走歪路。鱿鱼须在线教育网诞生了!</p><br/>
                                      <p style="font-size: 16px;">鱿鱼须在线教育网是一个在线学习编程的网站，本站提供了大量的学习资源。</p><br/>
                                      <p style="font-size: 16px;">本站教学资源包含前端、后端、通用技能以及全栈技能的教授，从各方面来打造一个全能的软件开发工程师!</p><br>
                                      <p style="font-size: 16px;">此网站已开源，需要可首页二维码联系作者获取哦~</p><br/>
                                    `,
                        },
                        {
                            label: '使用说明',
                            content: `<a href="http://localhost:8080/#/login"/>点击进入登录界面<br/>
                                      <p>登录注册即可使用本网站</p>
                                `,
                        },
                        {
                            label: '页面介绍',
                            content: `<p>1.登录注册页</p><br/>
                            <p>2.帮助文档页</p><br/>
                            <p>3.课程展示页</p><br/>
                            <p>4.课程分类页</p><br/>
                            <p>5.课程详情页</p><br/>
                            <p>6.笔记展示页</p><br/>
                            <p>7.笔记详情页</p><br/>
                            <p>8.笔记修改页</p><br/>
                            <p>9.笔记书写页</p><br/>
                            <p>10.实战页</p><br/>
                            <p>11.联名商城页</p><br/>
                            <p>12.我的购物车页</p><br/>
                            <p>13.个人中心页</p><br/>
                            <p>14.系统消息页</p>
                            <p>15.关于我们页</p>
                            `,
                        },
                    ],
                },
                {
                    label: "功能介绍",
                    children: [
                        {
                            label: "登录注册功能",
                            content: `
                            <div>
                                <p style="font-size: 24px; font-weight:bold;">登录注册功能</p><br>
                                <p>登录： 输入已注册的手机号和密码</p>
                                <p>注册：输入手机号 <span style="font-size: 14px; color: #999;">（已正则验证）</span> ，验证码，两次密码必须一致。<span style="font-size: 14px; color: #999;">（手机号码和验证码已做长度限制）</span></p><br>
                                <p style="font-size: 14px; color: #0080ff;">Tip:与数据库连接进行校验,包含记住密码功能</p>
                            </div>
                            `
                        },
                        {
                            label: "首页课程展示",
                            content: `
                            <div>
                                <p style="font-size: 24px; font-weight:bold;">首页课程展示</p><br>
                                <p>轮播图： <span style="font-size: 14px;">数据库轮播图表</span></p>
                                <p>作者推荐：<span style="font-size: 14px;">随机显示数据库 <span style="color: #fa2;">courses</span> 表中的课程，每次随5个</span></p>
                                <p>鱿鱼榜单：<span style="font-size: 14px;">随机显示 <span style="color: #fa2;">courses</span> 表中的课程，每次随3个</span></p><br>
                                <p style="font-size: 14px; color: #0080ff;">Tip:每页都会有一个回到顶部功能，写在了HomePage.vue中</p>
                            </div>
                            `
                        },
                        {
                            label: "课程分类展示",
                            content: `
                            <div>
                                <p style="font-size: 24px; font-weight:bold;">课程分类展示</p><br>
                                <p>此页面包含<span style="color: red;">课程搜索</span>、<span style="color: red;">课程分类</span>以及<span style="color: red;">分页功能</span></p><br>
                                <p>功能详情(分类)：<span style="font-size: 15px;">若无此分类时，将会展示 <span style="font-size: 14px; color: #0080ff;">没有符合条件的课程哦</span>,反之展示<span style="font-size: 14px; color: #0080ff;">对应分类</span>的课程 </span></p>
                                <p>功能详情(课程搜索)：<span style="font-size: 15px;">若无此课程时，将会展示 <span style="font-size: 14px; color: #0080ff;">没有符合条件的课程哦</span>,反之展示<span style="font-size: 14px; color: #0080ff;">对应结果</span>的课程</span> </p>
                                <p>功能详情(分页)：<span style="font-size: 15px;">根据页面的数据分布，超出的则放置在下一页</span> </p><br>
                                    <p>Tip:此页面所用到的数据库表为<span style="font-size: 14px; color: #fa2;">courses</span>表和<span style="font-size: 14px; color: #fa2;">categories</span>表</p>
                            </div>
                            `
                        },
                        {
                            label: "学习笔记功能",
                            content: `
                            <div>
                                <p style="font-size: 24px; font-weight:bold;">学习笔记功能</p><br>
                                <p><span style="font-size: 15px;">包含写笔记、修改笔记、删除笔记<span style="color: #999; font-size: 14px;">(修改和删除笔记只有本人可以操作)</span></span></p><br>
                                <p style="font-size: 15px;">运用<span style="color:#fa2;">wangeditor</span>组件、数据表为<span style="font-size: 13px; color: #fa2;">notes</span>表</p>
                            </div>
                            `
                        },
                        {
                            label: "购物车功能",
                            content: `
                            <div>
                                <p style="font-size: 24px; font-weight:bold;">购物车功能</p><br>
                                <ul style="font-size: 15px; color: #0080ff;">
                                    <li>1.全选、单选功能</li><br>
                                    <li>2.根据数量同步计算价格</li><br>
                                    <li>3.商品删除功能</li><br>
                                    <li>4.结算付款功能</li>
                                </ul>
                            </div>
                            `
                        },
                        {
                            label: "个人信息页",
                            content: `
                            <div>
                                <p style="font-size: 24px; font-weight:bold;">购物车功能</p><br>
                                <ul style="font-size: 15px; color: #0080ff;">
                                    <li>1.鼠标悬停昵称显示个性签名</li><br>
                                    <li>2.同步修改头像</li><br>
                                    <li>3.个人基础信息同步修改</li><br>
                                    <li>4.日历展示</li><br>
                                    <li>5.密码管理(修改密码)</li>
                                </ul>
                            </div>
                            `
                        },
                        {
                            label: "系统信息页",
                            content: `
                            <div>
                                <p style="font-size: 24px; font-weight:bold;">购物车功能</p><br>
                                <ul style="font-size: 15px; color: #0080ff;">
                                    <li>1.音乐播放器</li><br>
                                    <li>2.点击显示对应消息</li><br>
                                </ul>
                            </div>
                            `
                        },

                    ]
                },
                {
                    label: '马言马语',
                    children: [
                        {
                            label: '作者有话说~',
                            content: `  <div style="color: #333;">
                                            <p style="text-align: center;">结语</p><br>
                                            <p style="font-size: 15px;">很高兴，截止 <span style="color: #999; font-size: 13px;">2023-7-29</span> ，我的鱿鱼须在线教育网终于告一段落~，这也是我大学算是2年吧，这两年中做过的最大的项目了。</p>
                                            <p style="font-size: 15px;">本项目用到了<span style="color: #0080ff;">vue2 + express + sqlite3 + element ui + wangeditor</span>当然也包括了vue的一些生态工具<span><span style="color: #0080ff;">Vue-Cli、Vue-Router、Vuex、Vue-Devtools</span>以及<span style="color: #0080ff;">Axios。</span></span></p>
                                            <p style="font-size: 15px;">这份作品对我的技术有了很大一部分的提升,从 <span style="color: #0080ff;">ui->数据库设计->后端接口设计->前端页面</span> 均是由我个人完成。当然，ChatGPT绝对是占据了最大的功劳。</p>
                                            <p style="font-size: 15px;">我也不得不感慨现在的AI技术真的是很强大，相较于 <span style="text-decoration: underline wavy red;">百度琳琅满目的消息</span> 铺到我的脸上， <span style="text-decoration: underline wavy red;">ChatGPT却可以精准无误</span> 地回答我的问题，自然语言处理技术真的是很厉害~</p>
                                            <p style="font-size: 15px;">我的编程之路才刚刚开始，以后我也会在这份我热爱的行业中继续加油的~</p>
                                        </div>
                                    `,
                        },
                    ],
                },
            ],
            currentDocContent: '欢迎来到帮助文档~',  //存储当前选择的文档内容
        };
    },
    computed: {
        treeProps() {
            return {
                children: 'children',
                label: 'label',
            };
        },
    },
    methods: {
        handleNodeClick(data) {
            this.currentDocContent = data.content || '';
        },
    },
};
</script>
  
<style scoped>
header {
    display: flex;
    justify-content: space-around;
    position: relative;
}
header button {
    position: absolute;
    right: 80px;
    top: 18px;
    width: 100px;
    height: 40px;
    border: none;
    border: 1px solid #0080ff;
    background-color: #fff;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
}
header button:hover {
    color: white;
    background-color: #fa2;
    border: 1px solid #fff;
}
.title {
    width: 100%;
    height: 80px;
    line-height: 45px;
    border-bottom: 1px solid #ccc;
    font-weight: normal;
    font-size: 24px;
    padding: 20px;
    box-sizing: border-box;
}

.help-doc {
    padding: 0 20px;
    display: flex;
}

.help-doc .catalogue {
    width: 300px;
    font-size: 18px;
    line-height: 2;
}

.doc-content {
    width: 1400px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 3px 3px 3px #ccc;
    border-left: 1px solid #ccc;
    font-size: 18px;
    height: 88vh;
}
</style>
  