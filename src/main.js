import { createAuth0 } from '@auth0/auth0-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store).use(router)
app.use(
  createAuth0({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
    redirect_uri: `${window.location.origin}`,
    responseType: 'id_token token'
  })
)
app.mount('#app')
