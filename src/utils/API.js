const API = {
    GET_MESSAGE_LIST:{
        path:"/api/manager/get_list/",
        method: "get"
    },
    POST_NEW_MESSAGE:{
        path:"/api/manager/add/",
        method: "post"
    },
    ADD: {
        path: "/api/manager/add/",
        method: "post"
    },
    EDIT: {
        path: "/api/manager/edit/",
        method: "post"
    },
    SEARCH: {
        path: "/api/manager/search/",
        method: "post"
    },
    DELETE: {
        path: "/api/manager/delete/",
        method: "post"
    },
    LOGIN: {
        path: "/api/users/login/",
        method: "post"
    },
    REGISTER: {
        path: "/api/users/registration/",
        method: "post"
    },
    GETLIST: {
        path: "/api/manager/get_list/",
        method: "get"
    }

}

export default API