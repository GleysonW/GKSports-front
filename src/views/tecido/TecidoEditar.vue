<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Editar Tecido</h4>
      </div>
      <div class="card-body">

        <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
          <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
            {{ error[0] }}
          </li>
        </ul>

        <div class="mb-3">
          <label for="nome">nome</label>
          <input type="text" v-model="model.tecido.nome" class="form-control"/>
        </div>
        <div class="mb-3">
          <label for="valor">valor</label>
          <input type="text" v-model="model.tecido.valor" class="form-control"/>
        </div>
        <div class="mb-3">
          <button type="button" @click="atualizarTecido" class="btn btn-primary">Atualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'tecidoEditar',
  data() {
    return {
      tecidoId: '',
      errorList: {},
      model: {
        tecido: {
          nome: '',
          valor: '',
        }
      }
    };
  },
  mounted() {
    this.tecidoId = this.$route.params.id;
    this.gettecidoData(this.tecidoId);
  },
  methods: {
    gettecidoData(tecidoId) {
      axios.get(`http://localhost:8080/tecido/${tecidoId}`)
        .then(res => {
          this.model.tecido = res.data;
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            alert(error.response.data.message);
          } else {
            console.error('Erro ao obter dados da camisa:', error);
          }
        });
    },
    atualizarTecido() {
      axios.put(`http://localhost:8080/tecido/${this.tecidoId}`, this.model.tecido)
        .then(() => {
          alert('Camisa editada com sucesso!');
          this.errorList = {};
          this.$router.push({name: 'Tecido'});
        })
        .catch(error => {
          console.log();
          if (error.response && error.response.status === 422) {
            this.errorList = error.response.data.errors;
          } else if (error.response && error.response.status === 404) {
            alert(error.response.data.message);
          } else {
            console.error('Erro ao atualizar usuário:', error);
          }
        });
    },
    salvarTecido() {
      axios.post(`http://localhost:8080/Tecido/`, this.model.tecido)
        .then(res => {
          alert(res.data.message);
          this.model.tecido = {
            nome: '',
            valor: ''
          };
          this.errorList = {};
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            this.errorList = error.response.data.errors;
          } else {
            console.error('Erro ao salvar usuário:', error);
          }
        });
    }
  }
};
</script>
