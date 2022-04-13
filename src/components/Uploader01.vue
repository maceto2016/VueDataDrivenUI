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
        @click="onDoClear"
      />
    </template>

    <template v-slot:control>
      <q-uploader
        ref="qUploaderProxy"
        v-bind="$attrs"
        v-on="$listeners"
        @added="onAdded"
        @removed="onRemoved"
        @start="onStart"
        @finish="onFinish"
        @uploaded="onUploaded"
        @failed="onFailed"
        @uploading="onUploading"
        @factory-failed="onFactoryFailed"
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
      </q-uploader>
    </template>
  </q-field>
</template>

<script>
import compInfo from './_compInfo'

export default {
  mixins: [compInfo],
  props: ['outerLabel'],
  inject: ['eventBus'],
  data () {
    return {
      hasFiles: false
    }
  },
  computed: {
    canClear () {
      return (this.$attrs['_clearable'] &&
        this.hasFiles)
    }
  },
  methods: {
    onAdded (files) {
      this.eventBus.$emit('added', this, files)
      this.hasFiles = true
    },
    onRemoved (files) {
      this.eventBus.$emit('removed', this, files)
      this.hasFiles = this.$refs.qUploaderProxy.uploadSize > 0
    },
    onStart () {
      this.eventBus.$emit('start', this)
    },
    onFinish () {
      this.eventBus.$emit('finish', this)
      this.hasFiles = false
    },
    onUploaded (info) {
      this.eventBus.$emit('uploaded', this, info)
    },
    onFailed (info) {
      this.eventBus.$emit('failed', this, info)
    },
    onUploading (info) {
      this.eventBus.$emit('uploading', this, info)
    },
    onFactoryFailed (err, files) {
      this.eventBus.$emit('factory-failed', this, err, files)
    },
    onFocus (evt) {
      this.eventBus.$emit('focus', this, evt)
    },
    onBlur (evt) {
      this.eventBus.$emit('blur', this, evt)
    },
    onDoClear () {
      this.$refs.qUploaderProxy.reset()
      this.hasFiles = false
      this.onClear(null)
    }
  },
  inheritAttrs: false
}
</script>
