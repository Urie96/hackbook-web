<template>
  <header>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$emit('goBack')"
    >
      <template #right>
        <SwitchAppearance style="margin-right: 10px" />
        <fullscreen-button />
      </template>
    </van-nav-bar>
  </header>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import SwitchAppearance from './SwitchAppearance.vue';

const props = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  goBack: () => void;
}>();

const preTitle = document.title;

document.title = String(props.title || preTitle);

onUnmounted(() => {
  document.title = preTitle;
});
</script>
<style lang="stylus">
header {
  .van-nav-bar {
    background-color: var(--background-color);
  }

  .van-nav-bar__title {
    color: var(--text-color);
  }

  .van-hairline--bottom::after {
    border-bottom-color: var(--border-color);
  }
}
</style>
