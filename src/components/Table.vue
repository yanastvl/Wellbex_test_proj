<template>
    <div>
        <Sort :items="items" @filter="filter"></Sort>
        <table>
            <thead>
                <tr>
                    <th>Дата</th>
                    <th @click="sort('name')">Название</th>
                    <th @click="sort('amount')">Количество</th>
                    <th @click="sort('distance')">Расстояние</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, id) in items" :key="id">
                    <td v-for="field in fields" :key="field">
                        {{ item[field] }}
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :allObjectsNum="allObjectsNum" :pageFromFilter="page" @filter="filter"></Pagination>
    </div>
</template>

<script>
import Sort from "../components/Sort.vue"
import Pagination from "../components/Pagination.vue"

const url = 'http://localhost:3210/test'

  export default {
      data() {
        return {
            page: 1,
            allObjectsNum: 0,
            items: [],
            fields: [
                'date',
                'name',
                'amount',
                'distance',
            ],
            filteredResult: null
            }
      },
      mounted() {
        fetch(`${url}`)
            .then(res => res.json())
            .then((res) => {
                this.items = res.slice(0, 5);
                this.allObjectsNum = res.length;
            })
      },
      methods: {
        sort(field) {
            if (field == 'name') {
                this.items.sort((a, b) => a[field].localeCompare(b[field]))
            } else {
                this.items = this.items.sort((a,b) =>  a[field]-b[field] )
            }
        },
        filter(page, operator, field, amount) {
            const operations = {
                'eq': function (x, y) { return x == y },
                'contains': function (x, y) { return x.includes(y) },
                'gt': function (x, y) { return x > y },
                'lt': function (x, y) { return x < y }
            };

            this.page = page;
            const realPage = page - 1;

            fetch(`${url}`)
                .then(res => res.json())
                .then((res) => {
                    if (operator) {
                        this.filteredResult = res.filter(i => operations[operator](i[field], amount));
                    } else if (!this.filteredResult) {
                        this.filteredResult = res;
                    }
                    this.items = this.filteredResult.slice(realPage*5, realPage*5+5);
                    this.allObjectsNum = this.filteredResult.length;
                    this.page = page;
                })
        },
      },
      components: { Sort, Pagination }
    }
</script>

<style  lang="scss" scoped>
    table {
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 16px;
  background: white;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: center;
  margin: 20px auto;

  th {
    font-weight: normal;
    line-height: 30px;
    padding: 8px;
    background: #b9c9fe;
    border-top: 4px solid #aabcfe;
    border-bottom: 1px solid #fff;
    color: #039;
  }

  td {
    font-size: 14px;
    background: #e8edff;
    border-bottom: 1px solid #fff;
    color: #669;
    border-top: 1px solid transparent;
    padding: 8px;
  }
}
</style>