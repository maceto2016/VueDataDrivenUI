<template>
  <q-tab
    v-bind="$attrs"
    v-on="$listeners"
  >
  </q-tab>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  inject: ['eventBus'],
  inheritAttrs: false
}
</script>
