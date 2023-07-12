<template>
    <div class="bigbox">
        <article class="topBox">
            <span class="avatar"><el-avatar :size="100" shape="square" :src="userInfo.avatar"
                    class="avSon"></el-avatar></span>
            <div class="basicInfo">
                <p>昵称：{{ userInfo.username }}</p>
                <p>个性签名：{{ userInfo.signature }}</p><br>
            </div>

        </article>
        <article class="personalPanel">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的信息" name="first">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                        name="avatar" :headers="{ 'Content-Type': 'multipart/form-data' }">
                        <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatarImg">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-descriptions class="margin-top" title="详细信息" :column="3" :size="size" border>
                        <template slot="extra">
                            <el-button v-if="!isEditing" type="primary" size="small" @click="startEditing">编辑</el-button>
                            <el-button v-else type="success" size="small" @click="saveChanges">保存</el-button>
                        </template>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-user"></i>
                                用户名
                            </template>
                            <template v-if="!isEditing">
                                {{ userInfo.username }}
                            </template>
                            <template v-else>
                                <el-input v-model="editedContent.username"></el-input>
                            </template>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-mobile-phone"></i>
                                手机号
                            </template>
                            <template v-if="!isEditing">
                                {{ userInfo.phone }}
                            </template>
                            <template v-else>
                                <el-input v-model="editedContent.phone"></el-input>
                            </template>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-female"></i>
                                性别
                            </template>
                            <template v-if="!isEditing">
                                {{ userInfo.gender }}
                            </template>
                            <template v-else>
                                <el-input v-model="editedContent.gender"></el-input>
                            </template>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-edit"></i>
                                个性签名
                            </template>
                            <template v-if="!isEditing">
                                {{ userInfo.signature }}
                            </template>
                            <template v-else>
                                <el-input v-model="editedContent.signature"></el-input>
                            </template>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-message"></i>
                                邮箱
                            </template>
                            <template v-if="!isEditing">
                                {{ userInfo.email }}
                            </template>
                            <template v-else>
                                <el-input v-model="editedContent.email"></el-input>
                            </template>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <i class="el-icon-present"></i>
                                生日
                            </template>
                            <template v-if="!isEditing">
                                {{ userInfo.create_time.substring(0, 10) }}
                            </template>
                            <template v-else>
                                <el-input v-model="editedContent.create_time"></el-input>
                            </template>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-tab-pane>
                <el-tab-pane label="Calendar" name="second" class="secondPanel">
                    <el-calendar v-model="value" class="calendar">
                    </el-calendar>
                </el-tab-pane>
                <el-tab-pane label="账户安全" name="third">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                        <el-form-item label="旧密码" prop="oldPass">
                            <el-input show-password type="password" v-model="ruleForm.oldPass"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="checkPass">
                            <el-input show-password type="password" v-model="ruleForm.checkPass"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="newPass">
                            <el-input show-password type="password" v-model="ruleForm.newPass"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </article>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    name: "personal",
    data() {
        return {
            value: new Date(), //日历
            activeName: 'first',
            avatarUrl: "",
            userId: "",
            isEditing: false,
            editedContent: null,
            originalContent: null,
            size: '',
            usersInfo: null,
            ruleForm: {
                oldPass: '',
                newPass: '',
                checkPass: ''
            },
            rules: {
                oldPass: [
                    { trigger: 'blur' }
                ],
                newPass: [
                    { trigger: 'blur' }
                ],
                checkPass: [
                    { rigger: 'blur' }
                ]
            }
        }
    },
    async mounted() {
        this.userId = this.$route.query.userId;
        console.log(this.userId);
        const resUsers = await axios.get(`http://localhost:3000/user/user/${this.userId}`)
        console.log(resUsers.data.data)
        console.log(resUsers.data.data.avatar)
        if (resUsers.data.data.avatar == '') {
            resUsers.data.data.avatar == 'https://preview.qiantucdn.com/58pic/20220311/00M58PICeYaWsZ1WF84MN_PIC2018_PIC2018.jpg%21w290_290'
        }
        this.usersInfo = resUsers.data.data;

        this.editedContent = { ...this.usersInfo }; // 将用户信息赋值给editedContent对象
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['updateUserInfo', 'updateData']),
        // 当点击编辑按钮时触发
        startEditing() {
            this.isEditing = true;
            this.editedContent = this.usersInfo; // 使用用户信息中的数据初始化编辑的内容
        },

        async handleAvatarSuccess(res, file) {
            // this.circleUrl = URL.createObjectURL(file.raw);
            this.updateUserInfo({ ...this.userInfo, avatar: URL.createObjectURL(file.raw) });
            const resImg = await axios.put(`http://localhost:3000/user/update/avatar/${this.userId}`, {
                avatarUrl: URL.createObjectURL(file.raw)
            })

            console.log(resImg)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 当点击保存按钮时触发
        async saveChanges() {
            // 使用Axios更新数据库中的数据
            try {
                const { username, password, phone, gender, signature, email, create_time } = this.editedContent;
                const res = await axios.put(`http://localhost:3000/user/update/${this.userId}`, {
                    username,
                    password,
                    phone,
                    gender,
                    signature,
                    email,
                    create_time
                });
                if (res.data.code === 200) {
                    // 更新Vuex中的数据
                    this.updateData(this.editedContent);
                    // 保存成功，结束编辑状态
                    this.isEditing = false;
                    this.originalContent = this.editedContent;
                    // 提示保存成功
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        duration: 2000,
                    });
                } else {
                    // 保存失败，显示错误信息
                    this.$message.error(res.data.msg);
                }
            } catch (error) {
                // 请求失败，显示错误信息
                this.$message.error('保存失败');
            }
        },
        // 提交和重置
        async submitForm() {
            if ((this.ruleForm.checkPass === this.ruleForm.newPass) && (this.ruleForm.checkPass != "")) {
                const res = await axios.put(`http://localhost:3000/user/update/${this.userId}`, {
                    oldPass: this.ruleForm.oldPass,
                    newPass: this.ruleForm.newPass
                })
                console.log(res.data.code)
                if (res.data.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: '密码修改成功',
                        type: 'success',
                        offset: 100,
                        duration: 1000
                    });
                } else {
                    this.$notify.error({
                        title: '失败',
                        message: '修改失败，请核对输入框内容',
                        type: 'error',
                    });
                }
            } else {
                this.$message({
                    type: "warning",
                    message: "两次输入密码不一致"
                })
                return
            }

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },


    }
}
</script>

<style lang="scss" scoped>
.bigbox {
    background-color: #F5F5F5;
    height: 1000px;
    overflow: hidden;
}

.topBox {
    width: 1400px;
    height: 235px;
    margin: 0 auto;
    background: url('../../images/psBg.png') no-repeat;
    background-size: cover;
    margin-top: 30px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.basicInfo {
    display: flex;
    flex-direction: column;
    margin-top: 45px;
    margin-left: 150px;
    color: white;
}

.basicInfo>p {
    margin-top: 10px;
}

.basicInfo>p:first-child {
    margin-left: 30px;
}

.personalPanel {
    width: 1400px;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 30px;
    padding: 20px 50px;
    box-sizing: border-box;
}

.avatar {
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 40px;
    left: 40px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 3px 2px 1px #999;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatarImg {
    width: 178px;
    height: 178px;
    display: block;
    border: 2px dashed #999;
    padding: 2px;
}

.demo-ruleForm {
    width: 350px;
}
</style>