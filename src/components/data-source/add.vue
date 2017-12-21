<template>
  <div>
    <ContentHeader title="新增数据源" :showBack="true">
      <Button  @click="run" type="success">测试</Button>
      <Button  @click="save" type="primary">保存</Button>
    </ContentHeader>
    <ContentBody>
      <db-form ref="form" :rowCount="1" :fileds="fileds" :model="model"></db-form>
    </ContentBody>
    <SlideFrame @close="visible=false" :isShow="visible" @save="ok">
        <Run :model="data" :data="params"></Run>
    </SlideFrame>
    <Modal
        v-model="show"
        title="运行结果"
        :width="640">
        <div slot="footer">
        </div>
          <textarea  v-model="result" class="result"></textarea>
    </Modal>
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
      show: false,
      result: "",
      fileds: [
        {
          title: "名称",
          key: "title",
          type: "input"
        },
        {
          title: "类型",
          key: "type",
          type: "select",
          text: "name",
          value: "id",
          bind: "typeList",
          span: 8,
          options: [
            {
              id: 1,
              name: "增加"
            },
            {
              id: 2,
              name: "删除"
            },
            {
              id: 3,
              name: "修改"
            },
            {
              id: 4,
              name: "查询"
            }
          ]
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
          row: 3
        }
      ],
      model: {},
      visible: false,
      data: {},
      params: {}
    };
  },
  mounted() {
    if (this.$route.params.id > 0) {
      this.$axios
        .get("/api/dataSource/find", { params: { id: this.$route.params.id } })
        .then(res => {
          this.model = res.data.content;
        });
    }
  },
  methods: {
    run() {
      this.data = this.$refs.form.getEntity();
      this.visible = true;
    },
    ok() {
      let sql = this.data.content;
      for (let key in this.params) {
        sql = sql.replace("${" + key + "}", `'${this.params[key]}'`);
      }
      axios.get("/api/common/query", { params: { sql: sql } }).then(res => {
        this.visible = false;
        this.$nextTick(() => {
          this.show = true;
          this.result = JSON.stringify(res.data, null, 4);
        });
      });
    },
    save() {

      let url = '/api/dataSource/add';

      if(this.model.id) {
        url = "/api/dataSource/update";
      }

      axios.post(url, this.model).then(res => {
        if (res.data.code == 10000) {
          this.$Message.success("保存成功！");
          this.$router.push({ path: "/main/data-source/list" });
        }
        else {
          this.$Message.error(res.data.msg);
        }
      }).catch(() => {
         this.$Message.error("操作失败");
      });
    }
  }
};
</script>
<style scoped>
.result {
  display: block;
  outline: none;
  width: 100%;
  height: 300px;
  overflow: auto;
  border: none;
  resize: none;
}
</style>
