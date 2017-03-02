/**
 * 同时按下多个键，
 * 键位信息保存在实例的keys下
 *
 * @constructor
 */
var KeyGroup = function () {

    this.keysStatus = {};

    this.keys = [];

    this.init()
}

KeyGroup.prototype.init = function () {
    this.keyDown();
    this.keyUp();
}

KeyGroup.prototype.keyDown = function (e) {
    var that = this;
    document.addEventListener("keydown", function (e) {
        var evt = e || window.event;

        that.keysStatus[evt.keyCode] = true;

        that.updateKeys();
    })
}

KeyGroup.prototype.keyUp = function (e) {
    var that = this;
    document.addEventListener("keyup", function (e) {
        var evt = e || window.event;

        that.keysStatus[evt.keyCode] = false;

        that.updateKeys();
    })
}

KeyGroup.prototype.updateKeys = function () {
    this.keys = [];

    for ( var k in this.keysStatus ) {
        if ( !!this.keysStatus[k] ) {
            this.keys.push(k)
        }
    }
}

window.keyGroup = KeyGroup;
