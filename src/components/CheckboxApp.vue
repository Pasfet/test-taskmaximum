<template>
  <label class="checkbox">
    <div class="checkbox__content">
      <input
        type="checkbox"
        :checked="checked"
        class="checkbox__hidden"
        @change="check"
      />
      <div class="checkbox__styled" :class="{ checkbox_active: checked }">
        <checkbox-icon />
      </div>
      <span class="checkbox__label">
        {{ label }}
      </span>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CheckboxIcon from '@/assets/CheckboxIcon.vue';

export default defineComponent({
  name: 'CheckboxApp',
  props: {
    label: {
      type: String as PropType<string>,
      default: '',
    },
    checked: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['checked'],
  components: {
    CheckboxIcon,
  },
  methods: {
    check(e: { target: { checked: boolean } }) {
      this.$emit('checked', e.target.checked);
    },
  },
});
</script>

<style lang="scss" scoped>
$gray: #e2e2e2;
$dark: #535353;

.checkbox {
  &__content {
    display: flex;
    align-items: center;
  }
  &:hover {
    cursor: pointer;
  }
  &__hidden {
    border: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  &__styled {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid $dark;
    margin-right: 1rem;

    &:focus,
    &:active {
      outline: 2px solid $dark;
    }
    & > svg {
      fill: $dark;
      visibility: hidden;
    }
  }
  &_active {
    & > svg {
      visibility: visible;
    }
  }

  &__label {
    font-size: 1rem;
  }
}
</style>
