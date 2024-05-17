<script setup lang="ts">
import test from '@components/test.vue';
import { DFS, flat, study30 } from '@util';
// import MonacoEditor from './components/monaco-editor/MonacoEditor.vue';

// console.log(111, a('22234444556'));
// console.log(222, flat([2, 1, [4, 3, 2,[6]], 10, 20,10,  [12 , 11], 1]));

// for (var i = 0; i< 10; i++){
//   ((i) => {
//     setTimeout(() => {
//       console.log(i);
//     }, 1000);
//   })(i);
// }

// for (var i = 0; i< 10; i++){
//   setTimeout((i) => {
//     console.log(i);
//   }, 1000, i);
// }

var a = {
  i: 1,
  toString() {
    return this.i++;
  }
};

if( a == 1 && a == 2 && a == 3 ) {
  console.log(1);
}

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
