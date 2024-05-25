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
                            <th>Criado em</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.usuarios.length > 0">
                        <tr v-for="(usuarios, index) in this.usuarios" :key="index">
                            <td>{{ usuarios.id }}</td>
                            <td>{{ usuarios.name }}</td>
                            <td>{{ usuarios.email }}</td>
                            <td>{{ usuarios.celular }}</td>
                            <td>{{ usuarios.criado_em }}</td>
                            <td>
                                <RouterLink :to="{ path: '/usuario'+usuarios.id+'/editar' }" class="btn btn-sucess">
                                Editar
                                </RouterLink>
                                <button type="button" @click="deletarUsuario(usuarios.id)" class="btn btn-danger">
                                Deletar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else="this.usuarios.length > 0">
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
    name: 'usuarios',
    data(){
        return{
            usuarios: []
        }
    },
    mounted(){

        this.getUsuarios();
        //console.log('i am here')
        
    },
    methods: {
        getUsuarios(){

            axios.get('').then(res => {
                this.usuarios =res.data.usuarios
                console.log(this.usuarios)
            });
        },

        deletarUsuario(usuariosId){

            if(confirm('Você tem certeza que quer deletar esse usuário?')){

                //console.log(usuariosId)
                axios.delete(`http://localhost:8000/api/usuarios/${this.usuariosId}/delete}`)
                    .then(res => {
                        alert(res.data.message);
                        this.getUsuarios();
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