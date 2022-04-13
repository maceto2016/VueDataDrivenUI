<template>
  <q-field
    v-bind="$attrs"
    v-on="$listeners"
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
      <q-time
        :title="getTitle"
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
      </q-time>
    </template>
  </q-field>
</template>

<script>
import { date } from 'quasar'
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  props: ['titleFormat'],
  inject: ['eventBus'],
  data () {
    return {
      lastValue: null
    }
  },
  computed: {
    getTitle () {
      return (this.titleFormat && this.lastValue ? date.formatDate(this.lastValue, this.titleFormat) : null)
    }

  },
  methods: {
    onInput (value, details) {
      this.lastValue = value
      this.eventBus.$emit('input', this, value, details)
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
