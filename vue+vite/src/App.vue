<script setup lang="ts">
import test from '@components/test.vue';
import { DFS, a } from './utils/study.ts';
// import MonacoEditor from './components/monaco-editor/MonacoEditor.vue';


console.log(111, a('22234444556'));

</script>

<template>
  <test>
    <div class="box-slot">
      slot
    </div>
  </test>
  <!-- <MonacoEditor/> -->
</template>

<style scoped>
.box-slot {
  width: 200px;
  height: 200px;
  max-width: 300px;
  min-width: 100px;
}
</style>
