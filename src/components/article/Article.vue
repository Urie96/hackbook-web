<template>
  <van-sticky>
    <NavBar :title="article?.title || ''" @goBack="goBack" />
  </van-sticky>
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
import { useRouter } from 'vue-router';
import ArticleContent from './ArticleContent.vue';
import ArticleCommentList from './ArticleCommentList.vue';
import NavBar from '@/components/common/NavBar.vue';
import { Article, getArticleDetailById } from '@/api';

const props = defineProps<{
  id: string;
}>();

const article = ref<Article | null>(null);

const init = async () => {
  article.value = await getArticleDetailById(props.id);
  document.scrollingElement?.scrollTo({ top: 0 });
};

onMounted(init);

watch(() => props.id, init);

const router = useRouter();

const goBack = () => {
  const course = article.value?.course;
  if (course?.id) {
    router.replace({
      name: 'course',
      params: { id: course.id },
    });
  } else {
    router.go(-1);
  }
};

// watchEffect(async () => {
//   try {
//     Loading.pop();
//   } finally {
//     Loading.clear();
//   }
// });
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
