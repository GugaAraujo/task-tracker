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
                <span v-if="allTasks" class="unidades">
                  {{ allTasks.length || 0 }}
                </span>
                <bounce-loader
                  v-else
                  color="#4072A1"
                  size="10px"
                ></bounce-loader>
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
                <span v-if="allProjects" class="unidades">
                  {{ allProjects.length || 0 }}
                </span>
                <bounce-loader
                  v-else
                  color="#4072A1"
                  size="10px"
                ></bounce-loader>
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
                  {{ formatHour(totalDuration) }}
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
                <div v-if="longestTask" class="row">
                  <div class="row">
                    <span class="maior-demanda">
                      {{ longestTask?.description }}
                    </span>
                  </div>
                  <div class="row">
                    <p>
                      {{
                        longestTask?.duration
                          ? formatHour(longestTask.duration)
                          : ""
                      }}
                    </p>
                  </div>
                </div>
                <bounce-loader
                  v-else
                  color="#4072A1"
                  size="10px"
                ></bounce-loader>
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
              <p>Projetos</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="columns card-chart-body">
            <div v-if="countProjectName" class="column">
              <Pizza
                :data="countProjectName"
                property="project_name"
                value="quantity"
                :isMobile="true"
              />
            </div>
            <moon-loader
              class="spinnerChart"
              v-else
              color="#4072A1"
              size="40px"
            ></moon-loader>
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
          <div class="columns card-chart-body">
            <div v-if="durationList" class="column">
              <BulletChart
                :data="durationList"
                property="description"
                value="duration"
                divName="projeto-por-tipo"
                :isTime="true"
                :isMobile="true"
              />
            </div>
            <moon-loader
              class="spinnerChart"
              v-else
              color="#4072A1"
              size="40px"
            ></moon-loader>
          </div>
        </div>
      </div>
    </div>

    <div class="column card card-grafico is-hidden-touch">
      <div class="rows">
        <div class="row">
          <div class="columns">
            <div class="column card-chart-title">
              <p>Projetos</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="columns card-chart-body">
            <div v-if="countProjectName" class="column">
              <Pizza
                :data="countProjectName"
                property="project_name"
                value="quantity"
              />
            </div>
            <moon-loader
              class="spinnerChart"
              v-else
              color="#4072A1"
              size="40px"
            ></moon-loader>
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
          <div class="columns card-chart-body">
            <div v-if="durationList" class="column">
              <BulletChart
                :data="durationList"
                property="description"
                value="duration"
                divName="projeto-por-tipo"
                :isTime="true"
              />
            </div>
            <moon-loader
              class="spinnerChart"
              v-else
              color="#4072A1"
              size="40px"
            ></moon-loader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "../store";
import http from "@/http";
import Pizza from "@/components/graficos/Pizza.vue";
import BulletChart from "@/components/graficos/BulletChart.vue";
import { OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import MoonLoader from "vue-spinner/src/MoonLoader.vue";

const store = useStore();
store.dispatch(OBTER_TAREFAS);
store.dispatch(OBTER_PROJETOS);

const allTasks = computed(() => store.state.tarefa.tarefas);
const allProjects = computed(() => store.state.projeto.projetos);

let durationList = ref(null);
let countProjectName = ref(null);
let totalDuration = ref(0);
let longestTask = ref({
  description: 'Não há task cadastrada',
  duration: 0,
});

function formatHour (data: number): string {
  return new Date(data * 1000).toISOString().substr(11, 8);
}
async function getTasks () {
  return await http.get('/task/all')
    .then((response) => durationList.value = response.data);
}
async function getProjects () {
  return await http.get('/data/count/name')
    .then((response) => countProjectName.value = response.data);
}
async function getTotalDuration () {
  return await http.get('/data/sum/duration')
    .then((response) => totalDuration.value = response.data?.total);
}
async function getLongestTask () {
  return await http.get('/data/longest/task')
    .then((response) => {
      if (response.data) {
        longestTask.value = response.data
      }
    });
}

onMounted(async () => {
  await getTasks();
  await getProjects();
  await getTotalDuration();
  await getLongestTask();
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

      .spinnerChart {
        padding: 70px;
        margin: auto;
      }
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
