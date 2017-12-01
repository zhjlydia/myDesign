import index from './index.vue'
import select from './pages/select.vue'
import tree from './pages/tree.vue'
import tag from './pages/tag.vue'
// 配置路由
export default [{
    path: '/',
    component: index,
    children: [{
        path: '/select',
        component: select
    }, {
        path: '/tree',
        component: tree
    }, {
        path: '/tag',
        component: tag
    }]
}]