<template>
    <div class="table">
        <!-- 表头 -->
        <div class="crumbs">
            <!-- 标题 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 项目管理</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索框和添加按钮 -->
            <div class="handle-box">
                <el-input size="medium"  placeholder="请输入项目名称" style="width:300px" class="handle-input mr10" v-model="search"></el-input>
                <el-button size="medium" type="primary" icon="el-icon-search" class="box-search" @click="Search" >搜索</el-button>
                                                                            <!-- 1.2 触发隐藏的添加页 -->
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="addDialogVisible = true">添加</el-button>
            </div>
        </div>
        <!-- 项目数据 -->
        <el-table :data="tableDatas" style="width: 100% ;padding:0 24px; margin-top: 10px;" >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="项目编号" prop="pid" ></el-table-column>
            <el-table-column  label="项目名称" prop="pname" ></el-table-column>
            <el-table-column label="创建时间" prop="addtime" ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click.native.prevent="deleteRow(scope.$index, tableDatas)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <div class="block">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                :current-page.sync="currentPage" :page-size="100"
                                layout="prev, pager, next, jumper" :total="500" class="pagination">
                </el-pagination>
        </div>
        <!-- 添加页 -->
        <el-dialog title="添加" :visible.sync="addDialogVisible">
            <el-form label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="AddName" class="mrt5" size="small" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目编号">
                    <el-input v-model="AddCode" class="mrt5" size="small" placeholder="请输入项目编码"></el-input>
                </el-form-item>
                <el-form-item label="项目描述">
                    <el-input v-model="AddDesc" size="small" :rows="rowNumber" type="textarea" placeholder="不多于50个字" maxlength=50 ></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button size="medium" @click="addDialogVisible = false">取&nbsp;消</el-button>
                <el-button size="medium" type="primary" @click="AddP">确&nbsp;定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {

    name:'basetable',
    data() {
        return {
            // 初始化的数据
            tableData:[],
            // 页面显示的项目数据
            tableDatas: [],
            currentPage:5,
            // 添加页/文本框行数
            rowNumber:5,
            // 1.1 召唤添加页的开关(默认关闭)
            addDialogVisible: false,
            AddName: '',    // 项目名称
            AddCode: '',    // 项目编码
            AddDesc: '',    // 项目描述
            totalCount: '', // 总页数
            skipCount: 0,   // 跳转某一页
            maxResultCount: 10, // 最大的显示条数
            pName: '',
            isTrue: false,  // 判断项目编码是够存在
            search: '',     // 搜索框的内容
        }
    },
    computed:{
        Addtime :function(){
            return new Date().toLocaleString()
        }
    },
    created(){
        this.getProlist();  //  项目列表初始化
    },
    watch:{
        // 搜索框的内容发生改变时
        search:
            function (){
                this.getProlist();
            },
        add:
            function (){
                // this.$router.replace({
                //     path: '/login'
                // })
                this.getProlist();
                console.log("执行了")
            }
    },
    updated(){
        // this.getProlist();  // 添加项目列表时，自动更新
        this.gettableDate()
    },
    methods: {
        // 项目数据/删除按钮
        deleteRow(index, rows) {
            this.$confirm("确认删除？")
            .then(res =>{
                rows.splice(index, 1);
                // console.log(index) //表格中数据的下标
                this.gettableDate(),    //手动检测数据变化
                this.deleteDate(index)
            })
            .catch(res =>{})

        },
        deleteDate(index){
            console.log(index)
            let res = this.tableData[index].id; // 要删除的id
            console.log(res)
            this.$axios({
                method: 'delete',
                url: `http://localhost:3000/project/${res}`
            })

        },
        // 项目数据/搜索按钮
        Search(){
            // 取到输入框的数据
            this.serach
            // 新建一个空的数组
            var tableList = [];
            // 将取到的数据和tableDatas中的数据对比
            for(var i=0; i<this.tableDatas.length; i++){
                var a = this.tableDatas[i].pname.search(this.search);
                if(a != -1){
                    tableList.push(this.tableDatas[i])
                }
            }
            this.tableDatas =tableList;
        },
        // 添加页：插入数据
        createP(){
            // 获取json有无相同的项目编码
            for(var i=0; i<this.tableDatas.length; i++){
                if(this.tableData[i].pid != this.AddCode || null ){
                    this.isTrue = true;
                }else{
                    this.isTrue = false;
                }
            }
            if(this.isTrue){
                // 插入信息
                    this.$axios({
                        method: 'post',
                        url: 'http://localhost:3000/project',
                        data: {
                            pid: this.AddCode,
                            pname: this.AddName,
                            addtime: this.Addtime,
                            adddesc: this.AddDesc
                        }
                    });
            }else{
                this.$message('添加失败,编码重复或其他原因')
            }
            this.addDialogVisible=false;    //关闭添加页
            this.AddName= '';
            this.AddCode= '';    // 项目编码
            this.AddDesc= '';
            return this.isT=true;
        },
        // 添加页：添加项目
        AddP(){
            // 验证不能为空
            if(this.AddName == null || this.AddName == ''){
                this.$message('请输入项目名称');
                return false;
            }else
            if(this.AddCode == null || this.AddName == ''){
                this.$message('请输入项目编码');
                return false;
            }else
            if(this.AddDesc == null || this.AddDesc == ''){
                this.$message('请输入项目介绍');
                return false;
            }
            this.createP(); // 创建或驳回

        },
        // 获取项目列表
        getProlist(){
            this.$http.get("http://localhost:3000/project")
                .then(result=>{
                    if(result){
                        this.tableDatas = result.data;
                    }else{
                        alert("失败")
                    }
                })
                console.log("获取了")
        },
        // json-server 中的数据
        gettableDate(){
            this.$http.get("http://localhost:3000/project")
                .then(result=>{
                    if(result){
                        this.tableData = result.data;
                    }else{
                        alert("失败")
                    }
                })
        },
        // 分页栏/页大小
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        // 分页栏/当前页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 项目数据/编辑
        handleEdit(index, row) {
            console.log(index, row);
        },

    }
}


</script>
<style scoped>
.table {
    padding: 20px;
}
.box-search {
    margin-left: 10px;
}
.handle-box{
    margin-top: 20px;
}
.handle-select{
    width: 150px;
}
.handle-input{
    width: 150px;
    display: inline-block;
}
.pagination{
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
.mrt5{
    margin-top: 5px;
}
</style>
