<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Criar Orçamento</h4>
      </div>
      <div class="card-body">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link" :class="{ active: activeTab === 'servico' }" @click="activeTab = 'servico'" type="button" role="tab" aria-selected="true">Serviço</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" :class="{ active: activeTab === 'personalizacao' }" @click="activeTab = 'personalizacao'" type="button" role="tab" aria-selected="false">Personalização</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" :class="{ active: activeTab === 'resumo' }" @click="activeTab = 'resumo'" type="button" role="tab" aria-selected="false">Resumo</button>
          </li>
        </ul>
        <div class="input-container" v-if="activeTab === 'servico'">
          <label for="nome-orcamento">Nome do Orçamento:</label>
          <input type="text" class="form-control" v-model="nomeOrcamento" id="nome-orcamento">
        </div>
        <div class="tab-content">
          <div class="tab-pane fade" :class="{ 'show active': activeTab === 'servico' }" role="tabpanel">
            <form @submit.prevent="adicionarServico">
              <div class="input-container">
                <label for="servico">Selecione o serviço:</label>
                <select class="form-control" v-model="servicoSelecionado">
                  <option v-for="(preco, servico) in precos" :key="servico" :value="servico">
                    {{ servico }}
                  </option>
                </select>
              </div>
              <div class="input-container">
                <label for="tamanho">Tamanho:</label>
                <select class="form-control"v-model="tamanhoSelecionado">
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                </select>
              </div>
              <div class="input-container">
                <label for="tecido">Escolha o tipo de tecido:</label>
                <select class="form-control" v-model="tecidoSelecionado">
                  <option v-for="tecido in tecidos" :key="tecido.texto" :value="tecido.valor">
                    {{ tecido.texto }}
                  </option>
                </select>
              </div>
              <div class="input-container">
                <label for="quantidade">Quantidade:</label>
                <input type="number" class="form-control" v-model="quantidade" min="1">
              </div>
              <div class="input-container">
                <button type="submit" class="btn btn-primary"
                >Adicionar Serviço
                </button>
                <p v-if="mensagemSucesso" class="texto-successo">{{ mensagemSucesso }}</p>
                <p v-if="mensagemErro" class="texto-erro">{{ mensagemErro }}</p>
              </div>
            </form>
          </div>
          <div class="tab-pane fade" :class="{ 'show active': activeTab === 'personalizacao' }" role="tabpanel">
            <div class="personalizacao-container">
              <button @click="adicionarCampoPersonalizacao" type="button" id="botao-personalizacao" class="btn btn-primary">+</button>
              <h5>Clique no "+" para adicionar um campo de personalização</h5>
              <button @click="removerCampoPersonalizacao(index)" type="button" id="botao-personalizacao" class="btn btn-primary">-</button>
              <h5>Clique no "-" para remover um campo de personalização</h5>
            </div>
            <div v-for="(personalizacao, index) in personalizacoes" :key="index">
              <div class="personalizacao-container">
                <label>Nome na Camisa:</label>
                <input type="text" class="form-control" v-model="personalizacao.nome">
                <label>Número da Camisa:</label>
                <input type="text" class="form-control" v-model="personalizacao.numeroCamisa">
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="resumo" :class="{ 'show active': activeTab === 'resumo' }" role="tabpanel">
            <div class="servicos-selecionados">
              <h3>Nome do Orçamento:</h3>
              <h5>{{ nomeOrcamento }}</h5>
              <h3>Serviços Selecionados:</h3>
              <ul>
                <li v-for="(servico, index) in servicosSelecionados" :key="index">
                  {{ servico.texto }} - Tecido: {{ servico.tecido }} - Tamanho: {{ servico.tamanho }} - Quantidade: {{ servico.quantidade }} - {{ servico.personalizadas ? 'Personalizadas: Sim, Quantidade: ' + servico.quantidadeCamisasPersonalizadas : 'Personalizadas: Não' }} - Preço Serviço: R${{ (servico.valor * servico.quantidade).toFixed(2) }}
                  <button @click="removerServico(index)" type="button" class="btn btn-primary">Remover</button>
                </li>
              </ul>
              <div v-if="personalizacoes.length > 0">
                <h3>Personalizações:</h3>
                <ul>
                  <li v-for="(personalizacao, index) in personalizacoes" :key="index">
                    Nome: {{ personalizacao.nome }}, Número da Camisa: {{ personalizacao.numeroCamisa }}
                  </li>
                </ul>
              </div>
              <div>
                <h3>Subtotal (Sem Desconto):</h3>
                <p>{{ subtotalFormatado }}</p>
              </div>
              <div>
                <h3>Total (Com Desconto):</h3>
                <p>{{ totalFormatado }}</p>
              </div>
              <div class="input-container">
                <label for="desconto">Desconto:</label>
                <input type="text" class="form-control" v-model="desconto">
              </div>
              <div>
                <button class="btn btn-primary" @click="gerarPDF">Gerar PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "FormOrcamento",

  data() {
    return {
      nomeOrcamento: '',
      activeTab: 'servico',
      precos: {
        Camisa: {
          normal: 60,
          bom: 70,
          otimo: 80
        },
        Camisa_Personalizada: {
          normal: 70,
          bom: 80,
          otimo: 90
        },
        Short: {
          normal: 50,
          bom: 60,
          otimo: 70
        },
        Abada: {
          normal: 55,
          bom: 65,
          otimo: 75
        },
        Conjunto: {
          normal: 100,
          bom: 120,
          otimo: 140
        }
      },
      tecidos: [
        { texto: 'Normal', valor: 'normal' },
        { texto: 'Bom', valor: 'bom' },
        { texto: 'Ótimo', valor: 'otimo' }
      ],
      servicoSelecionado: 'Camisa',
      quantidade: 1,
      servicosSelecionados: [],
      total: 0,
      tecidoSelecionado: 'normal',
      tamanhoSelecionado: 'P',
      desconto: 0,
      personalizacoes: [],
      mensagemSucesso: '',
      mensagemErro: ''
    };
  },
  computed: {
    subtotalFormatado() {
      return 'R$' + this.total.toFixed(2).replace('.', ',');
    },
    totalFormatado() {
      return 'R$' + (this.total - this.desconto).toFixed(2).replace('.', ',');
    }
  },
  methods: {
    adicionarServico() {
      const preco = this.precos[this.servicoSelecionado][this.tecidoSelecionado];
      const precoTotal = preco * this.quantidade;
      this.servicosSelecionados.push({
        texto: this.servicoSelecionado,
        tecido: this.tecidoSelecionado,
        tamanho: this.tamanhoSelecionado,
        quantidade: this.quantidade,
        valor: preco 
      });
      this.total += precoTotal;
      this.mensagemSucesso = 'Serviço adicionado com sucesso.';
      this.mensagemErro = '';
      setTimeout(() => {
        this.mensagemSucesso = '';
      }, 1000);
    },
    adicionarCampoPersonalizacao() {
      this.personalizacoes.push({ nome: '', numeroCamisa: '' });
    },
    removerCampoPersonalizacao(index) {
      this.personalizacoes.splice(index, 1);
    },
    removerServico(index) {
      const servicoRemovido = this.servicosSelecionados[index];
      this.total -= servicoRemovido.valor * servicoRemovido.quantidade;
      this.servicosSelecionados.splice(index, 1);
    },
  }
};
</script>

<style scoped>

.input-container{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 7px;
  margin-top: 7px;
  color: 222;
  padding: 5px 10px;
  border-left: 4px solid #0B5ED7;
}

input, select {
  padding: 5px 10px;
  width: 300px;
}

#submit {
  background-color: black;
}

button:hover {
  background-color: transparent;
  color: #222;
}
  
.servicos-selecionados {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

.personalizacao-container {
  flex-direction: row;
  display: flex;
}

.personalizacao-container h5 {
  font-size: 15px;
  margin-top: 18px;
  margin-left: 5px;
  margin-right: 30px;
}

#botao-personalizacao {
  margin-top: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.personalizacao-container input {
  width: 100px;
  height: 30px;
  margin-right: 5px;
  margin-top: 10px;
  align-items: center;
  text-align: center;
}

.texto-successo {
  color: #fff;
  background-color: #0B5ED7;
  border: 1px solid #222;
  align-content: center;
  text-align: center;
  margin-top: 30px;
  height: 50px;
}

</style>