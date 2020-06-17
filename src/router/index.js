import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/pages/login/Login')
const Index = () => import('@/pages/Index/Index')
const Home = () => import('@/pages/Home/Home')
const admin = () => import('@/pages/Home/admin')
const student = () => import('@/pages/functions/student/stuList')
const teacher = () => import('@/pages/functions/teacher/teacher')
const master = () => import('@/pages/functions/train/master')
const company = () => import('@/pages/functions/train/company')
const discipline = () => import('@/pages/functions/assess/discipline')
const interior = () => import('@/pages/functions/assess/interior')
const assess = () => import('@/pages/functions/assess/assess')
const behaveWell = () => import('@/pages/functions/DataSum/behaveWell')
const diaryList = () => import('@/pages/functions/DataSum/diaryList')
const Tcomment = () => import('@/pages/functions/comment/Tcomment')
const Mcomment = () => import('@/pages/functions/comment/Mcomment.vue')
const Password = () => import('@/pages/functions/UserInfo/UserInfo')
const articList = () => import('@/pages/functions/artic/articList')
const articAdd = () => import('@/pages/functions/artic/articAdd')
const UserInfo = () => import('@/pages/functions/UserInfo/UserInfo')
// 前台
const frontIndex = () => import('@/pages/front/frontIndex')
const frontStudent = () => import('@/pages/front/student')
const stuChangeInfo = () => import('@/pages/front/stuChangeInfo')
const trainTime = () => import('@/pages/front/trainTime')
const diaryUpload = () => import('@/pages/front/diaryUpload')
const frontHome = () => import('@/pages/front/frontHome')
const comment = () => import('@/pages/front/comment')
const frontLogin = () => import('@/pages/front/frontLogin')


// 前台页面
// 首页下的子组件
const children = [{
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: 'admin',
    name: 'admin',
    component: admin
  },
  {
    path: 'student',
    name: 'student',
    component: student
  },
  {
    path: 'teacher',
    name: 'teacher',
    component: teacher
  },
  {
    path: 'master',
    name: 'master',
    component: master
  },
  {
    path: 'company',
    name: 'company',
    component: company
  },
  {
    path: 'discipline',
    name: 'discipline',
    component: discipline
  },
  {
    path: 'interior',
    name: 'interior',
    component: interior
  },
  {
    path: 'assess',
    name: 'assess',
    component: assess
  },
  {
    path: 'behaveWell',
    name: 'behaveWell',
    component: behaveWell
  },
  {
    path: 'diaryList',
    name: 'diaryList',
    component: diaryList
  },
  {
    path: 'Tcomment',
    name: 'Tcomment',
    component: Tcomment
  },
  {
    path: 'Mcomment',
    name: 'Mcomment',
    component: Mcomment
  },
  {
    path: 'password',
    name: 'Password',
    component: Password
  },
  {
    path: 'articList',
    name: 'articList',
    component: articList
  },
  {
    path: 'articAdd',
    name: 'articAdd',
    component: articAdd
  },
  {
    path: 'userinfo',
    name: 'UserInfo',
    component: UserInfo
  }
]

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/frontIndex',
      component: frontIndex,
      children: [{
          path: '/frontHome',
          name: '首页',
          component: frontHome
        },
        {
          path: '/frontStudent',
          component: frontStudent
        },
        {
          path:'/stuChangeInfo',
          component: stuChangeInfo
        },{
          path:'/trainTime',
          component: trainTime
        },
        {
          path:'/diaryUpload',
          component: diaryUpload
        },
        {
          path: '/comment',
          component: comment
        },
        {
          path: '/frontLogin',
          component: frontLogin
        }
        
        
      ]
    },
    {
      path: '/student',
      component: frontStudent
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children,
    },
  ]
})
