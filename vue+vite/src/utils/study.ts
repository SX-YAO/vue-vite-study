// 简化版先假定value为数组
// 深度优先搜索

const _toString = Object.prototype.toString;

const DFS = (value: T): T => {
  const cloneValue = [];
  value.forEach((item, index) => {
    if(_toString.call(item).slice(8, -1) === 'Array') {
      cloneValue[index] = DFS[item];
    }
    cloneValue[index] = item;
  });
  return cloneValue;
};

// 广度优先搜索
const BFS = (value: T): T => {
  const cloneValue = [];
  // const tempValue = [...value];
  // const tempValue2 = [];
  // const isOver = false;
  // while(!isOver) {
  //   tempValue.forEach((item, index) => {
  //     if(_toString.call(item).slice(8, -1) === 'Array') {
  //       nodeObj[index] = item;
  //     }
  //     cloneValue[index] = item;
  //   });
  //   tempValue = [];
  //   isOver = nodeObj.keys().length === 0;
  // }
  
  return cloneValue;
};


const a = (str: string) => {
  const set1 = new Map();
  const set2 = new Map();
  for( let i = 0; i < str.length; i ++) {
    if (set2.has(str[i])) {
      continue;
    }
    if (set1.has(str[i])) {
      set1.delete(str[i]);
      set2.set(str[i], 1);
      continue;
    }
    set1.set(str[i],1);
  }
  return [...set1][0][0]; 
};

const flat = (array: Array<unknown>) => {
  return [...new Set([].concat(...array.map((item) => (Array.isArray(item) ? flat(item) : item))).sort((a, b) => a-b))];
};

// const flat2 = (array: Array<unknown>) => {
//   const newArray = [];
//   while(array.some((item) => item))
// }


const study30 = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return;
  }
  let index = 0;
  // 兜底
  for( let i = 0; i < arr2.length; i++ ) {
    const reg = new RegExp(arr2[i]);
    for(let k = index; k <= arr1.length; k++) {
      if (!reg.test(arr1[k])) {
        arr1.splice(k, 0, arr2[i]);
        index = k + 1;
        break;
      }
    }
  }
  return arr1;
};

export {
  DFS,
  BFS,
  a,
  flat,
  study30,
};