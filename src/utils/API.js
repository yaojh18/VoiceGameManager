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
        path: "/api/manager/",
        method: "put"
    },
    SEARCH: {
        path: "/api/manager",
        method: "get"
    },
    LOGIN: {
        path: "/api/users/login/",
        method: "post"
    },
    REGISTER: {
        path: "/api/users/",
        method: "post"
    },
    GETLIST: {
        path: "/api/manager/",
        method: "get"
    },
    MODIFYY:{
        path:"/api/manager/",
        method: "put"
    },
    SINGLEANALYSIS:{
        path:"/api/manager/data/origin",
        method :"get"
    },
    MEDIAANALYSIS:{
        PATH:"/api/manager/data/origin",
        method: "get",
    },
    USERANALYSIS:{
        PATH:"/api/manager/data/user",
        method: 'get',
    },
    AUDIOANALYSIS:{
        PATH:"/api/manager/data/user_audio",
        method:'get',
    }
}

export default API