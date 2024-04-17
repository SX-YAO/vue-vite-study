import { createRouter } from 'vue-router';

const routes = [
  {
    path: '/flexContainer',
    name: 'Home',
    component: () => import('@components/flex-container/FlexContainer.vue')
  }
];