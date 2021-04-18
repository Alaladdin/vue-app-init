import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    cartProducts: [],
    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    resetCartProducts(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateUserAccessKey(state, value) {
      state.userAccessKey = value;
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((product) => product.productId !== productId);
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((i) => i.productId === productId);
      if (item) item.amount = amount;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  getters: {
    orderInfo(state) {
      if (!state.orderInfo) return false;

      const { basket } = state.orderInfo;

      return {
        ...state.orderInfo,
        basket: {
          ...basket,
          items: basket.items.map((item) => ({
            ...item,
            amount: item.quantity,
          })),
        },
      };
    },
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  actions: {
    loadOrderInfo(ctx, orderId) {
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: ctx.state.userAccessKey,
        },
      })
        .then((res) => {
          ctx.commit('updateOrderInfo', res.data);
          return res.data;
        });
    },
    order(ctx, { formData }) {
      return axios.post(`${API_BASE_URL}/api/orders`, {
        ...formData,
      }, {
        params: {
          userAccessKey: ctx.state.userAccessKey,
        },
      })
        .then((res) => {
          ctx.commit('updateOrderInfo', res.data);
          ctx.commit('resetCartProducts');
          return res.data;
        });
    },
    loadColors() {
      return axios.get(`${API_BASE_URL}/api/colors`);
    },
    loadProductCategories() {
      return axios.get(`${API_BASE_URL}/api/productCategories`);
    },
    loadProduct(ctx, { productId }) {
      return axios.get(`${API_BASE_URL}/api/products/${productId}`);
    },
    loadAllProducts(ctx, {
      categoryId = 0,
      colorId = 0,
      limit = 3,
      minPrice = 0,
      maxPrice = 0,
      page = 1,
    }) {
      return axios.get(`${API_BASE_URL}/api/products`, {
        params: {
          categoryId, colorId, limit, minPrice, maxPrice, page,
        },
      })
        .catch(console.error);
    },
    loadCart(ctx) {
      axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: ctx.state.userAccessKey,
        },
      })
        .then((res) => {
          if (!ctx.state.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey);
            ctx.commit('updateUserAccessKey', res.data.user.accessKey);
          }

          ctx.commit('updateCartProductsData', res.data.items);
          ctx.commit('syncCartProducts');
        });
    },
    addProductToCart(ctx, { productId, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: ctx.state.userAccessKey,
        },
      })
        .then((res) => {
          ctx.commit('updateCartProductsData', res.data.items);
          ctx.commit('syncCartProducts');
        })
        .catch(console.error);
    },
    deleteCartProduct(ctx, productId) {
      if (!productId) return false;
      ctx.commit('deleteCartProduct', productId);

      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: {
          productId,
        },
        params: {
          userAccessKey: ctx.state.userAccessKey,
        },
      })
        .then((res) => ctx.commit('updateCartProductsData', res.data.items))
        .catch((err) => {
          console.error(err);
          ctx.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(ctx, { productId, amount }) {
      if (!amount || amount <= 0) return false;
      ctx.commit('updateCartProductAmount', { productId, amount });

      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: ctx.state.userAccessKey,
        },
      })
        .then((res) => ctx.commit('updateCartProductsData', res.data.items))
        .catch(() => ctx.commit('syncCartProducts'));
    },
  },
});
