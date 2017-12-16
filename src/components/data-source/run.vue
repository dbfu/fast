<template>
      <db-form :fileds="fileds" :model="data" :rowCount="1"></db-form>
</template>
<script>
import Form from "../common/form";
export default {
  components: {
    "db-form": Form
  },
  props: {
    model: Object,
    data: Object
  },
  data() {
    return {
      isShow: this.visible
    };
  },
  computed: {
    fileds() {
      var temp = [
        {
          title: "结果",
          key: "result",
          type: "input",
          span: 20
        }
      ];
      if (!this.model.content) return temp;

      let patter = /\$\{[^}]*\}/g;
      let result = this.model.content.match(patter);

      if (!result) return temp;
      let arr = [];
      result.map(item => {
        var title = item.replace("${", "").replace("}", "");
        arr.push({
          title: title,
          key: title,
          type: "input",
          span: 12
        });
      });
      arr = temp.concat(arr);
      return arr;
    }
  }
};
</script>
