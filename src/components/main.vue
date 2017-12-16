<template>
<div>
  <db-header @toggle="toggle"></db-header>
  <div class="container">
    <el-menu
      :collapse="isCollapse"
      :default-active="select"
      class="el-menu-vertical-demo"
      background-color="#272822"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <db-menu :model="item" :index="item.route?item.route:''" v-for="(item,index) in menus" :key="item.route?item.route:index">
      </db-menu>
    </el-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>
<script>
import Menu from "./common/menu";
import Header from "./common/header";
export default {
  components: {
    "db-menu": Menu,
    "db-header": Header
  },
  data() {
    return {
      select: "",
      menus: [
        {
          title: "设置",
          icon: "el-icon-setting",
          route: "/main",
          children: [
            {
              title: "数据源管理",
              route: "/main/data-source"
            },
            {
              title: "导航二",
              icon: "el-icon-location",
              route: "/main/index3"
            }
          ]
        },
        {
          title: "导航一",
          icon: "el-icon-location",
          route: "/main/index4",
          children: [
            {
              title: "导航一",
              icon: "el-icon-location",
              route: "/main/index5"
            },
            {
              title: "导航二",
              icon: "el-icon-location",
              route: "/main/index6"
            }
          ]
        }
      ],
      isCollapse: false
    };
  },
  mounted() {

    if (this.$route.path != "/") {
      let strArray = this.$route.path.split("/");
      if (strArray.length == 3) {
        this.select = this.$route.path;
      } else if (strArray.length == 4) {
        let str = this.$route.path.replace(
          "/" + strArray[strArray.length - 1],
          ""
        );
        this.select = str;
      }
    }
  },
  methods: {
    toggle(isCollapse) {
      this.isCollapse = isCollapse;
    }
  }
};
</script>
<style>
.container {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
.content {
  flex: 1;
  overflow: auto;
  background-color: #ecf0f5;
  padding: 2px 12px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  padding-top: 24px;
  width: 200px;
  height: 100%;
}
.el-menu-vertical-demo {
  padding-top: 24px;
  height: 100%;
}
#app .el-submenu .el-menu-item {
  height: 34px;
  line-height: 34px;
  padding: 0 45px;
  min-width: 200px;
}
#app .el-menu-item,
.el-submenu__title {
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
}
</style>
