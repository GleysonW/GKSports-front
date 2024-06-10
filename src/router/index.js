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
      {
        path: '/roupa',
        name: 'Roupa',
        component: () => import('@/views/roupa/Roupa.vue')
      },
      {
        path: '/roupa/:id/editar',
        name: 'EditarRoupa',
        component: () => import('@/views/roupa/RoupaEditar.vue')
      },
      {
        path: '/roupa/registrar',
        name: 'RegistrarRoupa',
        component: () => import('@/views/roupa/RoupaRegistrar.vue')
      },
      {
        path: '/tecido',
        name: 'Tecido',
        component: () => import('@/views/tecido/Tecido.vue')
      },
      {
        path: '/tecido/:id/editar',
        name: 'EditarTecido',
        component: () => import('@/views/tecido/TecidoEditar.vue')
      },
      {
        path: '/tecido/registrar',
        name: 'RegistrarTecido',
        component: () => import('@/views/tecido/TecidoRegistrar.vue')
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
