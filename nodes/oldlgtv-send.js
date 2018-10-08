module.exports = function (RED) {
    function OldLgtvSendNode(n) {
        var tvModule = require('../core/requests');
        RED.nodes.createNode(this, n);
        var node = this;
        node.tv = RED.nodes.getNode(n.tv);

        if (node.tv) {
            node.on('input', function (msg) {
                if (msg.payload) {
                    var options = {
                        hostname : node.tv.host,
                        port     : node.tv.port,
                        rootpath : node.tv.protocol,
                        method   : 'POST'
                    };
                    tvModule.requestPairing(options, node.tv.key, function(type, resp) {
                        var countRepeat = 0;
                        if(type === 'ok')
                            repeat(countRepeat, n.repeat, options, resp.envelope.session[0]);
                        else
                            node.error(resp);
                    });
                }
            });
        } else {
            this.error('No TV Configuration');
        }

        function repeat(countRepeat, limit, options, session) {
            node.log('repeat');
            tvModule.requestCommandKey(options, session, n.charkey, function(type, response) {
                if(type === 'ok') {
                    if (countRepeat < limit)
                        repeat(++countRepeat, limit, options, session);
                    if(countRepeat == limit) node.send({payload: response});
                } else
                    node.error(response);
            });
        }

    }

    RED.nodes.registerType('oldlgtv-send', OldLgtvSendNode);
};
