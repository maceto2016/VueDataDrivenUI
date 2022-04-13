<template>
  <q-form
    v-bind="$attrs"
    v-on="$listeners"
    @submit="onSubmit"
    @reset="onReset"
    @validation-success="onValidationSuccess"
    @validation-error="onValidationError"
  >
    <slot></slot>
  </q-form>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  inject: ['eventBus'],
  methods: {
    onSubmit (value) {
      this.eventBus.$emit('submit', this)
    },
    onReset (value) {
      this.eventBus.$emit('reset', this)
    },
    onValidationSuccess (value) {
      this.eventBus.$emit('validation-success', this)
    },
    onValidationError (value) {
      this.eventBus.$emit('validation-error', this)
    }
  },
  inheritAttrs: false
}
</script>
