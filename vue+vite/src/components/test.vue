<script setup lang="ts">
import FlexContainer from '@components/flex-container/FlexContainer.vue';
</script>

<template>
  <FlexContainer direction="column">
    <slot></slot>
    <div class="box1">
      slotA
    </div>
    <div class="box2">
      slotA
    </div>
  </FlexContainer>
</template>

<style scoped>
.box1 {
  width: 200px;
  height: 200px;
}
.box2 {
  width: 200px;
  height: 200px;
}

.box3 {
  width: 200px;
  height: 200px;
}

.box4 {
  width: 200px;
  height: 200px;
}
</style>
