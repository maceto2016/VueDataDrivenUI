<template>
  <!--
    @remove="onRemove"
    @add="onAdd"
    @new-value="onNewValue"
    @filter="onFilter"
    @filter-abort="onFilterAbort"
    -->
  <q-select
    v-bind="$attrs"
    v-on="$listeners"
    @virtual-scroll="onVirtualScroll"
    @input="onInput"
    @clear="onClear"
    @focus="onFocus"
    @blur="onBlur"
    @popup-show="onPopupShow"
    @popup-hide="onPopupHide"
  >
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </q-select>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  inject: ['eventBus'],
  methods: {
    onVirtualScroll (details) {
      this.eventBus.$emit('virtual-scroll', this, details)
    },
    onClear (value) {
      this.eventBus.$emit('clear', this, value)
    },
    onInput (value) {
      this.eventBus.$emit('input', this, value)
    },
    onFocus (evt) {
      this.eventBus.$emit('focus', this, evt)
    },
    onBlur (evt) {
      this.eventBus.$emit('blur', this, evt)
    },
    /*,
        onRemove (details) {
          this.eventBus.$emit('remove', this, details)
        },
        onAdd (details) {
          this.eventBus.$emit('add', this, details)
        },
        onNewValue (InputValue, doneFn) {
          this.eventBus.$emit('new-value', this, InputValue, doneFn)
        },
        onFilter (InputValue, doneFn, abortFn) {
          this.eventBus.$emit('filter', this, InputValue, doneFn, abortFn)
        },
        onFilterAbort () {
          this.eventBus.$emit('filter-abort', this)
        },
    */
    onPopupShow (evt) {
      this.eventBus.$emit('popup-show', this, evt)
    },
    onPopupHide (evt) {
      this.eventBus.$emit('popup-hide', this, evt)
    }
  },
  inheritAttrs: false
}
</script>
