import { ref } from 'vue';
import { Course } from '@/api';

export const courses = ref<Course[]>([]);
export const searchedCourseIds = ref<string[]>([]);
export const lastStudyCourseId = ref('');