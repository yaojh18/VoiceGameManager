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
        case LOGIN:
            const {username, password} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: (username === "admin" && password === "123456") ? 200 : 400,
                body: JSON.stringify({access_token: "access_token"}),
                headers: {"Content-Type": "application/json"},
            });
        case REGISTER:
            const {username,password,password2} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: (username === "admin" && password === "123456") ? 200 : 400,
                body: JSON.stringfy({access_token: "access_token"}),
                headers: {"Content-Type":"application/json"}
            })
        case ADD:
            if (req.method === "POST" && JSON.parse(String(req.body)).name.length) {
                const {name, notes, gender, images, useDevices} = JSON.parse(String(req.body));
                const id = users.length ? users[users.length - 1].id + 1 : 0;
                users.push({id, name, notes, gender, images, useDevices});
            }
            return Promise.resolve({
                body: JSON.stringify(req.method === "GET"
                    ? users
                    : {error_code: JSON.parse(String(req.body)).name === "" ? -1 : 0, msg: ""}),
                headers: {"Content-Type": "application/json"},
            });
        case REGISTER:
            return Promise.resolve({
                body: JSON.stringify(devices),
                headers: {"Content-Type": "application/json"},
            });
        case POST_FILE_URL:
            return Promise.resolve({
                body: JSON.stringify([{path: "", url: ""}]),
                headers: {"Content-Type": "application/json"},
            });
    }
    if (req.url.startsWith(USER_PHOTO_URL)) {
        return Promise.resolve({
            body: JSON.stringify(["dummy"]),
            headers: {"Content-Type": "application/json"},
        });
    } else if (req.url.startsWith(GET_DOOR_USERS_URL)) {
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
