import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('store', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    async login({ email, password }) {
      const response = await axios.post("http://localhost:3000/api/login", { email, password });
      if (response.status === 200 && response.data.user && response.data.user.id) {
        this.isAuthenticated = true;
        this.user = response.data.user;
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },

    async signup({ fullname, email, password }) {
      const response = await axios.post("http://localhost:3000/api/signup", { fullname, email, password });
      if (response.data.user) {
        this.isAuthenticated = true;
        this.user = response.data.user;
      }
    },
  },

  afterUpdate() {
    this.$emit('isAuthenticatedChanged', this.isAuthenticated);
  }
});