import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '主页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/service',
    component: Layout,
    redirect: '/service/serviceClassManager',
    name: 'serviceManager',
    meta: { title: '数据服务', icon: 'meun001',hasChildren:true },
    children: [
      {
        path: 'serviceClassManager',
        name: 'serviceClassManager',
        component: () => import('@/views/service/serviceclassmanager/index'),
        meta: { title: '服务分类管理' }
      }, 
      {
        path: 'serviceManager',
        name: 'serviceManager',
        component: () => import('@/views/service/servicemanager/index'),
        meta: { title: '服务管理' }
      }
    ]
  },

  
  {
    path: '/example1',
    component: Layout,
    redirect: '/example1/dataSet',
    name: 'Example2',
    meta: { title: '数据集', icon: 'meun002',hasChildren:true  },
    children: [
      {
        path: 'dataSet',
        name: 'dataSet',
        component: () => import('@/views/dataSet/index'),
        meta: { title: '数据集管理' }
      }
    ]
  },
  {
    path: '/solutions',
    component: Layout,
    name: 'solutions',
    redirect: '/solutions/solutionsManage',
    meta: { title: '解决方案', icon: 'tree' ,hasChildren:true },
    children: [
      {
        path: 'solutionsManage',
        name: 'solutionsManage',
        meta: { title: '解决方案管理'},
        component: () => import('@/views/solutions/solutionsManage/index'), 
      }
    ]
  },
  {
    path: '/systemManager',
    component: Layout,
    name: 'systemManager',
    redirect: '/systemManager/userManager',
    meta: { title: '系统管理', icon: 'tree' ,hasChildren:true },
    children: [
      {
        path: 'professorManage',
        name: 'professorManage',
        meta: { title: '机构与人员管理'},
        component: () => import('@/views/userManager/professorManage/index'), 
      },
      {
        path:'serverManager',
        name: 'serverManager',
        meta: { title: '服务器管理'},
        component: () => import('@/views/userManager/serverManage/index'), 
      }
    ]
  },
  
  { path: '*', redirect: '/404', hidden: true },
  // {
  //   path: '/userManager2',
  //   component: Layout,
  //   meta: {hasChildren:false },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'userManager',
  //       meta: { title: '用户管理2', icon: 'tree' },
  //       component: () => import('@/views/userManager/index'), 
  //     }
  //   ]
  // },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

