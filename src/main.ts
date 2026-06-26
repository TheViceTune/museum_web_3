import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import slideIn from './directives/slideIn'

const app = createApp(App)
app.directive('slide-in', slideIn)
app.use(router)
app.mount('#app')