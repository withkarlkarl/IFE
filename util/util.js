(function (window) {

    if( !window.util ) window.util = {};
    util = window.util;

    /**
     * requestAnimationFrame
     * @type {*}
     */
    var rAF = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (callback) {
            setInterval(callback, 1000 / 60);
        }

    util.rAF = rAF;

    /**
     * 获得当前时间
     * @type {*}
     */
    var getTime = Date.now || function getTime () { return new Date().getTime(); };

    util.getTime = getTime;

    /**
     * 拓展目标对象
     * @param a 目标
     * @param b 拓展
     * @param onlyUndef 不覆盖原属性
     */
    var extend = function (a, b, onlyUndef) {
        for ( var prop in b ) {
            if ( Object.prototype.hasOwnProperty.call( b, prop ) ) {
                if ( prop !== "constructor" || a !== global ) {
                    if ( b[ prop ] === undefined ) {
                        delete a[ prop ];
                    } else if ( !( onlyUndef && typeof a[ prop ] !== "undefined" ) ) {
                        a[ prop ] = b[ prop ];
                    }
                }
            }
        }
    }
    util.extend = extend;

})(window)

