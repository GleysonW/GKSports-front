<template>

  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add Usuário</h4>
      </div>
      <div class="card-body">

        <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length >0">
          <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
            {{ error[0] }}
          </li>
        </ul>

        <div class="mb-3">
          <label for="">Nome</label>
          <input type="text" v-model="model.users.nome" class="form-control"/>
        </div>
        <div class="mb-3">
          <label for="">Senha</label>
          <input type="text" v-model="model.users.senha" class="form-control"/>
        </div>
        <div class="mb-3">
          <label for="">Cargo</label>
          <select v-model="model.users.role" class="form-select">
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
        </div>
        <div class="mb-3">
          <button type="button" @click="salvarUsuario" class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'usersRegistrar',
  data() {
    return {
      errorList: '',
      model: {
        users: {
          name: '',
          senha: '',
          role: '',
        }
      }
    }
  },
  methods: {

    salvarUsuario() {

      var mythis = this;
      axios.post('http://localhost:8080/usuario/', this.model.users)
        .then(res => {

          console.log(res.data)
          alert('Usuário registrado com sucesso!');
          this.model.users = {

            nome: '',
            senha: '',
            role: ''
          }
          this.errorList = '';
          this.$router.push({name: 'Usuários'});
        })
        .catch(function () {

          if (error.response) {

            if (error.response.status == 422) {

              mythis.errorList = error.response.data.errors;
            }
            //console.error(error.response.data);
            //console.error(error.response.status);
            //console.error(error.response.headers);
          } else if (error.request) {
            console.error(error.request);
          } else {
            console.error('Error', error.message);
          }

        });
    }

  }
}
</script>
