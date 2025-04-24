import { createApp } from 'vue'
import App from './App.vue'

//引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入el-message样式
import "element-plus/theme-chalk/el-message.css";

//创建大仓库
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);

//安装仓库
app.use(pinia);

//将element-plus提供的图标注册全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//挂载整个应用到app容器中
app.mount('#app');
