<template>
  <div 
    class="broad-cast-channel" 
    ref="moveBox" 
    :style="{ transform: boxTransform }" 
    @mousedown="onMouseDown"
  >
    <p>Text Color</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed,onMounted, onBeforeUnmount } from 'vue';

let broadCastChannel: BroadcastChannel;

const moveBox = ref<HTMLElement>();

const translateXY = reactive({
  x: 0,
  y: 0,
});

const startXY = {
  x: 0,
  y: 0,
};

const boxTransform = computed<string>(() => `translate(${translateXY.x}px, ${translateXY.y}px)`);

const handleMessage = ({ data }: Record<string, number>): void => {
  // ..
  console.log(1111, '接受信息', data);
};

const postMessage = (data: unknown): void => {
  broadCastChannel.postMessage(data);
};

const dragging = (e): void => {
  const moveX = e.screenX - startXY.x;
  const moveY = e.screenY - startXY.y;
  startXY.x = e.screenX;
  startXY.y = e.screenY;

  translateXY.x += moveX;
  translateXY.y += moveY;
  postMessage(startXY);
};


const reMoveEvent = (): void => {
  window.removeEventListener('mousemove', dragging);
  window.removeEventListener('mouseup', reMoveEvent);
};

const onMouseDown = (event): void => {
  startXY.x = event.screenX;
  startXY.y = event.screenY;
  window.addEventListener('mousemove', dragging);
  window.addEventListener('mouseup', reMoveEvent);
};

const init = (): void => {
  broadCastChannel = new BroadcastChannel('broadcast');
  broadCastChannel.addEventListener('message', handleMessage);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  reMoveEvent();
  broadCastChannel.removeEventListener('message', handleMessage);
  broadCastChannel.close();
});
</script>
<style lang="scss" scope>
.broad-cast-channel {
  width: 100px;
  height: 100px;
  border: 1px solid #333;
  z-index: 100;
  box-sizing: border-box;
  --bg: #ffcc00;
  background-color: var(--bg);

  p {
    color: rgb(from var(--bg) calc(1 - r) calc(1 - g) calc(1 - b)); //基于背景色反转颜色
    // color-contrast 还是一个实验功能，未大规模兼容
    color: color-contrast(var(--bg) vs #fff, #000) // 基于背景色选择 #fff 、 #000 中对比度更高的颜色
  }
}
</style>
