<template>
  <div class="graficos">
    <div
      class="
        columns
        is-mobile
        has-text-centered has-text-weight-bold
        is-justify-content-space-evenly
      "
    >
      <div class="column is-2 card card-info">
        <div class="rows">
          <div class="row">
            <div class="columns">
              <div class="column is-12 card-info-title">
                <p>
                  <i class="fas fa-tasks is-hidden-touch"></i>
                  Tarefas
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="columns">
              <div class="column is-12 card-info-body">
                <span class="unidades">
                  {{ tarefas?.length }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-2 card card-info">
        <div class="rows">
          <div class="row">
            <div class="columns">
              <div class="column is-12 card-info-title">
                <p>
                  <i class="far fa-folder-open is-hidden-touch"></i>
                  Projetos
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="columns">
              <div class="column is-12 card-info-body">
                <span class="unidades">
                  {{ projetos?.length }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-3 card card-info">
        <div class="rows">
          <div class="row">
            <div class="columns">
              <div class="column is-12 card-info-title">
                <p>
                  <i class="far fa-clock is-hidden-touch"></i>
                  Total
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="columns">
              <div class="column is-12 card-info-body">
                <span class="soma-horas">
                  {{ formataHora(horasTotaisTarefas) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-3 card card-info is-hidden-touch">
        <div class="rows">
          <div class="row">
            <div class="columns">
              <div class="column is-12 card-info-title">
                <p>
                  <i class="fa-solid fa-arrow-trend-up"></i>
                  Mais demorada
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="columns">
              <div class="column is-12 card-info-body">
                <div class="row">
                  <div class="row">
                    <span class="maior-demanda">
                      {{ taskMaisDemorada?.descricao }}
                    </span>
                  </div>
                  <div class="row">
                    <p>
                      {{
                        taskMaisDemorada?.duracaoEmSegundos
                          ? formataHora(taskMaisDemorada.duracaoEmSegundos)
                          : ""
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column card card-grafico is-hidden-desktop">
      <div class="rows">
        <div class="row">
          <div class="columns">
            <div class="column card-chart-title">
              <p>Projeto por Tipo</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="columns">
            <div v-if="contagemDeProjetos" class="column">
              <Pizza
                :dados="contagemDeProjetos"
                propriedade="nomeProjeto"
                valor="quantidade"
                :isMobile="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column card card-grafico is-hidden-desktop">
      <div class="rows">
        <div class="row">
          <div class="columns">
            <div class="column card-chart-title">
              <p>Tarefas por Tempo</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="columns">
            <div v-if="contagemDeProjetos" class="column">
              <BulletChart
                :dados="tarefas"
                propriedade="descricao"
                valor="duracaoEmSegundos"
                divName="projeto-por-tipo"
                :isTime="true"
                :isMobile="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column card card-grafico is-hidden-touch">
      <div class="rows">
        <div class="row">
          <div class="columns">
            <div class="column card-chart-title">
              <p>Projeto por Tipo</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="columns">
            <div v-if="contagemDeProjetos" class="column">
              <Pizza
                :dados="contagemDeProjetos"
                propriedade="nomeProjeto"
                valor="quantidade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column card card-grafico is-hidden-touch">
      <div class="rows">
        <div class="row">
          <div class="columns">
            <div class="column card-chart-title">
              <p>Tarefas por Tempo</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="columns">
            <div v-if="contagemDeProjetos" class="column">
              <BulletChart
                :dados="tarefas"
                propriedade="descricao"
                valor="duracaoEmSegundos"
                divName="projeto-por-tipo"
                :isTime="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../store";
import Pizza from "@/components/graficos/Pizza.vue";
import BulletChart from "@/components/graficos/BulletChart.vue";
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
    BulletChart,
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

  .card {
    border-radius: 15px;
    margin: 20px auto;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 25%),
      0 0 0 1px rgb(10 10 10 / 2%);
  }

  .card-info {
    height: 100px;

    .card-info-title {
      padding: 8px;
      font-size: 15px;
      width: 100%;
      background-image: linear-gradient(95deg, #285d90, #4072a1);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      color: #fff;

      i {
        color: rgb(238, 238, 238);
        position: absolute;
        left: 15px;
        top: 13px;
        font-size: 16px;
      }
    }

    .card-info-body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;

      .unidades {
        font-size: 25px;
      }

      .soma-horas {
        font-size: 25px;
      }

      .maior-demanda {
        font-size: 15px;
      }
    }
  }

  .subtitle {
    margin-bottom: 25px;
  }

  .card-grafico {
    min-height: 200px;

    .card-chart-title {
      text-align: center;
      font-weight: 600;
      padding: 8px;
      font-size: 15px;
      width: 100%;
      background-image: linear-gradient(95deg, #285d90, #4072a1);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      color: #fff;

      i {
        color: rgb(238, 238, 238);
        position: absolute;
        left: 15px;
        top: 13px;
        font-size: 16px;
      }
    }

    .card-chart-body {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

@media only screen and (max-width: 768px) {
  .card-info {
    width: 100px !important;
  }

  .card-info-body {
    .soma-horas {
      font-size: 19px !important;
    }
  }
}
</style>
