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
                            <th>Email</th>
                            <th>Celular</th>
                            <th>Ação:</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.users.length > 0">
                        <tr v-for="(users, index) in this.users" :key="index">
                            <td>{{ users.id }}</td>
                            <td>{{ users.name }}</td>
                            <td>{{ users.email }}</td>
                            <td>{{ users.celular }}</td>
                            <td>
                                <RouterLink :to="{ path: '/usuario/'+users.id+'/editar' }" class="btn btn-success">
                                Editar
                                </RouterLink>
                                <button type="button" @click="deletarUsuario(users.id)" class="btn btn-danger">
                                Deletar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else="this.users.length > 0">
                        <tr>
                            <td colspan="7">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    name: 'users',
    data(){
        return{
            users: []

        }
    },
    mounted(){

        this.getUsers();
        //console.log('i am here')
        
    },
    methods: {
        getUsers(){

            axios.get('http://localhost:5500/api')
                .then(res => {
                    this.users =res.data.users
                    console.log(this.users)
                });
        },

        deletarUsuario(usersId){

            if(confirm('Você tem certeza que quer deletar esse usuário?')){

                //console.log(usersId)
                axios.delete(`http://localhost:5500/api/${usersId}`)
                    .then(res => {
                        alert('Usuário deletado com sucesso!');
                        this.getUsers();
                    })
                    .catch(function () {

                    if (error.response) {

                        if(error.response.status == 404){

                            alert(error.response.data.message);
                        }
                    }
                });
            }
        },
    },
}
</script>