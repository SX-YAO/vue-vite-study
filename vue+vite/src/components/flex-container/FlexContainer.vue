<template>
  <div :class="`flex-container_${props.direction}`" class="flex-container" v-if="slotComponentList && slotComponentList.length > 0" >
    <template v-for="(item, index) in slotComponentList" :key="index">
      <component :is="item" class="flex-box"></component>
      <div v-if="index !== slotComponentList.length - 1" :class="`line_${props.direction}`" class="line" @mousedown="mouseDownEvent"></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

interface IProps {
  direction: 'row' | 'column';
}

enum EDirectionType {
  row = 'row',
  column = 'column',
}

const props = defineProps<IProps>();

const solts = useSlots();

const slotComponentList = solts.default?.();

const startXY = {
  x: 0,
  y: 0,
};

const mouseDownEvent = (e: MouseEvent): void => {
  const dom = e.target as HTMLElement;
  const prevSibling = dom.previousElementSibling as HTMLElement;
  const nextSibling = dom.nextElementSibling as HTMLElement;
  startXY.x = e.screenX;
  startXY.y = e.screenY;
  const mouseMoveEvent = (event: MouseEvent): void => {
    const moveXY = { x: event.screenX - startXY.x, y: event.screenY - startXY.y };
    const layoutType = {
      [EDirectionType.row]:{
        max: 'max-width',
        min: 'min-width',
        offset: 'offsetWidth',
        move: moveXY.x,
      },
      [EDirectionType.column]: {
        max: 'max-height',
        min: 'min-height',
        offset: 'offsetHeight',
        move: moveXY.y,
      },
    };
    const dragging = (layout: 'row' | 'column'): void => {
      const type = layoutType[layout];
      const totalEleLength = prevSibling[type.offset] + nextSibling[type.offset];
      const prevLimit = {
        max: parseFloat(getComputedStyle(prevSibling)?.[type.max]),
        min: parseFloat(getComputedStyle(prevSibling)?.[type.min]),
      };
      const nextLimit = {
        max: parseFloat(getComputedStyle(nextSibling)?.[type.max]),
        min: parseFloat(getComputedStyle(nextSibling)?.[type.min]),
      };
      // 相邻盒子最大最小宽度限制判断
      if (type.move < 0) {
        const isOverPrevMinLimit = prevLimit.min && prevSibling[type.offset] + type.move <= prevLimit.min;
        const isOverNextMaxLimit = nextLimit.max && nextSibling[type.offset] - type.move >= nextLimit.max;
        if (isOverPrevMinLimit) {
          type.move = prevLimit.min - prevSibling[type.offset];
        }
        if (isOverNextMaxLimit) {
          type.move = nextSibling[type.offset] - nextLimit.max;
        }
      } else if (type.move > 0) {
        const isOverPrevMaxLimit = prevLimit.max && prevSibling[type.offset] + type.move >= prevLimit.max;
        const isOverNextMinLimit = nextLimit.min && nextSibling[type.offset] - type.move <= nextLimit.min;
        if (isOverPrevMaxLimit) {
          type.move = prevLimit.max - prevSibling[type.offset];
        }
        if (isOverNextMinLimit) {
          type.move = nextSibling[type.offset] - nextLimit.min;
        }
      }
      prevSibling.style.flexBasis = prevSibling[type.offset] + type.move + 'px';
      nextSibling.style.flexBasis = nextSibling[type.offset] - type.move + 'px';
      if( (prevSibling[type.offset] + nextSibling[type.offset]) !==  totalEleLength ) {
        const errorLength = prevSibling[type.offset] + nextSibling[type.offset] - totalEleLength;
        if ((type.move > 0 && errorLength > 0) || (type.move < 0 && errorLength < 0)) {
          prevSibling.style.flexBasis = prevSibling[type.offset] - errorLength + 'px';
        } else {
          nextSibling.style.flexBasis = nextSibling[type.offset] - errorLength + 'px';
        }
      }
    };
    dragging(props.direction);
    startXY.x = event.screenX;
    startXY.y = event.screenY;
  };
  const mouseupEvent = (): void => {
    window.removeEventListener('mousemove', mouseMoveEvent);
    window.removeEventListener('mouseup', mouseupEvent);
  };
  window.addEventListener('mousemove', mouseMoveEvent);
  window.addEventListener('mouseup', mouseupEvent);
};
</script>
<style lang="scss" scope>
.flex-container {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid #333;

  &_row {
    flex-direction: row;
  }

  &_column {
    flex-direction: column;
  }

  .line {
    background: #f0f0f0;
    transition: 0.1s 0.1s;
    user-select: none;
    flex-shrink: 0;
    flex-basis: 2px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    &_row {
      width: 0;
      cursor: col-resize;
    }

    &_column {
      height: 0;
      cursor: row-resize;
    }
  }
}
</style>
