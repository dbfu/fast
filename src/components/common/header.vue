<template>
  <header>
      <div class="left-section">
          <img v-if="!isExpand" class="icon-lg" src="https://cn.vuejs.org/images/logo.png"></img>
           <img v-else class="icon-mini" src="https://cn.vuejs.org/images/logo.png"></img>
      </div>
      <div class="right-section">
          <div class="icon-container" @click="expand">
            <i class="fa fa-bars icon" aria-hidden="true"></i>
          </div>
      </div>
  </header>
</template>
<script>
export default {
    data() {
        return {
            isExpand: false
        }
    },
    methods: {
        expand() {
            this.isExpand = !this.isExpand;
            this.isExpand?$(".left-section").animate({width:"64px"},300):$(".left-section").animate({width:"200px"},300);
            this.$emit("toggle",this.isExpand);
        }
    }
};
</script>
<style scoped>
header {
  height: 50px;
  display: flex;
}
header .left-section {
  height: 100%;
  background-color: #367fa9;
  width: 200px;
  text-align: center;
}
header .left-section .icon-lg {
    height: 40px;
    margin-top: 5px;
}
header .left-section .icon-mini {
     height: 30px;
    margin-top: 10px;
}
header .right-section {
  height: 100%;
  background-color: #3c8dbc;
  flex: 1;
}
header .right-section .icon-container {
  height: 50px;
  line-height: 50px;
  width: 40px;
  text-align: center;
  cursor: pointer;
  background-color: #3c8dbc;
  color: #fff;
  
}
header .right-section .icon-container:hover {
    background-color: #367fa9;
    color: #f6f6f6;
}
</style>
