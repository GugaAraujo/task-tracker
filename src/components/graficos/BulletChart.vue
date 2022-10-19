<template>
  <div v-if="data.length" id="bulletChart" ref="bulletChart"></div>
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

const bulletChart = ref(null);
const chartRef = ref(null);

function iniciaGrafico(data) {
  const sortedData = data.sort((a, b) => b.duration - a.duration);

  let chart = am4core.create(bulletChart.value, am4charts.XYChart);
  chart.data = sortedData;

  // Add and configure Series
  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = props.property;
  categoryAxis.renderer.minGridDistance = 1;
  categoryAxis.renderer.inversed = true;
  categoryAxis.renderer.grid.template.disabled = true;
  let label = categoryAxis.renderer.labels.template;
  label.truncate = true;
  label.maxWidth = 240;

  var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.renderer.labels.template.disabled = true;
  //Indicando a propriedade e o valor exibido no gráfico
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryY = props.property;
  series.dataFields.valueX = props.value;
  series.tooltipText = "{valueX.value}";
  series.columns.template.strokeOpacity = 0;
  series.columns.template.column.cornerRadiusBottomRight = 5;
  series.columns.template.column.cornerRadiusTopRight = 5;

  // Cores diferentes para cada barra

  // Estabelecendo Paleta de Cores
  chart.colors.list = colorsChart;

  series.columns.template.adapter.add("fill", function (fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  });

  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.horizontalCenter = "left";
  labelBullet.label.dx = 10;
  labelBullet.label.text = "{values.valueX.workingValue}";
  labelBullet.locationX = 1;
  labelBullet.label.truncate = false;

  if (props.isMobile) {
    chart.responsive.enabled = true;
    labelMobile(labelBullet);
  } else {
    labelDesktop(labelBullet);
  }

  // Ajustando a Div de acordo com a quantidade de dados
  settingSizeDiv(chart);

  //BARRAS COM NUMEROS ABSOLUTOS E PORCENTAGEM
  series.calculatePercent = true;
  chart.numberFormatter.numberFormat = "#.#";

  //descarregando os gráficos não utilizados da memória
  am4core.options.autoDispose = true;
  chartRef.value = chart;
}
function settingSizeDiv(chart) {
  // Set cell size in pixels
  var cellSize = 30;
  chart.events.on("datavalidated", function (ev) {
    // Get objects of interest
    var chart = ev.target;
    var categoryAxis = chart.yAxes.getIndex(0);

    // Calculate how we need to adjust chart height
    var adjustHeight =
      chart.data.length * cellSize - categoryAxis.pixelHeight;

    // get current chart height
    var targetHeight = chart.pixelHeight + adjustHeight;

    // Set it on chart's container
    chart.svgContainer.htmlElement.style.height = targetHeight + "px";
  });

  return chart;
}
function labelDesktop(labelBullet): am4charts.LabelBullet {
  //verifica se é Tempo ou Unidade
  props.isTime
    ? (labelBullet.label.text =
        "{valueX.formatDuration('hh:mm:ss')} ({valueX.percent}%)")
    : (labelBullet.label.text =
        "{valueX} [font-size:12px]({valueX.percent}%)[/]");

  return labelBullet;
}
function labelMobile(labelBullet): am4charts.LabelBullet {
  //verifica se é Tempo ou Unidade
  props.isTime
    ? (labelBullet.label.text = "[font-size:14px]{valueX.percent}%[/]")
    : (labelBullet.label.text =
        "{valueX} [font-size:12px]({valueX.percent}%)[/]");

  return labelBullet;
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