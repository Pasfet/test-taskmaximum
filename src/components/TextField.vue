<template>
  <label class="textfield__label">
    <h2 class="textfield__title">
      {{ label }}
      <span v-if="required" class="textfield__required">&#65121;</span>
    </h2>
    <input
      v-if="!multiline"
      :value="value"
      :placeholder="placeholder"
      type="text"
      class="textfield__input"
      @input="changeValue"
    />
    <textarea
      v-else
      v-model.trim="inputValue"
      :placeholder="placeholder"
      :rows="rows"
      class="textfield__input textfield__input-multiline"
    >
    </textarea>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TextField',
  props: {
    label: {
      type: String as PropType<string>,
      default: '',
    },
    placeholder: {
      type: String as PropType<string>,
      default: '',
    },
    multiline: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    rows: {
      type: Number as PropType<number>,
      default: 2,
    },
    value: {
      type: String as PropType<string | null>,
      default: null,
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['change-value', 'change-multiline-value'],
  data: () => ({
    inputValue: '',
  }),
  methods: {
    changeValue(e: { target: { value: string } }) {
      this.$emit('change-value', e.target.value);
    },
  },
  watch: {
    inputValue() {
      this.$emit('change-multiline-value', this.inputValue);
    },
  },
});
</script>

<style lang="scss" scoped>
$error: #e50000;
$gray: #e2e2e2;
$gray-text: #6b6b6b;
$dark: rgb(48, 48, 48);

.textfield {
  &__label {
    display: flex;
    flex-direction: column;
    color: $gray-text;
  }

  &__title {
    font-weight: 400;
    font-size: 1.2rem;
    color: $gray-text;
  }

  &__input {
    max-width: 400px;
    width: 100%;
    margin: 0.7rem 0;
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    background: #ffffff;
    border: 1px solid $gray;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 5px;
    color: $dark;

    &-multiline {
      max-width: 1140px;
      resize: none;
    }

    &::placeholder {
      font-family: sans-serif;
      color: $gray;
    }

    &:focus {
      outline: 2px solid $gray;
    }
  }
  &__required {
    color: $error;
    font-size: 1.8rem;
  }
}
</style>
