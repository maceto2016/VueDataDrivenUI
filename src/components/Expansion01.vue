<template>
  <q-expansion-item
    v-on="$listeners"
    v-bind="$attrs"
    :header-class="this.headerClass || 'text-h6'"
    @input="onInput"
    @show="onShow"
    @before-show="onBeforeShow"
    @hide="onHide"
    @before-hide="onBeforeHide"
  >
    <slot></slot>
  </q-expansion-item>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  props: ['headerClass'],
  inject: ['eventBus'],
  methods: {
    onInput (value) {
      this.eventBus.$emit('input', this, value)
    },
    onShow (evt) {
      this.eventBus.$emit('show', this, evt)
    },
    onBeforeShow (evt) {
      this.eventBus.$emit('before-show', this, evt)
    },
    onHide (evt) {
      this.eventBus.$emit('hide', this, evt)
    },
    onBeforeHide (evt) {
      this.eventBus.$emit('before-hide', this, evt)
    }
  },
  inheritAttrs: false
}
</script>
