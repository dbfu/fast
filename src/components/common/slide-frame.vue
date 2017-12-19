<template>
 <div>
    <transition name="fade">
        <div @click="visible=false" class="box-modal" v-show="showModal"></div>
     </transition>
     <transition name="slide-fade" @before-enter="showModal=visible" @before-leave="showModal=visible">
        <div class="box-container" v-show="visible">
            <div class="box-header">测试数据源</div>
            <div class="box-content">
                <slot></slot>
            </div>
            <div class="box-footer">
                <Button @click="click" type="success">确定</Button>
                <Button @click="visible=false"  type="primary">取消</Button>
            </div>
        </div>
    </transition>
 </div>   
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false,
      visible: this.isShow
    };
  },
  computed: {
    className() {
      return this.isShow ? "move-in" : "move-out";
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.$emit("close");
      }
    },
    isShow(val) {
      this.visible = val;
    }
  },
  methods: {
    click() {
      this.$emit("save");
    }
  }
};
</script>
<style scoped>
.box-modal {
  position: fixed;
  top: -50px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
.box-container {
  position: absolute;
  top: -50px;
  bottom: 0;
  width: 45%;
  background-color: #fff;
  left: 55%;
  z-index: 1001;
}
.box-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 16px;
  background-color: #f2fafa;
  font-size: 16px;
}
.box-content {
  padding: 10px;
  overflow: auto;
}
.box-footer {
  position: absolute;
  bottom: 20px;
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: right;
  right: 20px;
}
.slide-fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

