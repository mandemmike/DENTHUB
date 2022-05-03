<template>
  <label :for="option">
    <input
      type="radio"
      :value="option"
      :id="option"
      @change="$parent.$emit('input', $event.target.value)"
      name="radio-input"
    />
    {{ option }}
  </label>
</template>

<script>
export default {
  props: {
    option: {
      required: true,
      type: String
    }
  },
  created() {
    this.time = this.option.substring(2, 5)
  },
  data() {
    return {
      time: null
    }
  }
}
</script>

<style scoped>
label {
  cursor: pointer;
}
</style>
