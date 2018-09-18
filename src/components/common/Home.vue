<template>
    <div class="wrapper">
        <v-header></v-header>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <!-- 切换路由后，需要调用钩子函数，实时更新数据，且必须被transition包含 -->
                        <!-- 只有匹配的组件会被缓存 -->
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
// 引入子组件
import vHeader from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus'

export default {
    data(){
        return {
            tagsList: [],
            // 控制选项卡隐藏
            collapse: false
        }
    },
    // 注册子组件
    components:{
        vHeader,vSidebar,vTags
    },
    created(){
        // 存入bus，指向Header.vue
        bus.$on('collapse',msg =>{
            this.collapse = msg
            // console.log(this.collapse)
        });
        //只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了
        bus.$on('tags',msg =>{
            let arr = [];
            for(let i = 0 ; i < msg.length; i++){
                msg[i].name && arr.push(msg[i].name);
                // console.log(msg[i])
            }
            // console.log(arr)
            this.tagsList = arr;
            // console.log(this.tagsList)

        })
    }
}
</script>
<style scoped>

</style>

