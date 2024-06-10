<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Editar Usuário</h4>
      </div>
      <div class="card-body">

        <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
          <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
            {{ error[0] }}
          </li>
        </ul>

        <div class="mb-3">
          <label for="nome">nome</label>
          <input type="text" v-model="model.camisa.nome" class="form-control"/>
        </div>
        <div class="mb-3">
          <label for="valor">valor</label>
          <input type="text" v-model="model.camisa.valor" class="form-control"/>
        </div>
        <div class="mb-3">
          <button type="button" @click="atualizarCamisa" class="btn btn-primary">Atualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'camisaEditar',
  data() {
    return {
      camisaId: '',
      errorList: {},
      model: {
        camisa: {
          nome: '',
          valor: '',
        }
      }
    };
  },
  mounted() {
    this.camisaId = this.$route.params.id;
    this.getcamisaData(this.camisaId);
  },
  methods: {
    getcamisaData(camisaId) {
      axios.get(`http://localhost:8080/camisa/${camisaId}`)
        .then(res => {
          this.model.camisa = res.data;
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            alert(error.response.data.message);
          } else {
            console.error('Erro ao obter dados da camisa:', error);
          }
        });
    },
    atualizarCamisa() {
      axios.put(`http://localhost:8080/camisa/${this.camisaId}`, this.model.camisa)
        .then(() => {
          alert('Camisa editada com sucesso!');
          this.errorList = {};
          this.$router.push({name: 'Roupa'});
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
    salvarCamisa() {
      axios.post(`http://localhost:8080/Camisa/`, this.model.camisa)
        .then(res => {
          alert(res.data.message);
          this.model.camisa = {
            nome: '',
            valor: '',
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
