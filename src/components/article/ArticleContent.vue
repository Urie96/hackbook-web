<template>
  <article id="article-content"></article>
</template>

<script setup lang="ts">
import { onDeactivated, onMounted } from 'vue';
import {
  highlightIfNeed,
  renderMathIfNeed,
  makeChildImagePreviewable,
} from '@/utils/';
import { Article } from '@/api';

const props = defineProps<{
  article: Article;
}>();

let interval: NodeJS.Timeout;
const storageKey = () => `article_${props.article.id}_log`;

const savingStudyRecord = () => {
  const scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    interval = setInterval(
      () =>
        localStorage.setItem(storageKey(), String(scrollingElement.scrollTop)),
      10000
    );
  }
};

const stopSavingStudyInfo = () => clearInterval(interval);

const turnToLastStudyPosition = () => {
  const studyPosition = Number(localStorage.getItem(storageKey())) || 0;
  const scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    scrollingElement.scrollTo({ top: Number(studyPosition) });
  }
};

const removeInlineStyle = (el: HTMLElement) => {
  Array.from(el.getElementsByTagName('*')).forEach((e) =>
    e.removeAttribute('style')
  );
};

onMounted(() => {
  const contentEl = document.getElementById('article-content');
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
});

onDeactivated(stopSavingStudyInfo);
</script>

<style lang="stylus">
@require './ArticleContent';
</style>
