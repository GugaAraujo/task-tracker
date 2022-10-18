<template>
  <div id="bulletChart" ref="bulletChart"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import colorsChart from "@/utils/colorsChart";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribuition");

export default defineComponent({
  name: "BulletChart",
  props: {
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
    isMobile: {
      type: Boolean,
    },
    isTime: {
      type: Boolean,
    },
  },
  methods: {
    iniciaGrafico(data) {
      const sortedData = data.sort((a, b) => b.duration - a.duration);

      let chart = am4core.create(this.$refs["bulletChart"], am4charts.XYChart);
      chart.data = sortedData;

      // Add and configure Series
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = this.propriedade;
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
      series.dataFields.categoryY = this.propriedade;
      series.dataFields.valueX = this.valor;
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

      if (this.isMobile) {
        chart.responsive.enabled = true;
        this.labelMobile(labelBullet);
      } else {
        this.labelDesktop(labelBullet);
      }

      // Ajustando a Div de acordo com a quantidade de dados
      this.settingSizeDiv(chart);

      //BARRAS COM NUMEROS ABSOLUTOS E PORCENTAGEM
      series.calculatePercent = true;
      chart.numberFormatter.numberFormat = "#.#";

      //descarregando os gráficos não utilizados da memória
      am4core.options.autoDispose = true;
      this.chart = chart;
    },
    settingSizeDiv(chart) {
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
    },
    labelDesktop(labelBullet): am4charts.LabelBullet {
      //verifica se é Tempo ou Unidade
      this.isTime
        ? (labelBullet.label.text =
            "{valueX.formatDuration('hh:mm:ss')} ({valueX.percent}%)")
        : (labelBullet.label.text =
            "{valueX} [font-size:12px]({valueX.percent}%)[/]");

      return labelBullet;
    },
    labelMobile(labelBullet): am4charts.LabelBullet {
      //verifica se é Tempo ou Unidade
      this.isTime
        ? (labelBullet.label.text = "[font-size:14px]{valueX.percent}%[/]")
        : (labelBullet.label.text =
            "{valueX} [font-size:12px]({valueX.percent}%)[/]");

      return labelBullet;
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