import index from "./index.vue";
import tag from "./pages/tag.vue";
import componentsView from "./pages/componentsView.vue";
import navData from "./nav.config.json";
// 配置路由

const generateComponentRoute = () => {};
let route = [
  {
    path: "/",
    component: index,
    children: [
      {
        path: "/components",
        component: componentsView
      }
    ]
  }
];
export default route;
