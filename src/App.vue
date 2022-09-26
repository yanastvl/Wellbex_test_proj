<template>
  <div id="vue-app">
      <TableView></TableView>
  </div>
</template>

<script>
import TableView from "./views/TableView.vue"

export default {
    data() {
        return {
            app: "app"
        };
    },
    components: { TableView }
  }
</script>

<style>

</style>
