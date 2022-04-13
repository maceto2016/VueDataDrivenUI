<template>
  <q-card
    v-on="$listeners"
    v-bind="$attrs"
  >
    <div v-if="label">
      <q-card-section>
        <q-icon
          v-if="icon"
          class="on-left vertical-middle"
          size="sm"
          :name="icon"
        />
        <span :class="headerClassObject">{{label}}</span>
      </q-card-section>
      <q-separator inset />
    </div>
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  props: ['label', 'icon', 'headerClass'],
  inject: ['eventBus'],
  computed: {
    headerClassObject () {
      let ret = ['vertical-middle']
      ret.push(this.headerClass || 'text-h6')
      return ret
    }
  },
  inheritAttrs: false
}

</script>
