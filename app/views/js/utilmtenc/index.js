import CryptoJS from "../crypto-js";
import { type } from "../tools";

const _keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const key = CryptoJS.enc.Utf8.parse("{zzcyes}13123"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("4567812345678123"); //十六位十六进制数作为密钥偏移量
const mode = CryptoJS.mode.CBC;
const padding = CryptoJS.pad.Pkcs7;

//AES解密方法
const decryptAES = function(word) {
  //先进行base64解密
  const base64string = CryptoJS.enc.Base64.parse(word.replace(/[\r\n]/g, "")); //解密之前先移除换行
  const base64Word = base64string.toString();
  const encryptedHexStr = CryptoJS.enc.Hex.parse(base64Word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode, padding });

  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

//AES加密
const encryptAES = function(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode,
    padding
  });
  return encrypted.toString();
};

const encodeUTF8 = function(string) {
  string = string.replace(/\r\n/g, "\n");
  let utftext = "";
  for (let n = 0; n < string.length; n++) {
    let c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext;
};

function _formatInput(input) {
  if (type(input) === "object") {
    return JSON.stringify(input);
  }
  return "" + input;
}

export default class MTB64Coder {
  static encode(input) {
    let str = CryptoJS.enc.Utf8.parse(input);
    return CryptoJS.enc.Base64.stringify(str);
  }

  // public method for decoding
  static decode(input) {
    let words = CryptoJS.enc.Base64.parse(input);
    return words.toString(CryptoJS.enc.Utf8);
  }

  // M2加密
  static encodeM2(input) {
    input = _formatInput(input);

    let output = "";
    let i = 0;
    input = encodeUTF8(input);
    while (i < input.length) {
      const chr1 = input.charCodeAt(i++);
      const chr2 = input.charCodeAt(i++);
      const chr3 = input.charCodeAt(i++);
      let enc1 = chr1 >> 2;

      let enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      let enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        _keyStr.charAt(enc1) +
        _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) +
        _keyStr.charAt(enc4);
    }
    if (output.length > 3) {
      const partPos = Math.floor(output.length / 3);
      const part1 = output.substr(0, partPos);
      const part2 = output.substr(partPos);
      return "M" + part1 + "A" + part2 + "D";
    }
    return output;
  }

  // M2解密
  static decodeM2(input) {
    input = _formatInput(input);
    let encodeStr;
    if (input.length > 6 && input.charAt(0) === "M") {
      let pos = Math.floor(input.length / 3) - 1;
      let part1 = input.substr(1, pos);
      let part2 = input.slice(pos + 2, -1);
      encodeStr = part1 + part2;
    } else {
      encodeStr = input;
    }

    return MTB64Coder.decode(encodeStr);
  }

  // AES解密
  static decodeAes(input) {
    return decryptAES(input);
  }
  // AES加密
  static encodeAes(input) {
    input = _formatInput(input);
    return encryptAES(input);
  }
}
