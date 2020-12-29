<template>
  <b-row>
    <h2 class="container">{{ titulo }}</h2>
    <form class="container" @submit.prevent="metodoSelecionado">
      <input v-model="email" type="text" placeholder="Digite seu email" />
      <input v-model="senha" type="password" placeholder="Digite sua senha" />
      <button>{{ titulo }}</button>
    </form>
  </b-row>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return { email: "", senha: "" };
  },
  props: ["titulo", "metodo"],
  methods: {
    async logar() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.senha)
        .then(() => {
          this.$router.replace({ name: "compras" });
      
          this.$store.dispatch("consultarApi");
        })
        .catch((erro) => {
          alert(erro);
        });
    },
    async registrar() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.senha)
        .then(() => {
          alert("Registrado com sucesso!");
        })
        .catch((erro) => {
          alert(erro);
        });
    },
    metodoSelecionado() {
      if (this.metodo == "login") {
        this.logar();
      } else if (this.metodo == "registro") {
        this.registrar();
      } else {
        alert("Erro!");
      }
    },
  },
};
</script>

<style scoped>
</style>