import index from './index.vue'
import button from './pages/button.vue'
import select from './pages/select.vue'
// 配置路由
export default [{
    path: '/',
    component: index,
    children: [{
        path: '/button',
        component: button
    },{
        path: '/select',
        component: select
    }]
}]