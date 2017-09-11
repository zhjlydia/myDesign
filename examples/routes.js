import index from './index.vue'
import button from './pages/button.vue'
// 配置路由
export default [{
    path: '/',
    component: index,
    children: [{
        path: '/button',
        component: button
    }]
}]