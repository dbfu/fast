<template>
  <div>
    <ContentHeader title="用户管理">
      <el-button size="mini" @click="run" type="success">测试</el-button>
      <el-button size="mini" @click="save" type="primary">保存</el-button>
    </ContentHeader>
    <ContentBody>
      <db-form ref="form" :rowCount="1" :fileds="fileds" :model="model"></db-form>
    </ContentBody>
    <SlideFrame @close="visible=false" :isShow="visible" @save="ok">
        <Run :model="data" :data="params"></Run>
    </SlideFrame>
  </div>
</template>
<script>
import ContentHeader from "../common/content-header";
import ContentBody from "../common/content-body";
import Form from "../common/form";
import Run from "./run";
import SlideFrame from "../common/slide-frame";

import axios from "axios";

export default {
  components: {
    ContentHeader,
    ContentBody,
    "db-form": Form,
    Run,
    SlideFrame
  },
  data() {
    return {
      fileds: [
        {
          title: "名称",
          key: "name",
          type: "input"
        },
        {
          title: "类型",
          key: "type",
          type: "select",
          text: "name",
          value: "id",
          bind: "typeList",
          options:[{
            id:1,
            name: "增加"
          },
          {
            id:2,
            name: "删除"
          },
          {
            id:3,
            name: "修改"
          },
          {
            id:4,
            name: "查询"
          }]
        },
        {
          title: "sql语句",
          key: "content",
          type: "textarea"
        },
        {
          title: "备注",
          key: "remark",
          type: "textarea",
          row:3
        }
      ],
      model: {},
      visible: false,
      data: {},
      params: {}
    };
  },
  methods: {
    run() {
      this.data = this.$refs.form.getEntity();
      this.visible = true;
    },
    ok() {
      let sql = this.data.content;
      for (let key in this.params) {
        sql = sql.replace("${" + key + "}", this.params[key]);
      }
      axios.get("/api/query", { params: { sql: sql } }).then(res => {
        this.params.result = JSON.stringify(res.data);
      });
    },
    save() {
      axios.post("/api/insert", this.model).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>
<style scoped>

</style>
