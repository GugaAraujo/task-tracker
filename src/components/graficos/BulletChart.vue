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
  name: "BulletChart",
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
    isTime: {
      type: Boolean,
    },
  },
  methods: {
    iniciaGrafico(data) {
      let chart = am4core.create(this.$refs[this.divName], am4charts.XYChart);
      chart.data = data;

      // Add and configure Series
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = this.propriedade;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
    
      //Indicando a propriedade e o valor exibido no gráfico
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = this.propriedade;
        series.dataFields.valueX = this.valor;
        series.tooltipText = "{valueX.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        var labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue}";
        labelBullet.locationX = 1;

  // Cores diferentes para cada barra
  series.columns.template.adapter.add("fill", function(fill, target){
    return chart.colors.getIndex(target.dataItem.index);
  });

  labelBullet.label.truncate = false;

  //BARRAS COM NUMEROS ABSOLUTOS E PORCENTAGEM
  series.calculatePercent = true;
  chart.numberFormatter.numberFormat = "#.##";


  //verifica se é Tempo ou Unidade
  this.isTime 
  ? labelBullet.label.text = "{valueX.formatDuration('hh:mm:ss')} [font-size:13px]({valueX.percent}%)[/]"
  : labelBullet.label.text = "{valueX} [font-size:12px]({valueX.percent}%)[/]";


      // if (this.isMobile) {
      //   this.chartMobile(chart);
      //   this.seriesMobile(pieSeries);
      // } else {
      //   this.chartDesktop(chart);
      // }

      // this.loadAnimation(pieSeries);

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
