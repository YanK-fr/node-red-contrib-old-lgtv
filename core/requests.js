var dgram  = require( 'dgram' );
var http   = require( 'http'  );
var net    = require( 'net'   );
var xml2js = require('xml2js').parseString;

var xmlVersionEncode = '<?xml version="1.0" encoding="utf-8"?>';
var defaultsOptions = {
    hostname : '',
    port     : 8080,
    path     : '/roap/api/pairing',
    method   : 'POST'
};

// Show pairing key on the TV screen
exports.requestPairingKey = function(options, callback) {
	var message_request = xmlVersionEncode +
		'<auth>' +
            '<type>AuthKeyReq</type>' +
        '</auth>';

    options.path = '/'+options.rootpath+'/api/auth';

    basicRequest(options, message_request, 'The Pairing Key is being displayed on the TV screen.', callback);
};

// Pair host with TV
exports.requestPairing = function(options, pairingKey, callback) {
	var message_request = xmlVersionEncode +
		'<auth>' +
            '<type>AuthReq</type>' +
            '<value>' + pairingKey + '</value>' +
        '</auth>';

    options.path = '/'+options.rootpath+'/api/auth';

    basicRequest(options, message_request, 'Session token received', callback);
};

// Handle command key to be sent to TV
exports.requestCommandKey = function(options, sessionID, commandKey, callback) {
	var message_request = xmlVersionEncode +
        '<command>' +
            '<session>' + sessionID + "</session>" +
            "<type>HandleKeyInput</type>" +
            "<value>" +	commandsList[commandKey] + "</value>" +
        "</command>";

    options.path = '/'+options.rootpath+'/api/command';

    basicRequest(options, message_request, 'The TV receive command !', callback);

};

function basicRequest(options, message_request, successLogMsg, callback) {
    options = Object.assign(defaultsOptions, options);

    var req = http.request(options, function (res) {
        if(res.statusCode == 200) {
            callback('log', successLogMsg);
        }
        else {
            callback('error', res.statusCode + ' (statusCode)');
        }

        res.on('data', function(data){
            xml2js(data, function (err, result) {
                callback('ok', result);
            });
        });

    });

    req.on('error', function (error) {
        callback('error', error);
    });

    req.setHeader('Content-Type', 'text/xml; charset=utf-8');
    req.end(message_request);
};

var commandsList = {
    KEY_IDX_3D: 400,
    KEY_IDX_ARROW_DOWN: 13,
    KEY_IDX_ARROW_LEFT: 14,
    KEY_IDX_ARROW_RIGHT: 15,
    KEY_IDX_ARROW_UP: 12,
    KEY_IDX_BACK: 23,
    KEY_IDX_BLUE: 29,
    KEY_IDX_CH_DOWN: 28,
    KEY_IDX_CH_UP: 27,
    KEY_IDX_DATA: 472,
    KEY_IDX_ENTER: 20,
    KEY_IDX_EXIT: 412,
    KEY_IDX_EXTERNAL_INPUT: 47,
    KEY_IDX_FORWARD: 36,
    KEY_IDX_GAMEPAD_ARROW_DOWN: 2,
    KEY_IDX_GAMEPAD_ARROW_LEFT: 3,
    KEY_IDX_GAMEPAD_ARROW_RIGHT: 4,
    KEY_IDX_GAMEPAD_ARROW_UP: 1,
    KEY_IDX_GAMEPAD_BTN_1: 5,
    KEY_IDX_GAMEPAD_BTN_2: 6,
    KEY_IDX_GAMEPAD_BTN_3: 7,
    KEY_IDX_GAMEPAD_BTN_4: 8,
    KEY_IDX_GAMEPAD_MENU: 9,
    KEY_IDX_GREEN: 30,
    KEY_IDX_HOME: 21,
    KEY_IDX_JP_BS: 419,
    KEY_IDX_JP_BS_NUM_1: 420,
    KEY_IDX_JP_BS_NUM_10: 429,
    KEY_IDX_JP_BS_NUM_11: 430,
    KEY_IDX_JP_BS_NUM_12: 431,
    KEY_IDX_JP_BS_NUM_2: 421,
    KEY_IDX_JP_BS_NUM_3: 422,
    KEY_IDX_JP_BS_NUM_4: 423,
    KEY_IDX_JP_BS_NUM_5: 424,
    KEY_IDX_JP_BS_NUM_6: 425,
    KEY_IDX_JP_BS_NUM_7: 426,
    KEY_IDX_JP_BS_NUM_8: 427,
    KEY_IDX_JP_BS_NUM_9: 428,
    KEY_IDX_JP_CS1: 432,
    KEY_IDX_JP_CS1_NUM_1: 433,
    KEY_IDX_JP_CS1_NUM_10: 442,
    KEY_IDX_JP_CS1_NUM_11: 443,
    KEY_IDX_JP_CS1_NUM_12: 444,
    KEY_IDX_JP_CS1_NUM_2: 434,
    KEY_IDX_JP_CS1_NUM_3: 435,
    KEY_IDX_JP_CS1_NUM_4: 436,
    KEY_IDX_JP_CS1_NUM_5: 437,
    KEY_IDX_JP_CS1_NUM_6: 438,
    KEY_IDX_JP_CS1_NUM_7: 439,
    KEY_IDX_JP_CS1_NUM_8: 440,
    KEY_IDX_JP_CS1_NUM_9: 441,
    KEY_IDX_JP_CS2: 445,
    KEY_IDX_JP_CS2_NUM_1: 446,
    KEY_IDX_JP_CS2_NUM_10: 455,
    KEY_IDX_JP_CS2_NUM_11: 456,
    KEY_IDX_JP_CS2_NUM_12: 457,
    KEY_IDX_JP_CS2_NUM_2: 447,
    KEY_IDX_JP_CS2_NUM_3: 448,
    KEY_IDX_JP_CS2_NUM_4: 449,
    KEY_IDX_JP_CS2_NUM_5: 450,
    KEY_IDX_JP_CS2_NUM_6: 451,
    KEY_IDX_JP_CS2_NUM_7: 452,
    KEY_IDX_JP_CS2_NUM_8: 453,
    KEY_IDX_JP_CS2_NUM_9: 454,
    KEY_IDX_JP_JS: 458,
    KEY_IDX_JP_JS_NUM_1: 459,
    KEY_IDX_JP_JS_NUM_10: 468,
    KEY_IDX_JP_JS_NUM_11: 469,
    KEY_IDX_JP_JS_NUM_12: 470,
    KEY_IDX_JP_JS_NUM_2: 460,
    KEY_IDX_JP_JS_NUM_3: 461,
    KEY_IDX_JP_JS_NUM_4: 462,
    KEY_IDX_JP_JS_NUM_5: 463,
    KEY_IDX_JP_JS_NUM_6: 464,
    KEY_IDX_JP_JS_NUM_7: 465,
    KEY_IDX_JP_JS_NUM_8: 466,
    KEY_IDX_JP_JS_NUM_9: 467,
    KEY_IDX_MENU: 22,
    KEY_IDX_MUTE: 26,
    KEY_IDX_MYAPPS: 417,
    KEY_IDX_NETCAST: 408,
    KEY_IDX_NUM_0: 2,
    KEY_IDX_NUM_1: 3,
    KEY_IDX_NUM_2: 4,
    KEY_IDX_NUM_3: 5,
    KEY_IDX_NUM_4: 6,
    KEY_IDX_NUM_5: 7,
    KEY_IDX_NUM_6: 8,
    KEY_IDX_NUM_7: 9,
    KEY_IDX_NUM_8: 10,
    KEY_IDX_NUM_9: 11,
    KEY_IDX_PAUSE: 34,
    KEY_IDX_PLAY: 33,
    KEY_IDX_POWER_OFF: 1,
    KEY_IDX_PREV_CHANNEL: 403,
    KEY_IDX_QMENU: 405,
    KEY_IDX_REC: 40,
    KEY_IDX_RED: 31,
    KEY_IDX_REWIND: 37,
    KEY_IDX_SIMPLELINK_DISC_MENU: 1,
    KEY_IDX_SIMPLELINK_GUIDE: 4,
    KEY_IDX_SIMPLELINK_HOME: 0,
    KEY_IDX_SIMPLELINK_INFO_MENU: 2,
    KEY_IDX_SIMPLELINK_POWER_ONOFF: 6,
    KEY_IDX_SIMPLELINK_RECLIST: 5,
    KEY_IDX_SIMPLELINK_TITLE_POPUP: 3,
    KEY_IDX_SKIP_BACKWARD: 39,
    KEY_IDX_SKIP_FORWARD: 38,
    KEY_IDX_STB_BACK: 30,
    KEY_IDX_STB_BLUE: 16,
    KEY_IDX_STB_CH_DOWN: 38,
    KEY_IDX_STB_CH_UP: 37,
    KEY_IDX_STB_DASH: 19,
    KEY_IDX_STB_DOWN: 34,
    KEY_IDX_STB_EXIT: 7,
    KEY_IDX_STB_FORWARD: 12,
    KEY_IDX_STB_GREEN: 14,
    KEY_IDX_STB_GUIDE: 2,
    KEY_IDX_STB_LEFT: 35,
    KEY_IDX_STB_MENU: 1,
    KEY_IDX_STB_NUM0: 29,
    KEY_IDX_STB_NUM1: 20,
    KEY_IDX_STB_NUM2: 21,
    KEY_IDX_STB_NUM3: 22,
    KEY_IDX_STB_NUM4: 23,
    KEY_IDX_STB_NUM5: 24,
    KEY_IDX_STB_NUM6: 25,
    KEY_IDX_STB_NUM7: 26,
    KEY_IDX_STB_NUM8: 27,
    KEY_IDX_STB_NUM9: 28,
    KEY_IDX_STB_OK: 18,
    KEY_IDX_STB_PAUSE: 11,
    KEY_IDX_STB_PLAY: 10,
    KEY_IDX_STB_POWER_ONOFF: 0,
    KEY_IDX_STB_REC: 17,
    KEY_IDX_STB_RED: 13,
    KEY_IDX_STB_REWIND: 8,
    KEY_IDX_STB_RIGHT: 36,
    KEY_IDX_STB_SKIP_BACKWARD: 61,
    KEY_IDX_STB_SKIP_FORWARD: 62,
    KEY_IDX_STB_STOP: 9,
    KEY_IDX_STB_UP: 33,
    KEY_IDX_STB_YELLOW: 15,
    KEY_IDX_STOP: 35,
    KEY_IDX_VOL_DOWN: 25,
    KEY_IDX_VOL_UP: 24,
    KEY_IDX_YELLOW: 32
};