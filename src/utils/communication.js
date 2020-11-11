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
    body: JSON.stringify({ username:usernameRegister, password:password, password_confirm:password2 }),
    headers: { "Content-Type": "application/json" },
});
export const getList = (type_id) => fetch(API.GETLIST.path + String("?type_id=")+String(type_id), {
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
export const searchBackIdLevel = (level_id) => fetch(API.SEARCH.path + "/" + String(level_id),{
    method: API.SEARCH.method,
    headers: {
        "Content-Type":"application/json",
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const searchBackId = (data_id) => fetch(API.SEARCH.path + "?level_id=" + String(data_id),{
    method: API.SEARCH.method,
    headers: {
        "Content-Type":"application/json",
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const AddBack = (formdata) => fetch(API.ADD.path,{
    method:API.ADD.method,
    body:formdata,
    headers:{
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const addmsg = (title, content, audio_path, video_path ) => fetch(API.ADD.path, {
    method: API.ADD.method,
    body: {title:title,content:content,audio_path:audio_path,video_path:video_path},
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":"JWT "+localStorage.getItem('token'),
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
    body: JSON.stringify({
        "username":username,
        "password":password,
        "password_old":password_old,
        "email":email,
        "name":name
    }),
    headers:{
        "Content-Type":"application/json",
        "Authorization":"JWT "+localStorage.getItem('token')
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
        "Authorization":"JWT "+localStorage.getItem('token')
    }
});
export const deleteMsg = (data_id) => fetch(API.DELETE.path+String(data_id),{
    method:API.DELETE.method,
    headers: {
        "Content-Type":"application/json",
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const EditMsg = (data_id,level_id,title,content,audio_path,video_path) => fetch(API.EDIT.path+String(data_id),{
    method:API.EDIT.method,
    body: JSON.stringify({
        "title":title,
        "content":content,
        "audio_path":audio_path,
        "video_path":video_path,
        "level_id":level_id,
    }),
    headers: {
        "Content-Type":"application/json",
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const ModifyBack = (formdata,dataId) => fetch(API.MODIFYY.path +"/"+String(dataId),{
    method:API.MODIFYY.method,
    body:formdata,
    headers:{
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const DataVideoSearch = (appendage)=>fetch(String(appendage),{
    method:API.MEDIAANALYSIS.method,
    headers:{
        "Authorization":"JWT "+localStorage.getItem('token')
    },
});
export const DataUserSearch = (appendage) => fetch(String(appendage),{
    method:API.USERANALYSIS.method,
    headers:{
        "Authorization":"JWT "+localStorage.getItem('token')
    }
});
export const DataAudioSearch = (appendage) => fetch( String(appendage),{
   method: API.AUDIOANALYSIS.method,
    headers:{
        "Authorization":"JWT "+localStorage.getItem('token')
    }
});
export const DataSingleSearch = (appendage) => fetch(API.SINGLEANALYSIS.path + String(appendage),{
    method: API.SINGLEANALYSIS.method,
    headers:{
        "Authorization":"JWT "+localStorage.getItem('token')
    }
})
