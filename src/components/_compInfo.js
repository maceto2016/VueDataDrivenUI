/**
 * A simple mixin object that returns $props and $attrs in data field $$attrs
 */
export default {
  data() {
    return {
      $$attrs: {},
    };
  },
  methods: {
    _attrs() {
      return {
        ...this.$props,
        ...this.$attrs,
      };
    },
  },
  created() {
    this.$$attrs = this._attrs();
  },
};
