var rAF = window.rAF;
var Stats = window.Stats;
var EventEmitter = window.EventEmitter;
var KeyGroup = window.KeyGroup;

var CarControl = function (car) {
    EventEmitter.call(this)

    this.car = car;
    this.speedX = 2;
    this.turnSpeedX = Math.PI / 5;
    this.slowDownSpeedX = 0.1;

    this.speed = 0;
    this.maxSpeed = 50;
    this.minSpeed = -50;
    this.turnSpeed = 0;

    this.slowDownSpeed = 1;
    this.slowDownTimer = null;

    this.init()
}

CarControl.prototype = Object.create(EventEmitter.prototype);
CarControl.prototype.constructor = CarControl;

util.extend(CarControl.prototype, {
    init: function () {
        this.load();
        this.initEvent();
        this.initFps()

        this.animate();
    },
    
    initEvent: function () {
        document.addEventListener("keydown", this)
        document.addEventListener("keyup", this)
    },

    initFps: function () {
        this.stats = new Stats();
        this.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this.stats.dom );
    },

    load: function () {
        this.keyGroup = new KeyGroup();
    },

    go: function () {
        if(this.speed >= this.maxSpeed) {
            return;
        }
        this.speed += this.speedX;

        this._fire("go", this)
    },

    back: function () {
        if(this.speed <= this.minSpeed) {
            return;
        }
        this.speed -= this.speedX;

        this._fire("back", this)
    },

    turnLeft: function () {
        var dir = this.speed >= 0 ? 1 : -1;
        this.turnSpeed = dir * this.turnSpeedX;

        this._fire("turnLeft", this)
    },

    turnRight: function () {
        var dir = this.speed >= 0 ? 1 : -1;
        this.turnSpeed = dir * -this.turnSpeedX;

        this._fire("right", this)
    },

    clearTurnSpeed: function () {
        this.turnSpeed = 0;
    },

    slowDown: function () {
        var that = this;
        this.slowDownTimer = setInterval(function () {
                that.speed -= that.speed * that.slowDownSpeedX;

                if(Math.abs(that.speed) <= 1) {
                    that.speed = 0

                    that.cancelSlowDown();
                }
        },
        1000 / 60)
    },

    cancelSlowDown: function () {
        clearInterval(this.slowDownTimer);

        this.slowDownTimer = null;
    },

    animate: function () {
        this.stats.begin();
        var offsetAngle =  this.car.rotation.y;
        var incX = -Math.sin(offsetAngle) * this.speed / 60;
        var incZ = -Math.cos(offsetAngle) * this.speed / 60;
        var incAngle = this.turnSpeed / 60;

        this.car.rotation.y += incAngle;
        this.car.position.x += incX;
        this.car.position.z += incZ;

        renderer.render(scene, camera)

        this.stats.end()
        rAF(this.animate.bind(this))
    },

    handleEvent: function (e) {
        var that = this;
        var keys = this.keyGroup.keys;

        if(e.type == "keydown") {
            keys.forEach(function (item) {
                var code = parseInt(item);
                switch(code) {
                    case 87:
                        that.go();
                        that.cancelSlowDown();
                        break;
                    case 83:
                        that.back();
                        that.cancelSlowDown();
                        break;
                    case 65:
                        that.turnLeft()
                        break;
                    case 68:
                        that.turnRight()
                        break;
                }
            })
        }
        else {
            switch(e.keyCode) {
                case 87:
                case 83:
                    this.slowDown();
                    break;
                case 65:
                case 68:
                    this.clearTurnSpeed();
                    break;

            }
        }
    }
})

window.CarControl = CarControl;