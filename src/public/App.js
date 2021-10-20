import { createApp } from 'vue'

import rootComponent from './App.vue'
import globalComponents from './globalComponents'

const app = createApp(rootComponent);
globalComponents.forEach(comp => app.component(comp.name, comp))

app.mount('#app');
