<script setup lang="ts">
import test from '@components/test.vue';
import MonacoEditor from './components/monaco-editor/MonacoEditor.vue';
</script>

<template>
  <test>
    <div class="box-slot">
      slot
    </div>
  </test>
  <MonacoEditor/>
</template>

<style scoped>
.box-slot {
  width: 200px;
  height: 200px;
  max-width: 300px;
  min-width: 100px;
}
</style>
