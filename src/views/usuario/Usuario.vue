<script>
import axios from 'axios';

export default {
  name: 'users',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get('http://localhost:8080/usuario/')
        .then(res => {
          this.users = res.data;
          console.log(this.users);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },
    deletarUsuario(usersId) {
      if (confirm('Você tem certeza que quer deletar esse usuário?')) {
        axios.delete("http://localhost:5500/api/${usersId}")
          .then(() => {
            alert('Usuário deletado com sucesso!');
            this.getUsers();
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 404) {
                alert(error.response.data.message);
              } else {
                alert("Ocorreu um erro ao tentar deletar o usuário.");
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
          Usuários
          <RouterLink to="/usuario/registrar" class="btn btn-primary float-end">
            Add Usuários
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Username</th>
            <th>Role</th>
            <th>Enabled</th>
            <th>Ações</th>
          </tr>
          </thead>
          <tbody v-if="users.length > 0">
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.id }}</td>
            <td>{{ user.nome }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.enabled }}</td>
            <td>
              <RouterLink :to="{ path: '/usuario/'+user.id+'/editar' }" class="btn btn-success">
                Editar
              </RouterLink>
              <button type="button" @click="deletarUsuario(user.id)" class="btn btn-danger">
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