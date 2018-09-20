<template>
    <div>
        <h1>容器</h1>
        <el-container>
            <el-header>顶部菜单</el-header>
            <el-container>
                <el-aside width="200px">左侧菜单</el-aside>
            <el-container>
                <el-main class="el-main">主体</el-main>
                <el-footer>页脚</el-footer>
            </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    name:'markdown',
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.el-header, .el-footer{
    background-color: #b3b3b3;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-aside{
    background-color: #a3a333;
    color: #222;
    text-align: center;
    line-height: 200px;
}

.el-main{
    background-color: #e3e3e3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
</style>
