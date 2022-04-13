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
      <q-range
        v-bind="$attrs"
        v-on="$listeners"
        @input="onInput"
        @change="onChange"
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
      </q-range>
    </template>
  </q-field>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  props: ['outerLabel'],
  inject: ['eventBus'],
  computed: {
    canClear () {
      return (this.$attrs['clear-value'] &&
        this.$attrs['value'] &&
        (this.$attrs['value'].min !== this.$attrs.min ||
          this.$attrs['value'].max !== this.$attrs.max))
    }
  },
  methods: {
    onInput (value) {
      this.eventBus.$emit('input', this, value)
    },
    onChange (value) {
      this.eventBus.$emit('change', this, value)
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
      this.$attrs.value.min = (val && val.min) || null
      this.$attrs.value.max = (val && val.max) || null
      this.onClear((val && val.min) || null)
    }
  },
  inheritAttrs: false
}
</script>
