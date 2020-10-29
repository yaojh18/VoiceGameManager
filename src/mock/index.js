import "@/mock/MessageBoard.mock"

var Mock = require('mockjs')
Mock.setup({
    timeout: "200-400"
})

var messageList = Array(5).fill({
        "user": "Alice",
        "title": "[英超]切尔⻄2-1胜10⼈曼城 利物浦提前7轮夺冠",
        "content": "北京时间6⽉26⽇03:15(英国当地时间25⽇20:15)，2019/20赛季英超第31轮⼀场焦点战在斯坦福桥球场展开争夺， 切尔⻄ 主场2⽐ 1⼒ 克曼城， 普利⻄ 奇和威廉进球， 费尔南迪尼奥送出红点。 切尔⻄ 3 连胜， 曼城客场连败送利物浦提前7轮夺冠。 ",
        "timestamp": 1593133200000
    })
    //处理获取消息列表
Mock.mock(/\/api\/message[\s\S]+?/, "GET", (rqst) => {
        console.log(rqst);
        return messageList
    })
    //处理消息上传
Mock.mock("/api/message", "POST", (rqst) => {
    console.log(rqst);
    rqst.body = JSON.parse(rqst.body)
    try {
        messageList.push({
            "user": rqst.body.user, //注意！这⾥仅仅是为了调试，对原来请求的代码有所修改！ 
            "title": rqst.body.title,
            "content": rqst.body.content,
            "timestamp": new Date().getTime(),
        })
        return {
            "code": 200,
            "message": "OK"
        }
    } catch (e) {
        console.log(e)
        return {
            "code": 400,
            "message": e.toString()
        }
    }
})