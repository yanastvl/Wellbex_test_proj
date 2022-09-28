<template>
    <form class="sort_inner" @submit="handleSubmit">
        <select name="field" class="sort_select">
            <option value="date">Дата</option>
            <option value="name">Название</option>
            <option value="amount">Количество</option>
            <option value="distance">Расстояние</option>
        </select>

        <select name="operator" class="sort_select">
            <option value="eq">Равно</option>
            <option value="contains">Содержит</option>
            <option value="gt">Больше</option>
            <option value="lt">Меньше</option>
        </select>

        <input class="sort_input" type="text" name="amount" required>
        <button class="sort_button" type="submit">Применить</button>
    </form>
</template>

<script>
  export default {
      data() {
          return {};
      },
      props: ['items'],
      methods: {
        handleSubmit(e) {
            e.preventDefault();
            const target = e.target;
            this.$emit('filter', 1, target.operator.value, target.field.value, target.amount.value)
        }
      }
    }
</script>

<style  scoped>
.sort_inner{
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-top: 20px;
}

.sort_select{
    margin-right: 10px;
    height:28px;

    background: #b9c9fe;
    color: #039;
}

.sort_input{
    min-width: 400px;
}

.sort_button{
    font-size: 14px;
    line-height: 14px;

    min-width: 100px;
    margin-left: 10px;
    padding: 5px;
    height: 28px;
    border-radius: 10px;
    border: 1px solid ;
    border-style: solid;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));

    background: #b9c9fe;
    color: #039;
}
</style>