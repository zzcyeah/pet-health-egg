const type = obj => {
    let ret = Object.prototype.toString.call(obj),
        from = 8,
        to = -1;
    return ret.slice(from, to).toLowerCase();
};

const isFunction = obj => {
    return type(obj) === 'function';
};

const isString = obj => {
    return type(obj) === 'string';
};
const isObject = obj => {
    return type(obj) === 'object';
};

const isArray = obj => {
    return type(obj) === 'array';
};

const isError = obj => {
    return type(obj) === 'error';
};

const isObjectOrArray = obj => {
    return isObject(obj) || isArray(obj);
};

function byteConvert(bytes, unit) {
    unit = unit || 'B';
    if (isNaN(bytes)) {
        return `- ${unit}`;
    }

    let symbols = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let exp = Math.floor(Math.log(bytes) / Math.log(2));
    if (exp < 1) {
        exp = 0;
    }
    let i = Math.floor(exp / 10);
    bytes = bytes / Math.pow(2, 10 * i);
    if (bytes.toString().length > bytes.toFixed(2).toString().length) {
        bytes = bytes.toFixed(2);
    }
    return `${bytes} ${symbols[i]}${unit}`;
}

function byteToIntConvert(sizeStr, is1000) {
    let k = 1024;
    if (is1000) {
        k = 1000;
    }
    const arrUnit = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let unit = sizeStr.substring(sizeStr.length - 1);
    let i = arrUnit.indexOf(unit);
    return sizeStr.substring(0, sizeStr.length - 1) * Math.pow(k, i);
}

export {
    type,
    isString,
    isFunction,
    isObject,
    isObjectOrArray,
    isError,
    byteConvert,
    byteToIntConvert,
};
