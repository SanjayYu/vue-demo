import User from '../views/user/User.vue'
import Home from '../views/Home.vue'
import Cate from '../views/cate/Cate.vue'
import News from '../views/news/news.vue'
import Photo from '../views/photo/photo.vue'
import Upload from '../views/upload/upload.vue'
const routes=[
    {path:'/',component:Home},
    {path:'/home',component:Home},
    {path:'/user',component:User},
    {path:'/cate',component:Cate},
    {path:'/news',component:News},
    {path:'/photo',component:Photo},
    {path:'/upload',component:Upload},

];
export default routes