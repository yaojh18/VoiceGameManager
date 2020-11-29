import {
    GET_MESSAGE_LIST,
    POST_NEW_MESSAGE,
    ADD,
    USER,
    MODIFYUSER,
    EDIT, SEARCH,LOGIN,
    REGISTER,GETLIST,MODIFYY,SINGLEANALYSIS,
    MEDIAANALYSIS,USERANALYSIS,AUDIOANALYSIS,
} from "@/utils/API.js"
import API from "@/utils/API.js"
import {enableFetchMocks} from 'jest-fetch-mock'

enableFetchMocks()

const users = [
    {id: 0, name: "a", notes: "x", gender: "男", images: [{src: ""}], useDevices: []},
    {id: 1, name: "b", notes: "y", gender: "女", images: [{src: ""}], useDevices: []},
];
const devices = [{id: 1, description: "p"}, {id: 2, description: "q"}];

fetchMock.mockIf(/^.*$/, (req) => {
    switch (req.url) {
        case API.LOGIN.path:
            const {username, password} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: (username === "admin" && password === "123456") ? 200 : 400,
                body: JSON.stringify({access_token: "access_token"}),
                headers: {"Content-Type": "application/json"},
            });
        case API.REGISTER.path:
            const {username1,password1,password2} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: 201,
                body: JSON.stringify({access_token: "access_token"}),
                headers: {"Content-Type": "application/json"}
            })
        case API.ADD.path:
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
        case API.GETLIST.path + String("?type_id=1"):
            return Promise.resolve({
                status: 200,
                body: [
                    {
                        'title': 'test',
                        'id': 1,
                        'level_id': 0,
                        'content': 'test content'
                    }
                ],
                headers: {"Content-Type": "application/json"}
            });
        case API.GETLIST.path + String("?type_id=2"):
            return Promise.resolve({
                status: 200,
                body: [
                    {
                        'title': 'test',
                        'id': 1,
                        'level_id': 0,
                        'content': 'test content'
                    }
                ],
                headers: {"Content-Type": "application/json"}
            });
        case API.GETLIST.path + String("?type_id=0"):
        return Promise.resolve({
            status: 200,
            body: [
                {
                    'title': 'test',
                    'id': 1,
                    'level_id': 0,
                    'content': 'test content'
                }
            ],
            headers: {"Content-Type": "application/json"}
        });
        case API.SEARCH.path:
            return Promise.resolve({
                status: 200,
                body: {
                    'results': [
                    {
                        'title': 'test',
                        'id': 1,
                        'level_id': 0,
                        'content': 'test content'
                    }
                    ]
                },
                headers: {"Content-Type": "application/json"}
            });
        case API.SEARCH.path + "/1":
            return Promise.resolve({
                status: 200,
                body: {
                    title: 'test',
                    id: 1,
                    level_id: 0,
                    type_id: 1,
                    content: 'test content',
                    audio_path: '/audio.wav',
                    video_path: '/video.mp4',
                },
                headers: {"Content-Type": "application/json"}
            });
        case API.SINGLEANALYSIS.path + '/1/chart':
            return Promise.resolve({
                status: 200,
                body: {
                    'scores': [1,2,3,4],
                    'score_average': 2,
                    'female_num': 1,
                    'female_scores': [3],
                    'unknown_num': 1,
                    'unknown_scores': [6],
                    'male_num': 2,
                    'male_scores': [2,4],
                    'female_score_average': 3,
                    'male_score_average': 3,
                    'unknown_score_average': 6,
                    'played_num': 4,
                    'title': 'test',
                    'type_id': 1,
                },
                headers: {"Content-Type": "application/json"}
            });
        case API.USERANALYSIS.PATH + '/?gender=1&&sort=level':
            return Promise.resolve({
                status: 200,
                body: {
                    'results': [
                    {
                        'user': 'user_test',
                        'gender': 1,
                        'level': 3,
                    }]
                },
                headers: {"Content-Type": "application/json"}
            });
        case API.AUDIOANALYSIS.PATH + '/?gender=1&&level=0&&sort=time':
            return Promise.resolve({
                status: 200,
                body: {
                    'results': [
                    {
                        'user': 'user_test',
                        'level': 3,
                        'score': 70,
                        'audio': '/audio.wav',
                        'timestamp': '2020-11-12T3213123'
                    }]
                },
                headers: {"Content-Type": "application/json"}
            });
    }

    if(req.url.startsWith(API.SEARCH.path)) {
        return Promise.resolve({
            status: 200,
            body: {
                'results': [
                {
                    'title': 'test',
                    'id': 1,
                    'level_id': 0,
                    'content': 'test content'
                }]
            },
            headers: {"Content-Type": "application/json"}
        });
    } else if (req.url.startsWith(API.GETLIST.path)) {
        return Promise.resolve({
            status: 200,
            body: {
                'results': [
                {
                    'title': 'test',
                    'id': 1,
                    'level_id': 0,
                    'content': 'test content'
                }]
            },
            headers: {"Content-Type": "application/json"}
        });
    }
        // if(req.url.startsWith(SINGLEANALYSIS.path)) {
        //     const {appendage} = JSON.parse(String(req.body));
        //     return Promise.resolve({
        //         status: 200,
        //         body: JSON.stringify([{
        //             "female_num": 1,
        //             "female_scores": [1, 2, 3],
        //             "unknown_num": 1,
        //             "unknown_scores": [1, 2, 3],
        //             "male_num": 1,
        //             "male_scores": [1, 2, 3],
        //             "female_score_average": 90,
        //             "male_score_average": 90,
        //             "unknown_score_average": 90,
        //             "played_num": 90,
        //             "title": "title",
        //             "type_id": 1,
        //             "scores": [1, 2, 3],
        //             "score_average": 90,
        //         }]),
        //         headers: {"Content-Type": "application/json"},
        //     }); }
        });
export default fetchMock;