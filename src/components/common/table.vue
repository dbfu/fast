<template>
   <Table width="" :columns="column"  v-if="tableData && tableData.length" :data="tableData"  :border="false" :stripe="true"  ></Table>
</template>
<script>
import axios from "axios";
import TableRow from "./table-row";
export default {
  components: {
    TableRow
  },
  props: {
    column: {
      default() {
        return [];
      },
      type: Array
    },
    url: String,
    data: {
      default() {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      tableData: [{
          id:1,
          name:"123",
          content:"1232"
      }]
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    column(value) {
     // this.getList();
    }
  },
  methods: {
    getList() {
    //   if (this.url) {
    //     axios.get(this.url).then(res => {
    //       this.tableData = res.data;
    //     });
    //   }
    }
  }
};
</script>
