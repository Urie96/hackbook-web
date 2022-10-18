<template>
  <component :is="sticky ? 'van-sticky' : 'div'">
    <header>
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$emit('goBack')"
      >
        <template v-if="slots['left']" #left>
          <slot name="left"></slot>
        </template>
        <template v-if="slots['title']" #title>
          <slot name="title"></slot>
        </template>
        <template #right>
          <slot name="right">
            <SwitchAppearance style="margin-right: 10px" />
            <fullscreen-button />
          </slot>
        </template>
      </van-nav-bar>
    </header>
  </component>
</template>

<script setup lang="ts">
import { onUnmounted, useSlots } from 'vue';
import SwitchAppearance from './SwitchAppearance.vue';

const props = defineProps({
  title: { type: String, default: '' },
  sticky: { type: Boolean, default: false },
});

const emit = defineEmits<{
  goBack: () => void;
}>();

const slots = useSlots();

const preTitle = document.title;

document.title = String(props.title || preTitle);

onUnmounted(() => {
  document.title = preTitle;
});
</script>
