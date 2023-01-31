import Addto from "./components/Viewjob.vue";
import Login from "./components/login.vue";
import createjob from "./components/createjob.vue";
import applyjob from "./components/applyjob.vue";
import details from "./components/details.vue";
import applier from "./components/applier.vue";

export default[
    {path: '/', component: Login},
    {path: '/viewjob', component: Addto},
    {path: '/crtjob', component: createjob },
    {path: '/apply', component: applyjob},
    {path: '/details', component: details},
    {path: '/applier', component: applier},
]

