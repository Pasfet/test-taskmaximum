<template>
  <div class="input">
    <h2 class="input__title">{{ title }}</h2>
    <label class="input__label">
      <span class="input__label-text">{{ label }}</span>
      <input type="file" @change="sendFile" />
    </label>
  </div>
</template>

<script lang="ts">
import { IFile } from '@/types/fileTypes';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'InputFile',
  props: {
    title: {
      type: String as PropType<string>,
      default: 'Загрузка',
    },
    label: {
      type: String as PropType<string>,
      default:
        'Приложите, пожалуйста, полноэкранный скриншот. Это поможет быстрее решить проблему.',
    },
  },
  emits: ['upload-file'],
  methods: {
    sendFile(e: { target: { files: { 0: IFile } } }): void {
      this.$emit('upload-file', e.target.files['0']);
    },
  },
});
</script>

<style lang="scss" scoped>
$error: #e50000;
$gray: #e2e2e2;
$gray-text: #6b6b6b;
$dark: rgb(48, 48, 48);

.input {
  &__title {
    font-weight: 400;
    font-size: 1.2rem;
    color: $gray-text;
    margin-bottom: 1rem;
  }

  &__label {
    margin: 0.7rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &-text {
      color: $gray-text;
      font-size: 0.8rem;
    }

    input {
      margin-top: 1rem;
    }
  }
}
</style>
