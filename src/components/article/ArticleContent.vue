<template>
  <article id="article-content" ref="content"></article>
</template>

<script setup lang="ts">
import { onDeactivated, onMounted, watch, ref, onUnmounted } from 'vue';
import {
  highlightIfNeed,
  renderMathIfNeed,
  makeChildImagePreviewable,
  debounce,
  Toast,
  Loading,
} from '@/utils/';
import { Article, saveStudyInfo } from '@/api';

const props = defineProps<{
  article: Article;
}>();

let content = ref<HTMLElement>();

const handleScroll = debounce(() => {
  if (!props.article || !props.article.course || !props.article.course.id) {
    return;
  }
  const height = content.value?.getBoundingClientRect()?.height;
  const top = document.scrollingElement?.scrollTop || 0;
  if (!height) {
    return;
  }
  let percent = (top * 100) / height;
  if (percent < 0) {
    percent = 0;
  }
  if (percent > 100) {
    percent = 100;
  }
  saveStudyInfo({
    courseId: props.article.course.id,
    articleId: props.article.id,
    percent,
  });
}, 1000);

const savingStudyRecord = () => {
  window.addEventListener('scroll', handleScroll);
};

const stopSavingStudyInfo = () => {
  window.removeEventListener('scroll', handleScroll);
};

const turnToLastStudyPosition = () => {
  const height = content.value?.getBoundingClientRect()?.height;
  if (!height) {
    return;
  }
  const top = (height * (props.article.studyInfo?.percent || 0)) / 100;

  document.scrollingElement?.scrollTo({ top });
  if (top > 0) {
    Toast({ message: '已为您定位到上次学习位置', position: 'bottom' });
  }
};

const removeInlineStyle = (el: HTMLElement) => {
  Array.from(el.getElementsByTagName('*')).forEach((e) =>
    e.removeAttribute('style')
  );
};

const init = () => {
  const contentEl = content.value;
  if (!contentEl) return;
  // replcace 去除Math区域内的html标签，使katex能正确识别
  contentEl.innerHTML =
    props.article.content?.replace(/\${2}[\w\W]+?\${2}/g, (match) =>
      match.replace(/<[^>]+>/g, '')
    ) || '';
  removeInlineStyle(contentEl);
  savingStudyRecord();
  highlightIfNeed(contentEl);
  renderMathIfNeed(contentEl);
  makeChildImagePreviewable(contentEl);
  setTimeout(() => {
    turnToLastStudyPosition();
  }, 100);
};

onMounted(init);

watch(() => props.article, init);

onUnmounted(stopSavingStudyInfo);
onDeactivated(stopSavingStudyInfo);
</script>

<style lang="stylus">
@require './ArticleContent';
</style>
