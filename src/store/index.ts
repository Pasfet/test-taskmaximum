import { createStore } from 'vuex';
import { IBranches } from '@/types/dropdownTypes';
import { IRadioInput } from '@/types/radioInputTypes';
import { GET_CITIES_URL,  ResponseSendDataTypes,  SEND_FORM_URL } from '@/types/APITypes';

export default createStore({
  state: {
    branchesList: [] as IBranches[] | [],
    themesFeedbackList: [] as IRadioInput[] | [],
    errors: '' as string,
  },
  getters: {
    getBranches(state): IBranches[] | [] {
      return state.branchesList;
    },
    getThemeFeedback(state): IRadioInput[] | [] {
      return state.themesFeedbackList;
    },
  },
  mutations: {
    setBranches(state, branches: IBranches[]) {
      state.branchesList = branches;
    },

    setThemesFeedback(state, list: IRadioInput[]) {
      state.themesFeedbackList = list;
    },

    setError(state, err: string) {
      state.errors = err;
    },
  },
  actions: {
    async fetchBranches({commit}): Promise<void> {
      let error: string;
      try {
        const response = await fetch(GET_CITIES_URL);
        const data = await response.json();
        commit('setBranches', data);
      } catch (err) {
        error = (err as Error).message;
        commit('setError', error);
      }
    },

    async fetchThemeFeedbackList({commit}): Promise<void> {
      let error: string;
      try {
        const response = await mockResponseThemeFeedback(500);
        commit('setThemesFeedback', response);
      } catch (err) {
        error = (err as Error).message;
        commit('setError', error);
      }
    },

    async sendFormData({commit}, info): Promise<any> {
      let error: string;
      try {
        const response = await fetch(SEND_FORM_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        });
        const data: ResponseSendDataTypes = await response.json();
        return data.success;
      } catch (err) {
        error = (err as Error).message;
        commit('setError', error);
      }
    },
  },
});



// Simulated server response
function mockResponseThemeFeedback(delay: number): Promise<IRadioInput[]> {
  const mockTheme: IRadioInput[] = [
    {
      id: '1',
      title: 'Недоволен качеством услуг',
    },
    {
      id: '2',
      title: 'Расторжение договора',
    },
    {
      id: '3',
      title: 'Не приходит письмо активации на почту',
    },
    {
      id: '4',
      title: 'Не работает личный кабинет',
    },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTheme), delay);
  });
}
