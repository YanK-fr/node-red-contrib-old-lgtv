module.exports = function (RED) {
    function OldLgtvDisplaykeyNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.tv = RED.nodes.getNode(n.tv);

        if (this.tv) {
            node.on('input', function (msg) {
                var tvModule = require('../core/requests');
                if (msg.payload) {
                    tvModule.requestPairingKey({
                        hostname: node.tv.host,
                        port: node.tv.port,
                        path: '/'+node.tv.protocol+'/api/auth',
                        method: 'POST'
                    }, function(type, response) {
                        if(type === 'ok')
                            node.send({payload: response});
                        else
                            node.error(response);
                    });
                }
            });
        }

    }
    RED.nodes.registerType('oldlgtv-displaykey', OldLgtvDisplaykeyNode);
};
