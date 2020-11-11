import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import echarts from 'echarts'; //引入echarts

Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
import draggable from 'vuedraggable';
import Sortable  from 'sortablejs';
import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

new Vue({
    router,
    axios,
    render: h => h(App),
}).$mount('#app')

axios.interceptors.request.use(req=>{
  let token = localStorage.getItem('token')
    console.log(token)
  if(token){
      req.headers.Authorization = 'JWT '+ token
  }
  return req;
},error=>{
    return Promise.reject(error);
})
axios.interceptors.response.use(res=>{
    console.log(res);
    if(res.data.token){
        console.log(res.data.token);
        console.log(res.data["token"]);
        localStorage.set("token",res.data.token);
        localStorage.set("token",res.data["token"]);
    }else if(res.token){
        console.log(res.token)
        localStorage.set("token",res.token);
    }
    return res;
},error=>{
    return Promise.reject(error.response.data)
})

Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
        //时间格式年月日、时分秒
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})