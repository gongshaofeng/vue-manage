<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
                <!--  表单数据对象        表单验证规则     注册到$refs对象        表单域标签的宽度-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="报上你的大名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" type="password" placeholder="大声喊出暗号" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" >登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#FB585A;text-align:center" :class="{ dnone: isActive }">用户名或密码错误！</p>
            </el-form>
        </div>
        <el-footer style="clear:both; bottom:0;margin-top:20px; color:#F4F4F4; position:absolute;text-align:center; width:100%;font-size:12px;padding-top:20px">
            copyright © 2018 随便做做有限公司
        </el-footer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            // 控制提示词
            isActive: true,
            // json文件返回的数据
            res: {},
            // 表单数据对象
            ruleForm: {
                username:   '',
                password:   ''
            },
            // 表单验证规则
            rules: {
                username: [
                    { required :true , message: '请输入用户名'  , trigger: 'blur'}
                ],
                password: [
                    { required: true , message: '请输入密码' , trigger: 'blur'}
                ]
            }
        }
    },
    created(){
        this.getUser()
    },
    methods: {
        getUser(){
            this.$http.get('http://localhost:3000/user')
                .then(result=>{
                    if(result.data[0].uname){
                        // console.log(result.data[0].uname)
                    this.res = result.data[0]
                    }else{
                        console.log("数据加载失败！");
                        return false;
                    }
                })
        },
        submitForm(formName){
            // 引用ref对象
            this.$refs[formName].validate((valid) => {
                // console.log(this.ruleForm.username)
                let n =this.ruleForm.username;
                let p =this.ruleForm.password;
                if(n===this.res.uname && p===this.res.upwd){
                    // 将用户名存入本地存储
                    localStorage.setItem('ms_username',this.ruleForm.username);
                    // 将密码存入本地存储
                    localStorage.setItem('ms_password',this.ruleForm.password);
                    // 跳转到首页
                    this.$router.push('/dashboard')
                }else{
                    // alert("用户名或密码错误！")
                    // return false;
                    this.isActive=false;
                }
            })
        }
    },
}

</script>

<style scoped>
    .dnone{
        display: none;
    }
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>