import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    valorDollar : 0,
    valorTotalCompra: 0,
    qtdCompra: 0,
    valorDollarCompra: 0,
    avaliacaoCompra:'',
    tipoCompra:'',
    logado: false

  },
  actions:{
    
    deslogar(context){//commit chama método da mutations

      context.commit("deslogar")
    },
    setDetalhes({commit},compra){
      console.log(compra)
      commit("setDetalhes",compra)
    }, 
    consultarApi(context){

      context.commit("consultarApi")
    },
    
  },
  mutations: {
    consultarApi: async(state)=>{
      //await espera o retorno da promisse(resposta)
      await axios.get("https://api.exchangeratesapi.io/latest?base=USD").then((resposta)=>{
        state.valorDollar = resposta.data.rates.BRL
       state.logado = true
      })  
    },
   
    setDetalhes:(state, data)=> {
   
      state.valorTotalCompra = data.valorTotal
      state.valorDollarCompra = data.valorDollar
      state.qtdCompra = data.qtd
      state.avaliacaoCompra = data.avaliacao
      state.tipoCompra = data.tipo
    },
    deslogar:(state)=>{
      state.logado = false
    },
  },

  getters: {
    valorDollar(state){
      return state.valorDollar
    },
    
    valorTotalCompra(state){
      return state.valorTotalCompra
    },
    qtdCompra(state){
      return state.qtdCompra
    },
    valorDollarCompra(state){
      return state.valorDollarCompra
    },
    avaliacaoCompra(state){
      return state.avaliacaoCompra
    },
    tipoCompra(state){
      return state.tipoCompra
    },
    logado(state){
      return state.logado
    }
  },
  
  
})
