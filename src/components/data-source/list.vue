<template>
  <div>
    <ContentHeader title="用户管理">
      <el-button size="mini" @click="create" type="primary">新建</el-button>
      <el-button size="mini" type="primary">删除</el-button>
    </ContentHeader>
    <SearchForm></SearchForm>
    <ContentBody>
      <db-table url="/api/list" :column="column"></db-table>
    </ContentBody>
  </div>
</template>
<script>
import Panel from "../common/panel";
import ContentHeader from "../common/content-header";
import SearchForm from "../common/search-form";
import ContentBody from "../common/content-body";
import Table from "../common/table";

export default {
  components: {
    Panel,
    ContentHeader,
    SearchForm,
    ContentBody,
    "db-table": Table
  },
  data() {
    return {
      column: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "创建时间",
          key: "create_time"
        },
        {
          title: "备注",
          key: "remark"
        }
      ]
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
      this.$router.push({ path: "/main/data-source/add" });
    }
  }
};
</script>
<style scoped>

</style>
