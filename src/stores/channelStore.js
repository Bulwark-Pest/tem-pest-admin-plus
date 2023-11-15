import { defineStore } from 'pinia';

export const useChannelStore = defineStore({
  id: 'channel',
  state: () => ({
    channels: {},
  }),
  getters: {
    getChannel: (state) => (channel, subChannel) => {
      return state.channels[channel]?.[subChannel] ?? [];
    },
    getElement: (state) => (channel, subChannel, key) => {
      return state.channels[channel]?.[subChannel]?.[key] ?? null;
    },
  },
  actions: {
    dispatchElement({ channel, subChannel, key }, data) {
      if (!this.channels[channel]) {
        this.channels[channel] = {};
      }
      if (!this.channels[channel][subChannel]) {
        this.channels[channel][subChannel] = {};
      }
      this.channels[channel][subChannel][key] = data;
    },
  },
});
