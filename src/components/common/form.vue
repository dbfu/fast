<template>
    <Form  ref="myForm" :model="model" :label-width="80">
        <Row :gutter="gutter">
            <Col :span="item.span?item.span:span" v-for="item in fileds" :key="item.key">
                <FormItem  :label="item.title" :prop="item.key">

                    <Input v-if="item.type == 'input'"  v-model="model[item.key]" :disabled="!!item.disabled" :style="item.style"/>

                    <Input v-else-if="item.type == 'textarea'" type="textarea" :rows="item.rows?item.rows:4" v-model="model[item.key]" :disabled="!!item.disabled" class="overflowhide" :style="item.style" resize="none" />

                    <Select  v-else-if="item.type == 'select'" :disabled="!!item.disabled"   v-model="model[item.key]" :placeholder="item.placeholder?item.placeholder:''" :style="item.style">
                        <Option 
                          v-for="o in listData[item.bind]"
                          :key="o[item.value]"
                          :value="o[item.value]">{{o[item.text]}}
                        </Option>
                    </Select >

                    <Input v-else-if="!item.type"   v-model="model[item.key]" :style="item.style"/>
                </FormItem>
            </Col>
            <slot></slot>
        </Row>
    </Form >
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
  watch: {
    fileds(value) {
      this.focus();
    }
  },
  created() {
    this.focus();
  },
  methods: {
    reset() {
      this.$refs.myForm.resetFields();
    },
    getEntity() {
      return this.model;
    },
    focus() {
      this.fileds.map(item => {
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
      });
    }
  }
};
</script>
<style>
.overflowhide {
  overflow: hidden;
}
</style>