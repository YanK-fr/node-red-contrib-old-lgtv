module.exports = function(RED) {
    function OldLgTvConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.key  = n.key;
    }
    RED.nodes.registerType("oldlgtv-config",OldLgTvConfigNode);
}
