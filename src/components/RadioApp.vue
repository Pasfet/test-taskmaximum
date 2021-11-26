<template>
  <div class="radio">
    <h2 class="radio__title">
      {{ label }}
      <span v-if="required" class="radio__required">&#65121;</span>
    </h2>
    <label v-for="option in options" :key="option.id" class="radio__label">
      <input
        type="radio"
        :name="nameGroup"
        tab-index="1"
        :value="option.title"
        v-model="value"
      />
      <span class="radio__item">{{ option.title }}</span>
    </label>
    <text-field
      v-if="textInput"
      :value="inputValue"
      :placeholder="placeholderInput"
      @change-value="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IRadioInput } from '@/types/radioInputTypes';
import TextField from '@/components/TextField.vue';

export default defineComponent({
  name: 'RadioApp',
  components: {
    TextField,
  },
  props: {
    label: {
      type: String as PropType<string>,
      default: '',
    },
    nameGroup: {
      type: String as PropType<string>,
      required: true,
    },
    options: {
      type: Array as PropType<IRadioInput[]> | [],
      default: () => [],
    },
    textInput: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    placeholderInput: {
      type: String as PropType<string>,
      default: '',
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['change-value'],
  data: () => ({
    value: '' as string,
    inputValue: '' as string,
  }),
  methods: {
    checkOption(option: IRadioInput): void {
      this.$emit('change-value', option);
    },
    changeValue(value: string): void {
      this.value = '';
      this.inputValue = value;
      this.$emit('change-value', this.inputValue);
    },
  },
  watch: {
    value() {
      this.inputValue = '';
      this.$emit('change-value', this.value);
    },
  },
});
</script>

<style lang="scss" scoped>
$error: #e50000;
$gray: #e2e2e2;
$gray-text: #6b6b6b;
$dark: rgb(48, 48, 48);

.radio {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &__title {
    font-weight: 400;
    font-size: 1.2rem;
    color: $gray-text;
  }

  &__item {
    font-size: 1rem;
    color: $gray-text;
    margin: 0.5rem 0;
  }

  &__label {
    cursor: pointer;
    & > input {
      position: absolute;
      z-index: -1;
      opacity: 0;

      &:not(:disabled):not(:checked) + span:hover::before {
        border-color: $gray;
      }

      &:not(:disabled):active + span::before {
        background-color: $dark;
        border-color: $gray-text;
      }

      &:focus + span::before {
        box-shadow: 0 0 0 0.4rem rgba(231, 243, 255, 0.25);
      }

      &:focus:not(:checked) + span::before {
        border-color: $gray;
      }

      &:checked + span::before {
        background-size: 0.9rem;
        border-color: $dark;
        background-color: #fff;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='60' cy='60' r='50'/%3E%3C/svg%3E");
      }

      &:disabled + span::before {
        background-color: $gray;
      }
    }

    & > span {
      display: inline-flex;
      align-items: center;
      user-select: none;
    }

    & > span::before {
      content: '';
      display: inline-block;
      width: 1.4rem;
      height: 1.4rem;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid $dark;
      border-radius: 50%;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
      transition: border-color 0.3s ease;
    }
  }

  &__required {
    color: $error;
    font-size: 1.8rem;
  }
}
</style>
