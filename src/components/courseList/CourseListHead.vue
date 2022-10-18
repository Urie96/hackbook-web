<template>
  <NavBar sticky>
    <template #left>
      <search-box v-model="modelQuery" :placeholder="placeholder" />
    </template>
    <template #title>
      <div class="search-box">
        <img src="/favicon.svg" alt="" />
        <span class="site-name">HackBook</span>
      </div>
    </template>
  </NavBar>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from '@/utils';
import NavBar from '@/components/common/NavBar.vue';

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
