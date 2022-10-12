import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import { login, guestLogin } from '../api';
import Courses from '@/views/Courses.vue';
import NotFound from '@/views/NotFound.vue';
import CourseList from '@/components/courseList/CourseList.vue';
import Course from '@/components/course/Course.vue';
import Article from '@/components/article/Article.vue';
import Apply from '@/components/apply/Apply.vue';

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
        component: Apply,
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

// router.beforeEach(async (to) => {
//   if (to.meta.requireAuth && !window.isAuthenticated) {
//     const token = window.sessionStorage.getItem('guest');
//     window.sessionStorage.removeItem('guest');
//     if (token && !(await guestLogin(token))) {
//       return false; // 游客登录失败，停留原页面
//     } else {
//       await login(to.fullPath);
//     }
//   }
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   Loading.clear();
// });

export default router;
