<template>
    <div>
        <h1>图标按钮</h1>
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
        <el-row>
            <el-button plain disabled>默认按钮</el-button>
            <el-button type="primary" plain >主按钮</el-button>
        </el-row>
        <br>
        <h1>字体图标</h1>
        <el-row>
            <el-button icon="el-icon-search" ></el-button>
            <el-button icon="el-icon-edit" round></el-button>
            <el-button icon="el-icon-check" circle></el-button>
            <el-button icon="el-icon-message"></el-button>
            <el-button icon="el-icon-star-off"></el-button>
            <el-button icon="el-icon-delete"></el-button>
            <el-button icon="el-icon-share"></el-button>
            <el-button icon="el-icon-upload"></el-button>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'tabs',
    data(){
        return{

        }
    }
}
</script>