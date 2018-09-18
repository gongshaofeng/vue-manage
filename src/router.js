import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/common/Home.vue'
import Dashboard from './components/page/Dashboard.vue'
import BaseTable from './components/page/BaseTable.vue'
import Tabs from './components/page/Tabs.vue'
import BaseForm from './components/page/BaseForm.vue'
import VueEditor from './components/page/VueEditor.vue'
import Markdown from './components/page/Markdown.vue'
import Upload from './components/page/Upload.vue'
import BaseCharts from './components/page/BaseCharts.vue'
import DragList from './components/page/DragList.vue'
import Permission from './components/page/Permission.vue'
import login from './components/page/Login.vue'
import error from './components/page/404.vue'
import err from './components/page/403.vue'
import back from './components/page/Allback.vue'



Vue.use(Router)

export default new Router({
  //禁止地址栏手动跳转
  mode:'history',
  routes: [
    {path:"/",redirect:"/login"},
    {path:'/',component:Home,children:[
      {path:'/dashboard',component:Dashboard,meta:{title:"系统首页"}},
      {path:'/table',component:BaseTable,meta:{title:"项目管理"}},
      {path:'/tabs',component:Tabs,meta:{title:"tab选项卡"}},
      {path:'/form',component:BaseForm,meta:{title:"基本表单"}},
      {path:'/editor',component:VueEditor,meta:{title:"富文本编辑器"}},
      {path:'/markdown',component:Markdown,meta:{title:"markdown编辑器"}},
      {path:'/upload',component:Upload,meta:{title:"文件上传"}},
      {path:'/charts',component:BaseCharts,meta:{title:"schart图表"}},
      {path:'/drag',component:DragList,meta:{title:"拖拽列表"}},
      {path:'/permission',component:Permission,meta:{title:"权限测试"}}
    ]},
    { path: '/login',component:login,meta:{title:"登录页"}},
    {path: '/403',component:err,meta:{title:"403页面"}},
    {path:'/404',component:error,meta:{title:"404页面"}},
    { path: '*', redirect: '/404'},
    { path: '/back', component:back}
  ]
})
