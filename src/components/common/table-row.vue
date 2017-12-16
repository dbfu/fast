

<script>
export default {
  props: {
    model: Object,
    index: String
  },

  render(h) {
    if (!this.model) return;
    
    if (this.model.render) {
      return this.model.render(h, this.model.row);
    } else {
      return h("span", this.model.row[this.index]);
    }
  }
};
</script>
