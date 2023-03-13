<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background: #fff;
  padding: 24px 32px;
  margin: 0;
  min-height: 100vh;
  position: relative;

  &--dark {
    background: #2C3D39;
  }

  &--edit {
    padding-top: 75px;

    @media screen and (min-width: 480px) {
      padding-left: 120px;
      padding-top: 24px;
    }
  }
}
</style>>