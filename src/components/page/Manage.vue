<template>
    <div class="table">
        <!-- 导航 -->
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-menu"></i>
                    <a href="javascript:;" @click="fanhui">项目管理</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item>项目编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="one">
                    <el-form label-width="100px">
                        <el-form-item label="项目名称">
                            <el-input size="small" v-model="Pname" placeholder="请输入项目名称" style="width:500px"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return {
            activeName: 'one',  //
            Pname: '',       //项目名称

        }
    },
    methods:{
        // 跳转到 '/table'
        fanhui(){
            this.$router.push('/table')
        },
        handleClick(tab, event) {
            console.log(tab, event)
            // this.$message(this.activeName)
        },
    }
}
</script>
<style scoped>
.el-dialog__header {
    padding: 20px 20px 10px;
    text-align: left;
}
    .handle-box{
        margin-bottom: 20px;
    }
    .handle-select{
        width: 150px;
    }
    .handle-input{
        width: 150px;
        display: inline-block;
    }
    /* .el-upload--text {

    } */
    .table {
        padding: 20px;
    }
    .demo-box.demo-tag .el-tag+.el-tag {
        margin-left: 10px;
    }

    .my-el-span{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /**下载失效 */
    video::-webkit-media-controls-enclosure {
        overflow:hidden;
    }
    video::-webkit-media-controls-panel {
        width: calc(100% + 30px);
    }
</style>

</style>

