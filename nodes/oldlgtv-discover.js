module.exports = function (RED) {
    function OldLgtvDiscoverNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        node.on('input', function (msg) {
            var dgram = require('dgram');
            if (msg.payload) {
                var message_discovery = new Buffer(
                    'M-SEARCH * HTTP/1.1\r\n' +
                    'HOST: 239.255.255.250:1900\r\n' +
                    'MAN: "ssdp:discover"\r\n' +
                    'MX: 2\r\n' +
                    'ST: urn:schemas-upnp-org:device:MediaRenderer:1\r\n\r\n');

                var client = dgram.createSocket("udp4");

                // send message
                client.send(message_discovery, 0, message_discovery.length, 1900, '239.255.255.250');

                client.on('message', function (message, req_info) {
                    node.send({payload:message});
                    node.send({payload:req_info});
                });

                client.on('error', function (error) {
                    node.send({payload:error});
                });

            }
        });

    }
    RED.nodes.registerType('oldlgtv-discover', OldLgtvDiscoverNode);
};
