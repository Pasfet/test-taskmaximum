<template>
  <div class="container support">
    <h1 class="support-header support__header">
      Форма подачи заявки в&nbsp;отдел сервиса и&nbsp;качества
    </h1>
    <form class="feedback-form support__form" @submit.prevent="sendData">
      <dropdown-app
        label="Ваш филиал"
        placeholder="Выберите город"
        :disabled="isOnline"
        :required="true"
        :options="getBranches"
        :selectedOption="selectedBranches"
        class="feedback-form__branches"
        @select="selectBranches"
      />
      <checkbox-app
        label="Онлайн"
        :checked="isOnline"
        class="feedback-form__online"
        @checked="setIsOnline"
      />
      <radio-app
        :label="'Тема обращения'"
        :placeholderInput="'Другое'"
        :nameGroup="'themeFeedback'"
        :options="getThemeFeedback"
        :textInput="true"
        :required="true"
        @change-value="checkThemeFeedback"
      />
      <text-field
        :label="'Описание проблемы'"
        :placeholder="'Введите текст'"
        :multiline="true"
        :required="true"
        :rows="5"
        class="feedback-form__description"
        @change-multiline-value="setDescriptionError"
      />
      <input-file
        :title="'Загрузка документов'"
        class="feedback-form__upload"
        @upload-file="setUploadFile"
      />
      <button-app :disabled="disabledButton">Отправить</button-app>
    </form>
    <modal-error :visible="showModal" @hide="toggleVisibleModal">
      Ошибка отправки заявки
    </modal-error>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { IBranches } from '@/types/dropdownTypes';
import { IRadioInput } from '@/types/radioInputTypes';
import { IFile } from '@/types/fileTypes';
import { IInfoSubjectRequest } from '@/types/APITypes';
import DropdownApp from '@/components/DropdownApp.vue';
import CheckboxApp from '@/components/CheckboxApp.vue';
import RadioApp from '@/components/RadioApp.vue';
import TextField from '@/components/TextField.vue';
import InputFile from '@/components/InputFile.vue';
import ButtonApp from '@/components/ButtonApp.vue';
import ModalError from '@/components/ModalError.vue';

export default defineComponent({
  name: 'SupportPage',
  components: {
    DropdownApp,
    CheckboxApp,
    RadioApp,
    TextField,
    InputFile,
    ButtonApp,
    ModalError,
  },
  data: () => ({
    selectedBranches: null as IBranches | null,
    isOnline: false as boolean,
    checkedThemeFeedback: null as IRadioInput | null,
    inputThemeFeedback: null as string | null,
    descriptionError: '' as string,
    uploadFile: null as IFile | null,
    showModal: false as boolean,
  }),
  computed: {
    ...mapGetters(['getBranches', 'getThemeFeedback']),
    disabledButton(): boolean {
      if (
        (this.selectedBranches || this.isOnline) &&
        (this.checkedThemeFeedback || this.inputThemeFeedback) &&
        this.descriptionError
      ) {
        return false;
      }
      return true;
    },
    createInfoRequest(): IInfoSubjectRequest {
      let screen: any;

      if (this.uploadFile) {
        screen = new FormData();
        screen.append('screen', this.uploadFile);
      }

      return {
        branches: this.selectedBranches ? this.selectedBranches : 'online',
        request_subject: this.checkedThemeFeedback
          ? this.checkedThemeFeedback
          : this.inputThemeFeedback,
        error_description: this.descriptionError,
        screenshots: screen || null,
      };
    },
  },
  methods: {
    ...mapActions(['fetchBranches', 'fetchThemeFeedbackList', 'sendFormData']),

    toggleVisibleModal(): void {
      this.showModal = !this.showModal;
    },

    selectBranches(option: IBranches): void {
      this.selectedBranches = option;
    },

    setIsOnline(state: boolean): void {
      this.selectedBranches = null;
      this.isOnline = state;
    },

    checkThemeFeedback(theme: IRadioInput): void {
      this.checkedThemeFeedback = theme;
    },

    setInputThemeFeedback(theme: string): void {
      this.inputThemeFeedback = theme;
    },

    setDescriptionError(value: string): void {
      this.descriptionError = value;
    },

    setUploadFile(file: IFile): void {
      this.uploadFile = file;
    },

    async sendData(): Promise<void> {
      const res = await this.sendFormData(this.createInfoRequest);

      if (res) {
        this.$router.push(
          `/success?request=${this.createInfoRequest.request_subject}&desc=${this.createInfoRequest.error_description}`
        );
        this.selectedBranches = null;
        this.isOnline = false;
        this.checkedThemeFeedback = null;
        this.inputThemeFeedback = null;
        this.descriptionError = '';
        this.uploadFile = null;
        this.showModal = false;
      } else {
        this.toggleVisibleModal();
      }
    },
  },
  mounted() {
    this.fetchBranches();
    this.fetchThemeFeedbackList();
  },
  watch: {
    checkedThemeFeedback() {
      this.inputThemeFeedback = null;
    },
  },
});
</script>

<style lang="scss" scoped>
$gray: #e2e2e2;

.support {
  padding-top: 1rem;
  &-header {
    font-size: 1.1rem;
  }
  &__header {
    margin-bottom: 1.3rem;
  }
}

.feedback {
  &-form {
    border: 1px solid $gray;
    border-radius: 5px;
    padding: 1rem;
    @media (min-width: 1024px) {
      padding: 1.7rem;
    }
    &__online {
      margin: 1.3rem 0;
      display: inline-block;
    }
    &__description {
      margin-top: 1rem;
    }
    &__upload {
      margin: 1.2rem 0;
    }
  }
}
</style>
