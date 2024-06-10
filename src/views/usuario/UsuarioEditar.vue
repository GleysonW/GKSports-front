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
          <label for="nome">Nome</label>
          <input type="text" v-model="model.users.nome" class="form-control"/>
        </div>
        <div class="mb-3">
          <label for="senha">Senha</label>
          <input type="text" v-model="model.users.senha" class="form-control"/>
        </div>
        <div class="mb-3">
          <button type="button" @click="atualizarUsuario" class="btn btn-primary">Atualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'usersEditar',
  data() {
    return {
      usersId: '',
      errorList: {},
      model: {
        users: {
          nome: '',
          senha: '',
          role: '' // Adicionado campo 'role'
        }
      }
    };
  },
  mounted() {
    this.usersId = this.$route.params.id;
    this.getUsersData(this.usersId);
  },
  methods: {
    getUsersData(usersId) {
      axios.get(`http://localhost:8080/usuario/${usersId}`)
        .then(res => {
          let user = res.data;
          this.model.users = {
            nome: user.nome,
            senha: user.senha,
            role: user.role
          };
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            alert(error.response.data.message);
          } else {
            console.error('Erro ao obter dados do usuário:', error);
          }
        });
    },
    atualizarUsuario() {
      axios.put(`http://localhost:8080/usuario/${this.usersId}`, this.model.users)
        .then(() => {
          alert('Usuário editado com sucesso!');
          this.errorList = {};
          this.$router.push({ name: 'Usuários' });
        })
        .catch(error => {
          console.log(this.model.users);
          if (error.response && error.response.status === 422) {
            this.errorList = error.response.data.errors;
          } else if (error.response && error.response.status === 404) {
            alert(error.response.data.message);
          } else {
            console.error('Erro ao atualizar usuário:', error);
          }
        });
    },
  }
};
</script>
