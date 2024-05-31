<template>

    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Editar Usuário</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length >0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="">Nome</label>
                    <input type="text" v-model="model.users.name" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" v-model="model.users.email" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="">Celular</label>
                    <input type="text" v-model="model.users.celular" class="form-control"/>
                </div>
                <div class="mb-3">
                    <button type="button" @click="atualizarUsuario"class="btn btn-primary">Atualizar</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'usersEditar',
    data(){
        return{
            usersId: '',
            errorList: '',
            model: {
                users: {
                    name: '',
                    email: '',
                    celular: ''
                }
            }
        }
    },
    mounted(){

        console.log(this.$route.params.id);
        this.usersId = this.$route.params.id;
        this.getUsersData(this.$route.params.id);
    },
    methods: {

        getUsersData(usersId){

            axios.get(`http://localhost:5500/api/${usersId}`)
                .then(res => {
                    console.log(res.data);

                    this.model.users = res.data
                })
                .catch(function () {

                    if (error.response) {

                        if(error.response.status == 404){

                            alert(error.response.data.message);
                        }
                    }
                });
        },

        atualizarUsuario(){

            var mythis = this;
            axios.put(`http://localhost:5500/api/${this.usersId}`, this.model.users)
                .then(res => {

                    console.log(res.data)
                    alert(res.data.message);

                    this.errorList = '';
                })
                .catch(function () {

                    if (error.response) {

                        if(error.response.status == 422){

                            mythis.errorList = error.response.data.errors;
                        }

                        if(error.response.status == 404){

                            alert(error.response.data.message);
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
        },

        salvarUsuario(){

            var mythis = this;
            axios.post('http://localhost:5500/api/', this.model.users)
                .then(res => {

                    console.log(res.data)
                    alert(res.data.message);
                    this.model.users = {
                        name: '',
                        email: '',
                        celular: ''
                    }
                    this.errorList = '';
                })
                .catch(function () {

                    if (error.response) {

                        if(error.response.status == 422){

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