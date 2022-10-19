import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Courses from '@/views/Courses.vue';
import NotFound from '@/views/NotFound.vue';
import CourseList from '@/components/courseList/CourseList.vue';
import Course from '@/components/course/Course.vue';
import Article from '@/components/article/Article.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Courses,
    children: [
      {
        path: '',
        component: CourseList,
      },
      {
        path: 'course/:id',
        name: 'course',
        props: true,
        component: Course,
      },
      {
        path: 'article/:id',
        name: 'article',
        props: true,
        component: Article,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'apply',
        name: 'apply',
        component: () => import('@/components/apply/Apply.vue'),
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
