import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';



Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import App from './App.vue'

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
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