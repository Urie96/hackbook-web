<template>
  <div>
    <CourseListHead @search="onSearch" />
    <div style="padding-top: 3.6rem">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="course in courses" :key="course.id">
          <CourseListItem :course="course" />
        </div>
      </van-list>
    </div>
    <back-to-top />
  </div>
</template>

<script setup lang="ts">
import { onActivated, ref } from 'vue';
import { Course, listCourses } from '@/api';
import { lastStudyCourseId } from './store';

const courses = ref(new Array<Course>());
const loading = ref(false);
const finished = ref(false);
let keyword = '';

const onLoad = async () => {
  loading.value = true;
  const { courses: partCourses, more } = await listCourses({
    offset: courses.value.length,
    keyword,
    limit: 5,
  });
  courses.value.push(...partCourses);
  loading.value = false;
  finished.value = !more;
};

const refreshLastStudyCourse = () => {
  lastStudyCourseId.value = localStorage.getItem('last_study_course_id') || '';
};

onActivated(refreshLastStudyCourse);

const onSearch = (query: string) => {
  keyword = query;
  courses.value = [];
  onLoad();
};
</script>

<style lang="stylus" scoped>
.course-list-move {
  transition: transform 0.8s ease;
}
</style>
