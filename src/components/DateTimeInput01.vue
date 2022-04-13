<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    @input="onInput"
    @clear="onClear"
    @focus="onFocus"
    @blur="onBlur"
    :mask="mask || '##/##/#### ##:##:##'"
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

    <template v-slot:prepend>
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
            :title="getDateTitle"
            v-bind="$attrs"
            v-on="$listeners"
            @input="onInput2"
            :mask="dateMask || mask"
          />
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon
        name="access_time"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="qTimeProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-time
            :title="getTimeTitle"
            v-bind="$attrs"
            v-on="$listeners"
            @input="onInput3"
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
  props: ['dateTitleFormat', 'timeTitleFormat', 'dateMask', 'mask'],
  inject: ['eventBus'],
  data () {
    return {
      lastValue: null
    }
  },
  computed: {
    getDateTitle () {
      return (this.dateTitleFormat && this.lastValue ? date.formatDate(date.extractDate(this.lastValue, this.dateMask || 'YYYY-MM-DD'), this.dateTitleFormat) : null)
    },
    getTimeTitle () {
      return (this.timeTitleFormat && this.lastValue ? date.formatDate(date.extractDate(this.lastValue, this.timeMask || 'HH:mm'), this.timeTitleFormat) : null)
    },
    isoValue () {
      return this.lastValue ? date.formatDate(date.extractDate(this.lastValue, this.dateMask || 'YYYY-MM-DD HH:mm'), 'YYYY-MM-DD HH:mm:ss.SSS') : null
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
    onInput3 (value, reason, details) {
      this.lastValue = value
      this.$refs.qTimeProxy.hide()
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
