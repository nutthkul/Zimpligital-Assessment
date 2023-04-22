import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "@/views/Homepage.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [
    // {
    //     path: "/",
    //     name: "Login",
    //     component: Login
    // },

    {
        path: "/register",
        name: "register",
        component: () => import ("@/views/registerForm.vue")
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import ("@/views/Profile.vue")
    },

    {
        path: "/payment",
        name: "payment",
        component: () => import ("@/components/Payment/index.vue")
    },
    {
        path: "/",
        component: Homepage,
        children: [
            {
                path: "/payment",
                name: "payment",
                component: () => import ("@/components/Payment/index.vue")
            },
            // {
            //     path: '/test',
            //     name: 'test',
            //     component: () => import ("@/views/test.vue")
            // },

            // {
            //     path: "/payment",
            //     name: "payment",
            //     component: () => import ("@/components/Payment/index.vue")
            // },
        ]
    },

    // {
    // path: '/',
    // name: 'Home',
    // component: Home
    // },
    // {
    // path: '/about',
    // name: 'About',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: function () {
    //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    // }
];

const router = new VueRouter({mode: "history", base: process.env.BASE_URL, routes});

export default router;
