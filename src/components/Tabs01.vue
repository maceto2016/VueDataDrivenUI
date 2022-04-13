<template>
  <q-tabs
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </q-tabs>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  inject: ['eventBus'],
  inheritAttrs: false
}
</script>
