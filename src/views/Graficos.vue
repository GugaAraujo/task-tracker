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
          <i class="fas fa-tasks"></i>
          Tarefas
        </p>
        {{ tarefas?.length }}
      </div>
      <div class="column is-2 card card-info">
        <p>
          <i class="far fa-folder-open"></i>
          Projetos
        </p>
        {{ projetos?.length }}
      </div>
      <div class="column is-2 card card-info">
        <p>
          <i class="far fa-clock"></i>
          Total
        </p>
        {{ formataHora(horasTotaisTarefas) }}
      </div>
      <div class="column is-3 card card-info">
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
    <div class="card card-grafico">
      <h2 class="subtitle has-text-centered has-text-weight-bold">Projetos</h2>
      <div ref="chartdiv"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../store";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribuition");

export default defineComponent({
  name: "Graficos",
  data() {
    return {
      tarefas: null,
      projetos: null,
      horasTotaisTarefas: 0,
      taskMaisDemorada: null,
    };
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
    iniciaGrafico(data) {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart);
      chart.data = data;

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "quantidade";
      pieSeries.dataFields.category = "nomeProjeto";

      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.text = "{nomeProjeto}:";
      chart.legend.valueLabels.template.text =
        "{quantidade.formatNumber('#.#')} [font-size:13px]({value.percent.formatNumber('#,###.##')}%)[/]";

      var markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 13;
      markerTemplate.height = 13;
      chart.legend.fontSize = 14;
      chart.legend.dy = 5;

      //descarregando os gráficos não utilizados da memória
      am4core.options.autoDispose = true;

      this.chart = chart;
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
      projetos = projetos.reverse()[0];
      this.iniciaGrafico(projetos);
      this.somaDeHoras();
    });
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS)

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
  }
  .subtitle {
    margin-bottom: 25px;
  }

  .card-grafico {
    padding: 40px 10px;
    height: 300px;
  }
}
</style>
