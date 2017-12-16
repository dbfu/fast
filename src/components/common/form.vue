<template>
    <el-form ref="myForm" :model="model" label-width="80px">
        <el-row :gutter="gutter">
            <el-col :span="item.span?item.span:span" v-for="item in fileds" :key="item.key">
                <el-form-item :label="item.title" :prop="item.key">

                    <el-input v-if="item.type == 'input'"  size="small" v-model="model[item.key]" :disabled="!!item.disabled" :style="item.style"/>

                    <el-input v-else-if="item.type == 'textarea'" type="textarea" :rows="item.rows?item.rows:4" v-model="model[item.key]" :disabled="!!item.disabled" class="overflowhide" :style="item.style" resize="none" />

                    <el-select v-else-if="item.type == 'select'" :disabled="!!item.disabled" size="small" @focus="focus(item)"   v-model="model[item.key]" :placeholder="item.placeholder?item.placeholder:''" :style="item.style">
                        <el-option
                          v-for="o in listData[item.bind]"
                          :key="o[item.value]"
                          :label="o[item.text]"
                          :value="o[item.value]">
                        </el-option>
                    </el-select>

                    <el-input v-else-if="!item.type"  size="small" v-model="model[item.key]" :style="item.style"/>
                </el-form-item>
            </el-col>
            <slot></slot>
        </el-row>
    </el-form>
</template>
<script>
import axios from "axios";
export default {
  props: {
    gutter: {
      default: 20,
      type: Number
    }, //元素间隔
    rowCount: {
      default: 3,
      type: Number
    }, //一行显示多少个元素
    fileds: {
      default() {
        return [];
      },
      type: Array
    },
    model: {
      default() {
        return {};
      },
      type: Object
    }
  },
  data() {
    return {
      listData: []
    };
  },
  created() {
    this.fileds.map(item => {
      if (item.type == "input") {
        this.$set(this.model, item.key, item.defaultValue);
      }
    });
  },
  computed: {
    span() {
      if (this.rowCount) {
        return 24 / this.rowCount;
      } else {
        return 8;
      }
    }
  },
  watch: {},
  methods: {
    reset() {
      this.$refs.myForm.resetFields();
    },
    getEntity() {
      return this.model;
    },
    focus(item) {
      if (this.listData[item.bind]) return;

      console.log(item);

      if (item.url) {
        axios.get(item.url).then(res => {
          this.$set(this.listData, item.bind, res.data.content);
        });
      } else if (item.options && item.options.length) {
        this.$set(this.listData, item.bind, item.options);
      } else {
        //todo
      }
    }
  }
};
</script>
<style>
  .overflowhide {
    overflow:hidden;
  }
</style>