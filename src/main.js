// 1：定义
  // 1.1：定义文件类型
  import Vue from 'vue';
// 2：引入
  // 2.1：入口页面
  import App from './App';
  // 2.2：路由文件
  import router from './router';
  // 2.3：Ajax
  import axios from 'axios';
  // 2.4：UI组件库
  import ElementUI from 'element-ui';
  // 2.5：默认主题
  import 'element-ui/lib/theme-chalk/index.css'
  // 2.6：兼容ES6的语法
  // import "bable-polyfill"
  // 2.7：加载模块  VueResource(发送ajax请求)
  import VueResource from 'vue-resource';
// 3：注册
  // 3.1：注册UI组件库
  Vue.use(ElementUI,{size : 'small'});
  // 3.2：注册AJAX
  Vue.prototype.$axios = axios;
  // 3.2：将VueResource 注册vue
  Vue.use(VueResource)

// 4：Vue创建实例
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
