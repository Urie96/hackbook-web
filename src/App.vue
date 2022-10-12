<template>
  <SWPopup />
  <router-view />
</template>

<script setup lang="ts">
import SWPopup from '@/components/pwa/SWPopup.vue';
</script>

<style lang="stylus">
@require './globalStyle';
</style>
