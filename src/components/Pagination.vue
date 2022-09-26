<template>
<div class="pagination">
    <button 
      @click="prevPage"
      :class="`pagination_button ${getButtonClass(currentPage, 1)}`"
      :disabled="isPagesEqual(currentPage, 1)"
      >&laquo;
    </button>
    <button 
        @click="setPage(page)"
        v-for="page in pagesArray" :key="page"
        :class="`pagination_button ${getNumberClass(currentPage, page)}`"
        >{{ page }}
    </button>
    <button 
      @click="nextPage"
      :class="`pagination_button ${getButtonClass(pagesNum, currentPage)}`"
      :disabled="isPagesEqual(pagesNum, currentPage)"
      >&raquo;
    </button>
</div>
</template>

<script>
export default {
  data() {
        return {
            currentPage: this.pageFromFilter
        }
    },
    props: ['allObjectsNum', 'pageFromFilter'],
    computed: {
      pagesNum() {
          return Math.ceil(this.allObjectsNum / 5)
      },
      pagesArray() {
          return Array.from(Array(this.pagesNum)).map((_, i) => i+1);
      },
      shown() {
          return `${1+(10*(this.currentPage-1))} - ${this.pagesNum === this.currentPage ? this.allObjectsNum : 10+(10*(this.currentPage-1))}`
      },
      isPagesEqual() {
        return (page1, page2) => page1 === page2
      },
      getButtonClass() {
          return (page1, page2) => this.isPagesEqual(page1, page2) ? 'disabled' : 'default'
      },
      getNumberClass() {
          return (page1, page2) => this.isPagesEqual(page1, page2) ? 'stay' : 'default'
      }
    },
    methods: {
        setPage(page) {
            this.currentPage = page;
            this.$emit('filter', this.currentPage);
        },
        prevPage() {
            this.setPage(this.currentPage -= 1);
        },
        nextPage() {
            this.setPage(this.currentPage += 1);
        }
    }
}
</script>


<style lang="scss" scoped>
.pagination_button {
  width: 43px;
  height: 43px;
  font-size: 16px;
  color: #039;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #669;
  margin: 0 4px;

    &:hover{
      background-color: rgba(128, 101, 201, 0.555);
    }

    &:active {
    background-color: #669;
    color: white;
    border: 1px solid #669;
    }
}

.stay{
    background-color: #669;
    color: white;
    border: 1px solid #669; 
}


.disabled{
  cursor: not-allowed;
}


</style>
