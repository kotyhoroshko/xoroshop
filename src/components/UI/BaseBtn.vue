<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
    .btn {
        background: #418AF2;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        color: #FFFFFF;
        cursor: pointer;
        font-size: 14px;
        outline: none;
        line-height: 20px;
        padding: 7px 11px;

        &--del {
            background: #FFFFFF;
            border: 1px solid rgba(0, 0, 0, 0.2);
            color: #E61610;
            margin: 0 8px 0 auto;
        }

        &:disabled {
          background: rgba(0, 0, 0, 0.2);
          color: #fff;
        }
    }
</style>