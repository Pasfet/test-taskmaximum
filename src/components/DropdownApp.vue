<template>
  <div class="dropdown">
    <div
      class="dropdown__header"
      :class="{ disabled: disabled }"
      :aria-label="label"
      @click="toggleOpen"
    >
      <div class="dropdown__title">
        <h2 class="dropdown__label">
          {{ label }}
          <span v-if="required" class="dropdown__required">&#65121;</span>
        </h2>
        <div
          tabindex="0"
          class="dropdown__selected"
          :class="{ dropdown_active: isOpen, dropdown_unactive: disabled }"
          @keydown.enter="toggleOpen"
        >
          {{ selectedOption?.title || placeholder }}
          <div class="dropdown__arrow">
            <arrow-down-icon />
          </div>
        </div>
      </div>
    </div>
    <div class="dropdown-content">
      <ul v-if="isOpen" class="dropdown-content__list">
        <li
          v-for="option in options"
          :key="option.id"
          tab-index="0"
          class="dropdown-content__item"
          @click="selectOption(option)"
          @keydown.enter="selectOption(option)"
        >
          {{ option.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { IBranches } from '../types/dropdownTypes';
import { defineComponent, PropType } from 'vue';
import ArrowDownIcon from '@/assets/ArrowDownIcon.vue';

export default defineComponent({
  name: 'DropdownApp',
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    placeholder: {
      type: String as PropType<string>,
      default: 'Placeholder',
    },
    options: {
      type: Array as PropType<IBranches[]> | [],
      default: () => [],
    },
    selectedOption: {
      type: [Object, null] as PropType<IBranches>,
      required: true,
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['select'],
  components: {
    ArrowDownIcon,
  },
  data: () => ({
    isOpen: false as boolean,
  }),
  methods: {
    toggleOpen(): void {
      this.isOpen = !this.isOpen;
    },
    selectOption(option: IBranches) {
      this.$emit('select', option);
      this.isOpen = false;
    },
  },
});
</script>

<style lang="scss" scoped>
$gray: #e2e2e2;
$gray-text: #6b6b6b;
$error: #e50000;
$dark: rgb(48, 48, 48);

.dropdown {
  width: 100%;
  max-width: 400px;
  position: relative;

  &__header {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-weight: 400;
    color: $gray-text;
    font-size: 1.1rem;
    line-height: 1.8rem;
  }

  &__required {
    color: $error;
    font-size: 1.8rem;
  }

  &__selected {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 400px;
    width: 100%;
    margin-top: 0.5rem;
    padding: 1rem;
    line-height: 1.5rem;
    color: $gray-text;

    background: #ffffff;
    border: 1px solid $gray;
    box-shadow: 0px 4px 8px rgba(104, 101, 109, 0.096);
    border-radius: 5px;

    transition: box-shadow 0.3s ease;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 8px 15px rgba(67, 59, 87, 0.08),
        0px 24px 48px rgba(44, 39, 56, 0.16);
    }

    &:active,
    &:focus {
      outline: 2px solid $dark;
    }
  }

  &__arrow {
    width: 16px;
    height: 16px;
    & > svg {
      fill: $gray-text;
    }
  }

  &-content {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 20;
    background-color: #fff;

    &__list {
      padding: 0.7rem 0;
      list-style-type: none;
      border: 2px solid $gray;
      border-radius: 5px;
      box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04),
        0px 20px 20px rgba(44, 39, 56, 0.04);
    }

    &__item {
      padding: 1em;
      font-size: 1.1rem;
      line-height: 1.5rem;
      color: $gray-text;
      transition: background-color 0.3s ease, color 0.3s ease;
      &:hover {
        cursor: pointer;
        background-color: $gray;
        color: rgb(255, 255, 255);
      }
      &:focus {
        outline: 2px solid $gray;
      }
    }
  }

  &_active {
    outline: 2px solid $gray;
  }

  &_unactive {
    background-color: rgba(238, 238, 238, 0.664);
  }
}

.disabled {
  pointer-events: none;
}
</style>
