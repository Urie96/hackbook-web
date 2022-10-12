<template>
  <div>
    <divider />
    <h3>精选留言</h3>
    <divider />

    <ArticleCommentListItem
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ArticleCommentListItem from './ArticleCommentListItem.vue';
import { getArticleComments, Comment } from '@/api';

const props = defineProps<{
  article_id: string;
}>();

const comments = ref(new Array<Comment>());

onMounted(async () => {
  comments.value = await getArticleComments(props.article_id);
});
</script>
