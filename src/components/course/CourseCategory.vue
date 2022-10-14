<template>
  <div class="category">
    <van-collapse v-model="lastSectionId" accordion>
      <van-collapse-item
        v-for="section of course?.sections"
        :key="section.id"
        :name="section.id"
      >
        <template #title>
          <div class="bold oneline">
            {{ section.title }}（{{ section.articles.length }}讲）
          </div>
        </template>
        <div
          class="lesson-item"
          v-for="article of section.articles"
          :key="article.id"
          :style="article?.done ? '' : { color: '#999' }"
          @click="turnToArticlePage(article)"
        >
          <div style="padding-right: 30px">
            {{ article.title }}
            <span v-if="article.studyInfo" style="color: var(--theme)">
              已学{{ article.studyInfo?.percent | 0 }}%
            </span>
          </div>
          <i :class="getClass(article)"></i>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Article, Course } from '@/api';

const props = defineProps<{
  course: Course;
}>();

const lastSectionId = ref('');
const lastArticleId = ref('');
const router = useRouter();

const getClass = (article: Article) => {
  if (article.id === lastArticleId.value) return 'iconfont icon-pause c-warn';
  if (article.done) return 'iconfont icon-play c-primary';
  return 'iconfont icon-lock';
};

const turnToArticlePage = (article: Article) => {
  if (article.done) {
    lastArticleId.value = article.id;
    const nextPath = `/article/${article.id}`;
    history.state.forward === nextPath
      ? history.forward()
      : router.push(nextPath);
  }
};

const refreshLastStudy = () => {
  let lastSection = props.course.sections[0];
  let lastArticle = lastSection?.articles[0];
  for (const section of props.course.sections) {
    for (const article of section.articles) {
      if (
        (article.studyInfo?.lastStudyAt || 0) >
        (lastArticle?.studyInfo?.lastStudyAt || 0)
      ) {
        lastSection = section;
        lastArticle = article;
      }
    }
  }
  lastSectionId.value = lastSection?.id;
  lastArticleId.value = lastArticle?.id;
};

onMounted(refreshLastStudy);
watch(() => props.course, refreshLastStudy);
</script>

<style lang="stylus" scoped>
.lesson-item {
  color: #303133;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.3rem;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>

<style lang="stylus">
.bold {
  font-weight: 700;
  font-size: 1rem;
}
</style>
<style lang="stylus">
.category {
  .van-cell {
    background-color: var(--background-color);
    color: var(--text-color);

    &::after {
      border-bottom-color: var(--border-color);
    }
  }

  .van-collapse-item--border::after {
    border-top-color: var(--border-color);
  }

  .van-collapse-item__content {
    background-color: var(--background-color);
  }

  [class*=van-hairline]::after {
    border-top-color: var(--border-color);
    border-bottom-color: var(--border-color);
  }

  .lesson-item {
    color: var(--text-color);
  }
}
</style>
