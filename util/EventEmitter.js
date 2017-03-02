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

EventEmitter.prototype._once = function (type) {
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

    //执行任务队列
    var events = this._events[type];
    for(var i=0; i<events.length; i++) {
        if (typeof events[i] === 'function') {
            events[i].apply(this, [].slice.call(arguments, 1));
        }
    }

    //删除once
    if(Array.isArray(events[0])) {
        var onces = events.shift();
        for(var j=0; j<onces.length; j++){
            var index = events.indexOf(onces[j]);
            events.splice(index, 1);
        }
    }
}

window.EventEmitter = EventEmitter;

