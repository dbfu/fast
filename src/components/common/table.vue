<template>
  <div class="table-box">
    <Table :loading="loading" :columns="formatColumns"  v-if="tableData && tableData.length" :data="tableData"  :border="true" :stripe="true"  ></Table>
    <div class="my-page">
      <Page :total="total" :current="index" :page-size="size" @on-page-size-change="sizeChange" @on-change="indexChange" show-sizer show-total placement="top"></Page>
    </div>
  </div>
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
      tableData: [],
      loading: false,
      total: 0,
      index: 1,
      size: 10, 
      fileds: [],
      model: {}
    };
  },

  computed: {
    formatColumns() {
      return this.column.map(item => {
        if (item.type == "date") {
          item.render = (h, o) => {
            if (o.row[item.key]) {
              let date = moment(o.row[item.key]).format("YYYY-MM-DD");
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
    this.getList();
  },
  methods: {
    indexChange(index) {
      this.index = index;
      this.getList();
    },
    sizeChange(size) {
      this.size = size;
      this.index = 1;
      this.getList();
    },
    search(fileds, model) {
      this.index = 1;
      this.fileds = fileds;
      this.model = model;
      this.getList();
    },
    getList() {
      this.loading = true;

      if (!this.fileds.length) {
        if (this.url) {
          let _url = this.url + `?index=${this.index - 1}&size=${this.size}`;

          _url += '&sort=order by create_time desc';

          axios.get(encodeURI(_url)).then(res => {
            this.tableData = res.data.content.list;
            this.total = res.data.content.total;
            this.loading = false;
          });
        }
      } else {
        let _url = this.url + "?params=";
        let str = "";
        this.fileds.map(item => {
          if (this.model[item.key]) {
            if (!item.type) {
              str += `${item.key} like '%${this.model[item.key]}%' and`;
            }
          }

          if (str) {
            str = str.substring(0, str.length - 3);
            str = this.url + "?params=" + str;
          } else {
            str = this.url;
          }

          if (str.indexOf("?") >= 0) {
            str = str + `&index=${this.index - 1}&size=${this.size}`;
          } else {
            str = str + `?index=${this.index - 1}&size=${this.size}`;
          }

          str += '&sort=order by create_time desc';

          console.log(str);
          axios.get(encodeURI(str)).then(res => {
            this.tableData = res.data.content.list;
            this.total = res.data.content.total;
            this.loading = false;
          });
        });
      }
    }
  }
};
</script>
<style scoped>
.my-page {
  text-align: right;
  margin-top: 20px;
}
.table-box {
  background-color: #fff;
  padding-bottom: 20px;
}
</style>
