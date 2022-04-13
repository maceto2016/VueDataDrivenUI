<template>
  <q-field v-bind="$attrs" v-on="$listeners" @focus="onFocus" @blur="onBlur">
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>

    <template v-slot:control>
      <q-btn-toggle
        v-bind="$attrs"
        v-on="$listeners"
        @input="onInput"
        @clear="onClear"
      >
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </q-btn-toggle>
    </template>
  </q-field>
</template>

<script>
import compInfo from "./_compInfo";

export default {
  mixins: [compInfo],
  inject: ["eventBus"],
  methods: {
    onInput(value) {
      this.eventBus.$emit("input", this, value);
    },
    onClear(value) {
      this.eventBus.$emit("clear", this, value);
    },
    onFocus(evt) {
      this.eventBus.$emit("focus", this, evt);
    },
    onBlur(evt) {
      this.eventBus.$emit("blur", this, evt);
    },
  },
  inheritAttrs: true,
};
</script>
