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

   <template
      v-slot:append
      v-if="canClear"
    >
      <q-icon
        name="cancel"
        class="cursor-pointer"
        @click="onDoClear($attrs['clear-value'])"
      />
    </template>

    <template v-slot:control>
      <q-rating
        ref="qRatingProxy"
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
      </q-rating>
    </template>
  </q-field>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  inject: ['eventBus'],
  computed: {
    canClear () {
      return (this.$attrs['clear-value'] !== undefined &&
        this.$refs.qRatingProxy !== undefined &&
        !isNaN(this.$refs.qRatingProxy.value))
    }
  },
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
    },
    onDoClear (val) {
      this.$refs.qRatingProxy.__set(NaN)
      this.onClear(NaN)
    }
  },
  inheritAttrs: false
}
</script>
