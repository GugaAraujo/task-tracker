<template>
  <div class="graficos">
    <h1 class="title">Relatórios</h1>
    <div
      class="
        columns
        is-mobile
        has-text-centered has-text-weight-bold
        is-justify-content-space-evenly
      "
    >
      <div class="column is-2 card card-info">
        <p>
          <i class="fas fa-tasks is-hidden-touch"></i>
          Tarefas
        </p>
        {{ tarefas?.length }}
      </div>
      <div class="column is-2 card card-info">
        <p>
          <i class="far fa-folder-open is-hidden-touch"></i>
          Projetos
        </p>
        {{ projetos?.length }}
      </div>
      <div class="column is-3 card card-info">
        <p>
          <i class="far fa-clock is-hidden-touch"></i>
          Total
        </p>
        {{ formataHora(horasTotaisTarefas) }}
      </div>
      <div class="column is-3 card card-info is-hidden-touch">
        <p>
          <i class="fa-solid fa-arrow-trend-up"></i>
          {{ taskMaisDemorada?.descricao }}
        </p>
        <p>
          {{
            taskMaisDemorada?.duracaoEmSegundos
              ? formataHora(taskMaisDemorada.duracaoEmSegundos)
              : ""
          }}
        </p>
      </div>
    </div>
    <div v-if="contagemDeProjetos" class="card card-grafico is-hidden-desktop">
      <Pizza
        :dados="contagemDeProjetos"
        titulo="Projeto por tipo"
        propriedade="nomeProjeto"
        valor="quantidade"
        :isMobile=true
        divName="projeto-por-tipo"
      />
    </div>
    <div v-if="contagemDeProjetos" class="card card-grafico is-hidden-touch">
      <Pizza
      :dados="contagemDeProjetos"
        titulo="Projeto por tipo"
        propriedade="nomeProjeto"
        valor="quantidade"
        divName="projeto-por-tipo"
      />
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../store";
import Pizza from "@/components/graficos/Pizza.vue";
import { OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";

export default defineComponent({
  name: "Graficos",
  data() {
    return {
      tarefas: null,
      projetos: null,
      horasTotaisTarefas: 0,
      taskMaisDemorada: null,
      contagemDeProjetos: null,
    };
  },
  components: {
    Pizza,
  },
  computed: {
    horasTotaisTarefasFormatada(): string {
      return new Date(this.horasTotaisTarefas * 1000)
        .toISOString()
        .substr(11, 8);
    },
  },
  methods: {
    formataHora(data: number): string {
      return new Date(data * 1000).toISOString().substr(11, 8);
    },
    obtemProjetos() {
      let projetos = [];
      return fetch(`https://fakeapi-service.herokuapp.com/projetos`)
        .then((data) => data.json())
        .then((data) => {
          this.projetos = data;
          data.map((projeto) => {
            projetos.push({ nomeProjeto: projeto.nome, quantidade: 0 });
          });
          return projetos;
        });
    },
    obtemTarefas() {
      return fetch(`https://fakeapi-service.herokuapp.com/tarefas`)
        .then((data) => data.json())
        .then((data) => (this.tarefas = data));
    },
    contabilizaProjetos() {
      return this.obtemProjetos().then((dataProjeto) => {
        return this.obtemTarefas().then((data) => {
          return data.map((tarefa) => {
            return dataProjeto.map((projeto) => {
              if (tarefa.projeto.nome == projeto.nomeProjeto) {
                projeto.quantidade++;
              }
              return projeto;
            });
          });
        });
      });
    },
    somaDeHoras() {
      let maiorTempo = 0;

      return this.tarefas.map((tarefa) => {
        if (tarefa.duracaoEmSegundos > maiorTempo) {
          maiorTempo = tarefa.duracaoEmSegundos;
          this.taskMaisDemorada = tarefa;
        }

        return (this.horasTotaisTarefas += tarefa.duracaoEmSegundos);
      });
    },
  },
  mounted() {
    this.contabilizaProjetos().then((projetos) => {
      this.contagemDeProjetos = projetos.reverse()[0];
      this.somaDeHoras();
    });
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    return {
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
.graficos {
  padding: 1.25rem;

  i {
    color: rgb(193, 189, 189);
  }

  .card {
    border-radius: 15px;
    margin: 20px auto;
  }

  .subtitle {
    margin-bottom: 25px;
  }

  .card-grafico {
    padding: 40px 10px;
    min-height: 280px;
  }
}

@media only screen and (max-width: 768px) {
  .card-info {
    width: 100px !important;
  }
}
</style>
