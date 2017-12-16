<template>
  <Panel>
      <div slot="body" style="padding:20px 10px;">
        <db-form ref="form" :fileds="fileds">
          <el-col :span="24" style="text-align:center;">
              <el-button @click="search" type="primary" style="width:64px;" size="small">搜索</el-button>
              <el-button @click="reset" type="default" style="width:64px;" size="small">重置</el-button>
            </el-col>
        </db-form>
      </div>
    </Panel>
</template>
<script>
import Panel from "./panel";
import Form from './form'
export default {
  props:{
    fileds: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Panel,
    "db-form": Form
  },
  methods: {
    search() {
      this.$emit("search");
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
