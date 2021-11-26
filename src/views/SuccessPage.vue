<template>
  <div class="success">
    <h1 class="success__title">Ваша заявка отправлена!</h1>
    <img src="../assets/success_img.png" alt="Success" />

    <div class="success__body">
      <p class="success__body-item">
        Тема вопроса: <span class="success__body-req">{{ theme }}</span>
      </p>
      <p class="success__body-item">
        Описание проблемы:
        <span class="success__body-req">{{ description }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'SuccessPage',
  data: () => ({
    theme: '' as any,
    description: '' as any,
  }),
  computed: {
    ...mapGetters(['getSuccess']),
  },
  mounted() {
    const route = this.$route;

    if (route.query) {
      this.theme = route.query.request;
      this.description = route.query.desc;
    }
  },
});
</script>

<style lang="scss" scoped>
$gray-color: #7a7a7a;

.success {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    margin: 3rem 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;

    &-item {
      display: inline-block;
      margin: 1.2rem 0;
    }

    &-req {
      color: $gray-color;
    }
  }
}
</style>
