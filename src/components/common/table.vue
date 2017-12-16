<template>
   <el-table width=""  v-if="tableData && tableData.length" :data="tableData"  :border="true" :stripe="true"  >
      <el-table-column align="center" :show-overflow-tooltip="true" v-for="item in column"
        :key="item.key"
        :prop="item.key"
        :label="item.title"
        :width="item.width">
         <template slot-scope="scope">
            <TableRow  v-if="scope" :model="scope" :index="item.key"></TableRow>
         </template>
      </el-table-column>
    </el-table>
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
