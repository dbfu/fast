<template>
   <el-submenu :index="index" v-if="isParent">
        <template slot="title">
          <i :class="[model.icon]"></i>
          <span>{{model.title}}</span>
        </template>
        <Menu :model="item" :index="item.route?item.route:''" v-for="(item,index) in model.children" :key="item.route?item.route:index"></Menu>
    </el-submenu>
    <el-menu-item :route="index" :index="index" v-else>
        <i class="el-icon-menu"></i>
        <span slot="title">{{model.title}}</span>
    </el-menu-item>
</template>
<script>
export default {
  name: "Menu",
  props: {
    model: Object,
    index: String
  },
  computed: {
    isParent() {
      return this.model.children && this.model.children.length;
    }
  }
};
</script>
