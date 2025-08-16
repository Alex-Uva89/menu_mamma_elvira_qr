const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'menu/:entityId', name: 'menu', component: () => import('pages/MenuPages.vue') }
    ]
  },
  {
    path: '/:entityId?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MenuPages.vue') }
    ]
  }
]
export default routes
