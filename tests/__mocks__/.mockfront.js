import {
    GET_MESSAGE_LIST,
    POST_NEW_MESSAGE,
    ADD,
    USER,
    MODIFYUSER,
    EDIT, SEARCH,LOGIN,
    REGISTER,GETLIST,MODIFYY,SINGLEANALYSIS,
    MEDIAANALYSIS,USERANALYSIS,AUDIOANALYSIS,
} from "@/utils/API.js";
import {enableFetchMocks} from 'jest-fetch-mock'

enableFetchMocks()

const users = [
    {id: 0, name: "a", notes: "x", gender: "男", images: [{src: ""}], useDevices: []},
    {id: 1, name: "b", notes: "y", gender: "女", images: [{src: ""}], useDevices: []},
];
const devices = [{id: 1, description: "p"}, {id: 2, description: "q"}];

fetchMock.mockIf(/^.*$/, (req) => {
    switch (req.url) {
        case LOGIN.path:
            //const {username, password} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: (username === "admin" && password === "123456") ? 200 : 400,
                body: JSON.stringify({access_token: "access_token"}),
                headers: {"Content-Type": "application/json"},
            });
        case REGISTER.path:
            //const {username,password,password2} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: (username === "admin" && password === "123456") ? 200 : 400,
                body: JSON.stringfy({access_token: "access_token"}),
                headers: {"Content-Type": "application/json"}
            })
        case ADD.path:
            if (req.method === "POST" && JSON.parse(String(req.body)).name.length) {
                const {title, content, audio_path, video_path} = JSON.parse(String(req.body));
                const id = users.length ? users[users.length - 1].id + 1 : 0;
                users.push({id, name, notes, gender, images, useDevices});
            }
            return Promise.resolve({
                body: JSON.stringify(req.method === "GET"
                    ? users
                    : {error_code: JSON.parse(String(req.body)).name === "" ? -1 : 0, msg: ""}),
                headers: {"Content-Type": "application/json"},
            });
        case REGISTER.path:
            return Promise.resolve({
                body: JSON.stringify(devices),
                headers: {"Content-Type": "application/json"},
            });
    }
        if(req.url.startsWith(SINGLEANALYSIS.path)) {
            const {appendage} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: 200,
                body: JSON.stringify([{
                    "female_num": 1,
                    "female_scores": [1, 2, 3],
                    "unknown_num": 1,
                    "unknown_scores": [1, 2, 3],
                    "male_num": 1,
                    "male_scores": [1, 2, 3],
                    "female_score_average": 90,
                    "male_score_average": 90,
                    "unknown_score_average": 90,
                    "played_num": 90,
                    "title": "title",
                    "type_id": 1,
                    "scores": [1, 2, 3],
                    "score_average": 90,
                }]),
                headers: {"Content-Type": "application/json"},
            }); }else if (req.url.startsWith(USER_PHOTO_URL)) {
                return Promise.resolve({
                    body: JSON.stringify({
                        "type_id" :1,
                        "title":"title",
                        "content":"content",
                        "audio_path":"audio_path",
                        "video_path":"video_path",
                    }),
                    headers: {"Content-Type": "application/json"},
                });
            } else if(req.url.startsWith(SEARCH.path)){
               return Promise.resolve({
                   body: JSON.stringify({
                       "type_id" :1,
                       "title":"title",
                       "content":"content",
                       "audio_path":"audio_path",
                       "video_path":"video_path",
                   }),
                   headers: {"Content-Type": "application/json"},
               });
            }
            else if (req.url.startsWith(GET_DOOR_USERS_URL)) {
                const id = Number(req.url.substring(req.url.lastIndexOf('/') + 1));
                const target = users.find((it) => it.id === id);
                if (!target) return Promise.reject();
                if (req.method === "PUT") {
                    const {name, notes} = JSON.parse(String(req.body));
                    target.name = name;
                    target.notes = notes;
                } else if (req.method === "DELETE") {
                    users.splice(users.indexOf(target), 1);
                }
                return Promise.resolve({
                    body: JSON.stringify(req.method === "GET" ? target : {error_code: 0, msg: ""}),
                    headers: {"Content-Type": "application/json"},
                })
            } else if (req.url.startsWith(GET_HISTORY_URL)) {
                return Promise.resolve({
                    body: JSON.stringify([{
                        id: 1,
                        user_id: 1,
                        device_id: 1,
                        user_name: "foo",
                        time: "time",
                        deviceDescription: "description",
                    }]),
                    headers: {"Content-Type": "application/json"},
                })
            } else if (req.url.startsWith(BIND_DOOR_ADMIN_URL)) {
                return Promise.resolve({headers: {"Content-Type": "application/json"}});
            } else if (req.url.startsWith(UNBIND_DOOR_ADMIN_URL)) {
                return Promise.resolve({headers: {"Content-Type": "application/json"}});
            }
        });
