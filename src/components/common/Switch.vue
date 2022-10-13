<template>
  <button class="VPSwitch" type="button" role="switch">
    <span class="check">
      <span class="icon" v-if="$slots.default">
        <slot />
      </span>
    </span>
  </button>
</template>
<style>
:root {
  --vp-c-divider: rgba(60, 60, 60, 0.29);
  --vp-c-bg-mute: #f1f1f1;
  --vp-c-gray: #8e8e8e;
  --vp-c-white: #ffffff;
  --vp-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  --vp-c-black: #1a1a1a;
  --vp-c-text-2: rgba(60, 60, 60, 0.7);
  --vp-c-text-1: #213547;
}

:root.dark {
  --vp-c-divider: rgba(84, 84, 84, 0.65);
  --vp-c-bg-mute: #3a3a3a;
  --vp-c-text-2: rgba(235, 235, 235, 0.6);
  --vp-c-text-1: rgba(255, 255, 255, 0.87);
}
</style>
<style scoped>
.VPSwitch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-mute);
  transition: border-color 0.25s, background-color 0.25s;
}

.VPSwitch:hover {
  border-color: var(--vp-c-gray);
  cursor: pointer;
}

.check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vp-c-white);
  box-shadow: var(--vp-shadow-1);
  transition: background-color 0.25s, transform 0.25s;
}

.dark .check {
  background-color: var(--vp-c-black);
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.icon :deep(svg) {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  fill: var(--vp-c-text-2);
}

.dark .icon :deep(svg) {
  fill: var(--vp-c-text-1);
  transition: opacity 0.25s;
}
</style>
