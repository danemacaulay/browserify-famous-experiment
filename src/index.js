'use strict';

// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
// var StateModifier = require('famous/modifiers/StateModifier');
// var Transform = require('famous/core/Transform');
var Surface = require('famous/core/Surface');
var Transitionable = require('famous/transitions/Transitionable');
var SnapTransition = require('famous/transitions/SnapTransition');

// create the main context
var context = Engine.createContext();

// set up our snap transition
Transitionable.registerMethod('snap', SnapTransition);

var data = [
    {name: 'hitop left', position: [0, 0]},
    {name: 'top middle', position: [0.5, 0]},
    {name: 'top right', position: [1, 0]},
    {name: 'center left', position: [0, 0.5]},
    {name: 'center middle', position: [0.5, 0.5]},
    {name: 'center right', position: [1, 0.5]},
    {name: 'bottom left', position: [0, 1]},
    {name: 'bottom center', position: [0.5, 1]},
    {name: 'bottom right', position: [1, 1]},
];

data.forEach(function (item) {

    var surface = new Surface({
        content: item.name,
        classes: ['red-bg'],
        properties: {
            textAlign: 'center',
            background: 'black',
            color: 'white'
        }
    });
    var modifier = new Modifier({
        size: [1, 1],
        align: [0.5, 0.5],
        origin: item.position,
        opacity: 0,
    });

    var transition = {
        method: 'snap',
        period: 2000,
        dampingRatio: 0.6,
        velocity: 0
    };

    context.add(modifier).add(surface);

    var opacityState = new Transitionable(0);
    modifier.opacityFrom(opacityState);
    opacityState.set(1, transition);

    var sizeState = new Transitionable([0.5, 0.5]);
    modifier.sizeFrom(sizeState);
    sizeState.set([200,200], transition);

    var alignState = new Transitionable([0, 0]);
    modifier.alignFrom(alignState);
    alignState.set(item.position, transition);

})

