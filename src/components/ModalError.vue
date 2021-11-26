<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="visible" class="modal modal-mask" @click="hideModal">
        <div class="modal-content">
          <slot name="header">
            <div class="modal-header">
              <span class="modal-header__close" @click="hideModal"
                >&times;</span
              >
            </div>
          </slot>
          <div class="modal-body">
            <slot />
          </div>
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ModalError',
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['hide'],
  methods: {
    hideModal() {
      this.$emit('hide');
    },
  },
});
</script>

<style lang="scss">
$gray: #e2e2e2;
$dark: #141414;
$error: #e50000;

.modal {
  &-mask {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  &-header {
    display: flex;
    justify-content: flex-end;
    &__close {
      color: #aaa;
      font-size: 2.2rem;
      transition: color 0.3s ease;
      &:hover {
        cursor: pointer;
        color: $dark;
      }
    }
  }

  &-content {
    border-radius: 5px;
    background-color: #fff;
    padding: 1.5rem;
    border: 1px solid $gray;
    width: 80%;
  }

  &-body {
    background-color: $error;
    color: #fff;
    text-align: center;
    padding: 1.7rem;
    border-radius: 5px;
    font-size: 1.4rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
