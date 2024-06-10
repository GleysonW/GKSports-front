<script>
import axios from 'axios';

export default {
  name: 'tecido',
  data() {
    return {
      tecido: []
    }
  },
  mounted() {
    this.getTecido();
  },
  methods: {
    getTecido() {
      axios.get('http://localhost:8080/tecido/')
        .then(res => {
          this.tecido = res.data;
          console.log(this.tecido);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },
    deletarTecido(tecidoId) {
      if (confirm('Você tem certeza que quer deletar esse usuário?')) {
        axios.delete(`http://localhost:8080/tecido/${tecidoId}`)
          .then(() => {
            alert('Tecido deletado com sucesso!');
            this.getTecido();
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 404) {
                alert(error.response.data.message);
              } else {
                alert("Ocorreu um erro ao tentar deletar o tecido.");
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
          Tecido
          <RouterLink to="/tecido/registrar" class="btn btn-primary float-end">
            Add Tecido
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
          <tbody v-if="tecido.length > 0">
          <tr v-for="(tecido, index) in tecido" :key="index">
            <td>{{ tecido.id }}</td>
            <td>{{ tecido.nome }}</td>
            <td>{{ tecido.valor }}</td>
            <td>
              <RouterLink :to="{ path: '/tecido/'+tecido.id+'/editar' }" class="btn btn-success">
                Editar
              </RouterLink>
              <button type="button" @click="deletarTecido(tecido.id)" class="btn btn-danger">
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