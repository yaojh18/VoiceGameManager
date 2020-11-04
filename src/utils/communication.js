/**
 * 如果需要修改为正常上线模式，请注释下面mock的import代码
 * **/
//import "@/mock/index"
import API from '@/utils/API'


export const login = (usernameLogin, password) => fetch(API.LOGIN.path, {
        method: API.LOGIN.method,
        body: JSON.stringify({ "username":usernameLogin, "password":password }),
        headers: { "Content-Type": "application/json" },
    });
export const registerBack = (usernameRegister, password, password2) => fetch(API.REGISTER.path, {
    method: API.REGISTER.method,
    body: JSON.stringify({ username:usernameRegister, password:password, password2:password2 }),
    headers: { "Content-Type": "application/json" },
});
export const getList = () => fetch(API.GETLIST.path, {
    method: API.GETLIST.method,
    headers: { "Authorization":"JWT "+localStorage.getItem('token')},
}).then((res)=>res.json());
export const searchBack = (keyword) => fetch(API.SEARCH.path,{
    method: API.SEARCH.method,
    body:JSON.stringify({'keyword':keyword}),
    headers: {
        "Content-Type":"application/json",
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const searchBackId = (level_id) => fetch(API.SEARCH.path,{
    method: API.SEARCH.method,
    body:JSON.stringify({'level_id':level_id}),
    headers: {
        "Content-Type":"application/json",
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const addmsg = (title, content, audio_path, video_path ) => fetch(API.ADD.path, {
    method: API.ADD.method,
    body: {title:title,content:content,audio_path:audio_path,video_path:video_path},
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const getUserMsg = () => fetch(API.USER.path,{
    method:  API.USER.method,
    headers:{
        "Authorization":"JWT "+localStorage.getItem('token'),
    }
});
export const editUserMsg = (username,password,password_old,email,name) =>fetch(API.MODIFYUSER.path,{
    method:API.MODIFYUSER.method,
    body: {
        'username':username,
        'password':password,
        'password_old':password_old,
        'email':email,
        'name':name
    },
    headers:{
        "Authorization":"JWT "+localStorage.getItem('token')
    }
})