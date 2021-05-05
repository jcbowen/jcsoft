import util from '../utils/jiuchet';

let Method = function () {
    var that = this;
    that.config = {
        strIp: '127.0.0.1'
        , strPort: '31213'
        , logs: ''
        , setLog: false
    };
    that.wsUrl = ''
    that.socket = null;
    that.nCommandIndex = 0;
    // that.strLastResult = '';
    that.data = '';
};

// 修改配置信息
Method.prototype.set = function (options) {
    var that = this;
    // 引入vueModel
    options.vm && (that.vm = options.vm);
    that.config = util.extend(true, that.config, options);

    return that;
}

// 设置
Method.prototype.setLog = function (...data) {
    let that = this;

    if (typeof that.config.setLog === 'function') {
        return that.config.setLog.call(that, ...data);
    } else if (that.config.setLog) {
        // 打开setLog，不预设的清空下输出到控制台
        return console.log(...data);
    }

    return false;
}

/**
 * 和本地websocket环境建立通讯
 */
Method.prototype.connectServer = function (params) {
    var that = this
        , protocolStr = document.location.protocol;

    params = util.extend(true, {
        onopen: {},
        onclose: {},
        onmessage: {},
        onerror: {}
    }, that.config, params);

    try {
        that.nCommandIndex = 0;
        if (protocolStr === "https:") {
            that.wsUrl = 'wss://' + that.config.strIp + ':' + that.config.strPort;
        } else {
            that.wsUrl = 'ws://' + that.config.strIp + ':' + that.config.strPort;
        }
        that.socket = new WebSocket(that.wsUrl);
    } catch (evt) {
        that.setLog('#new WebSocket error:' + evt.data);
        that.socket = null;
        return;
    }
    that.socket.onopen = function (event) {
        that.setLog('#msg: 服务器连接成功');
        typeof params.onopen === 'function' && params.onopen.call(that, event);
    };
    that.socket.onclose = function (event) {
        that.setLog('#断开连接:' + event.wasClean);
        typeof params.onclose === 'function' && params.onclose.call(that, event);
    };
    that.socket.onmessage = function (event) {
        var arrString = [];
        that.strLastResult = event.data;
        arrString = that.strLastResult.split(',');
        if ('ReadId' === arrString[0]) {
            if (arrString.length > 11) {
                that.data = '' +
                    // arrString[0] + '|' +
                    // arrString[1] + '|' +
                    // arrString[2] + '|' +
                    arrString[3] + '|' +
                    arrString[4] + '|' +
                    arrString[5] + '|' +
                    arrString[6] + '|' +
                    arrString[7] + '|' +
                    arrString[8] + '|' +
                    arrString[9] + '|' +
                    arrString[10] + '|' +
                    'data:image/jpg;base64,' + arrString[11];
                that.setLog('#收到数据:' + that.data)
                // that.photo = 'data:image/jpg;base64,' + arrString[11];
            } else {
                that.setLog('#收到数据:' + event.data);
            }
        } else if ('ReadIdBuffer' === arrString[0]) {
            if (arrString.length > 11) {
                that.data = '' +
                    // arrString[0] + '|' +
                    // arrString[1] + '|' +
                    // arrString[2] + '|' +
                    arrString[3] + '|' +
                    arrString[4] + '|' +
                    arrString[5] + '|' +
                    arrString[6] + '|' +
                    arrString[7] + '|' +
                    arrString[8] + '|' +
                    arrString[9] + '|' +
                    arrString[10] + '|' +
                    'data:image/jpg;base64,' + arrString[11];
                that.setLog('#收到数据:' + that.data);
            } else {
                that.setLog('#收到数据:' + event.data);
            }
        } else if ('ReadIdJpeg' === arrString[0]) {
            if (arrString.length > 3) {
                if (arrString[3].length > 200) {
                    that.data = that.photo = 'data:image/jpg;base64,' + arrString[3];
                    that.setLog('#收到数据:' + that.photo);
                } else {
                    that.setLog('#收到数据:' + event.data);
                }
            } else {
                that.setLog('#收到数据:' + event.data);
            }
        } else {
            that.setLog('#收到数据:' + event.data);
        }
        typeof params.onmessage === 'function' && params.onmessage.call(that, event, that.data);
    };
    that.socket.onerror = function (event) {
        that.setLog('#disconnected:' + (event.message || '服务未启用或服务地址错误'));
        typeof params.onerror === 'function' && params.onerror.call(that, event);
    };
}

/**
 * 获取通讯状态
 * @returns {string}
 */
Method.prototype.getSocketStatus = function () {
    var that = this;
    if (null == that.socket) {
        that.setLog('未连接websocket服务');
        return '0';
    }
    switch (that.socket.readyState) {
        case that.socket.CONNECTING:
            that.setLog("websocket服务连接中");
            return '1';

        case that.socket.OPEN:
            that.setLog("websocket服务连接成功");
            return '2';

        case that.socket.CLOSING:
            that.setLog("websocket服务关闭中");
            return '3';

        case that.socket.CLOSED:
            that.setLog('websocket服务已关闭');
            return '4';
        default:
            that.setLog("未知错误");
            return '-1';
    }
}

/**
 * 通过websocket发送字符串命令
 * @param strCommand
 */
Method.prototype.execStringCommand = function (strCommand) {
    var that = this;
    that.strLastResult = '';
    that.nCommandIndex++;
    if (that.getSocketStatus() === '2') {
        that.socket.send(strCommand + ',' + that.nCommandIndex);
    } else {
        that.setLog('#send failed. websocket not open. please check.');
    }
    return that;
}

/**
 * 读取身份证信息
 */
Method.prototype.runReadIDCard = function (params) {
    var that = this;
    let socketStatus = that.getSocketStatus();

    // 在open方法中加入重新唤起读卡操作的动作
    if (typeof params.onopen === 'function') {
        params.onopen = (event) => {
            params.onopen.call(that, event);
            if (socketStatus === '1' || socketStatus === '0') that.execStringCommand('ReadIdBuffer');
        }
    } else {
        params.onopen = (event) => {
            if (socketStatus === '1' || socketStatus === '0') that.execStringCommand('ReadIdBuffer');
        }
    }

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
