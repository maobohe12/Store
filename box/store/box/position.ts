import { computed, ref } from 'vue';

export const movePosition = (pos: { x: number, y: number }) => {
    const step = 100;
    // 移动方向:x:行 y:列  left y*step   top:x*step
    const position = computed(() => {
        return {
            left: pos.y * step + 'px',
            top: pos.x * step + 'px'
        }
    })
    return position;
}

interface Point {
    x: number;
    y: number;
}
//判断无序数组中对象是否相等
export const areArraysEqual = (a: Point[], b: Point[]) => {
    if (a.length !== b.length) return false;

    // 将对象数组转换为字符串数组并排序
    const stringifyAndSort = (arr: Point[]) =>
        arr.map(item => JSON.stringify(item)).sort();

    const aStr = stringifyAndSort(a);
    const bStr = stringifyAndSort(b);

    // 比较排序后的字符串数组
    return aStr.every((item, index) => item === bStr[index]);
}

export const ArraysEqual = (...num: Point[]) => {

    // 将对象数组转换为字符串数组并排序
    const stringifyAndSort = (arr: Point) =>
        JSON.stringify(arr);

    // const aStr = stringifyAndSort(a);
    // const bStr = stringifyAndSort(b);

    const arr: any = [];
    num.forEach(item => {
        arr.push(stringifyAndSort(item));
    })
    // console.log(arr);

    //传过去的长度和去重后的长度不相同  --碰箱子
    return new Set(arr).size != arr.length;
}
