var EventEmitter = function () {
    this._events = {};
}

EventEmitter.prototype._on = function (type, fn) {
    if(!this._events[type]) {
        this._events[type] = [];
    }
    this._events[type].push(fn);
}

EventEmitter.prototype._off = function (type, fn) {
    if(!this._events[type]) {
        return;
    }
    var index = this._events[type].indexOf(fn)
    if(index >  -1) {
        this._events[type].splice(index, 1)
    }
}

EventEmitter.prototype._fire = function (type) {
    if(!this._events[type]) {
        return;
    }

    var events = this._events[type];
    for(var i=0; i<events.length; i++) {
        if (typeof events[i] === 'function') {
            events[i].apply(this, [].slice.call(arguments, 1));
        }
    }
}

window.EventEmitter = EventEmitter;

