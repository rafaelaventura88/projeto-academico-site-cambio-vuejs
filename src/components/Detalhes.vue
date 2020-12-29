<template>
  <b-container>
    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="dark">
        <h2>Detalhes da compra</h2>
        <b-tr>
          <b-th>Moeda comprada</b-th>
          <b-th>Quantidade comprada</b-th>
          <b-th>Valor do Dólar para essa compra</b-th>
          <b-th>Valor pago</b-th>
          <b-th>Avaliação</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td>{{ moedaComprada }}</b-td>
          <b-td>{{ this.$store.getters.qtdCompra }}</b-td>
          <b-td>{{ this.$store.getters.valorDollarCompra }}</b-td>
          <b-td>{{ this.$store.getters.valorTotalCompra }}</b-td>
          <b-td>{{ this.$store.getters.avaliacaoCompra }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-button @click="voltar">Voltar</b-button>
  </b-container>
</template>

<script>
export default {
  mounted() {
    this.setMoedaComprada();
  },
  data() {
    return {
      moedaComprada: "",
    };
  },
  methods: {
    voltar() {
      this.$router.replace({
        name: "compras",
      });
    },
    setMoedaComprada() {
      if (this.$store.getters.tipoCompra == "A") {
        this.moedaComprada = "Dólar";
      }
      if (this.$store.getters.tipoCompra == "B") {
        this.moedaComprada = "Real";
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-decoration: underline;
  margin-bottom: 40px;
}
</style>