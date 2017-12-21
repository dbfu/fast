<template>
  <div>
    <ContentHeader title="用户管理">
      <Button @click="create" type="primary">新建</Button>
    </ContentHeader>
    <SearchForm :fileds="fileds" :model="model" @search="search"></SearchForm>
    <ContentBody>
      <db-table ref="table" url="/api/dataSource/list" :column="column"></db-table>
    </ContentBody>
    <SlideFrame @close="visible=false" :isShow="visible" @save="ok">
        <Run :model="data" :data="params"></Run>
    </SlideFrame>
    <Modal
        v-model="show"
        title="运行结果"
        :width="640">
        <div slot="footer"></div>
        <textarea  v-model="result" class="result"></textarea>
    </Modal>
  </div>
</template>
<script>
import Panel from "../common/panel";
import ContentHeader from "../common/content-header";
import SearchForm from "../common/search-form";
import ContentBody from "../common/content-body";
import Table from "../common/table";
import Run from "./run";
import SlideFrame from "../common/slide-frame";
import axios from "axios";

export default {
  components: {
    Panel,
    ContentHeader,
    SearchForm,
    ContentBody,
    "db-table": Table,
    Run,
    SlideFrame
  },
  data() {
    return {
      column: [
        {
          title: "名称",
          key: "title",
          isSerach: true
        },
        {
          title: "类型",
          key: "type",
          width: 100,
          render: (h, params) => {
            if (params.row.type == 1) {
              return h(
                "Tag",
                {
                  props: {
                    color: "green"
                  }
                },
                "增加"
              );
            } else if (params.row.type == 2) {
              return h(
                "Tag",
                {
                  props: {
                    color: "red"
                  }
                },
                "删除"
              );
            } else if (params.row.type == 3) {
              return h(
                "Tag",
                {
                  props: {
                    color: "yellow"
                  }
                },
                "修改"
              );
            } else if (params.row.type == 4) {
              return h(
                "Tag",
                {
                  props: {
                    color: "blue"
                  }
                },
                "查询"
              );
            }
          }
        },
        {
          title: "内容",
          key: "content",
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: {
                  content: params.row.content
                },
                className: ["text"]
              },
              params.row.content
            );
          }
        },
        {
          title: "创建时间",
          key: "create_time",
          type: "date"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          key: "action",
          width: 180,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.run(params.row);
                    }
                  }
                },
                "运行"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/main/data-source/add/" + params.row.id
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确定删除？",
                        onOk: () => {
                          this.$axios
                            .post("/api/dataSource/delete", {
                              id: params.row.id
                            })
                            .then(res => {
                              if (res.data.code == "10000") {
                                this.$Message.success("删除成功！");
                              } else {
                                this.$Message.error("删除失败！");
                              }
                              this.search();
                            });
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      fileds: [
        {
          title: "名称",
          key: "title"
        }
      ],
      data: {},
      params: {},
      visible: false,
      show: false,
      result: "",
      model: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    create() {
      this.$router.push({ path: "/main/data-source/add/0" });
    },
    run(row) {
      this.data = row;
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
    search() {
      this.$refs.table.search(this.fileds, this.model);
    }
  }
};
</script>
<style>
.ivu-table-cell .ivu-tooltip {
  width: 100%;
}
.ivu-table-cell .ivu-tooltip-rel {
  overflow: hidden;
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: ellipsis;
  width: 100%;
}
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
