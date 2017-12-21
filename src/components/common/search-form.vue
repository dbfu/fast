<template>
  <Panel>
      <div slot="body" style="padding:20px 10px;">
        <db-form ref="form" :fileds="fileds" :model="model">
          <Col :span="24" style="text-align:center;">
              <Button @click="search" type="primary" style="width:64px;" >搜索</Button>
              <Button @click="reset" type="default" style="width:64px;" >重置</Button>
          </Col>
        </db-form>
      </div>
    </Panel>
</template>
<script>
import Panel from "./panel";
import Form from "./form";
export default {
  props: {
    fileds: {
      type: Array,
      default() {
        return [];
      }
    },
    model: {
      type: Object,
      default() {
        return {};
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
