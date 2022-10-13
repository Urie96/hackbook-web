<template>
  <article id="article-content" ref="content"></article>
</template>

<script setup lang="ts">
import { onDeactivated, onMounted, watch, ref } from 'vue';
import {
  highlightIfNeed,
  renderMathIfNeed,
  makeChildImagePreviewable,
  debounce,
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
  const rect = content.value?.getBoundingClientRect();
  if (!rect) {
    return;
  }
  let percent = ((screen.availHeight - rect.top) * 100) / rect.height;
  percent = percent | 0;
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
  const rect = content.value?.getBoundingClientRect();
  if (!rect) {
    return;
  }
  const studyPosition =
    (rect.height * (props.article.studyInfo?.percent || 0)) / 100;

  // const studyPosition = Number(localStorage.getItem(storageKey())) || 0;
  const scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    scrollingElement.scrollTo({
      top: Number(studyPosition) - screen.availHeight,
    });
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
  turnToLastStudyPosition();
  savingStudyRecord();
  highlightIfNeed(contentEl);
  renderMathIfNeed(contentEl);
  makeChildImagePreviewable(contentEl);
};

onMounted(init);

watch(() => props.article, init);

onDeactivated(stopSavingStudyInfo);
</script>

<style lang="stylus">
@require './ArticleContent';
</style>
