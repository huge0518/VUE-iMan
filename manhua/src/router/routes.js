import routesComponent from './routesComponent'

export default [

  {
    //index
    path: '/index',
    name: 'index',
    component: routesComponent.indexComponent,

    //二级路由
    children: [{
      //home
      path: '/home',
      name: 'home',
      component: routesComponent.homeComponent,
    },
    {
      //home
      path: '/classify',
      name: 'classify',
      component: routesComponent.classifyComponent,
    },

    {
      //home
      path: '/search',
      name: 'search',
      component: routesComponent.searchComponent,
    },

    {
      //home
      path: '/mine',
      name: 'mine',
      component: routesComponent.mineComponent,
    }
  ]
  },

  {
    //register
    path: '/register',
    name: 'register',
    component: routesComponent.registerComponent,
  },

  {
    //login
    path: '/login',
    name: 'login',
    component: routesComponent.loginComponent,
  },

  {
    //detail
    path: '/detail/:url',
    name: 'detail',
    component: routesComponent.detailComponent,
  },

  {
    //manhua
    path: '/manhua/:url:name',
    name: 'manhua',
    component: routesComponent.manhuaComponent,
  },

  {
    //list
    path: '/list/:url',
    name: 'list',
    component: routesComponent.listComponent,
  },


  {
    path: '*',
    redirect: {
      name: 'list'
    }
  }

]
