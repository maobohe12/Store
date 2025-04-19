<template>
    <div class="bottom">
        <el-tabs class="tabs" v-model="activeName">
            <el-tab-pane label="全部" name="first">
                <template v-for="(item, index) in listStore.list" :key="index">
                    <div class="list">{{ item.value }}
                        <span class="edit" @click="edit(index)" v-if="item.finish == false">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        <span :class="item.finish == true ? 'finish' : 'unfinish'"
                            @click="item.finish == true ? CancelClick(index) : FinishClick(index)">
                            <el-icon v-if="item.finish == true">
                                <CircleCheck />
                            </el-icon>
                        </span>
                        <span class="delete" @click="DeleteClick(index)">
                            <el-icon>
                                <CircleCloseFilled />
                            </el-icon>
                        </span>
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label=" 待完成" name="second">
                <template v-for="(item, index) in listStore.list" :key="index">
                    <div class="list" v-if="item.finish == false">{{ item.value }}
                        <span class="edit" @click="edit(index)">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </span>
                        <span class="unfinish" @click="FinishClick(index)"></span>
                        <span class="delete" @click="DeleteClick(index)">
                            <el-icon>
                                <CircleCloseFilled />
                            </el-icon>
                        </span>
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="third">
                <template v-for="(item, index) in listStore.list" :key="index">
                    <div class="list" v-if="item.finish == true">{{ item.value }}
                        <span class="finish" @click="CancelClick(index)">
                            <el-icon>
                                <CircleCheck />
                            </el-icon>
                        </span>
                        <span class="delete" @click="DeleteClick(index)">
                            <el-icon>
                                <CircleCloseFilled />
                            </el-icon>
                        </span>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
        <el-popconfirm title="确定清空全部计划?" @confirm="DeleteAll">
            <template #reference>
                <el-button class="button">清空全部计划</el-button>
            </template>
        </el-popconfirm>
        <el-dialog v-model="openEdit" title="更改计划" width="500" center>
            <el-form>
                <el-form-item>
                    <el-input v-model="listStore.list[num].value" type="textarea" />
                </el-form-item>
            </el-form>
            <!-- 插槽控制-表单底部 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="openEdit = false">取消</el-button>
                    <el-button type="primary" @click="Change">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useListStore } from "../store/useStore";
import { ElMessage } from 'element-plus';
const listStore = useListStore();

const activeName = ref('first');

//控制编辑框显示/隐藏
const openEdit = ref(false);
//获取编辑时的列表序号
const num = ref();

//未完成变为已完成
const FinishClick = (index: number) => {
    listStore.list[index].finish = true;
    ElMessage({
        type: 'success',
        message: '计划已完成'
    })
}
//已完成删除
const DeleteClick = (index: number) => {
    listStore.deleteList(index);
    ElMessage({
        type: 'success',
        message: '计划已删除'
    })
}
//已完成取消
const CancelClick = (index: number) => {
    listStore.list[index].finish = false;
    ElMessage({
        type: 'error',
        message: '计划未完成'
    })
}

//编辑内容
const edit = (index: number) => {
    openEdit.value = true;
    //获取序号
    num.value = index;
}

const Change = () => {
    openEdit.value = false;
    ElMessage({
        type: 'success',
        message: '计划修改成功'
    })
}

//清空全部计划
const DeleteAll = () => {
    listStore.list.length = 0;
}
</script>

<style scoped lang="scss">
.bottom {
    height: 410px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .tabs {
        flex: 95%;
        width: 80%;

        .list {
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: white;
            margin-top: 5px;
            padding-left: 30px;
            padding-right: 45px;
            border-radius: 15px;
            position: relative;
            font-size: 16px;
            color: #606266;
            /* whitte-space：nowrap-强制一行显示 */
            white-space: nowrap;

            /* overflow：hidden-溢出部分隐藏 */
            overflow: hidden;

            /* 溢出部分省略号表示*/
            text-overflow: ellipsis;

            .delete {
                position: absolute;
                right: 10px;
                font-size: 16px;

                &:hover {
                    cursor: pointer;
                }
            }

            .finish {
                position: absolute;
                left: 10px;
                font-size: 16px;
                margin-top: 2px;
                color: #41b482;

                &:hover {
                    cursor: pointer;
                }
            }

            .unfinish {
                position: absolute;
                left: 10px;
                top: 19px;
                width: 14px;
                height: 14px;
                border: 1px solid gold;
                border-radius: 7px;

                &:hover {
                    cursor: pointer;
                }
            }

            .edit {
                position: absolute;
                right: 35px;
                font-size: 16px;
                color: skyblue;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .button {
        flex: 5%;
        margin-right: 230px;
    }

}
</style>