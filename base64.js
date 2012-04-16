(function() {
  var CHARACTERS, INVALID_CHARACTERS, InvalidSequenceError, decode64, encode64, fromCharCode,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  INVALID_CHARACTERS = /[^a-z\d\+\=\/]/ig;

  fromCharCode = String.fromCharCode;

  InvalidSequenceError = (function(_super) {

    __extends(InvalidSequenceError, _super);

    InvalidSequenceError.prototype.name = 'InvalidSequence';

    function InvalidSequenceError(char) {
      if (char) {
        this.message = "" + char + " is an invalid BASE64 character";
      } else {
        this.message = "Invalid bytes sequence";
      }
    }

    return InvalidSequenceError;

  })(Error);

  encode64 = this.btoa || function(input) {
    var char, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, invalidChar, output, _i, _len, _ref;
    output = '';
    i = 0;
    while (i < input.length) {
      chr1 = input.charCodeAt(i++) || 0;
      chr2 = input.charCodeAt(i++) || 0;
      chr3 = input.charCodeAt(i++) || 0;
      if (invalidChar = Math.max(chr1, chr2, chr3) > 0xFF) {
        throw new InvalidSequenceError(invalidChar);
      }
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      _ref = [enc1, enc2, enc3, enc4];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        output += CHARACTERS.charAt(char);
      }
    }
    return output;
  };

  decode64 = this.atob || function(input) {
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, length, output;
    output = '';
    i = 0;
    length = input.length;
    if (!(length % 4)) throw new InvalidSequenceError;
    while (i < length) {
      enc1 = CHARACTERS.indexOf(input.charAt(i++));
      enc2 = CHARACTERS.indexOf(input.charAt(i++));
      enc3 = CHARACTERS.indexOf(input.charAt(i++));
      enc4 = CHARACTERS.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output += fromCharCode(chr1);
      if (enc3 !== 64) output += fromCharCode(chr2);
      if (enc4 !== 64) output += fromCharCode(chr3);
    }
    return output;
  };

  this.Base64 = {
    encode64: function(str) {
      return encode64(unescape(encodeURIComponent(str)));
    },
    decode64: function(str) {
      var invalidChar;
      if (invalidChar = str.match(INVALID_CHARACTERS)) {
        throw new InvalidSequenceError(invalidChar[0]);
      }
      return decodeURIComponent(escape(decode64(str)));
    }
  };

}).call(this);
