<template>
  <div class="content-header">
      <div class="content-header-left">
        <span class="title">{{title}}</span>
        <a v-if="showBack" @click="$router.go(-1)">返回上一级</a>
      </div>
      <div class="content-header-right">
        <slot></slot>
        <!-- <el-button size="mini" type="primary">新建</el-button> -->
        <!-- <el-button size="mini" type="primary">新建</el-button> -->
      </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        showBack:{
          default: false,
          type: Boolean
        }
    },
    methods:{
      back() {
        this.$router.go(-1);
      }
    }
};
</script>
<style scoped>
.content-header {
  line-height: 44px;
  padding-top: 0;
  height: 44px;
}
.content-header-left {
  float: left;
  left: 0;
  padding-left: 5px;
}
.content-header-right {
  float: right;
  padding-right: 5px;
}
.title {
  font-size: 16px;
  font-weight: 600;
  margin-right:2px; 
}
.clearfix {
  clear: both;
}
</style>
