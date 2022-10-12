<template>
  <div>
    <div class="head">
      <div>
        <i :style="avatorStyle" class="iconfont icon-xxhdpiShape"></i>
      </div>
      <div style="margin-left: 0.5rem">
        <div class="name">{{ comment.nickName }}</div>
        <!-- <div class="date">{{ comment.date }}</div> -->
      </div>
    </div>
    <div
      :class="['content', { 'content-spread': isSpread }]"
      @click="isSpread = !isSpread"
      v-html="comment.content"
    ></div>
    <div
      class="reply"
      v-for="(reply, index) in comment.replies"
      :key="index"
      v-html="reply.nickName + ': ' + reply.content"
    ></div>
    <div class="icon">
      <div>
        <i class="iconfont icon-comment"></i> {{ comment.replies.length }}
      </div>
      <div><i class="iconfont icon-star"> </i> {{ comment.likeCount }}</div>
    </div>
    <divider />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getOneColor } from '@/utils/';
import { Comment } from '@/api';

defineProps<{
  comment: Comment;
}>();

const isSpread = ref(false);

const avatorStyle = {
  'font-size': '2rem',
  color: getOneColor(),
};
</script>

<style lang="stylus" scoped>
.head {
  display: flex;
  align-items: center;
  padding-bottom: 0.6rem;
}

.name {
  font-size: 1rem;
  font-weight: bold;
  height: 1.25rem;
  line-height: 1.25rem;
}

.date {
  color: #888;
  font-size: 0.9rem;
  line-height: 1;
}

.content {
  font-size: 1rem;
  font-weight: 400;
  white-space: normal;
  word-break: break-all;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}

.content-spread {
  overflow: auto;
  -webkit-line-clamp: unset;
}

.reply {
  margin: 0;
  color: var(--text-color-sub);
  font-size: 0.9rem;
  font-weight: 400;
  white-space: normal;
  word-break: break-all;
  background: var(--background-color-sub);
  border-radius: 0.6rem;
  padding: 1.1rem;
  overflow-x: scroll;
}

.icon {
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  color: #888;
  padding-left: 0 0.6rem;
  justify-content: flex-end;
  font-size: 1rem;

  &>:first-child i {
    color: var(--theme);
  }

  &>:last-child i {
    color: #f1c40f;
    padding-left: 1.3rem;
  }
}
</style>
