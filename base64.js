(function() {
  this.Base64 = (function() {
    var decode, encode, str;
    str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    encode = this.btoa || function(input) {
      var char, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output, _i, _len, _ref;
      output = '';
      i = 0;
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
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
          output += str.charAt(char);
        }
      }
      return output;
    };
    decode = this.atob || function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
      output = '';
      i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      while (i < input.length) {
        enc1 = str.indexOf(input.charAt(i++));
        enc2 = str.indexOf(input.charAt(i++));
        enc3 = str.indexOf(input.charAt(i++));
        enc4 = str.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output += String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output += String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output += String.fromCharCode(chr3);
        }
      }
      return output;
    };
    return {
      decode: function(input) {
        return Unicode.pack(decode(input));
      },
      encode: function(input) {
        return encode(Unicode.unpack(input));
      }
    };
  })();
}).call(this);
