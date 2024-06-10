<template>

    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Camisa</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length >0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="">Nome</label>
                    <input type="text" v-model="model.camisa.nome" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="">Valor</label>
                    <input type="text" v-model="model.camisa.valor" class="form-control"/>
                </div>
                <div class="mb-3">
                    <button type="button" @click="salvarCamisa"class="btn btn-primary">Salvar</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'camisaRegistrar',
    data(){
        return {
            errorList: '',
            model: {
                camisa: {
                    nome: '',
                    valor: '',                
                }
            }
        }
    },
    methods: {

        salvarCamisa(){

            var mythis = this;
            axios.post('http://localhost:8080/camisa/', this.model.camisa)
                .then(res => {

                    console.log(res.data)
                    alert('Camisa registrado com sucesso!');
                    this.model.camisa = {

                        nome: '',
                        valor: '',
                    }
                    this.errorList = '';
                    this.$router.push({name: 'Roupa'});
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