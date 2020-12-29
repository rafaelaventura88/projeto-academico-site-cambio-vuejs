<template>
  <b-container>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item v-on:click="enviarComprar"> Comprar </b-nav-item>

        <b-nav-item v-on:click="enviarMinhasCompras">Minhas compras</b-nav-item>
        <b-nav-item>
          <router-link to="/contato">Contato</router-link>
        </b-nav-item>
        <b-nav-item v-on:click="logout">Sair</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-row class="centralizar">
      <comprar-moeda v-if="this.menu == 1"></comprar-moeda>
      <minhas-compras
        v-if="this.menu == 0"
        
        :redirecionarCompras="this.enviarComprar"
      ></minhas-compras>
     
    </b-row>
  </b-container>
</template>

<script>
import ComprarMoeda from "../components/Comprar-Moeda";
import MinhasCompras from "../components/Minhas-Compras";


export default {
  components: {
    "comprar-moeda": ComprarMoeda,
    "minhas-compras": MinhasCompras,
  
  },
  data() {
    return {
      menu: true,
    };
  },
  methods: {
   
    enviarComprar() {
      this.menu = 1;
    },
 
    enviarMinhasCompras() {
      this.menu = 0;
    },

    logout() {
      this.$store.dispatch("deslogar");
      alert("Agracemos suas compras! Volte sempre!");
      this.$router.replace({
        name: "inicio",
      });
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
a {
  color: rgba(255, 255, 255, 0.5);
}
</style>