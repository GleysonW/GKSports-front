import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Orçamento',
    component: DefaultLayout,
    redirect: '/orcamento',
    children: [
      {
        path: '/orcamento',
        name: 'Orçamento',
        component: () =>
          import(
            '@/views/orcamento/Orcamento.vue'
          ),
      },
      {
        path: '/usuario',
        name: 'Usuários',
        component: () => import('@/views/usuario/Usuario.vue')
      },
      {
        path: '/usuario/registrar',
        name: 'RegistrarUsuário',
        component: () => import('@/views/usuario/UsuarioRegistrar.vue')
      },
      {
        path: '/usuario/:id/editar',
        name: 'EditarUsuário',
        component: () => import('@/views/usuario/UsuarioEditar.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
