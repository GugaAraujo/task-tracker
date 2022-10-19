<template>
  <div v-if="data.length" id="pieChart" ref="pieChart"></div>
  <div v-else>
    <p class="mt-4 hero-body has-text-centered is-size-5 has-text-info-dark">Não há dados</p>
  </div>
</template>

<script setup lang="ts">
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import colorsChart from "@/utils/colorsChart";
import { onBeforeMount, onMounted, ref } from "vue";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribuition");

const props = defineProps<{
  data: unknown[],
  property: string,
  value: string,
  isMobile?: boolean,
  isTime?: boolean,
}>()

const pieChart = ref(null);
const chartRef = ref(null);

function iniciaGrafico(data) {
  let chart = am4core.create(pieChart.value, am4charts.PieChart);
  chart.data = data;

  // Add and configure Series
  let pieSeries = chart.series.push(new am4charts.PieSeries());

  // Estabelecendo Paleta de Cores
  pieSeries.colors.list = colorsChart;

  //Indicando a propriedade e o valor exibido no gráfico
  pieSeries.dataFields.category = props.property;
  pieSeries.dataFields.value = props.value;

  if (props.isMobile) {
    chartMobile(chart);
    seriesMobile(pieSeries);
  } else {
    chartDesktop(chart);
  }

  loadAnimation(pieSeries);

  //descarregando os gráficos não utilizados da memória
  am4core.options.autoDispose = true;

  chartRef.value = chart;
}
function loadAnimation(series): am4charts.PieSeries {
  series.hiddenState.properties.opacity = 1;
  series.hiddenState.properties.endAngle = -90;
  series.hiddenState.properties.startAngle = -90;

  return series;
}
function chartDesktop(chart): am4charts.PieChart {
  chart.legend = new am4charts.Legend();
  chart.legend.labels.template.text = `{${props.property}}:`;
  chart.legend.valueLabels.template.text = `{${props.value}.formatNumber('#.#')} [font-size:15px]({value.percent.formatNumber('#,###.##')}%)[/]`;

  chart.legend.maxHeight = 60;
  chart.legend.scrollable = true;

  var markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 15;
  markerTemplate.height = 15;
  chart.legend.fontSize = 15;
  chart.legend.dy = 5;

  return chart;
}
function chartMobile(chart): am4charts.PieChart {
  chart.responsive.enabled = true;

  chart.legend = new am4charts.Legend();
  chart.legend.labels.template.text = `{${props.property}}:`;
  chart.legend.valueLabels.template.text = `{${props.value}.formatNumber('#.#')} [font-size:15px]({value.percent.formatNumber('#,###.##')}%)[/]`;

  chart.legend.position = "right";
  chart.legend.maxWidth = 280;
  chart.legend.maxHeight = 300;
  chart.legend.scrollable = true;

  var markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 15;
  markerTemplate.height = 15;

  return chart;
}
function seriesMobile(series): am4charts.PieSeries {
  series.ticks.template.disabled = true;
  series.labels.template.disabled = true;
  return series;
}
onMounted(() => {
  iniciaGrafico(props.data);
})
onBeforeMount(() => {
  if (chartRef.value) {
    chartRef.value.dispose();
  }
})
</script>
<style lang="scss">
#pieChart {
  width: 100%;
  height: 200px;
}
</style>