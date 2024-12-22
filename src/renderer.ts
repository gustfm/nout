import { createApp } from "vue";
import App from "./App.vue";

import "./styles/main.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoFolder } from "oh-vue-icons/icons";

addIcons(CoFolder);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
