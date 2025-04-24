<template>
    <div class="center">
        <el-input class="add" v-model="content" @keyup.enter="Addlist()" placeholder="请输入计划" @input="handelInput"
            style="width: 80%;height: 50px;">
        </el-input>
        <div class="showClear" v-show="showClear" @click="clearInput">
            <el-icon>
                <CircleCloseFilled />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useListStore } from "../store/useStore";
import { ElMessage } from 'element-plus';

let content = ref('');
let showClear = ref(false);
let listStore = useListStore();

//input表单长度发生变化时触发--清空按钮显示/隐藏
const handelInput = () => {
    if (content.value.trim().length > 0) {
        showClear.value = true;
    }
    else {
        showClear.value = false;
    }
}

//按回车添加列表
const Addlist = () => {
    //如果长度不为空 添加
    if (content.value.trim().length > 0) {
        let nowList = {
            value: content.value,
            finish: false
        }

        //先判断内容是否有重复--还要和是否完成比较
        let result = 0;
        listStore.list.forEach(item => {
            if (item.value.trim() == nowList.value.trim() && item.finish == false) {
                result++;
            }
        })
        if (result === 0) {
            listStore.addList(nowList);
            ElMessage({
                type: 'success',
                message: '计划添加成果'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '当前计划已存在'
            })
        }
    }
    else {
        //长度为空弹出提示框
        ElMessage({
            type: 'error',
            message: '输入为空，请重新输入'
        })
    }

    //清空清空
    content.value = '';
    showClear.value = false;
}

//清空input
const clearInput = () => {
    content.value = '';
    showClear.value = false;
}
</script>

<style lang="scss" scoped>
.center {
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    //深度选择器 -在使用样式插件的情况下 修改样式
    :deep(.add .el-input__wrapper) {
        border-radius: 20px;
        font-size: 16px;
    }

    .showClear {
        position: absolute;
        right: 50px;
        font-size: 20px;

        &:hover {
            cursor: pointer;
        }
    }

}
</style>