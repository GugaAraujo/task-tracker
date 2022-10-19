<template>
  <Box>
    <div class="rows is-mobile">
      <div class="row">
        <div class="columns is-mobile">
          <div class="column is-11">
            {{ task.description || "Tarefa sem descrição" }}
          </div>
          <div class="column is-1" @click="onClickTask">
            <i class="fas fa-edit"></i>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns is-mobile">
          <div class="column is-6">
            {{ task.project_name || "N/D" }}
          </div>
          <div class="column is-5">
            <Cromometro :timeInSeconds="task.duration" />
          </div>
          <div class="column is-1" @click="onClickToExclude">
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  </Box>
</template>

<script setup lang="ts">
import Cromometro from "./Cronometro.vue";
import Box from "./Box.vue";

const emit = defineEmits(["onClickToEdit", "onClickToExclude"]);
const props = defineProps(['task']); // To-do: Object as PropType<ITarefa>

function onClickTask(): void {
  emit("onClickToEdit", props.task);
}
function onClickToExclude(): void {
  emit("onClickToExclude", props.task);
}
</script>
<style lang="scss" scoped>
i {
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.3);
    color: hsl(348, 100%, 61%);
  }
}

@media only screen and (max-width: 768px) {
  i {
    position: relative;
    right: 10px;
  }
}
</style>

