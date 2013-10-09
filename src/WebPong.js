/* global module, require */

'use strict';

var pixi = require('pixi'),
    requestAnimFrame = require('./utils/requestAnimFrame'),
    Loop = require('./Loop'),
    Player = require('./Player'),
    WebPong;

WebPong = function (wrapper) {
    var self = this;

    this.wrapper = wrapper;
    this.stage = new pixi.Stage(0x333333);
    this.renderer = pixi.autoDetectRenderer();
    this.loop = new Loop();
    this.decorate();

    this.players = {
        a: new Player(this, {
            side: 'left',
            controls: { up: 'up', down: 'down' }
        }),
        b: new Player(this, {
            side: 'right',
            controls: { up: 'w', down: 's' }
        })
    };

    this.resize();

    this.loop.use(function () {
        self.update();
    });

    wrapper.appendChild(this.renderer.view);
};

WebPong.prototype.start = function () {
    this.loop.play();
};

WebPong.prototype.update = function () {
    var self = this;

    this.renderer.render(this.stage);

    for (var player in this.players) {
        if (this.players.hasOwnProperty(player)) {
            this.players[player].update();
        }
    }

    requestAnimFrame(function () {
        self.update();
    });
};

WebPong.prototype.resize = function () {
    var width = this.wrapper.clientWidth,
        height = this.wrapper.clientHeight;

    this.renderer.resize(width, height);

    for (var player in this.players) {
        if (this.players.hasOwnProperty(player)) {
            this.players[player].updateX();
        }
    }
};

WebPong.prototype.decorate = function () {
    var verticalLine = new pixi.Graphics();
};

module.exports = WebPong;