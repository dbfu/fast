<template>
   <Table width=""  :columns="formatColumns"  v-if="tableData && tableData.length" :data="tableData"  :border="true" :stripe="true"  ></Table>
</template>
<script>
import axios from "axios";
import TableRow from "./table-row";
import moment from "moment";
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
      tableData: []
    };
  },

  computed: {
    formatColumns() {
      return this.column.map(item => {
        if (item.type == "date") {
          item.render = (h, o) => {
            if (o.row[item.key]) {
              let date = moment(o.row[item.key])
                .local()
                .format("YYYY-MM-DD");
              return h("span", date);
            } else {
              return h("span", "");
            }
          };
        }
        item.align = "center";
        return item;
      });
    }
  },

  mounted() {
    let m = moment(new Date());

    console.log(m.local().format("YYYY-MM-DD HH:mm:ss"));

    this.getList();
  },
  watch: {
    column(value) {
      // this.getList();
    }
  },
  methods: {
    getList() {
      if (this.url) {
        axios.get(this.url).then(res => {
          this.tableData = res.data;
        });
      }
    },
    formatDate(h, model) {}
  }
};
</script>
