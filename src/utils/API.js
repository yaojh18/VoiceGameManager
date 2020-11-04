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
        path: "/api/manager/",
        method: "post"
    },
    DELETE: {
        path: "/api/manager/",
        method: "delete",
    },
    USER:{
        path:"/api/users/",
        method: "get",
    },
    MODIFYUSER: {
        path:"/api/users/",
        method: "put",
    },
    EDIT: {
        path: "/api/manager/edit/",
        method: "post"
    },
    SEARCH: {
        path: "/api/manager/search/",
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
        path: "/api/manager/",
        method: "get"
    },

}

export default API