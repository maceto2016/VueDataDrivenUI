<template>
  <q-card
    v-on="$listeners"
    v-bind="$attrs"
    v-show="name == selected"
  >
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  props: ['name', 'selected'],
  inject: ['eventBus'],
  inheritAttrs: false
}
</script>
