import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import XLSX from 'xlsx'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// import Blob from '../src/pages/vendor/Blob'
// import Export2Excel from '../src/pages/vendor/Export2Excel'
Vue.prototype.$http = axios
Vue.config.productionTip = false
// process.env.Mock && require('./mock/mock')
Vue.use(iView)
Vue.use(ElementUI)
Vue.use(XLSX)
// Vue.use(Blob)
// Vue.use(Export2Excel)

// 设置基础URL
axios.defaults.baseURL = ""
// 设置请求超时时间
axios.defaults.timeout = 5000
 

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
