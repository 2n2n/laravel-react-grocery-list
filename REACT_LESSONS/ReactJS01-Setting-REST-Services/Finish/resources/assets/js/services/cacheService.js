

export function setCache(cacheName, value) {
    localStorage.setItem(cacheName, value);
}

export function getCache(cacheName) {
    return localStorage.getItem(cacheName);
}

export function cacheExists(cacheName) {
    return localStorage.getItem(cacheName) !== null;
}

export function removeCache(cacheName) {
    localStorage.removeItem(cacheName);
}