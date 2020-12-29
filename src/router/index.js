import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../components/Inicio.vue'
import Compras from '../components/Compras.vue'
import Detalhes from '../components/Detalhes.vue'
import Contato from '../components/Contato.vue'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/inicio',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/compras',
    name: 'compras',
    component: Compras
  },
  {
    path: '/detalhes',
    name: 'detalhes',
    component: Detalhes
  },
  {
    path: '/contato',
    name: 'contato',
    component: Contato
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
