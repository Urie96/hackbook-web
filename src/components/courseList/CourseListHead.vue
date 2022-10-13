<template>
  <header>
    <div class="left">
      <div class="search-box">
        <search-box v-model="modelQuery" :placeholder="placeholder" />
      </div>
    </div>
    <div class="title">
      <img src="/favicon.svg" alt="" />
      <span class="site-name">HackBook</span>
    </div>
    <div class="right">
      <SwitchAppearance style="margin-right: 10px" />
      <fullscreen-button style="height: 36px" />
    </div>
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
  // if (document.scrollingElement) {
  //   document.scrollingElement.scrollTo({ top: 0 });
  // }
}, 300);

watch(modelQuery, update);
</script>

<style lang="stylus" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.5rem;
  background: var(--background-color);
  z-index: 20;
  height: 3.6rem;
  box-shadow: var(--box-shadow);
  line-height: 2.2rem;
  box-sizing: border-box;

  .title{
    margin-left: 1rem;
    flex-shrink: 100;
    max-height: 100%;
    overflow:hidden;
  }

  img {
    height: 2.2rem;
    min-width: 2.2rem;
    margin-right: 0.8rem;
    vertical-align: top;
    display: inline-block;
  }

  .site-name {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color);
  }


  .left {
    width:50px
    z-index: 50;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    display: flex;
    background-color: var(--background-color);
    flex-shrink: 1;

    .seach-box {
      flex: 0 0 auto;
      vertical-align: top;
      display: inline-block;
      position: relative;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 1;

    svg {
      width: 2rem;
      height: 2rem;
      fill: currentcolor;
    }
  }
}
</style>
