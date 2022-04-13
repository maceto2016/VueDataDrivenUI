<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    @input="onInput"
    @clear="onClear"
    @focus="onFocus"
    @blur="onBlur"
    :mask="mask || '##/##/####'"
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

    <template v-slot:append>
      <q-icon
        name="event"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :title="getTitle"
            v-bind="$attrs"
            v-on="$listeners"
            @input="onInput2"
            :mask="dateMask || mask"
          />
        </q-popup-proxy>
      </q-icon>
    </template>

  </q-input>
</template>

<script>
import { date } from 'quasar'
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  props: ['titleFormat', 'dateMask', 'mask'],
  inject: ['eventBus'],
  data () {
    return {
      lastValue: null
    }
  },
  computed: {
    getTitle () {
      return (this.titleFormat && this.lastValue ? date.formatDate(date.extractDate(this.lastValue, this.dateMask || 'YYYY-MM-DD'), this.titleFormat) : null)
    },
    isoValue () {
      return this.lastValue ? date.formatDate(date.extractDate(this.lastValue, this.dateMask || 'YYYY-MM-DD'), 'YYYY-MM-DD') : null
    }
  },
  methods: {
    onInput (value) {
      this.lastValue = value
      this.eventBus.$emit('input', this, value)
    },
    onInput2 (value, reason, details) {
      this.lastValue = value
      this.$refs.qDateProxy.hide()
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
