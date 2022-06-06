<template>
  <h2 class="subtitle has-text-centered has-text-weight-bold">
    {{ titulo }}
  </h2>
  <div :ref="divName"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribuition");

export default defineComponent({
  name: "Pizza",
  props: {
    titulo: {
      type: String,
      required: true,
    },
    dados: {
      type: Object,
      required: true,
    },
    propriedade: {
      type: String,
      required: true,
    },
    valor: {
      type: String,
      required: true,
    },
    divName: {
      type: String,
      required: true,
    },
    isMobile: {
      type: Boolean,
    },
  },
  methods: {
    iniciaGrafico(data) {
      let chart = am4core.create(this.$refs[this.divName], am4charts.PieChart);
      chart.data = data;

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());

      //Indicando a propriedade e o valor exibido no gráfico
      pieSeries.dataFields.category = this.propriedade;
      pieSeries.dataFields.value = this.valor;

      if (this.isMobile) {
        this.chartMobile(chart);
        this.seriesMobile(pieSeries);
      } else {
        this.chartDesktop(chart);
      }

      this.loadAnimation(pieSeries);

      //descarregando os gráficos não utilizados da memória
      am4core.options.autoDispose = true;

      this.chart = chart;
    },
    loadAnimation(series): am4charts.PieSeries {
      series.hiddenState.properties.opacity = 1;
      series.hiddenState.properties.endAngle = -90;
      series.hiddenState.properties.startAngle = -90;

      return series;
    },
    chartDesktop(chart): am4charts.PieChart {
      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.text = `{${this.propriedade}}:`;
      chart.legend.valueLabels.template.text = `{${this.valor}.formatNumber('#.#')} [font-size:15px]({value.percent.formatNumber('#,###.##')}%)[/]`;

      chart.legend.maxHeight = 60;
      chart.legend.scrollable = true;

      var markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 15;
      markerTemplate.height = 15;
      chart.legend.fontSize = 15;
      chart.legend.dy = 5;

      return chart;
    },
    chartMobile(chart): am4charts.PieChart {
      chart.legend = new am4charts.Legend();
      chart.legend.labels.template.text = `{${this.propriedade}}:`;
      chart.legend.valueLabels.template.text = `{${this.valor}.formatNumber('#.#')} [font-size:15px]({value.percent.formatNumber('#,###.##')}%)[/]`;

      chart.legend.position = "right";
      chart.legend.maxWidth = 280;
      chart.legend.maxHeight = 300;
      chart.legend.scrollable = true;

      var markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 15;
      markerTemplate.height = 15;

      return chart;
    },
    seriesMobile(series): am4charts.PieSeries {
      series.ticks.template.disabled = true;
      series.labels.template.disabled = true;
      return series;
    },
  },
  mounted() {
    this.iniciaGrafico(this.dados);
  },
  beforeUnmount() {
    if (this.charts) {
      this.charts.dispose();
    }
  },
});
</script>
