import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
//const Home = () => import('views/home/Home');
const Home = resolve => require(['views/home/Home'],resolve);
const Category = resolve => require(['views/category/Categroy'],resolve);
const Cart = resolve => require(['views/cart/Cart'],resolve);
const Profile = resolve => require(['views/profile/Profile'],resolve);

//const Home = () => import('../views/home/Home')

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },

]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
