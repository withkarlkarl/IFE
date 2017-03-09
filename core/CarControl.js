(function (window) {

    var rAF = window.util.rAF;
    var Stats = window.Stats;
    var EventEmitter = window.EventEmitter;
    var KeyGroup = window.KeyGroup;

    var CarControl = function (car) {
        EventEmitter.call(this)

        this.car = car;
        this.frontWheel = [this.car.children[3], this.car.children[5]];
        this.speedX = 2;
        this.slowDownSpeedX = 0.1;
        this.slowDownTimer = null;

        this.speed = 0;
        this.maxSpeed = 50;
        this.minSpeed = -50;

        this.turnSpeed = 0;
        this.turnSpeedX = Math.PI / 2;
        this.turnAngle = 0;

        this.clearTurnX = 0.1;
        this.clearTurnTimer = null;

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

        load: function () {
            this.initialFrontWheelAngle = this.frontWheel[0].rotation.y
            this.maxTurnAngle = Math.PI / 6 + this.initialFrontWheelAngle;
            this.minTurnAngle = -Math.PI / 6 + this.initialFrontWheelAngle;

            this.keyGroup = new KeyGroup();
        },

        initEvent: function () {
            document.addEventListener("keydown", this)
            document.addEventListener("keyup", this)

            this._on("move", function () {
                this.clearTurn();
            })

            this._on("stop", function () {
                this.clearTurnSpeed();
            })
        },

        initFps: function () {
            this.stats = new Stats();
            this.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild( this.stats.dom );
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

        turnLeft: function (co) {
            var co = co || 1;
            this.turnSpeed = this.turnSpeedX * co;

            this._fire("turnLeft", this)
        },

        turnRight: function (co) {
            var co = co || 1;
            this.turnSpeed = - this.turnSpeedX * co;

            this._fire("turnRight", this)
        },

        clearTurnSpeed: function () {
            this.turnSpeed = 0;
        },

        clearTurn: function () {
            if(this.keyGroup.keys.indexOf("65") === -1
                && this.keyGroup.keys.indexOf("68") === -1 ) {

                if(Math.abs(this.turnAngle) < Math.PI / 60 ) {
                    this.resizeFrontWheel = true;
                    this.clearTurnSpeed();
                    return;
                }

                if (this.turnAngle > 0) {
                    this.turnRight(.15)
                }

                if (this.turnAngle < 0) {
                    this.turnLeft(.15)
                }
            }
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

            this.dir = this.speed / Math.abs(this.speed);
            this.offsetAngle =  this.car.rotation.y;
            var incX = -Math.sin(this.offsetAngle) * this.speed / 60;
            var incZ = -Math.cos(this.offsetAngle) * this.speed / 60;

            this.car.position.x += incX;
            this.car.position.z += incZ;

            var that = this;
            if( that.turnSpeed !== 0 ) {
                that.frontWheel.forEach(function (item) {
                    if(that.turnSpeed > 0 && item.rotation.y < that.maxTurnAngle
                        || that.turnSpeed < 0 && item.rotation.y > that.minTurnAngle) {
                        that._fire("turnWheel", this);

                        item.rotation.y += that.turnSpeed / 60;

                        that.turnAngle = item.rotation.y - that.initialFrontWheelAngle;
                    }
                })
            }

            if( !!that.resizeFrontWheel ) {
                if(that.turnAngle !== 0 ) {
                    that.frontWheel.forEach(function (item) {
                        that._fire("resizeFrontWheel", this);

                        item.rotation.y = that.initialFrontWheelAngle;
                        that.turnAngle = 0;
                    })

                    this.resizeFrontWheel = false;
                }
            }

            if( this.speed !== 0 ) {
                this._fire("move", this);

                this.car.rotation.y += this.turnAngle / 60
                    * this.dir
                    * (Math.abs(this.speed) /this.maxSpeed);
            }
            else if(this.speed === 0) {
                this._fire("stop", this);
            }

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

})(window)

