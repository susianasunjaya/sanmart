import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search:"",
    login:false,
    cart:[],
    product:[]
  },
  getters: {
    cart: state => state.cart,
    hasilCari(state){
      return state.product.filter((item) => {
        if((item.product_cat).toLowerCase().match(state.search.toLowerCase())){
            return (item.product_cat).toLowerCase().match(state.search.toLowerCase());
        }
        if((item.product_merk).toLowerCase().match(state.search.toLowerCase())){
            return (item.product_merk).toLowerCase().match(state.search.toLowerCase());
        }
        if((item.product_name).toLowerCase().match(state.search.toLowerCase())){
            return (item.product_name).toLowerCase().match(state.search.toLowerCase());
        }
        // return item.product_cat.match(this.search);
    })
    }
  }
  ,
  mutations: {
    setProduct(state, product){
      state.product = product;
    },
    setCari(state,search){
      state.search = search;
    },
    setLogin(state,login){
      state.login = login;
    },
    addToCart(state, item){
      let productInCart = state.cart.find(product => {
        return product.id == item.id;
      });

      if(productInCart){
        productInCart.quantity+=1;
        return;
      }

      state.cart.push({
        ...item,
        quantity:1,
      })
      console.log(state.cart)
    },
    addQty(state,item){
      let productInCart = state.cart.find(product => {
        return product.id == item.id;
      });

      if(productInCart){
        productInCart.quantity+=1;
        return;
      }
    },
    minQty(state, item){
      let productInCart = state.cart.find(product => {
        return product.id == item.id;
      });

      if(productInCart.quantity<=1){
        state.cart = state.cart.filter((product)=> product.id !== item.id)
        return;
      }
      productInCart.quantity-=1;
    },
    // totalPrice(state, item){

    // }
  },
  actions: {
    addProductToCart({commit}, item){
      commit('addToCart', item);
    },
    addQty({commit}, item){
      commit('addQty',item)
    },
    minQty({commit}, item){
      commit('minQty',item)
    }
  },
  modules: {
  }
})

// export const addProductToCart= ({commit}, {product, quantity}) => {
//   commit('ADD_TO_CART',{product, quantity});
// }
