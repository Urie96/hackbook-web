<template>
  <NavBar sticky :title="course?.title || ''" @goBack="goBack" />
  <div class="course" v-if="course">
    <CourseHead :course="course" />
    <van-tabs
      animated
      swipeable
      color="var(--theme)"
      line-width="40%"
      line-height="2px"
    >
      <van-tab title="目录" name="category">
        <CourseCategory :course="course" />
      </van-tab>
      <van-tab title="简介" name="intro" v-if="course.description">
        <CourseIntroduce :course="course" />
      </van-tab>
    </van-tabs>
    <back-to-top />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import CourseIntroduce from './CourseIntroduce.vue';
import CourseCategory from './CourseCategory.vue';
import CourseHead from './CourseHead.vue';
import NavBar from '@/components/common/NavBar.vue';
import { getCourseById, Course, Section, Article } from '@/api';
import { useRouter } from '@/utils';

const props = defineProps<{
  id: string;
}>();

const course = ref<Course | null>(null);

const init = async () => {
  const _course = await getCourseById(props.id);

  if (_course?.id.startsWith('G')) {
    const getArticleOrder = (article: Article) =>
      (Date.parse(article.publishDate) || 0) +
      Number(article.id.match(/\d+/)?.[0]);

    const getSectionOrder = (section: Section) => {
      for (const article of section.articles) {
        const order = getArticleOrder(article);
        if (order > 0) {
          return order;
        }
      }
      return 0;
    };
    _course?.sections.forEach((section) => {
      if (!section.title) {
        section.title = '全部';
      }
      section.articles.sort((a, b) => getArticleOrder(a) - getArticleOrder(b));
    });
    _course?.sections.sort((a, b) => getSectionOrder(a) - getSectionOrder(b));
  }

  course.value = _course;
};

onMounted(init);

onActivated(init);

const router = useRouter();

const goBack = () => {
  router.back('/');
};
</script>
<style lang="stylus">
.course {
  .van-tabs__nav {
    background-color: var(--background-color);
  }

  .van-tab {
    color: var(--text-color);
  }
}
</style>
