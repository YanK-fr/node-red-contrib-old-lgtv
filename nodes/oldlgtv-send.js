module.exports = function (RED) {
    function OldLgtvSendNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        this.tv = n.tv;
        this.tvConn = RED.nodes.getNode(this.tv);

        if (this.tvConn) {
            this.tvConn.register(node);

            node.on('input', function (msg) {
                if (msg.payload && node.tvConn.send) {
                    node.tvConn.send('send', {charkey: (String(msg.payload)).toUpperCase()});
                }
            });
        } else {
            this.error('No TV Configuration');
        }
    }
    RED.nodes.registerType('oldlgtv-send', OldLgtvSendNode);
};
