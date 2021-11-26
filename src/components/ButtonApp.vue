<template>
  <button class="btn" :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ButtonApp',
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
$accent: rgb(250, 161, 101);
$gray: #e2e2e2;
$gray-text: #6b6b6b;
$dark: rgb(48, 48, 48);

.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  border: 1px solid $gray;
  border-radius: 5px;
  background-color: $accent;
  color: #fff;
  transition: box-shadow 0.3s ease;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px 2px #a9a9a9;
  }
  &:active {
    box-shadow: 0px 0px 5px 2px #a9a9a9;
  }
  &:disabled {
    background-color: $gray;
    pointer-events: none;
  }
}
</style>
