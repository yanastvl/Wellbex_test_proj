<template>
    <Table></Table>
</template>
  
  <script>
  import Table from "../components/Table.vue"
  import Pagination from "../components/Pagination.vue"
  
  export default {
      data() {
          return {
              app: "app"
          };
      },
      components: { Table, Pagination }
    }
  </script>
  
  <style>
  
  </style>