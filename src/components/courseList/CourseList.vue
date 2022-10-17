<template>
  <div>
    <van-sticky>
      <CourseListHead @search="onSearch" />
    </van-sticky>
    <div>
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
import { onActivated, ref, onMounted } from 'vue';
import { Course, listCourses, getConnectionSeconds } from '@/api';
import { lastStudyCourseId } from './store';
import { Notify, toDurationChinese, getFirstDayOfThisWeek } from '@/utils';

const courses = ref(new Array<Course>());
const loading = ref(false);
const finished = ref(false);
let keyword = '';

const onLoad = async () => {
  loading.value = true;
  const { courses: partCourses, more } = await listCourses({
    offset: courses.value.length,
    keyword,
  });
  courses.value.push(...partCourses);
  loading.value = false;
  finished.value = !more;
};

const refreshLastStudyCourse = () => {
  lastStudyCourseId.value = localStorage.getItem('last_study_course_id') || '';
};

onActivated(refreshLastStudyCourse);

onMounted(async () => {
  const [todaySecs, thisWeekSecs, allSecs] = await Promise.all([
    getConnectionSeconds(new Date(new Date().toLocaleDateString())),
    getConnectionSeconds(getFirstDayOfThisWeek()),
    getConnectionSeconds(),
  ]);
  Notify({
    type: 'success',
    message: `今天学习了${toDurationChinese(
      todaySecs
    )}，本周学习了${toDurationChinese(
      thisWeekSecs
    )}，历史总共学习了${toDurationChinese(todaySecs)}`,
  });
});

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
