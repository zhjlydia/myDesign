import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
import myDesign from '../src/index';
Vue.use(VueRouter);
Vue.use(myDesign);
const router = new VueRouter({
    routes
})
var app = new Vue({
    router: router
}).$mount("#view");