<template>
  <NavBar sticky :title="article?.title || ''" @goBack="goBack" />
  <div class="main" v-if="article">
    <div class="title">
      {{ article.title }}
    </div>
    <div class="info">
      {{ article.publishDate }} {{ article.course?.teacherName }}
    </div>
    <ArticleContent :article="article" />
    <ArticleCommentList :article_id="id" />
    <back-to-top />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import ArticleContent from './ArticleContent.vue';
import ArticleCommentList from './ArticleCommentList.vue';
import NavBar from '@/components/common/NavBar.vue';
import { Article, getArticleDetailById } from '@/api';
import { useRouter } from '@/utils';

const props = defineProps<{
  id: string;
}>();

const article = ref<Article | null>(null);

const init = async () => {
  article.value = await getArticleDetailById(props.id);
};

onMounted(init);

watch(() => props.id, init);

const router = useRouter();

const goBack = () => {
  const id = article.value?.course?.id;
  router.back(id ? `/course/${id}` : '/');
};
</script>

<style lang="stylus" scoped>
.main {
  padding: 1.5rem;
  text-align: justify;
}

.title {
  font-weight: bold;
  font-size: 22px;
  margin: 5px 0px;
}

.info {
  color: #888;
  font-size: 13px;
  font-weight: 400;
}
</style>
