import {
  defineStore
} from 'pinia';

export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      myIp: '',
      baseUrl: `http://${window.location.hostname}:7071/api`,
    };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    setMyIp(ip) {
      this.myIp = ip;
    },
  },
});