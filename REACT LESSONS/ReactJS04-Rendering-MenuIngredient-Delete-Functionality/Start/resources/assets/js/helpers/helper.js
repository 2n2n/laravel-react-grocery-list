

export function generateUniqueGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function stringifyJson(obj) {
    return JSON.stringify(obj);
}

export function deserializeJsonString(jsonString) {
    return JSON.parse(jsonString);
}

