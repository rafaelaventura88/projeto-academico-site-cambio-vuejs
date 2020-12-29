<template>
  <div @submit.prevent="comprarDollar">
    <form>
      <label><strong>Quantidade: </strong></label>
      <input v-model="qtd" type="number" />

      <b-form-group label="Selecione a moeda desejada:">
        <b-form-radio v-model="selected" name="some-radios" value="A"
          >Dólar</b-form-radio
        >
        <b-form-radio v-model="selected" name="some-radios" value="B"
          >Real</b-form-radio
        >
      </b-form-group>
      <p>
        <strong>Valor do Dólar agora:</strong> $
        {{ this.$store.getters.valorDollar }}
      </p>
      <p>O que você achou dessa compra?</p>
      <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="Deixe aqui sua avaliação"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-button variant="success" type="submit">Comprar</b-button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
require("firebase/firestore");

export default {
  
  data() {
    return {
      qtd: 0,
      selected: "",
      text: "",
    };
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    gerarNFe() {
      var nota = "";
      for (var i = 0; i < 11; i++) {
        var aleatorio = this.getRandomInt(0, 9);
        if (i == 3 || i == 7) {
          nota += ".";
        } else {
          nota += aleatorio;
        }
      }
      return nota;
    },
    comprarDollar() {
      var tipo = this.selected;
      var qtd = this.qtd;

      //estou vendo se não é um número
      if (isNaN(qtd)) {
        alert("Digite um número válido!");
        this.qtd = 100;
        return;
      }
      if (qtd < 100) {
        alert("Compra mínima $100!");
        this.qtd = 100;
        return;
      }
   
      var email = firebase.auth().currentUser.email;
      var valorDollar = this.$store.getters.valorDollar;
      var valorTotal;

      if (tipo == "A") {
        valorTotal = qtd * valorDollar;
      } else if (tipo == "B") {
        valorTotal = qtd / valorDollar;
      } else {
        alert("Selecione pelo menos uma opção.");
        return;
      }

      var date = new Date();
      var data = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      var nota = this.gerarNFe();
      var avaliacao = this.text;
      if (!avaliacao.length) {
        alert("Digite sua avaliação");
        return;
      }
      firebase
        .firestore()
        .collection("compras")
        .add({
          email: email,
          qtd: qtd,
          valorDollar: valorDollar,
          valorTotal: valorTotal,
          data: data,
          nota: nota,
          avaliacao: avaliacao,
          tipo: this.selected,
        })
        
        .then(function (documento) {
          firebase.firestore().collection("compras").doc(documento.id).update({
            id: documento.id,
          });

          var msg = "Compra feita com sucesso. Total ";
          if (tipo == "A") {
            msg += "R$ ";
          }
          if (tipo == "B") {
            msg += "$ ";
          }
          msg += valorTotal;
          alert(msg);
        })

        .catch(function (erro) {
          console.log(erro);
        });
    },
  },
};
</script>

<style>
</style>