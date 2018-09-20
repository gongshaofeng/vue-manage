<template>
    <div>
        <h1>布局</h1>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-pink"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-pink"></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content purple"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-pink"></div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content purple"></div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-pink"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'editor',
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.row-bg{
    background-color: #f9f9f9;
    padding: 10px 0;
}
.grid-content{
    border-radius: 4px;
    min-height: 36px;
    border: 1px solid #333;
    box-sizing: border-box;
}
.bg-pink{
    background-color: pink;
}
.bg-purple{
    background-color: #d3d3d3;
}
</style>
