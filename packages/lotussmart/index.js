import util from '../util/index';

let Method = function () {
    var that = this;
    that.config = {
        strIp: '127.0.0.1'
        , strPort: '31213'
        , wsUrl: ''
        , version: '0.0.1'
    };
    that.socket = null;
    that.nCommandIndex = 0;
    // that.strLastResult = '';
    that.data = '';
};

/**
 * 和本地websocket环境建立通讯
 */
Method.prototype.connectServer = function (params) {
    var that = this
        , protocolStr = document.location.protocol;

    params = util.extend(true, {
        onmessage: {},
        onopen: {}
    }, params);

    try {
        that.nCommandIndex = 0;
        if (protocolStr === "https:") {
            that.config.wsUrl = 'wss://' + that.config.strIp + ':' + that.config.strPort;
        } else {
            that.config.wsUrl = 'ws://' + that.config.strIp + ':' + that.config.strPort;
        }
        that.socket = new WebSocket(that.config.wsUrl);
    } catch (evt) {
        console.log('#new WebSocket error:' + evt.data);
        that.socket = null;
        if (typeof (connCb) != "undefined" && connCb != null)
            connCb("-1", "connect error!");
        return;
    }
    that.socket.onopen = function () {
        console.log('#msg: 服务器连接成功');
        typeof params.onopen === 'function' && params.onopen(that);
    };
    that.socket.onclose = function (event) {
        console.log('#断开连接:' + event.wasClean);
    };
    that.socket.onmessage = function (event) {
        var arrString = [];
        that.strLastResult = event.data;
        arrString = that.strLastResult.split(',');
        if ('ReadId' == arrString[0]) {
            if (arrString.length > 11) {
                that.data = '' +
                    // arrString[0] + ';' +
                    // arrString[1] + ';' +
                    // arrString[2] + ';' +
                    arrString[3] + ';' +
                    arrString[4] + ';' +
                    arrString[5] + ';' +
                    arrString[6] + ';' +
                    arrString[7] + ';' +
                    arrString[8] + ';' +
                    arrString[9] + ';' +
                    arrString[10] + ';' +
                    'data:image/jpg;base64,' + arrString[11];
                // console.log(that.data);
                // that.data.photo = 'data:image/jpg;base64,' + arrString[11];
            } else {
                console.log('#收到数据:' + event.data);
            }
        } else if ('ReadIdBuffer' == arrString[0]) {
            if (arrString.length > 11) {
                that.data = '' +
                    // arrString[0] + ';' +
                    // arrString[1] + ';' +
                    // arrString[2] + ';' +
                    arrString[3] + ';' +
                    arrString[4] + ';' +
                    arrString[5] + ';' +
                    arrString[6] + ';' +
                    arrString[7] + ';' +
                    arrString[8] + ';' +
                    arrString[9] + ';' +
                    arrString[10] + ';' +
                    'data:image/jpg;base64,' + arrString[11];
                // console.log(that.data);
                // that.data.photo = 'data:image/jpg;base64,' + arrString[11];
            } else {
                console.log('#收到数据:' + event.data);
            }
        } else if ('ReadIdJpeg' == arrString[0]) {

            if (arrString.length > 3) {
                if (arrString[3].length > 200) {
                    that.data.photo = 'data:image/jpg;base64,' + arrString[3];
                } else {
                    console.log('#收到数据:' + event.data);
                }
            } else {
                console.log('#收到数据:' + event.data);
            }
        } else {
            console.log('#收到数据:' + event.data);
        }
        typeof params.onmessage === 'function' && params.onmessage(that.data);
    };
    that.socket.onerror = function (event) {
        console.log('#disconnected:' + event.message);
    };
}

/**
 * 获取通讯状态
 * @returns {string}
 */
Method.prototype.getSocketStatus = function () {
    var that = this;
    if (null == that.socket) {
        console.log('未连接websocket服务');
        return '0';
    }
    switch (that.socket.readyState) {
        case that.socket.CONNECTING:
            console.log("websocket服务连接中");
            return '1';

        case that.socket.OPEN:
            console.log("websocket服务连接成功");
            return '2';

        case that.socket.CLOSING:
            console.log("websocket服务关闭中");
            return '3';

        case that.socket.CLOSED:
            console.log('websocket服务已关闭');
            return '4';
        default:
            console.log("未知错误");
            return '-1';
    }
}

/**
 * 根据字符串执行方法
 * @param strCommand
 */
Method.prototype.execStringCommand = function (strCommand) {
    var that = this;
    that.strLastResult = '';
    that.nCommandIndex++;
    if (that.getSocketStatus() === '2') {
        that.socket.send(strCommand + ',' + that.nCommandIndex);
    } else {
        console.log('#send failed. websocket not open. please check.');
    }
}

/**
 * 读取身份证信息
 */
Method.prototype.runReadIDCard = function (params) {
    var that = this;
    let socketStatus = that.getSocketStatus();
    params = util.extend(true, {
        onmessage: {},
        onopen: (that) => {
            if (socketStatus === '1' || socketStatus === '0') that.execStringCommand('ReadIdBuffer');
        }
    }, params);

    if (socketStatus !== '2') {
        return that.connectServer(params);
    }
    // 从缓存中读取数据
    return that.execStringCommand('ReadIdBuffer');
}

Method.prototype.getLast = function () {
    return this.data;
}

Method.prototype.closeConnection = function () {
    var that = this;
    that.execStringCommand('CloseConnection');
}

let lotussmart = {
    sfz: new Method()
};

export {lotussmart}
