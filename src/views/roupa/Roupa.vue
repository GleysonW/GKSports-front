<script>
import axios from 'axios';

export default {
  name: 'roupas',
  data() {
    return {
      camisa: []
    }
  },
  mounted() {
    this.getCamisa();
  },
  methods: {
    getCamisa() {
      axios.get('http://localhost:8080/camisa/')
        .then(res => {
          this.camisa = res.data;
          console.log(this.camisa);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },
    deletarCamisa(camisaId) {
      if (confirm('Você tem certeza que quer deletar essa camisa?')) {
        axios.delete(`http://localhost:8080/camisa/${camisaId}`)
          .then(() => {
            alert('Camisa deletado com sucesso!');
            this.getCamisa();
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 404) {
                alert(error.response.data.message);
              } else {
                alert("Ocorreu um erro ao tentar deletar a camisa.");
              }
            }
          });
      }
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Roupas
          <RouterLink to="/roupa/registrar" class="btn btn-primary float-end">
            Add Roupa
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
          </thead>
          <tbody v-if="camisa.length > 0">
          <tr v-for="(camisa, index) in camisa" :key="index">
            <td>{{ camisa.id }}</td>
            <td>{{ camisa.nome }}</td>
            <td>{{ camisa.valor }}</td>
            <td>
              <RouterLink :to="{ path: '/roupa/'+camisa.id+'/editar' }" class="btn btn-success">
                Editar
              </RouterLink>
              <button type="button" @click="deletarCamisa(camisa.id)" class="btn btn-danger">
                Deletar
              </button>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="6">Loading...</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>