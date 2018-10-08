module.exports = function(RED) {
    function OldLgTvConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.host     = n.host     ;
        this.port     = n.port     ;
        this.protocol = n.protocol ;
        this.key      = n.key      ;
    }
    RED.nodes.registerType("oldlgtv-config",OldLgTvConfigNode);
}
