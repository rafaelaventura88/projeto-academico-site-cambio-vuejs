<template>
  <b-container>
    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Data</b-th>
          <b-th>NF-e</b-th>
          <b-th>Atualizar</b-th>
          <b-th>Excluir</b-th>
          <b-th>Detalhes</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr :key="i" v-for="(compra, i) in this.listaCompras">
          <b-td>{{ compra.data }}</b-td>
          <b-td>{{ compra.nota }}</b-td>

          <b-td>
            <a href="#" v-on:click="update(compra.id)"
              ><b-icon-upload variant="dark"> </b-icon-upload>
            </a>
          </b-td>
          <b-td>
            <a href="#" v-on:click="deletarCompra(compra.id)"
              ><b-icon icon="x" variant="danger"> </b-icon>
            </a>
          </b-td>
          <b-td>
            <a href="#" v-on:click="exibirCompra(compra)"
              ><b-icon icon="info-circle" variant="dark"> </b-icon>
            </a>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
import firebase from "firebase";
require("firebase/firestore");

export default {
  mounted() {
    this.consultarCompras();
  },
  data() {
    return {
      listaCompras: [], //essa lista é referente ao email do usuário logado
    };
  },
  methods: {
    //ícone de detalhes
    exibirCompra(compra) {
      this.$store.dispatch("setDetalhes", compra); //dispatch chama método da actions (na store)
      this.$router.replace({
        name: "detalhes",
      });
    },
    consultarCompras() {
      var listaCompras_tmp = [];
      firebase
        .firestore()
        .collection("compras")
        .where("email", "==", firebase.auth().currentUser.email)
        .get()
        //querySnapShot percorro um array de documentos e transformo ele em um array de objetos
        .then(function (querySnapShot) {
          querySnapShot.forEach(function (documento) {
            //esse array serve para montar a primeira tabela = minhasCompras. Através do que vem do firebase.
            listaCompras_tmp.push({
              id: documento.data().id,
              qtd: documento.data().qtd,
              valorDollar: documento.data().valorDollar,
              valorTotal: documento.data().valorTotal,
              data: documento.data().data,
              nota: documento.data().nota,
              avaliacao: documento.data().avaliacao,
              tipo: documento.data().tipo,
            });
          });
        })
        .catch(function (erro) {
          console.log(erro);
        });
      this.listaCompras = listaCompras_tmp;
    },
    deletarCompra(id) {
      var listaCompra_tmp = this.listaCompras;
      firebase
        .firestore()
        .collection("compras")
        .doc(id)
        .delete() // deletando do firebase
        .then(function () {
          alert("Compra deletada com sucesso!");
          for (var i = 0; i < listaCompra_tmp.length; i++) {
            if (listaCompra_tmp[i].id == id) {
              listaCompra_tmp.splice(i, 1); //splice para remover da lista_tmp_da_interface
            }
          }
        })
        .catch(function (erro) {
          console.log(erro);
        });
      this.listaCompras = listaCompra_tmp;
    },
    update(id) {
      var novaAvaliacao = prompt("Digite a nova avaliacao:");
     if (!novaAvaliacao.length) {
        alert("Digite sua nova avaliação!");
     
        return;
      }
      firebase
        .firestore()
        .collection("compras")
        .doc(id)
        .update({
         avaliacao : novaAvaliacao
        });
      this.redirecionarCompras(); //para comprar mais
    },
  },
  props: ["redirecionarCompras"],
};
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>