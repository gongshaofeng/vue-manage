<template>
    <div class="header">
        <!-- 5 折叠按钮 -->
                                <!--5.1 点击触发折叠事件-->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 1 全屏显示 -->            <!--1.1 点击触发全屏事件-->
                <div class="btn-fullscreen" @click="handleFullScreen">
                                <!-- 1.4 content：点击菜单项触发的事件回调 -->
                    <el-tooltip :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 2 消息中心  -->
                <div class="btn-bell">          <!--2.1 获取data中message的值是否为零，作为条件来做三目运算-->
                    <el-tooltip effect="dark"  :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                        <!--2.3 获取data中message的值是否为零，作为条件来触发小红点-->
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <!-- <div class="user-avator"><img src="/static/img/img.jpg" alt="!"></div> -->
                <div class="user-avator"><img src="../../assets/avator.jpg"></div>
                <!-- 3 用户名下拉菜单 -->          <!--3.1 配置click激活，点击菜单项后会触发事件-->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <!-- 4.2 拿到获取到用户名，写入标签 -->
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="#"><el-dropdown-item>项目介绍</el-dropdown-item></a>
                                                                <!--3.2 退出登录指令-->
                        <a href="#"><el-dropdown-item divided command="loginout">退出登录</el-dropdown-item></a>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus'
export default {
    data(){
        return {
            fullscreen: false,      //1.2 监听页面的全屏状态
            message: 1,             //2.2 提示消息的数量
        }
    },
    computed:{
        // 4.1 用户名获取
        username(){
            let username = localStorage.getItem('ms_username'); //a向本地存储获取用户名
            return username ? username : this.name;
        }
    },
    methods:{
        // 1.3 全屏事件
        handleFullScreen(){
            let element = document.documentElement; //获取页面根节点
            if(this.fullscreen){    //当前状态：全屏？
                if (document.exitFullscreen){
                    document.exitFullscreen();  //退出全屏
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }else {
                if(element.requestFullscreen){
                    element.requestFullscreen();    //进入全屏
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        // 3.4 用户名下拉选择事件
        handleCommand(command){
            if(command == 'loginout'){  //获取 3.2退出登录指令
                localStorage.removeItem('ms_username') ; //h5新特性 localStorage：b消除本地存储
                this.$router.push('/login');    //跳转到登录页
            }
        },
        // 5.2 侧边栏折叠事件 ==>tags???
        collapseChage(){
            this.collapse = !this.collapse; //返回布尔值
            //获取bus，接收Home.vue
            bus.$emit('collapse' , this.collapse);
            // console.log(this.collapse)
        }
    },
    mounted(){
        // 当客户端宽度小于1500px，触发侧边栏折叠事件
        if(document.body.clientWidth < 1500){
            // console.log(document.body.clientWidth)
            this.collapseChage();
            
        }
    }
}
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
