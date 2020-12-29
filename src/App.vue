<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  //não permite que eu digite path diferente na url, pois ao dar enter estou dando F5 na página
  //e ao atualizardei o comando de montar sempre o path inicio
  mounted() {
    this.$router.replace({ name: "inicio" });
  },
};
</script>

<style>
</style>