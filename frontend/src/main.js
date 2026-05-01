import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import the router


// @import 'bootstrap-icons/font/bootstrap-icons.css';





// Create and mount the Vue app
createApp(App)
  .use(router) // Use the router in the app
  .mount("#app");
