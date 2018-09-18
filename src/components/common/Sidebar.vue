<template>
    <div class="sidebar">
        <!-- 创建一级菜单 -->
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" uniquer-opened router>
            <!-- 遍历一级菜单 -->
            <template v-for="item in items">
                <!-- 1 如果是有二级菜单：通过subs判断 -->
                <template v-if="item.subs">
                    <!-- 一级菜单创建下级 -->
                    <el-submenu :index="item.index" :key="item.index">
                        <!-- 1.1 将一级菜单写入页面 -->
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <!-- 1.2 遍历二级菜单 -->
                        <template v-for="subItem in item.subs">
                            <!-- 1.2.1 如果是有二级菜单：通过subs判断 -->
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <!-- 1.2.1.1 遍历三级菜单,并写入页面 -->
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <!-- 1.2. 将二级菜单写入页面 -->
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <!-- 2 将一级菜单写入页面 -->
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
import bus from '../common/bus.js'
export default {
    data(){
        return {
            collapse: false,
            items: [
                { icon: 'el-icon-setting', index: 'dashboard', title: '系统首页' },
                { icon: 'el-icon-tickets', index: 'table', title: '项目管理'},
                { icon: 'el-icon-message', index: 'tabs', title: 'tab选项卡'},
                { icon: 'el-icon-date', index: '3', title: '表单相关', subs: [
                            { index: 'form', title: '基本表单'},
                            { index: '3-2', title: '编辑器', subs: [
                                    { index: 'editor', title: '富文本编辑器'},
                                    { index: 'markdown',title: 'markdown编辑器'},
                                ]
                            },
                            { index: 'upload', title: '文件上传'}
                        ]},
                { icon: 'el-icon-star-on', index: 'charts', title: 'schart图表'},
                { icon: 'el-icon-rank', index: 'drag', title: '拖拽列表'},
                { icon: 'el-icon-warning', index: 'permission', title: '权限测试'},
                { icon: 'el-icon-error', index: '404页面',title: '404页面'}
            ]
        }
    },
    computed:{
        // 设置侧边栏默认栏
        onRoutes(){
            return this.$route.path.replace('/','')
        }
    },
    created(){
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse' , msg => {
            this.collapse = msg
        })
    }
}
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
