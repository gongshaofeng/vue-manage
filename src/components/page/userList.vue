<template>
    <div class="table_container">
        <!-- 列表内容 -->
        <el-table :data='tableDate' highlight-current-row style="width:100%">
            <el-table-column type="index" width="100%"></el-table-column>
            <el-table-column property="registe_time" label="注册日期" width="220"></el-table-column>
            <el-table-column property="username" label="用户姓名" width="220"></el-table-column>
            <el-table-column property="city" label="注册地址"></el-table-column>
        </el-table>
        <!-- 分页符 -->
        <div class="Pagination" style="text-align:left; margin-top:10px">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="count">>
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'userlist',
    data(){
        return {
            tableDate: [],
            start:0,
            end:10,
            // 总数量
            count: 0,
            // 当前页
            currentPage: 1,
        }
    },
    created(){
        // 数据初始化
        this.getuserlist();
        this.getuserlistall()
    },
    methods:{
        // 查询所有的用户 api
        getuserlistall(){
            this.$http.get(`http://localhost:3000/userlist`)
                .then(result=>{
                    if(result){
                        // console.log(result.data.length)
                        this.count = result.data.length;
                    }else{
                        alert("失败");
                    }
                })
        },
        // 分页查询 api
        getuserlist(){
            this.$http.get(`http://localhost:3000/userlist?_start=${this.start}&_end=${this.end}`)
                .then(result=>{
                    if(result){
                        this.tableDate = result.data;
                        console.log(this.tableDate)
                    }else{
                        alert("失败");
                    }
                })
        },
        handleCurrentChange(val) {
            console.log(val)
                this.currentPage = val;
                this.start = (val - 1)*10;
                this.end = this.start+10;
                this.getuserlist();
                this.start=0;
                this.end=9;
        }
    }
}
</script>

<style scoped>
    .table_container{
        padding: 20px;
    }
</style>
