/**
 * 如果需要修改为正常上线模式，请注释下面mock的import代码
 * **/
//import "@/mock/index"
import API from '@/utils/API'


export const login = (usernameLogin, password) => fetch(API.LOGIN.path, {
        method: API.LOGIN.method,
        body: JSON.stringify({ usernameLogin, password }),
        headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
    .then((r) => r.data);
export const register = (usernameRegister, password, password2) => fetch(API.REGISTER.path, {
    method: API.REGISTER.method,
    body: JSON.stringify({ usernameRegister, password, password2 }),
    headers: { "Content-Type": "application/json" },
});
export const getList = () => fetch(API.GETLIST.path, {
    method: API.GETLIST.method,
    headers: { "Authorization": "" },
});
export const addmsg = (title, content, audio_path, video_path ) => fetch(API.ADD.path, {
    method: API.ADD.method,
    body: JSON.stringify({title:title,content:content,audio_path:audio_path,video_path:video_path}),
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": ""
    },
});