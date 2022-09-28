<template>
    <div>
        <FilterItems :items="items" @filter="filter"></FilterItems>
        <table>
            <thead>
                <tr>
                    <th>Дата</th>
                    <th  >
                        <a @click="sort('name')" class="sort_table">Название</a>
                    </th>
                    <th >
                        <a @click="sort('amount')" class="sort_table">Количество</a>
                    </th>
                    <th >
                        <a @click="sort('distance')" class="sort_table">Расстояние</a>
                    </th>
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
        <Pagination :allObjectsNum="allObjectsNum" :pageFromFilter="page" @setItemsOnPage="setItemsOnPage"></Pagination>
    </div>
</template>

<script>
import FilterItems from "./FilterItems.vue"
import Pagination from "../components/Pagination.vue"

const url = 'http://localhost:3210/'

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
            result: null,
            sorted: null,
            sortByField: null
            }
      },
      mounted() {
        fetch(`${url}`)
            .then(res => res.json())
            .then((res) => {
                this.result = res;
                this.items = res.slice(0, 5);
                this.allObjectsNum = res.length;
            })
      },
      methods: {
        setItemsOnPage(page) {
            this.items = this.result.slice((page-1)*5, (page-1)*5+5);
        },
        sortDirect(field) {
            this.result.sort((a,b) => a[field] > b[field] ? 1 : -1);
        },
        sortReverse(field) {
            this.result.sort((a,b) => b[field] > a[field] ? 1 : -1);
        },
        sort(field){
            if (!this.sorted || this.sorted == 'reverse') {
                this.sortDirect(field);
                this.sorted = 'direct';
            } else {
                this.sortReverse(field);
                this.sorted = 'reverse';
            }
            this.setItemsOnPage(this.page);
            this.sortByField = field;
        },
        filter(page, operator, field, amount) {
            const operations = {
                'eq': function (x, y) { return x == y },
                'contains': function (x, y) { return x.includes(y) },
                'gt': function (x, y) { return x > y },
                'lt': function (x, y) { return x < y }
            };

            this.page = page;

            fetch(`${url}`)
                .then(res => res.json())
                .then((res) => {
                    this.result = res;
                    if (operator) {
                        this.result = res.filter(i => operations[operator](i[field], amount));
                    }
                    if (this.sortByField) {
                        this.sortDirect(field) ? this.sorted == 'direct' : this.sortReverse(field);
                    }
                    this.setItemsOnPage(page);
                    this.allObjectsNum = this.result.length;
                })
        },
      },
      components: { FilterItems, Pagination }
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
    vertical-align: middle;
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

.sort_table{
    position: relative;
}

.sort_table:before,
.sort_table:after {
	border: 4px solid transparent;
	content: "";
	display: block;
	height: 0;
    right: -20px;
	top: 50%;
	position: absolute;
	width: 0;
}
.sort_table:before {
	border-bottom-color: #039;
	margin-top: -9px;
}
.sort_table:after {
	border-top-color: #039;
	margin-top: 1px;
}

</style>