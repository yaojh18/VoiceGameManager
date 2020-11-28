
const fetch = require('node-fetch')
import API from '@/utils/API'


export const login = (usernameLogin, password) => fetch(API.LOGIN.path, {
        method: API.LOGIN.method,
        body: JSON.stringify({ "username":usernameLogin, "password":password }),
        headers: { "Content-Type": "application/json" },
    });

export const registerBack = (usernameRegister, password, password2) => fetch(API.REGISTER.path, {
    method: API.REGISTER.method,
    body: JSON.stringify({ username:usernameRegister, password:password, password_confirm:password2 }),
    headers: { "Content-Type": "application/json" },
});

export const getList = (type_id) => fetch(API.GETLIST.path + String("?type_id=")+String(type_id), {
    method: API.GETLIST.method,
    headers: { "Authorization":"JWT "+localStorage.getItem('token')},
});
export const searchBack = (keyword) => fetch(API.SEARCH.path+String(keyword),{
    method: API.SEARCH.method,
    headers: {
        "Content-Type":"application/json",
        "Authorization": (localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    },
});

export const searchBackId2 = (data_id) =>fetch(API.SEARCH.path + "/" + String(data_id),{
    method: API.SEARCH.method,
    headers:{
        "Content-Type":"application/json",
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    },
});

export const AddBack = (formdata) => fetch(API.ADD.path,{
    method:API.ADD.method,
    body:formdata,
    headers:{
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    },
});


export const getUserMsg = () => fetch(API.USER.path,{
    method:  API.USER.method,
    headers:{
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):'',
    }
});

export const editUserMsg = (username,password,password_old) =>fetch(API.MODIFYUSER.path,{
    method:API.MODIFYUSER.method,
    body: JSON.stringify({
        "username":username,
        "password":password,
        "password_old":password_old,
    }),
    headers:{
        "Content-Type":"application/json",
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    }
});

export const editUserMsgWithoutPwd = (username,email,name) =>fetch(API.MODIFYUSER.path,{
    method:API.MODIFYUSER.method,
    body: JSON.stringify({
        "username":username,
        "email":email,
        "name":name
    }),
    headers:{
        "Content-Type":"application/json",
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    }
});

export const ModifyBack = (formdata,dataId) => fetch(API.MODIFYY.path +"/"+String(dataId)+"/",{
    method:API.MODIFYY.method,
    body:formdata,
    headers:{
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    },
});

export const DataUserSearch = (appendage) => fetch(API.USERANALYSIS.PATH + appendage,{
    method:API.USERANALYSIS.method,
    headers:{
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    }
});

export const DataAudioSearch = (appendage) => fetch(API.AUDIOANALYSIS.PATH + appendage,{
   method: API.AUDIOANALYSIS.method,
    headers:{
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    }
});

export const DataSingleSearch = (appendage) => fetch(API.SINGLEANALYSIS.path + "/" + String(appendage) + "/chart/",{
    method: API.SINGLEANALYSIS.method,
    headers:{
        "Authorization":(localStorage.getItem('token') !== '')?("JWT "+localStorage.getItem('token')):''
    }
})
