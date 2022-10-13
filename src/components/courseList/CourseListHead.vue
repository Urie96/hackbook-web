<template>
  <header>
    <van-nav-bar>
      <template #left>
        <search-box v-model="modelQuery" :placeholder="placeholder" />
      </template>
      <template #title>
        <div class="search-box">
          <img src="/favicon.svg" alt="" />
          <span class="site-name">HackBook</span>
        </div>
      </template>
      <template #right>
        <SwitchAppearance style="margin-right: 10px" />
        <fullscreen-button />
      </template>
    </van-nav-bar>
  </header>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import SwitchAppearance from '@/components/common/SwitchAppearance.vue';
import { debounce } from '@/utils';

const emit = defineEmits<{
  (event: 'search', query: string): void;
}>();

const modelQuery = ref('');
const placeholder = '';

const update = debounce(() => {
  emit('search', modelQuery.value);
}, 300);

watch(modelQuery, update);
</script>

<style lang="stylus" scoped>
img {
    height: 1.5rem;
    margin-right: 0.8rem;
    vertical-align: top;
    display: inline-block;
}
</style>
