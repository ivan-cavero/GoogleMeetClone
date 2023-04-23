<template>
  <el-dialog v-model="visible" @close="closeDialog" title="Manage Account">
    <el-tabs>
      <el-tab-pane label="Profile" name="profile">
        <h1>aaaaaaaaaaaaaaa</h1>
      </el-tab-pane>
      <el-tab-pane label="Statistics" name="statistics">

      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    user: Object
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const visible = ref(props.modelValue)

    watch(() => props.modelValue, (newValue) => {
      visible.value = newValue
    })

    const closeDialog = () => {
      emit('update:modelValue', false)
    }

    return {
      visible,
      closeDialog
    }
  }
}
</script>
