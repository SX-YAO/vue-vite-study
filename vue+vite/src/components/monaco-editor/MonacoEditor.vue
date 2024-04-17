<template>
  <div class="monaco-contaner" ref="monacoContaner"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor';

const monacoContaner = ref<HTMLElement>(null);

const monacoEditor = ref(null);

const language = ref('typescript');

// const code = ref('const noop = () => {}');

onMounted(() => {
  monacoEditor.value = monaco.editor.create(monacoContaner.value, {
    value: 'const noop = () => {}',
    model: monaco.editor.createModel('', language.value)
  });
});

onBeforeUnmount(() => {
  monacoEditor.value?.dispose();
});
</script>
<style lang="scss" scope></style>
