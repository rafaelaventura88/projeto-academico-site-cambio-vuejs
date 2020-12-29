
<template>
  <b-container>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item v-on:click="enviarLogin"> Entrar </b-nav-item>
        <b-nav-item v-on:click="enviarRegistro"> Registrar </b-nav-item>
        <b-nav-item>
          <router-link to="/contato">Contato</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-row class="centralizar">
      <h1>Câmbio de Dólar & Real</h1>

      <login v-if="this.menu == 0" :titulo="'Entrar'" :metodo="'login'"></login>
      <registro
        v-if="this.menu == 1"
        :titulo="'Registrar'"
        :metodo="'registro'"
      ></registro>
    </b-row>
  </b-container>
</template>

<script>
import FormInicio from "../components/Form-Inicio.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  components: {
    registro: FormInicio,
    login: FormInicio,
  },
  data() {
    return {
      menu: 0,
    };
  },
  methods: {
    enviarLogin() {
      this.menu = 0;
    },
    enviarRegistro() {
      this.menu = 1;
    },
  },
};
</script>

<style scoped>
.centralizar {
  display: block;
  text-align: center;
  margin-top: 50px;
}
h1 {
  text-decoration: underline;
}
a {
  color: rgba(255, 255, 255, 0.5);
}
</style>