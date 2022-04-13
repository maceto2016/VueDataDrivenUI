<template>
  <q-field
    v-bind="$attrs"
    v-on="$listeners"
    :label="this.outerLabel"
    @focus="onFocus"
    @blur="onBlur"
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

    <template v-slot:control>
      <q-radio
        v-bind="$attrs"
        v-on="$listeners"
        @input="onInput"
        @clear="onClear"
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
      </q-radio>
    </template>
  </q-field>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  props: ['outerLabel'],
  inject: ['eventBus'],
  methods: {
    onInput (value) {
      this.eventBus.$emit('input', this, value)
    },
    onClear (value) {
      this.eventBus.$emit('clear', this, value)
    },
    onFocus (evt) {
      this.eventBus.$emit('focus', this, evt)
    },
    onBlur (evt) {
      this.eventBus.$emit('blur', this, evt)
    }
  },
  inheritAttrs: false
}
</script>
