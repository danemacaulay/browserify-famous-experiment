(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/danemacaulay/Sites/browserify-seed/node_modules/cssify/browser.js":[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    doc.createStyleSheet().cssText = css;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';
  
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }
    
    head.appendChild(style); 
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    document.createStyleSheet(url);
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;
  
    head.appendChild(link); 
  }
};

},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous-polyfills/classList.js":[function(require,module,exports){

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2011-06-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.className)
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.className = this.toString();
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.push(token);
        this._updateClassName();
    }
};
classListProto.remove = function (token) {
    token += "";
    var index = checkTokenAndGetIndex(this, token);
    if (index !== -1) {
        this.splice(index, 1);
        this._updateClassName();
    }
};
classListProto.toggle = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.add(token);
    } else {
        this.remove(token);
    }
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous-polyfills/functionPrototypeBind.js":[function(require,module,exports){
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous-polyfills/index.js":[function(require,module,exports){
require('./classList.js');
require('./functionPrototypeBind.js');
require('./requestAnimationFrame.js');
},{"./classList.js":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous-polyfills/classList.js","./functionPrototypeBind.js":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous-polyfills/functionPrototypeBind.js","./requestAnimationFrame.js":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous-polyfills/requestAnimationFrame.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous-polyfills/requestAnimationFrame.js":[function(require,module,exports){
// adds requestAnimationFrame functionality
// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/

window.requestAnimationFrame || (window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback, element) {
    return window.setTimeout(function() {
      callback(+new Date());
  }, 1000 / 60);
});

},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Context.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var RenderNode = require('./RenderNode');
var EventHandler = require('./EventHandler');
var ElementAllocator = require('./ElementAllocator');
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');

var _originZeroZero = [0, 0];

function _getElementSize(element) {
    return [element.clientWidth, element.clientHeight];
}

/**
 * The top-level container for a Famous-renderable piece of the document.
 *   It is directly updated by the process-wide Engine object, and manages one
 *   render tree root, which can contain other renderables.
 *
 * @class Context
 * @constructor
 * @private
 * @param {Node} container Element in which content will be inserted
 */
function Context(container) {
    this.container = container;
    this._allocator = new ElementAllocator(container);

    this._node = new RenderNode();
    this._eventOutput = new EventHandler();
    this._size = _getElementSize(this.container);

    this._perspectiveState = new Transitionable(0);
    this._perspective = undefined;

    this._nodeContext = {
        allocator: this._allocator,
        transform: Transform.identity,
        opacity: 1,
        origin: _originZeroZero,
        align: null,
        size: this._size
    };

    this._eventOutput.on('resize', function() {
        this.setSize(_getElementSize(this.container));
    }.bind(this));

}

// Note: Unused
Context.prototype.getAllocator = function getAllocator() {
    return this._allocator;
};

/**
 * Add renderables to this Context's render tree.
 *
 * @method add
 *
 * @param {Object} obj renderable object
 * @return {RenderNode} RenderNode wrapping this object, if not already a RenderNode
 */
Context.prototype.add = function add(obj) {
    return this._node.add(obj);
};

/**
 * Move this Context to another containing document element.
 *
 * @method migrate
 *
 * @param {Node} container Element to which content will be migrated
 */
Context.prototype.migrate = function migrate(container) {
    if (container === this.container) return;
    this.container = container;
    this._allocator.migrate(container);
};

/**
 * Gets viewport size for Context.
 *
 * @method getSize
 *
 * @return {Array.Number} viewport size as [width, height]
 */
Context.prototype.getSize = function getSize() {
    return this._size;
};

/**
 * Sets viewport size for Context.
 *
 * @method setSize
 *
 * @param {Array.Number} size [width, height].  If unspecified, use size of root document element.
 */
Context.prototype.setSize = function setSize(size) {
    if (!size) size = _getElementSize(this.container);
    this._size[0] = size[0];
    this._size[1] = size[1];
};

/**
 * Commit this Context's content changes to the document.
 *
 * @private
 * @method update
 * @param {Object} contextParameters engine commit specification
 */
Context.prototype.update = function update(contextParameters) {
    if (contextParameters) {
        if (contextParameters.transform) this._nodeContext.transform = contextParameters.transform;
        if (contextParameters.opacity) this._nodeContext.opacity = contextParameters.opacity;
        if (contextParameters.origin) this._nodeContext.origin = contextParameters.origin;
        if (contextParameters.align) this._nodeContext.align = contextParameters.align;
        if (contextParameters.size) this._nodeContext.size = contextParameters.size;
    }
    var perspective = this._perspectiveState.get();
    if (perspective !== this._perspective) {
        this.container.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
        this.container.style.webkitPerspective = perspective ? perspective.toFixed() : '';
        this._perspective = perspective;
    }

    this._node.commit(this._nodeContext);
};

/**
 * Get current perspective of this context in pixels.
 *
 * @method getPerspective
 * @return {Number} depth perspective in pixels
 */
Context.prototype.getPerspective = function getPerspective() {
    return this._perspectiveState.get();
};

/**
 * Set current perspective of this context in pixels.
 *
 * @method setPerspective
 * @param {Number} perspective in pixels
 * @param {Object} [transition] Transitionable object for applying the change
 * @param {function(Object)} callback function called on completion of transition
 */
Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
    return this._perspectiveState.set(perspective, transition, callback);
};

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
Context.prototype.emit = function emit(type, event) {
    return this._eventOutput.emit(type, event);
};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
Context.prototype.on = function on(type, handler) {
    return this._eventOutput.on(type, handler);
};

/**
 * Unbind an event by type and handler.
 *   This undoes the work of "on".
 *
 * @method removeListener
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function} handler function object to remove
 * @return {EventHandler} internal event handler object (for chaining)
 */
Context.prototype.removeListener = function removeListener(type, handler) {
    return this._eventOutput.removeListener(type, handler);
};

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
Context.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};

/**
 * Remove handler object from set of downstream handlers.
 *   Undoes work of "pipe".
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
Context.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};

module.exports = Context;
},{"../transitions/Transitionable":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/Transitionable.js","./ElementAllocator":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/ElementAllocator.js","./EventHandler":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventHandler.js","./RenderNode":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/RenderNode.js","./Transform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/ElementAllocator.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * Internal helper object to Context that handles the process of
 *   creating and allocating DOM elements within a managed div.
 *   Private.
 *
 * @class ElementAllocator
 * @constructor
 * @private
 * @param {Node} container document element in which Famo.us content will be inserted
 */
function ElementAllocator(container) {
    if (!container) container = document.createDocumentFragment();
    this.container = container;
    this.detachedNodes = {};
    this.nodeCount = 0;
}

/**
 * Move the document elements from their original container to a new one.
 *
 * @private
 * @method migrate
 *
 * @param {Node} container document element to which Famo.us content will be migrated
 */
ElementAllocator.prototype.migrate = function migrate(container) {
    var oldContainer = this.container;
    if (container === oldContainer) return;

    if (oldContainer instanceof DocumentFragment) {
        container.appendChild(oldContainer);
    }
    else {
        while (oldContainer.hasChildNodes()) {
            container.appendChild(oldContainer.removeChild(oldContainer.firstChild));
        }
    }

    this.container = container;
};

/**
 * Allocate an element of specified type from the pool.
 *
 * @private
 * @method allocate
 *
 * @param {string} type type of element, e.g. 'div'
 * @return {Node} allocated document element
 */
ElementAllocator.prototype.allocate = function allocate(type) {
    type = type.toLowerCase();
    if (!(type in this.detachedNodes)) this.detachedNodes[type] = [];
    var nodeStore = this.detachedNodes[type];
    var result;
    if (nodeStore.length > 0) {
        result = nodeStore.pop();
    }
    else {
        result = document.createElement(type);
        this.container.appendChild(result);
    }
    this.nodeCount++;
    return result;
};

/**
 * De-allocate an element of specified type to the pool.
 *
 * @private
 * @method deallocate
 *
 * @param {Node} element document element to deallocate
 */
ElementAllocator.prototype.deallocate = function deallocate(element) {
    var nodeType = element.nodeName.toLowerCase();
    var nodeStore = this.detachedNodes[nodeType];
    nodeStore.push(element);
    this.nodeCount--;
};

/**
 * Get count of total allocated nodes in the document.
 *
 * @private
 * @method getNodeCount
 *
 * @return {Number} total node count
 */
ElementAllocator.prototype.getNodeCount = function getNodeCount() {
    return this.nodeCount;
};

module.exports = ElementAllocator;
},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Engine.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

/**
 * The singleton object initiated upon process
 *   startup which manages all active Context instances, runs
 *   the render dispatch loop, and acts as a listener and dispatcher
 *   for events.  All methods are therefore static.
 *
 *   On static initialization, window.requestAnimationFrame is called with
 *     the event loop function.
 *
 *   Note: Any window in which Engine runs will prevent default
 *     scrolling behavior on the 'touchmove' event.
 *
 * @static
 * @class Engine
 */
var Context = require('./Context');
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');

var Engine = {};

var contexts = [];
var nextTickQueue = [];
var deferQueue = [];

var lastTime = Date.now();
var frameTime;
var frameTimeLimit;
var loopEnabled = true;
var eventForwarders = {};
var eventHandler = new EventHandler();

var options = {
    containerType: 'div',
    containerClass: 'famous-container',
    fpsCap: undefined,
    runLoop: true
};
var optionsManager = new OptionsManager(options);

/** @const */
var MAX_DEFER_FRAME_TIME = 10;

/**
 * Inside requestAnimationFrame loop, step() is called, which:
 *   calculates current FPS (throttling loop if it is over limit set in setFPSCap),
 *   emits dataless 'prerender' event on start of loop,
 *   calls in order any one-shot functions registered by nextTick on last loop,
 *   calls Context.update on all Context objects registered,
 *   and emits dataless 'postrender' event on end of loop.
 *
 * @static
 * @private
 * @method step
 */
Engine.step = function step() {
    var currentTime = Date.now();

    // skip frame if we're over our framerate cap
    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit) return;

    var i = 0;

    frameTime = currentTime - lastTime;
    lastTime = currentTime;

    eventHandler.emit('prerender');

    // empty the queue
    for (i = 0; i < nextTickQueue.length; i++) nextTickQueue[i].call(this);
    nextTickQueue.splice(0);

    // limit total execution time for deferrable functions
    while (deferQueue.length && (Date.now() - currentTime) < MAX_DEFER_FRAME_TIME) {
        deferQueue.shift().call(this);
    }

    for (i = 0; i < contexts.length; i++) contexts[i].update();

    eventHandler.emit('postrender');
};

// engage requestAnimationFrame
function loop() {
    if (options.runLoop) {
        Engine.step();
        window.requestAnimationFrame(loop);
    }
    else loopEnabled = false;
}
window.requestAnimationFrame(loop);

//
// Upon main document window resize (unless on an "input" HTML element):
//   scroll to the top left corner of the window,
//   and for each managed Context: emit the 'resize' event and update its size.
// @param {Object=} event document event
//
function handleResize(event) {
    for (var i = 0; i < contexts.length; i++) {
        contexts[i].emit('resize');
    }
    eventHandler.emit('resize');
}
window.addEventListener('resize', handleResize, false);
handleResize();

// prevent scrolling via browser
window.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, true);

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
Engine.pipe = function pipe(target) {
    if (target.subscribe instanceof Function) return target.subscribe(Engine);
    else return eventHandler.pipe(target);
};

/**
 * Remove handler object from set of downstream handlers.
 *   Undoes work of "pipe".
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
Engine.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function) return target.unsubscribe(Engine);
    else return eventHandler.unpipe(target);
};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @static
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
Engine.on = function on(type, handler) {
    if (!(type in eventForwarders)) {
        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
        if (document.body) {
            document.body.addEventListener(type, eventForwarders[type]);
        }
        else {
            Engine.nextTick(function(type, forwarder) {
                document.body.addEventListener(type, forwarder);
            }.bind(this, type, eventForwarders[type]));
        }
    }
    return eventHandler.on(type, handler);
};

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
Engine.emit = function emit(type, event) {
    return eventHandler.emit(type, event);
};

/**
 * Unbind an event by type and handler.
 *   This undoes the work of "on".
 *
 * @static
 * @method removeListener
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function} handler function object to remove
 * @return {EventHandler} internal event handler object (for chaining)
 */
Engine.removeListener = function removeListener(type, handler) {
    return eventHandler.removeListener(type, handler);
};

/**
 * Return the current calculated frames per second of the Engine.
 *
 * @static
 * @method getFPS
 *
 * @return {Number} calculated fps
 */
Engine.getFPS = function getFPS() {
    return 1000 / frameTime;
};

/**
 * Set the maximum fps at which the system should run. If internal render
 *    loop is called at a greater frequency than this FPSCap, Engine will
 *    throttle render and update until this rate is achieved.
 *
 * @static
 * @method setFPSCap
 *
 * @param {Number} fps maximum frames per second
 */
Engine.setFPSCap = function setFPSCap(fps) {
    frameTimeLimit = Math.floor(1000 / fps);
};

/**
 * Return engine options.
 *
 * @static
 * @method getOptions
 * @param {string} key
 * @return {Object} engine options
 */
Engine.getOptions = function getOptions() {
    return optionsManager.getOptions.apply(optionsManager, arguments);
};

/**
 * Set engine options
 *
 * @static
 * @method setOptions
 *
 * @param {Object} [options] overrides of default options
 * @param {Number} [options.fpsCap]  maximum fps at which the system should run
 * @param {boolean} [options.runLoop=true] whether the run loop should continue
 * @param {string} [options.containerType="div"] type of container element.  Defaults to 'div'.
 * @param {string} [options.containerClass="famous-container"] type of container element.  Defaults to 'famous-container'.
 */
Engine.setOptions = function setOptions(options) {
    return optionsManager.setOptions.apply(optionsManager, arguments);
};

/**
 * Creates a new Context for rendering and event handling with
 *    provided document element as top of each tree. This will be tracked by the
 *    process-wide Engine.
 *
 * @static
 * @method createContext
 *
 * @param {Node} el will be top of Famo.us document element tree
 * @return {Context} new Context within el
 */
Engine.createContext = function createContext(el) {
    var needMountContainer = false;
    if (!el) {
        el = document.createElement(options.containerType);
        el.classList.add(options.containerClass);
        needMountContainer = true;
    }
    var context = new Context(el);
    Engine.registerContext(context);
    if (needMountContainer) {
        Engine.nextTick(function(context, el) {
            document.body.appendChild(el);
            context.emit('resize');
        }.bind(this, context, el));
    }
    return context;
};

/**
 * Registers an existing context to be updated within the run loop.
 *
 * @static
 * @method registerContext
 *
 * @param {Context} context Context to register
 * @return {FamousContext} provided context
 */
Engine.registerContext = function registerContext(context) {
    contexts.push(context);
    return context;
};

/**
 * Queue a function to be executed on the next tick of the
 *    Engine.
 *
 * @static
 * @method nextTick
 *
 * @param {function(Object)} fn function accepting window object
 */
Engine.nextTick = function nextTick(fn) {
    nextTickQueue.push(fn);
};

/**
 * Queue a function to be executed sometime soon, at a time that is
 *    unlikely to affect frame rate.
 *
 * @static
 * @method defer
 *
 * @param {Function} fn
 */
Engine.defer = function defer(fn) {
    deferQueue.push(fn);
};

optionsManager.on('change', function(data) {
    if (data.id === 'fpsCap') Engine.setFPSCap(data.value);
    else if (data.id === 'runLoop') {
        // kick off the loop only if it was stopped
        if (!loopEnabled && data.value) {
            loopEnabled = true;
            window.requestAnimationFrame(loop);
        }
    }
});

module.exports = Engine;
},{"./Context":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Context.js","./EventHandler":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventHandler.js","./OptionsManager":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/OptionsManager.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Entity.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * A singleton that maintains a global registry of Surfaces.
 *   Private.
 *
 * @private
 * @static
 * @class Entity
 */

var entities = [];

/**
 * Get entity from global index.
 *
 * @private
 * @method get
 * @param {Number} id entity reigstration id
 * @return {Surface} entity in the global index
 */
function get(id) {
    return entities[id];
}

/**
 * Overwrite entity in the global index
 *
 * @private
 * @method set
 * @param {Number} id entity reigstration id
 * @return {Surface} entity to add to the global index
 */
function set(id, entity) {
    entities[id] = entity;
}

/**
 * Add entity to global index
 *
 * @private
 * @method register
 * @param {Surface} entity to add to global index
 * @return {Number} new id
 */
function register(entity) {
    var id = entities.length;
    set(id, entity);
    return id;
}

/**
 * Remove entity from global index
 *
 * @private
 * @method unregister
 * @param {Number} id entity reigstration id
 */
function unregister(id) {
    set(id, null);
}

module.exports = {
    register: register,
    unregister: unregister,
    get: get,
    set: set
};
},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventEmitter.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * EventEmitter represents a channel for events.
 *
 * @class EventEmitter
 * @constructor
 */
function EventEmitter() {
    this.listeners = {};
    this._owner = this;
}

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
EventEmitter.prototype.emit = function emit(type, event) {
    var handlers = this.listeners[type];
    if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].call(this._owner, event);
        }
    }
    return this;
};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
   EventEmitter.prototype.on = function on(type, handler) {
    if (!(type in this.listeners)) this.listeners[type] = [];
    var index = this.listeners[type].indexOf(handler);
    if (index < 0) this.listeners[type].push(handler);
    return this;
};

/**
 * Alias for "on".
 * @method addListener
 */
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

   /**
 * Unbind an event by type and handler.
 *   This undoes the work of "on".
 *
 * @method removeListener
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function} handler function object to remove
 * @return {EventEmitter} this
 */
EventEmitter.prototype.removeListener = function removeListener(type, handler) {
    var index = this.listeners[type].indexOf(handler);
    if (index >= 0) this.listeners[type].splice(index, 1);
    return this;
};

/**
 * Call event handlers with this set to owner.
 *
 * @method bindThis
 *
 * @param {Object} owner object this EventEmitter belongs to
 */
EventEmitter.prototype.bindThis = function bindThis(owner) {
    this._owner = owner;
};

module.exports = EventEmitter;
},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventHandler.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventEmitter = require('./EventEmitter');

/**
 * EventHandler forwards received events to a set of provided callback functions.
 * It allows events to be captured, processed, and optionally piped through to other event handlers.
 *
 * @class EventHandler
 * @extends EventEmitter
 * @constructor
 */
function EventHandler() {
    EventEmitter.apply(this, arguments);

    this.downstream = []; // downstream event handlers
    this.downstreamFn = []; // downstream functions

    this.upstream = []; // upstream event handlers
    this.upstreamListeners = {}; // upstream listeners
}
EventHandler.prototype = Object.create(EventEmitter.prototype);
EventHandler.prototype.constructor = EventHandler;

/**
 * Assign an event handler to receive an object's input events.
 *
 * @method setInputHandler
 * @static
 *
 * @param {Object} object object to mix trigger, subscribe, and unsubscribe functions into
 * @param {EventHandler} handler assigned event handler
 */
EventHandler.setInputHandler = function setInputHandler(object, handler) {
    object.trigger = handler.trigger.bind(handler);
    if (handler.subscribe && handler.unsubscribe) {
        object.subscribe = handler.subscribe.bind(handler);
        object.unsubscribe = handler.unsubscribe.bind(handler);
    }
};

/**
 * Assign an event handler to receive an object's output events.
 *
 * @method setOutputHandler
 * @static
 *
 * @param {Object} object object to mix pipe, unpipe, on, addListener, and removeListener functions into
 * @param {EventHandler} handler assigned event handler
 */
EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
    if (handler instanceof EventHandler) handler.bindThis(object);
    object.pipe = handler.pipe.bind(handler);
    object.unpipe = handler.unpipe.bind(handler);
    object.on = handler.on.bind(handler);
    object.addListener = object.on;
    object.removeListener = handler.removeListener.bind(handler);
};

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} event event data
 * @return {EventHandler} this
 */
EventHandler.prototype.emit = function emit(type, event) {
    EventEmitter.prototype.emit.apply(this, arguments);
    var i = 0;
    for (i = 0; i < this.downstream.length; i++) {
        if (this.downstream[i].trigger) this.downstream[i].trigger(type, event);
    }
    for (i = 0; i < this.downstreamFn.length; i++) {
        this.downstreamFn[i](type, event);
    }
    return this;
};

/**
 * Alias for emit
 * @method addListener
 */
EventHandler.prototype.trigger = EventHandler.prototype.emit;

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
EventHandler.prototype.pipe = function pipe(target) {
    if (target.subscribe instanceof Function) return target.subscribe(this);

    var downstreamCtx = (target instanceof Function) ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index < 0) downstreamCtx.push(target);

    if (target instanceof Function) target('pipe', null);
    else if (target.trigger) target.trigger('pipe', null);

    return target;
};

/**
 * Remove handler object from set of downstream handlers.
 *   Undoes work of "pipe".
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
EventHandler.prototype.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function) return target.unsubscribe(this);

    var downstreamCtx = (target instanceof Function) ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index >= 0) {
        downstreamCtx.splice(index, 1);
        if (target instanceof Function) target('unpipe', null);
        else if (target.trigger) target.trigger('unpipe', null);
        return target;
    }
    else return false;
};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
EventHandler.prototype.on = function on(type, handler) {
    EventEmitter.prototype.on.apply(this, arguments);
    if (!(type in this.upstreamListeners)) {
        var upstreamListener = this.trigger.bind(this, type);
        this.upstreamListeners[type] = upstreamListener;
        for (var i = 0; i < this.upstream.length; i++) {
            this.upstream[i].on(type, upstreamListener);
        }
    }
    return this;
};

/**
 * Alias for "on"
 * @method addListener
 */
EventHandler.prototype.addListener = EventHandler.prototype.on;

/**
 * Listen for events from an upstream event handler.
 *
 * @method subscribe
 *
 * @param {EventEmitter} source source emitter object
 * @return {EventHandler} this
 */
EventHandler.prototype.subscribe = function subscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index < 0) {
        this.upstream.push(source);
        for (var type in this.upstreamListeners) {
            source.on(type, this.upstreamListeners[type]);
        }
    }
    return this;
};

/**
 * Stop listening to events from an upstream event handler.
 *
 * @method unsubscribe
 *
 * @param {EventEmitter} source source emitter object
 * @return {EventHandler} this
 */
EventHandler.prototype.unsubscribe = function unsubscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index >= 0) {
        this.upstream.splice(index, 1);
        for (var type in this.upstreamListeners) {
            source.removeListener(type, this.upstreamListeners[type]);
        }
    }
    return this;
};

module.exports = EventHandler;
},{"./EventEmitter":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventEmitter.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Modifier.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');

/**
 *
 *  A collection of visual changes to be
 *    applied to another renderable component. This collection includes a
 *    transform matrix, an opacity constant, a size, an origin specifier.
 *    Modifier objects can be added to any RenderNode or object
 *    capable of displaying renderables.  The Modifier's children and descendants
 *    are transformed by the amounts specified in the Modifier's properties.
 *
 * @class Modifier
 * @constructor
 * @param {Object} [options] overrides of default options
 * @param {Transform} [options.transform] affine transformation matrix
 * @param {Number} [options.opacity]
 * @param {Array.Number} [options.origin] origin adjustment
 * @param {Array.Number} [options.size] size to apply to descendants
 */
function Modifier(options) {
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;

    /* TODO: remove this when deprecation complete */
    this._legacyStates = {};

    this._output = {
        transform: Transform.identity,
        opacity: 1,
        origin: null,
        align: null,
        size: null,
        target: null
    };

    if (options) {
        if (options.transform) this.transformFrom(options.transform);
        if (options.opacity !== undefined) this.opacityFrom(options.opacity);
        if (options.origin) this.originFrom(options.origin);
        if (options.align) this.alignFrom(options.align);
        if (options.size) this.sizeFrom(options.size);
    }
}

/**
 * Function, object, or static transform matrix which provides the transform.
 *   This is evaluated on every tick of the engine.
 *
 * @method transformFrom
 *
 * @param {Object} transform transform provider object
 * @return {Modifier} this
 */
Modifier.prototype.transformFrom = function transformFrom(transform) {
    if (transform instanceof Function) this._transformGetter = transform;
    else if (transform instanceof Object && transform.get) this._transformGetter = transform.get.bind(transform);
    else {
        this._transformGetter = null;
        this._output.transform = transform;
    }
    return this;
};

/**
 * Set function, object, or number to provide opacity, in range [0,1].
 *
 * @method opacityFrom
 *
 * @param {Object} opacity provider object
 * @return {Modifier} this
 */
Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
    if (opacity instanceof Function) this._opacityGetter = opacity;
    else if (opacity instanceof Object && opacity.get) this._opacityGetter = opacity.get.bind(opacity);
    else {
        this._opacityGetter = null;
        this._output.opacity = opacity;
    }
    return this;
};

/**
 * Set function, object, or numerical array to provide origin, as [x,y],
 *   where x and y are in the range [0,1].
 *
 * @method originFrom
 *
 * @param {Object} origin provider object
 * @return {Modifier} this
 */
Modifier.prototype.originFrom = function originFrom(origin) {
    if (origin instanceof Function) this._originGetter = origin;
    else if (origin instanceof Object && origin.get) this._originGetter = origin.get.bind(origin);
    else {
        this._originGetter = null;
        this._output.origin = origin;
    }
    return this;
};

/**
 * Set function, object, or numerical array to provide align, as [x,y],
 *   where x and y are in the range [0,1].
 *
 * @method alignFrom
 *
 * @param {Object} align provider object
 * @return {Modifier} this
 */
Modifier.prototype.alignFrom = function alignFrom(align) {
    if (align instanceof Function) this._alignGetter = align;
    else if (align instanceof Object && align.get) this._alignGetter = align.get.bind(align);
    else {
        this._alignGetter = null;
        this._output.align = align;
    }
    return this;
};

/**
 * Set function, object, or numerical array to provide size, as [width, height].
 *
 * @method sizeFrom
 *
 * @param {Object} size provider object
 * @return {Modifier} this
 */
Modifier.prototype.sizeFrom = function sizeFrom(size) {
    if (size instanceof Function) this._sizeGetter = size;
    else if (size instanceof Object && size.get) this._sizeGetter = size.get.bind(size);
    else {
        this._sizeGetter = null;
        this._output.size = size;
    }
    return this;
};

 /**
 * Deprecated: Prefer transformFrom with static Transform, or use a TransitionableTransform.
 * @deprecated
 * @method setTransform
 *
 * @param {Transform} transform Transform to transition to
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    if (transition || this._legacyStates.transform) {
        if (!this._legacyStates.transform) {
            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
        }
        if (!this._transformGetter) this.transformFrom(this._legacyStates.transform);

        this._legacyStates.transform.set(transform, transition, callback);
        return this;
    }
    else return this.transformFrom(transform);
};

/**
 * Deprecated: Prefer opacityFrom with static opacity array, or use a Transitionable with that opacity.
 * @deprecated
 * @method setOpacity
 *
 * @param {Number} opacity Opacity value to transition to.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    if (transition || this._legacyStates.opacity) {
        if (!this._legacyStates.opacity) {
            this._legacyStates.opacity = new Transitionable(this._output.opacity);
        }
        if (!this._opacityGetter) this.opacityFrom(this._legacyStates.opacity);

        return this._legacyStates.opacity.set(opacity, transition, callback);
    }
    else return this.opacityFrom(opacity);
};

/**
 * Deprecated: Prefer originFrom with static origin array, or use a Transitionable with that origin.
 * @deprecated
 * @method setOrigin
 *
 * @param {Array.Number} origin two element array with values between 0 and 1.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    /* TODO: remove this if statement when deprecation complete */
    if (transition || this._legacyStates.origin) {

        if (!this._legacyStates.origin) {
            this._legacyStates.origin = new Transitionable(this._output.origin || [0, 0]);
        }
        if (!this._originGetter) this.originFrom(this._legacyStates.origin);

        this._legacyStates.origin.set(origin, transition, callback);
        return this;
    }
    else return this.originFrom(origin);
};

/**
 * Deprecated: Prefer alignFrom with static align array, or use a Transitionable with that align.
 * @deprecated
 * @method setAlign
 *
 * @param {Array.Number} align two element array with values between 0 and 1.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
    /* TODO: remove this if statement when deprecation complete */
    if (transition || this._legacyStates.align) {

        if (!this._legacyStates.align) {
            this._legacyStates.align = new Transitionable(this._output.align || [0, 0]);
        }
        if (!this._alignGetter) this.alignFrom(this._legacyStates.align);

        this._legacyStates.align.set(align, transition, callback);
        return this;
    }
    else return this.alignFrom(align);
};

/**
 * Deprecated: Prefer sizeFrom with static origin array, or use a Transitionable with that size.
 * @deprecated
 * @method setSize
 * @param {Array.Number} size two element array of [width, height]
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {Modifier} this
 */
Modifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size && (transition || this._legacyStates.size)) {
        if (!this._legacyStates.size) {
            this._legacyStates.size = new Transitionable(this._output.size || [0, 0]);
        }
        if (!this._sizeGetter) this.sizeFrom(this._legacyStates.size);

        this._legacyStates.size.set(size, transition, callback);
        return this;
    }
    else return this.sizeFrom(size);
};

/**
 * Deprecated: Prefer to stop transform in your provider object.
 * @deprecated
 * @method halt
 */
Modifier.prototype.halt = function halt() {
    if (this._legacyStates.transform) this._legacyStates.transform.halt();
    if (this._legacyStates.opacity) this._legacyStates.opacity.halt();
    if (this._legacyStates.origin) this._legacyStates.origin.halt();
    if (this._legacyStates.align) this._legacyStates.align.halt();
    if (this._legacyStates.size) this._legacyStates.size.halt();
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
};

/**
 * Deprecated: Prefer to use your provided transform or output of your transform provider.
 * @deprecated
 * @method getTransform
 * @return {Object} transform provider object
 */
Modifier.prototype.getTransform = function getTransform() {
    return this._transformGetter();
};

/**
 * Deprecated: Prefer to determine the end state of your transform from your transform provider
 * @deprecated
 * @method getFinalTransform
 * @return {Transform} transform matrix
 */
Modifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
};

/**
 * Deprecated: Prefer to use your provided opacity or output of your opacity provider.
 * @deprecated
 * @method getOpacity
 * @return {Object} opacity provider object
 */
Modifier.prototype.getOpacity = function getOpacity() {
    return this._opacityGetter();
};

/**
 * Deprecated: Prefer to use your provided origin or output of your origin provider.
 * @deprecated
 * @method getOrigin
 * @return {Object} origin provider object
 */
Modifier.prototype.getOrigin = function getOrigin() {
    return this._originGetter();
};

/**
 * Deprecated: Prefer to use your provided align or output of your align provider.
 * @deprecated
 * @method getAlign
 * @return {Object} align provider object
 */
Modifier.prototype.getAlign = function getAlign() {
    return this._alignGetter();
};

/**
 * Deprecated: Prefer to use your provided size or output of your size provider.
 * @deprecated
 * @method getSize
 * @return {Object} size provider object
 */
Modifier.prototype.getSize = function getSize() {
    return this._sizeGetter ? this._sizeGetter() : this._output.size;
};

// call providers on tick to receive render spec elements to apply
function _update() {
    if (this._transformGetter) this._output.transform = this._transformGetter();
    if (this._opacityGetter) this._output.opacity = this._opacityGetter();
    if (this._originGetter) this._output.origin = this._originGetter();
    if (this._alignGetter) this._output.align = this._alignGetter();
    if (this._sizeGetter) this._output.size = this._sizeGetter();
}

/**
 * Return render spec for this Modifier, applying to the provided
 *    target component.  This is similar to render() for Surfaces.
 *
 * @private
 * @method modify
 *
 * @param {Object} target (already rendered) render spec to
 *    which to apply the transform.
 * @return {Object} render spec for this Modifier, including the
 *    provided target
 */
Modifier.prototype.modify = function modify(target) {
    _update.call(this);
    this._output.target = target;
    return this._output;
};

module.exports = Modifier;
},{"../transitions/Transitionable":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/TransitionableTransform.js","./Transform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/OptionsManager.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventHandler = require('./EventHandler');

/**
 *  A collection of methods for setting options which can be extended
 *  onto other classes.
 *
 *
 *  **** WARNING ****
 *  You can only pass through objects that will compile into valid JSON.
 *
 *  Valid options:
 *      Strings,
 *      Arrays,
 *      Objects,
 *      Numbers,
 *      Nested Objects,
 *      Nested Arrays.
 *
 *    This excludes:
 *        Document Fragments,
 *        Functions
 * @class OptionsManager
 * @constructor
 * @param {Object} value options dictionary
 */
function OptionsManager(value) {
    this._value = value;
    this.eventOutput = null;
}

/**
 * Create options manager from source dictionary with arguments overriden by patch dictionary.
 *
 * @static
 * @method OptionsManager.patch
 *
 * @param {Object} source source arguments
 * @param {...Object} data argument additions and overwrites
 * @return {Object} source object
 */
OptionsManager.patch = function patchObject(source, data) {
    var manager = new OptionsManager(source);
    for (var i = 1; i < arguments.length; i++) manager.patch(arguments[i]);
    return source;
};

function _createEventOutput() {
    this.eventOutput = new EventHandler();
    this.eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this.eventOutput);
}

/**
 * Create OptionsManager from source with arguments overriden by patches.
 *   Triggers 'change' event on this object's event handler if the state of
 *   the OptionsManager changes as a result.
 *
 * @method patch
 *
 * @param {...Object} arguments list of patch objects
 * @return {OptionsManager} this
 */
OptionsManager.prototype.patch = function patch() {
    var myState = this._value;
    for (var i = 0; i < arguments.length; i++) {
        var data = arguments[i];
        for (var k in data) {
            if ((k in myState) && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
                if (!myState.hasOwnProperty(k)) myState[k] = Object.create(myState[k]);
                this.key(k).patch(data[k]);
                if (this.eventOutput) this.eventOutput.emit('change', {id: k, value: this.key(k).value()});
            }
            else this.set(k, data[k]);
        }
    }
    return this;
};

/**
 * Alias for patch
 *
 * @method setOptions
 *
 */
OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;

/**
 * Return OptionsManager based on sub-object retrieved by key
 *
 * @method key
 *
 * @param {string} identifier key
 * @return {OptionsManager} new options manager with the value
 */
OptionsManager.prototype.key = function key(identifier) {
    var result = new OptionsManager(this._value[identifier]);
    if (!(result._value instanceof Object) || result._value instanceof Array) result._value = {};
    return result;
};

/**
 * Look up value by key
 * @method get
 *
 * @param {string} key key
 * @return {Object} associated object
 */
OptionsManager.prototype.get = function get(key) {
    return this._value[key];
};

/**
 * Alias for get
 * @method getOptions
 */
OptionsManager.prototype.getOptions = OptionsManager.prototype.get;

/**
 * Set key to value.  Outputs 'change' event if a value is overwritten.
 *
 * @method set
 *
 * @param {string} key key string
 * @param {Object} value value object
 * @return {OptionsManager} new options manager based on the value object
 */
OptionsManager.prototype.set = function set(key, value) {
    var originalValue = this.get(key);
    this._value[key] = value;
    if (this.eventOutput && value !== originalValue) this.eventOutput.emit('change', {id: key, value: value});
    return this;
};

/**
 * Return entire object contents of this OptionsManager.
 *
 * @method value
 *
 * @return {Object} current state of options
 */
OptionsManager.prototype.value = function value() {
    return this._value;
};

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'change')
 * @param {function(string, Object)} handler callback
 * @return {EventHandler} this
 */
OptionsManager.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};

/**
 * Unbind an event by type and handler.
 *   This undoes the work of "on".
 *
 * @method removeListener
 *
 * @param {string} type event type key (for example, 'change')
 * @param {function} handler function object to remove
 * @return {EventHandler} internal event handler object (for chaining)
 */
OptionsManager.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
OptionsManager.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};

/**
 * Remove handler object from set of downstream handlers.
 * Undoes work of "pipe"
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
OptionsManager.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};

module.exports = OptionsManager;
},{"./EventHandler":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventHandler.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/RenderNode.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Entity = require('./Entity');
var SpecParser = require('./SpecParser');

/**
 * A wrapper for inserting a renderable component (like a Modifer or
 *   Surface) into the render tree.
 *
 * @class RenderNode
 * @constructor
 *
 * @param {Object} object Target renderable component
 */
function RenderNode(object) {
    this._object = null;
    this._child = null;
    this._hasMultipleChildren = false;
    this._isRenderable = false;
    this._isModifier = false;

    this._resultCache = {};
    this._prevResults = {};

    this._childResult = null;

    if (object) this.set(object);
}

/**
 * Append a renderable to the list of this node's children.
 *   This produces a new RenderNode in the tree.
 *   Note: Does not double-wrap if child is a RenderNode already.
 *
 * @method add
 * @param {Object} child renderable object
 * @return {RenderNode} new render node wrapping child
 */
RenderNode.prototype.add = function add(child) {
    var childNode = (child instanceof RenderNode) ? child : new RenderNode(child);
    if (this._child instanceof Array) this._child.push(childNode);
    else if (this._child) {
        this._child = [this._child, childNode];
        this._hasMultipleChildren = true;
        this._childResult = []; // to be used later
    }
    else this._child = childNode;

    return childNode;
};

/**
 * Return the single wrapped object.  Returns null if this node has multiple child nodes.
 *
 * @method get
 *
 * @return {Ojbect} contained renderable object
 */
RenderNode.prototype.get = function get() {
    return this._object || (this._hasMultipleChildren ? null : (this._child ? this._child.get() : null));
};

/**
 * Overwrite the list of children to contain the single provided object
 *
 * @method set
 * @param {Object} child renderable object
 * @return {RenderNode} this render node, or child if it is a RenderNode
 */
RenderNode.prototype.set = function set(child) {
    this._childResult = null;
    this._hasMultipleChildren = false;
    this._isRenderable = child.render ? true : false;
    this._isModifier = child.modify ? true : false;
    this._object = child;
    this._child = null;
    if (child instanceof RenderNode) return child;
    else return this;
};

/**
 * Get render size of contained object.
 *
 * @method getSize
 * @return {Array.Number} size of this or size of single child.
 */
RenderNode.prototype.getSize = function getSize() {
    var result = null;
    var target = this.get();
    if (target && target.getSize) result = target.getSize();
    if (!result && this._child && this._child.getSize) result = this._child.getSize();
    return result;
};

// apply results of rendering this subtree to the document
function _applyCommit(spec, context, cacheStorage) {
    var result = SpecParser.parse(spec, context);
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var childNode = Entity.get(id);
        var commitParams = result[id];
        commitParams.allocator = context.allocator;
        var commitResult = childNode.commit(commitParams);
        if (commitResult) _applyCommit(commitResult, context, cacheStorage);
        else cacheStorage[id] = commitParams;
    }
}

/**
 * Commit the content change from this node to the document.
 *
 * @private
 * @method commit
 * @param {Context} context render context
 */
RenderNode.prototype.commit = function commit(context) {
    // free up some divs from the last loop
    var prevKeys = Object.keys(this._prevResults);
    for (var i = 0; i < prevKeys.length; i++) {
        var id = prevKeys[i];
        if (this._resultCache[id] === undefined) {
            var object = Entity.get(id);
            if (object.cleanup) object.cleanup(context.allocator);
        }
    }

    this._prevResults = this._resultCache;
    this._resultCache = {};
    _applyCommit(this.render(), context, this._resultCache);
};

/**
 * Generate a render spec from the contents of the wrapped component.
 *
 * @private
 * @method render
 *
 * @return {Object} render specification for the component subtree
 *    only under this node.
 */
RenderNode.prototype.render = function render() {
    if (this._isRenderable) return this._object.render();

    var result = null;
    if (this._hasMultipleChildren) {
        result = this._childResult;
        var children = this._child;
        for (var i = 0; i < children.length; i++) {
            result[i] = children[i].render();
        }
    }
    else if (this._child) result = this._child.render();

    return this._isModifier ? this._object.modify(result) : result;
};

module.exports = RenderNode;
},{"./Entity":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Entity.js","./SpecParser":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/SpecParser.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/SpecParser.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transform = require('./Transform');

/**
 *
 * This object translates the rendering instructions ("render specs")
 *   that renderable components generate into document update
 *   instructions ("update specs").  Private.
 *
 * @private
 * @class SpecParser
 * @constructor
 */
function SpecParser() {
    this.result = {};
}
SpecParser._instance = new SpecParser();

/**
 * Convert a render spec coming from the context's render chain to an
 *    update spec for the update chain. This is the only major entry point
 *    for a consumer of this class.
 *
 * @method parse
 * @static
 * @private
 *
 * @param {renderSpec} spec input render spec
 * @param {Object} context context to do the parse in
 * @return {Object} the resulting update spec (if no callback
 *   specified, else none)
 */
SpecParser.parse = function parse(spec, context) {
    return SpecParser._instance.parse(spec, context);
};

/**
 * Convert a renderSpec coming from the context's render chain to an update
 *    spec for the update chain. This is the only major entrypoint for a
 *    consumer of this class.
 *
 * @method parse
 *
 * @private
 * @param {renderSpec} spec input render spec
 * @param {Context} context
 * @return {updateSpec} the resulting update spec
 */
SpecParser.prototype.parse = function parse(spec, context) {
    this.reset();
    this._parseSpec(spec, context, Transform.identity);
    return this.result;
};

/**
 * Prepare SpecParser for re-use (or first use) by setting internal state
 *  to blank.
 *
 * @private
 * @method reset
 */
SpecParser.prototype.reset = function reset() {
    this.result = {};
};

// Multiply matrix M by vector v
function _vecInContext(v, m) {
    return [
        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
    ];
}

var _originZeroZero = [0, 0];

// From the provided renderSpec tree, recursively compose opacities,
//    origins, transforms, and sizes corresponding to each surface id from
//    the provided renderSpec tree structure. On completion, those
//    properties of 'this' object should be ready to use to build an
//    updateSpec.
SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
    var id;
    var target;
    var transform;
    var opacity;
    var origin;
    var align;
    var size;

    if (typeof spec === 'number') {
        id = spec;
        transform = parentContext.transform;
        align = parentContext.align || parentContext.origin;
        if (parentContext.size && align && (align[0] || align[1])) {
            var alignAdjust = [align[0] * parentContext.size[0], align[1] * parentContext.size[1], 0];
            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
        }
        this.result[id] = {
            transform: transform,
            opacity: parentContext.opacity,
            origin: parentContext.origin || _originZeroZero,
            align: parentContext.align || parentContext.origin || _originZeroZero,
            size: parentContext.size
        };
    }
    else if (!spec) { // placed here so 0 will be cached earlier
        return;
    }
    else if (spec instanceof Array) {
        for (var i = 0; i < spec.length; i++) {
            this._parseSpec(spec[i], parentContext, sizeContext);
        }
    }
    else {
        target = spec.target;
        transform = parentContext.transform;
        opacity = parentContext.opacity;
        origin = parentContext.origin;
        align = parentContext.align;
        size = parentContext.size;
        var nextSizeContext = sizeContext;

        if (spec.opacity !== undefined) opacity = parentContext.opacity * spec.opacity;
        if (spec.transform) transform = Transform.multiply(parentContext.transform, spec.transform);
        if (spec.origin) {
            origin = spec.origin;
            nextSizeContext = parentContext.transform;
        }
        if (spec.align) align = spec.align;
        if (spec.size) {
            var parentSize = parentContext.size;
            size = [
                spec.size[0] !== undefined ? spec.size[0] : parentSize[0],
                spec.size[1] !== undefined ? spec.size[1] : parentSize[1]
            ];
            if (parentSize) {
                if (!align) align = origin;
                if (align && (align[0] || align[1])) transform = Transform.thenMove(transform, _vecInContext([align[0] * parentSize[0], align[1] * parentSize[1], 0], sizeContext));
                if (origin && (origin[0] || origin[1])) transform = Transform.moveThen([-origin[0] * size[0], -origin[1] * size[1], 0], transform);
            }
            nextSizeContext = parentContext.transform;
            origin = null;
            align = null;
        }

        this._parseSpec(target, {
            transform: transform,
            opacity: opacity,
            origin: origin,
            align: align,
            size: size
        }, nextSizeContext);
    }
};

module.exports = SpecParser;
},{"./Transform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Surface.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Entity = require('./Entity');
var EventHandler = require('./EventHandler');
var Transform = require('./Transform');

var devicePixelRatio = window.devicePixelRatio || 1;
var usePrefix = document.createElement('div').style.webkitTransform !== undefined;

/**
 * A base class for viewable content and event
 *   targets inside a Famo.us application, containing a renderable document
 *   fragment. Like an HTML div, it can accept internal markup,
 *   properties, classes, and handle events.
 *
 * @class Surface
 * @constructor
 *
 * @param {Object} [options] default option overrides
 * @param {Array.Number} [options.size] [width, height] in pixels
 * @param {Array.string} [options.classes] CSS classes to set on inner content
 * @param {Array} [options.properties] string dictionary of HTML attributes to set on target div
 * @param {string} [options.content] inner (HTML) content of surface
 */
function Surface(options) {
    this.options = {};

    this.properties = {};
    this.content = '';
    this.classList = [];
    this.size = null;

    this._classesDirty = true;
    this._stylesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;

    this._dirtyClasses = [];

    this._matrix = null;
    this._opacity = 1;
    this._origin = null;
    this._size = null;

    /** @ignore */
    this.eventForwarder = function eventForwarder(event) {
        this.emit(event.type, event);
    }.bind(this);
    this.eventHandler = new EventHandler();
    this.eventHandler.bindThis(this);

    this.id = Entity.register(this);

    if (options) this.setOptions(options);

    this._currTarget = null;
}
Surface.prototype.elementType = 'div';
Surface.prototype.elementClass = 'famous-surface';

/**
 * Bind a callback function to an event type handled by this object.
 *
 * @method "on"
 *
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} fn handler callback
 * @return {EventHandler} this
 */
Surface.prototype.on = function on(type, fn) {
    if (this._currTarget) this._currTarget.addEventListener(type, this.eventForwarder);
    this.eventHandler.on(type, fn);
};

/**
 * Unbind an event by type and handler.
 *   This undoes the work of "on"
 *
 * @method removeListener
 * @param {string} type event type key (for example, 'click')
 * @param {function(string, Object)} fn handler
 */
Surface.prototype.removeListener = function removeListener(type, fn) {
    this.eventHandler.removeListener(type, fn);
};

/**
 * Trigger an event, sending to all downstream handlers
 *   listening for provided 'type' key.
 *
 * @method emit
 *
 * @param {string} type event type key (for example, 'click')
 * @param {Object} [event] event data
 * @return {EventHandler} this
 */
Surface.prototype.emit = function emit(type, event) {
    if (event && !event.origin) event.origin = this;
    var handled = this.eventHandler.emit(type, event);
    if (handled && event && event.stopPropagation) event.stopPropagation();
    return handled;
};

/**
 * Add event handler object to set of downstream handlers.
 *
 * @method pipe
 *
 * @param {EventHandler} target event handler target object
 * @return {EventHandler} passed event handler
 */
Surface.prototype.pipe = function pipe(target) {
    return this.eventHandler.pipe(target);
};

/**
 * Remove handler object from set of downstream handlers.
 *   Undoes work of "pipe"
 *
 * @method unpipe
 *
 * @param {EventHandler} target target handler object
 * @return {EventHandler} provided target
 */
Surface.prototype.unpipe = function unpipe(target) {
    return this.eventHandler.unpipe(target);
};

/**
 * Return spec for this surface. Note that for a base surface, this is
 *    simply an id.
 *
 * @method render
 * @private
 * @return {Object} render spec for this surface (spec id)
 */
Surface.prototype.render = function render() {
    return this.id;
};

/**
 * Set CSS-style properties on this Surface. Note that this will cause
 *    dirtying and thus re-rendering, even if values do not change.
 *
 * @method setProperties
 * @param {Object} properties property dictionary of "key" => "value"
 */
Surface.prototype.setProperties = function setProperties(properties) {
    for (var n in properties) {
        this.properties[n] = properties[n];
    }
    this._stylesDirty = true;
};

/**
 * Get CSS-style properties on this Surface.
 *
 * @method getProperties
 *
 * @return {Object} Dictionary of this Surface's properties.
 */
Surface.prototype.getProperties = function getProperties() {
    return this.properties;
};

/**
 * Add CSS-style class to the list of classes on this Surface. Note
 *   this will map directly to the HTML property of the actual
 *   corresponding rendered <div>.
 *
 * @method addClass
 * @param {string} className name of class to add
 */
Surface.prototype.addClass = function addClass(className) {
    if (this.classList.indexOf(className) < 0) {
        this.classList.push(className);
        this._classesDirty = true;
    }
};

/**
 * Remove CSS-style class from the list of classes on this Surface.
 *   Note this will map directly to the HTML property of the actual
 *   corresponding rendered <div>.
 *
 * @method removeClass
 * @param {string} className name of class to remove
 */
Surface.prototype.removeClass = function removeClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
        this._classesDirty = true;
    }
};

/**
 * Reset class list to provided dictionary.
 * @method setClasses
 * @param {Array.string} classList
 */
Surface.prototype.setClasses = function setClasses(classList) {
    var i = 0;
    var removal = [];
    for (i = 0; i < this.classList.length; i++) {
        if (classList.indexOf(this.classList[i]) < 0) removal.push(this.classList[i]);
    }
    for (i = 0; i < removal.length; i++) this.removeClass(removal[i]);
    // duplicates are already checked by addClass()
    for (i = 0; i < classList.length; i++) this.addClass(classList[i]);
};

/**
 * Get array of CSS-style classes attached to this div.
 *
 * @method getClasslist
 * @return {Array.string} array of class names
 */
Surface.prototype.getClassList = function getClassList() {
    return this.classList;
};

/**
 * Set or overwrite inner (HTML) content of this surface. Note that this
 *    causes a re-rendering if the content has changed.
 *
 * @method setContent
 * @param {string|Document Fragment} content HTML content
 */
Surface.prototype.setContent = function setContent(content) {
    if (this.content !== content) {
        this.content = content;
        this._contentDirty = true;
    }
};

/**
 * Return inner (HTML) content of this surface.
 *
 * @method getContent
 *
 * @return {string} inner (HTML) content
 */
Surface.prototype.getContent = function getContent() {
    return this.content;
};

/**
 * Set options for this surface
 *
 * @method setOptions
 * @param {Object} [options] overrides for default options.  See constructor.
 */
Surface.prototype.setOptions = function setOptions(options) {
    if (options.size) this.setSize(options.size);
    if (options.classes) this.setClasses(options.classes);
    if (options.properties) this.setProperties(options.properties);
    if (options.content) this.setContent(options.content);
};

//  Attach Famous event handling to document events emanating from target
//    document element.  This occurs just after deployment to the document.
//    Calling this enables methods like #on and #pipe.
function _addEventListeners(target) {
    for (var i in this.eventHandler.listeners) {
        target.addEventListener(i, this.eventForwarder);
    }
}

//  Detach Famous event handling from document events emanating from target
//  document element.  This occurs just before recall from the document.
function _removeEventListeners(target) {
    for (var i in this.eventHandler.listeners) {
        target.removeEventListener(i, this.eventForwarder);
    }
}

 //  Apply to document all changes from removeClass() since last setup().
function _cleanupClasses(target) {
    for (var i = 0; i < this._dirtyClasses.length; i++) target.classList.remove(this._dirtyClasses[i]);
    this._dirtyClasses = [];
}

// Apply values of all Famous-managed styles to the document element.
//  These will be deployed to the document on call to #setup().
function _applyStyles(target) {
    for (var n in this.properties) {
        target.style[n] = this.properties[n];
    }
}

// Clear all Famous-managed styles from the document element.
// These will be deployed to the document on call to #setup().
function _cleanupStyles(target) {
    for (var n in this.properties) {
        target.style[n] = '';
    }
}

/**
 * Return a Matrix's webkit css representation to be used with the
 *    CSS3 -webkit-transform style.
 *    Example: -webkit-transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,716,243,0,1)
 *
 * @method _formatCSSTransform
 * @private
 * @param {FamousMatrix} m matrix
 * @return {string} matrix3d CSS style representation of the transform
 */
function _formatCSSTransform(m) {
    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;

    var result = 'matrix3d(';
    for (var i = 0; i < 15; i++) {
        result += (m[i] < 0.000001 && m[i] > -0.000001) ? '0,' : m[i] + ',';
    }
    result += m[15] + ')';
    return result;
}

/**
 * Directly apply given FamousMatrix to the document element as the
 *   appropriate webkit CSS style.
 *
 * @method setMatrix
 *
 * @static
 * @private
 * @param {Element} element document element
 * @param {FamousMatrix} matrix
 */

var _setMatrix;
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    _setMatrix = function(element, matrix) {
        element.style.zIndex = (matrix[14] * 1000000) | 0;    // fix for Firefox z-buffer issues
        element.style.transform = _formatCSSTransform(matrix);
    };
}
else if (usePrefix) {
    _setMatrix = function(element, matrix) {
        element.style.webkitTransform = _formatCSSTransform(matrix);
    };
}
else {
    _setMatrix = function(element, matrix) {
        element.style.transform = _formatCSSTransform(matrix);
    };
}

// format origin as CSS percentage string
function _formatCSSOrigin(origin) {
    return (100 * origin[0]) + '% ' + (100 * origin[1]) + '%';
}

 // Directly apply given origin coordinates to the document element as the
 // appropriate webkit CSS style.
var _setOrigin = usePrefix ? function(element, origin) {
    element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
} : function(element, origin) {
    element.style.transformOrigin = _formatCSSOrigin(origin);
};

 // Shrink given document element until it is effectively invisible.
var _setInvisible = usePrefix ? function(element) {
    element.style.webkitTransform = 'scale3d(0.0001,0.0001,1)';
    element.style.opacity = 0;
} : function(element) {
    element.style.transform = 'scale3d(0.0001,0.0001,1)';
    element.style.opacity = 0;
};

function _xyNotEquals(a, b) {
    return (a && b) ? (a[0] !== b[0] || a[1] !== b[1]) : a !== b;
}

/**
 * One-time setup for an element to be ready for commits to document.
 *
 * @private
 * @method setup
 *
 * @param {ElementAllocator} allocator document element pool for this context
 */
Surface.prototype.setup = function setup(allocator) {
    var target = allocator.allocate(this.elementType);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (var i = 0; i < this.elementClass.length; i++) {
                target.classList.add(this.elementClass[i]);
            }
        }
        else {
            target.classList.add(this.elementClass);
        }
    }
    target.style.display = '';
    _addEventListeners.call(this, target);
    this._currTarget = target;
    this._stylesDirty = true;
    this._classesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._matrix = null;
    this._opacity = undefined;
    this._origin = null;
    this._size = null;
};

/**
 * Apply changes from this component to the corresponding document element.
 * This includes changes to classes, styles, size, content, opacity, origin,
 * and matrix transforms.
 *
 * @private
 * @method commit
 * @param {Context} context commit context
 */
Surface.prototype.commit = function commit(context) {
    if (!this._currTarget) this.setup(context.allocator);
    var target = this._currTarget;

    var matrix = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;

    if (this._classesDirty) {
        _cleanupClasses.call(this, target);
        var classList = this.getClassList();
        for (var i = 0; i < classList.length; i++) target.classList.add(classList[i]);
        this._classesDirty = false;
    }

    if (this._stylesDirty) {
        _applyStyles.call(this, target);
        this._stylesDirty = false;
    }

    if (this._contentDirty) {
        this.deploy(target);
        this.eventHandler.emit('deploy');
        this._contentDirty = false;
    }

    if (this.size) {
        var origSize = size;
        size = [this.size[0], this.size[1]];
        if (size[0] === undefined && origSize[0]) size[0] = origSize[0];
        if (size[1] === undefined && origSize[1]) size[1] = origSize[1];
    }

    if (size[0] === true) size[0] = target.clientWidth;
    if (size[1] === true) size[1] = target.clientHeight;

    if (_xyNotEquals(this._size, size)) {
        if (!this._size) this._size = [0, 0];
        this._size[0] = size[0];
        this._size[1] = size[1];
        this._sizeDirty = true;
    }

    if (!matrix && this._matrix) {
        this._matrix = null;
        this._opacity = 0;
        _setInvisible(target);
        return;
    }

    if (this._opacity !== opacity) {
        this._opacity = opacity;
        target.style.opacity = (opacity >= 1) ? '0.999999' : opacity;
    }

    if (_xyNotEquals(this._origin, origin) || Transform.notEquals(this._matrix, matrix) || this._sizeDirty) {
        if (!matrix) matrix = Transform.identity;
        this._matrix = matrix;
        var aaMatrix = matrix;
        if (origin) {
            if (!this._origin) this._origin = [0, 0];
            this._origin[0] = origin[0];
            this._origin[1] = origin[1];
            aaMatrix = Transform.thenMove(matrix, [-this._size[0] * origin[0], -this._size[1] * origin[1], 0]);
            _setOrigin(target, origin);
        }
        _setMatrix(target, aaMatrix);
    }

    if (this._sizeDirty) {
        if (this._size) {
            target.style.width = (this.size && this.size[0] === true) ? '' : this._size[0] + 'px';
            target.style.height = (this.size && this.size[1] === true) ?  '' : this._size[1] + 'px';
        }
        this._sizeDirty = false;
    }
};

/**
 *  Remove all Famous-relevant attributes from a document element.
 *    This is called by SurfaceManager's detach().
 *    This is in some sense the reverse of .deploy().
 *
 * @private
 * @method cleanup
 * @param {ElementAllocator} allocator
 */
Surface.prototype.cleanup = function cleanup(allocator) {
    var i = 0;
    var target = this._currTarget;
    this.eventHandler.emit('recall');
    this.recall(target);
    target.style.display = 'none';
    target.style.width = '';
    target.style.height = '';
    this._size = null;
    _cleanupStyles.call(this, target);
    var classList = this.getClassList();
    _cleanupClasses.call(this, target);
    for (i = 0; i < classList.length; i++) target.classList.remove(classList[i]);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (i = 0; i < this.elementClass.length; i++) {
                target.classList.remove(this.elementClass[i]);
            }
        }
        else {
            target.classList.remove(this.elementClass);
        }
    }
    _removeEventListeners.call(this, target);
    this._currTarget = null;
    allocator.deallocate(target);
    _setInvisible(target);
};

/**
 * Place the document element that this component manages into the document.
 *
 * @private
 * @method deploy
 * @param {Node} target document parent of this container
 */
Surface.prototype.deploy = function deploy(target) {
    var content = this.getContent();
    if (content instanceof Node) {
        while (target.hasChildNodes()) target.removeChild(target.firstChild);
        target.appendChild(content);
    }
    else target.innerHTML = content;
};

/**
 * Remove any contained document content associated with this surface
 *   from the actual document.
 *
 * @private
 * @method recall
 */
Surface.prototype.recall = function recall(target) {
    var df = document.createDocumentFragment();
    while (target.hasChildNodes()) df.appendChild(target.firstChild);
    this.setContent(df);
};

/**
 *  Get the x and y dimensions of the surface.
 *
 * @method getSize
 * @param {boolean} actual return computed size rather than provided
 * @return {Array.Number} [x,y] size of surface
 */
Surface.prototype.getSize = function getSize(actual) {
    return actual ? this._size : (this.size || this._size);
};

/**
 * Set x and y dimensions of the surface.
 *
 * @method setSize
 * @param {Array.Number} size as [width, height]
 */
Surface.prototype.setSize = function setSize(size) {
    this.size = size ? [size[0], size[1]] : null;
    this._sizeDirty = true;
};

module.exports = Surface;
},{"./Entity":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Entity.js","./EventHandler":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventHandler.js","./Transform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 *  A high-performance static matrix math library used to calculate
 *    affine transforms on surfaces and other renderables.
 *    Famo.us uses 4x4 matrices corresponding directly to
 *    WebKit matrices (column-major order).
 *
 *    The internal "type" of a Matrix is a 16-long float array in
 *    row-major order, with:
 *    elements [0],[1],[2],[4],[5],[6],[8],[9],[10] forming the 3x3
 *          transformation matrix;
 *    elements [12], [13], [14] corresponding to the t_x, t_y, t_z
 *           translation;
 *    elements [3], [7], [11] set to 0;
 *    element [15] set to 1.
 *    All methods are static.
 *
 * @static
 *
 * @class Transform
 */
var Transform = {};

// WARNING: these matrices correspond to WebKit matrices, which are
//    transposed from their math counterparts
Transform.precision = 1e-6;
Transform.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

/**
 * Multiply two or more Transform matrix types to return a Transform matrix.
 *
 * @method multiply4x4
 * @static
 * @param {Transform} a left Transform
 * @param {Transform} b right Transform
 * @return {Transform}
 */
Transform.multiply4x4 = function multiply4x4(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
    ];
};

/**
 * Fast-multiply two or more Transform matrix types to return a
 *    Matrix, assuming bottom row on each is [0 0 0 1].
 *
 * @method multiply
 * @static
 * @param {Transform} a left Transform
 * @param {Transform} b right Transform
 * @return {Transform}
 */
Transform.multiply = function multiply(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
        0,
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
        0,
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
        0,
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
        1
    ];
};

/**
 * Return a Transform translated by additional amounts in each
 *    dimension. This is equivalent to the result of
 *
 *    Transform.multiply(Matrix.translate(t[0], t[1], t[2]), m).
 *
 * @method thenMove
 * @static
 * @param {Transform} m a Transform
 * @param {Array.Number} t floats delta vector of length 2 or 3
 * @return {Transform}
 */
Transform.thenMove = function thenMove(m, t) {
    if (!t[2]) t[2] = 0;
    return [m[0], m[1], m[2], 0, m[4], m[5], m[6], 0, m[8], m[9], m[10], 0, m[12] + t[0], m[13] + t[1], m[14] + t[2], 1];
};

/**
 * Return a Transform atrix which represents the result of a transform matrix
 *    applied after a move. This is faster than the equivalent multiply.
 *    This is equivalent to the result of:
 *
 *    Transform.multiply(m, Transform.translate(t[0], t[1], t[2])).
 *
 * @method moveThen
 * @static
 * @param {Array.Number} v vector representing initial movement
 * @param {Transform} m matrix to apply afterwards
 * @return {Transform} the resulting matrix
 */
Transform.moveThen = function moveThen(v, m) {
    if (!v[2]) v[2] = 0;
    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
    return Transform.thenMove(m, [t0, t1, t2]);
};

/**
 * Return a Transform which represents a translation by specified
 *    amounts in each dimension.
 *
 * @method translate
 * @static
 * @param {Number} x x translation
 * @param {Number} y y translation
 * @param {Number} z z translation
 * @return {Transform}
 */
Transform.translate = function translate(x, y, z) {
    if (z === undefined) z = 0;
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
};

/**
 * Return a Transform scaled by a vector in each
 *    dimension. This is a more performant equivalent to the result of
 *
 *    Transform.multiply(Transform.scale(s[0], s[1], s[2]), m).
 *
 * @method thenScale
 * @static
 * @param {Transform} m a matrix
 * @param {Array.Number} s delta vector (array of floats &&
 *    array.length == 3)
 * @return {Transform}
 */
Transform.thenScale = function thenScale(m, s) {
    return [
        s[0] * m[0], s[1] * m[1], s[2] * m[2], 0,
        s[0] * m[4], s[1] * m[5], s[2] * m[6], 0,
        s[0] * m[8], s[1] * m[9], s[2] * m[10], 0,
        s[0] * m[12], s[1] * m[13], s[2] * m[14], 1
    ];
};

/**
 * Return a Transform which represents a scale by specified amounts
 *    in each dimension.
 *
 * @method scale
 * @static
 * @param {Number} x x scale factor
 * @param {Number} y y scale factor
 * @param {Number} z z scale factor
 * @return {Transform}
 */
Transform.scale = function scale(x, y, z) {
    if (z === undefined) z = 1;
    return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
};

/**
 * Return a Transform which represents a clockwise
 *    rotation around the x axis.
 *
 * @method rotateX
 * @static
 * @param {Number} theta radians
 * @return {Transform}
 */
Transform.rotateX = function rotateX(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [1, 0, 0, 0, 0, cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1];
};

/**
 * Return a Transform which represents a clockwise
 *    rotation around the y axis.
 *
 * @method rotateY
 * @static
 * @param {Number} theta radians
 * @return {Transform}
 */
Transform.rotateY = function rotateY(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [cosTheta, 0, -sinTheta, 0, 0, 1, 0, 0, sinTheta, 0, cosTheta, 0, 0, 0, 0, 1];
};

/**
 * Return a Transform which represents a clockwise
 *    rotation around the z axis.
 *
 * @method rotateZ
 * @static
 * @param {Number} theta radians
 * @return {Transform}
 */
Transform.rotateZ = function rotateZ(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};

/**
 * Return a Transform which represents composed clockwise
 *    rotations along each of the axes. Equivalent to the result of
 *    Matrix.multiply(rotateX(phi), rotateY(theta), rotateZ(psi)).
 *
 * @method rotate
 * @static
 * @param {Number} phi radians to rotate about the positive x axis
 * @param {Number} theta radians to rotate about the positive y axis
 * @param {Number} psi radians to rotate about the positive z axis
 * @return {Transform}
 */
Transform.rotate = function rotate(phi, theta, psi) {
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var result = [
        cosTheta * cosPsi,
        cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
        sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
        0,
        -cosTheta * sinPsi,
        cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
        sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
        0,
        sinTheta,
        -sinPhi * cosTheta,
        cosPhi * cosTheta,
        0,
        0, 0, 0, 1
    ];
    return result;
};

/**
 * Return a Transform which represents an axis-angle rotation
 *
 * @method rotateAxis
 * @static
 * @param {Array.Number} v unit vector representing the axis to rotate about
 * @param {Number} theta radians to rotate clockwise about the axis
 * @return {Transform}
 */
Transform.rotateAxis = function rotateAxis(v, theta) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var verTheta = 1 - cosTheta; // versine of theta

    var xxV = v[0] * v[0] * verTheta;
    var xyV = v[0] * v[1] * verTheta;
    var xzV = v[0] * v[2] * verTheta;
    var yyV = v[1] * v[1] * verTheta;
    var yzV = v[1] * v[2] * verTheta;
    var zzV = v[2] * v[2] * verTheta;
    var xs = v[0] * sinTheta;
    var ys = v[1] * sinTheta;
    var zs = v[2] * sinTheta;

    var result = [
        xxV + cosTheta, xyV + zs, xzV - ys, 0,
        xyV - zs, yyV + cosTheta, yzV + xs, 0,
        xzV + ys, yzV - xs, zzV + cosTheta, 0,
        0, 0, 0, 1
    ];
    return result;
};

/**
 * Return a Transform which represents a transform matrix applied about
 * a separate origin point.
 *
 * @method aboutOrigin
 * @static
 * @param {Array.Number} v origin point to apply matrix
 * @param {Transform} m matrix to apply
 * @return {Transform}
 */
Transform.aboutOrigin = function aboutOrigin(v, m) {
    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
    return Transform.thenMove(m, [t0, t1, t2]);
};

/**
 * Return a Transform representation of a skew transformation
 *
 * @method skew
 * @static
 * @param {Number} phi scale factor skew in the x axis
 * @param {Number} theta scale factor skew in the y axis
 * @param {Number} psi scale factor skew in the z axis
 * @return {Transform}
 */
Transform.skew = function skew(phi, theta, psi) {
    return [1, 0, 0, 0, Math.tan(psi), 1, 0, 0, Math.tan(theta), Math.tan(phi), 1, 0, 0, 0, 0, 1];
};

/**
 * Return a Transform representation of a skew in the x-direction
 *
 * @method skewX
 * @static
 * @param {Number} angle the angle between the top and left sides
 * @return {Transform}
 */
Transform.skewX = function skewX(angle) {
    return [1, 0, 0, 0, Math.tan(angle), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};

/**
 * Return a Transform representation of a skew in the y-direction
 *
 * @method skewY
 * @static
 * @param {Number} angle the angle between the top and right sides
 * @return {Transform}
 */
Transform.skewY = function skewY(angle) {
    return [1, Math.tan(angle), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};

/**
 * Returns a perspective Transform matrix
 *
 * @method perspective
 * @static
 * @param {Number} focusZ z position of focal point
 * @return {Transform}
 */
Transform.perspective = function perspective(focusZ) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1 / focusZ, 0, 0, 0, 1];
};

/**
 * Return translation vector component of given Transform
 *
 * @method getTranslate
 * @static
 * @param {Transform} m Transform
 * @return {Array.Number} the translation vector [t_x, t_y, t_z]
 */
Transform.getTranslate = function getTranslate(m) {
    return [m[12], m[13], m[14]];
};

/**
 * Return inverse affine transform for given Transform.
 *   Note: This assumes m[3] = m[7] = m[11] = 0, and m[15] = 1.
 *   Will provide incorrect results if not invertible or preconditions not met.
 *
 * @method inverse
 * @static
 * @param {Transform} m Transform
 * @return {Transform}
 */
Transform.inverse = function inverse(m) {
    // only need to consider 3x3 section for affine
    var c0 = m[5] * m[10] - m[6] * m[9];
    var c1 = m[4] * m[10] - m[6] * m[8];
    var c2 = m[4] * m[9] - m[5] * m[8];
    var c4 = m[1] * m[10] - m[2] * m[9];
    var c5 = m[0] * m[10] - m[2] * m[8];
    var c6 = m[0] * m[9] - m[1] * m[8];
    var c8 = m[1] * m[6] - m[2] * m[5];
    var c9 = m[0] * m[6] - m[2] * m[4];
    var c10 = m[0] * m[5] - m[1] * m[4];
    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
    var invD = 1 / detM;
    var result = [
        invD * c0, -invD * c4, invD * c8, 0,
        -invD * c1, invD * c5, -invD * c9, 0,
        invD * c2, -invD * c6, invD * c10, 0,
        0, 0, 0, 1
    ];
    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
    return result;
};

/**
 * Returns the transpose of a 4x4 matrix
 *
 * @method transpose
 * @static
 * @param {Transform} m matrix
 * @return {Transform} the resulting transposed matrix
 */
Transform.transpose = function transpose(m) {
    return [m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]];
};

function _normSquared(v) {
    return (v.length === 2) ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
function _norm(v) {
    return Math.sqrt(_normSquared(v));
}
function _sign(n) {
    return (n < 0) ? -1 : 1;
}

/**
 * Decompose Transform into separate .translate, .rotate, .scale,
 *    and .skew components.
 *
 * @method interpret
 * @static
 * @param {Transform} M transform matrix
 * @return {Object} matrix spec object with component matrices .translate,
 *    .rotate, .scale, .skew
 */
Transform.interpret = function interpret(M) {

    // QR decomposition via Householder reflections
    //FIRST ITERATION

    //default Q1 to the identity matrix;
    var x = [M[0], M[1], M[2]];                // first column vector
    var sgn = _sign(x[0]);                     // sign of first component of x (for stability)
    var xNorm = _norm(x);                      // norm of first column vector
    var v = [x[0] + sgn * xNorm, x[1], x[2]];  // v = x + sign(x[0])|x|e1
    var mult = 2 / _normSquared(v);            // mult = 2/v'v

    //bail out if our Matrix is singular
    if (mult >= Infinity) {
        return {translate: Transform.getTranslate(M), rotate: [0, 0, 0], scale: [0, 0, 0], skew: [0, 0, 0]};
    }

    //evaluate Q1 = I - 2vv'/v'v
    var Q1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

    //diagonals
    Q1[0]  = 1 - mult * v[0] * v[0];    // 0,0 entry
    Q1[5]  = 1 - mult * v[1] * v[1];    // 1,1 entry
    Q1[10] = 1 - mult * v[2] * v[2];    // 2,2 entry

    //upper diagonal
    Q1[1] = -mult * v[0] * v[1];        // 0,1 entry
    Q1[2] = -mult * v[0] * v[2];        // 0,2 entry
    Q1[6] = -mult * v[1] * v[2];        // 1,2 entry

    //lower diagonal
    Q1[4] = Q1[1];                      // 1,0 entry
    Q1[8] = Q1[2];                      // 2,0 entry
    Q1[9] = Q1[6];                      // 2,1 entry

    //reduce first column of M
    var MQ1 = Transform.multiply(Q1, M);

    //SECOND ITERATION on (1,1) minor
    var x2 = [MQ1[5], MQ1[6]];
    var sgn2 = _sign(x2[0]);                    // sign of first component of x (for stability)
    var x2Norm = _norm(x2);                     // norm of first column vector
    var v2 = [x2[0] + sgn2 * x2Norm, x2[1]];    // v = x + sign(x[0])|x|e1
    var mult2 = 2 / _normSquared(v2);           // mult = 2/v'v

    //evaluate Q2 = I - 2vv'/v'v
    var Q2 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

    //diagonal
    Q2[5]  = 1 - mult2 * v2[0] * v2[0]; // 1,1 entry
    Q2[10] = 1 - mult2 * v2[1] * v2[1]; // 2,2 entry

    //off diagonals
    Q2[6] = -mult2 * v2[0] * v2[1];     // 2,1 entry
    Q2[9] = Q2[6];                      // 1,2 entry

    //calc QR decomposition. Q = Q1*Q2, R = Q'*M
    var Q = Transform.multiply(Q2, Q1);      //note: really Q transpose
    var R = Transform.multiply(Q, M);

    //remove negative scaling
    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
    R = Transform.multiply(R, remover);
    Q = Transform.multiply(remover, Q);

    //decompose into rotate/scale/skew matrices
    var result = {};
    result.translate = Transform.getTranslate(M);
    result.rotate = [Math.atan2(-Q[6], Q[10]), Math.asin(Q[2]), Math.atan2(-Q[1], Q[0])];
    if (!result.rotate[0]) {
        result.rotate[0] = 0;
        result.rotate[2] = Math.atan2(Q[4], Q[5]);
    }
    result.scale = [R[0], R[5], R[10]];
    result.skew = [Math.atan2(R[9], result.scale[2]), Math.atan2(R[8], result.scale[2]), Math.atan2(R[4], result.scale[0])];

    //double rotation workaround
    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
        result.rotate[1] = Math.PI - result.rotate[1];
        if (result.rotate[1] > Math.PI) result.rotate[1] -= 2 * Math.PI;
        if (result.rotate[1] < -Math.PI) result.rotate[1] += 2 * Math.PI;
        if (result.rotate[0] < 0) result.rotate[0] += Math.PI;
        else result.rotate[0] -= Math.PI;
        if (result.rotate[2] < 0) result.rotate[2] += Math.PI;
        else result.rotate[2] -= Math.PI;
    }

    return result;
};

/**
 * Weighted average between two matrices by averaging their
 *     translation, rotation, scale, skew components.
 *     f(M1,M2,t) = (1 - t) * M1 + t * M2
 *
 * @method average
 * @static
 * @param {Transform} M1 f(M1,M2,0) = M1
 * @param {Transform} M2 f(M1,M2,1) = M2
 * @param {Number} t
 * @return {Transform}
 */
Transform.average = function average(M1, M2, t) {
    t = (t === undefined) ? 0.5 : t;
    var specM1 = Transform.interpret(M1);
    var specM2 = Transform.interpret(M2);

    var specAvg = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [0, 0, 0],
        skew: [0, 0, 0]
    };

    for (var i = 0; i < 3; i++) {
        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
    }
    return Transform.build(specAvg);
};

/**
 * Compose .translate, .rotate, .scale, .skew components into
 * Transform matrix
 *
 * @method build
 * @static
 * @param {matrixSpec} spec object with component matrices .translate,
 *    .rotate, .scale, .skew
 * @return {Transform} composed transform
 */
Transform.build = function build(spec) {
    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
};

/**
 * Determine if two Transforms are component-wise equal
 *   Warning: breaks on perspective Transforms
 *
 * @method equals
 * @static
 * @param {Transform} a matrix
 * @param {Transform} b matrix
 * @return {boolean}
 */
Transform.equals = function equals(a, b) {
    return !Transform.notEquals(a, b);
};

/**
 * Determine if two Transforms are component-wise unequal
 *   Warning: breaks on perspective Transforms
 *
 * @method notEquals
 * @static
 * @param {Transform} a matrix
 * @param {Transform} b matrix
 * @return {boolean}
 */
Transform.notEquals = function notEquals(a, b) {
    if (a === b) return false;

    // shortci
    return !(a && b) ||
        a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] ||
        a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] ||
        a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] ||
        a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
};

/**
 * Constrain angle-trio components to range of [-pi, pi).
 *
 * @method normalizeRotation
 * @static
 * @param {Array.Number} rotation phi, theta, psi (array of floats
 *    && array.length == 3)
 * @return {Array.Number} new phi, theta, psi triplet
 *    (array of floats && array.length == 3)
 */
Transform.normalizeRotation = function normalizeRotation(rotation) {
    var result = rotation.slice(0);
    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
        result[0] = -result[0];
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] > Math.PI * 0.5) {
        result[0] = result[0] - Math.PI;
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] < -Math.PI * 0.5) {
        result[0] = result[0] + Math.PI;
        result[1] = -Math.PI - result[1];
        result[2] -= Math.PI;
    }
    while (result[1] < -Math.PI) result[1] += 2 * Math.PI;
    while (result[1] >= Math.PI) result[1] -= 2 * Math.PI;
    while (result[2] < -Math.PI) result[2] += 2 * Math.PI;
    while (result[2] >= Math.PI) result[2] -= 2 * Math.PI;
    return result;
};

/**
 * (Property) Array defining a translation forward in z by 1
 *
 * @property {array} inFront
 * @static
 * @final
 */
Transform.inFront = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1e-3, 1];

/**
 * (Property) Array defining a translation backwards in z by 1
 *
 * @property {array} behind
 * @static
 * @final
 */
Transform.behind = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1e-3, 1];

module.exports = Transform;
},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/math/Vector.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 * Three-element floating point vector.
 *
 * @class Vector
 * @constructor
 *
 * @param {number} x x element value
 * @param {number} y y element value
 * @param {number} z z element value
 */
function Vector(x,y,z) {
    if (arguments.length === 1) this.set(x);
    else {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    return this;
}

var _register = new Vector(0,0,0);

/**
 * Add this element-wise to another Vector, element-wise.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method add
 * @param {Vector} v addend
 * @return {Vector} vector sum
 */
Vector.prototype.add = function add(v) {
    return _setXYZ.call(_register,
        this.x + v.x,
        this.y + v.y,
        this.z + v.z
    );
};

/**
 * Subtract another vector from this vector, element-wise.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method sub
 * @param {Vector} v subtrahend
 * @return {Vector} vector difference
 */
Vector.prototype.sub = function sub(v) {
    return _setXYZ.call(_register,
        this.x - v.x,
        this.y - v.y,
        this.z - v.z
    );
};

/**
 * Scale Vector by floating point r.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method mult
 *
 * @param {number} r scalar
 * @return {Vector} vector result
 */
Vector.prototype.mult = function mult(r) {
    return _setXYZ.call(_register,
        r * this.x,
        r * this.y,
        r * this.z
    );
};

/**
 * Scale Vector by floating point 1/r.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method div
 *
 * @param {number} r scalar
 * @return {Vector} vector result
 */
Vector.prototype.div = function div(r) {
    return this.mult(1 / r);
};

/**
 * Given another vector v, return cross product (v)x(this).
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method cross
 * @param {Vector} v Left Hand Vector
 * @return {Vector} vector result
 */
Vector.prototype.cross = function cross(v) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var vx = v.x;
    var vy = v.y;
    var vz = v.z;

    return _setXYZ.call(_register,
        z * vy - y * vz,
        x * vz - z * vx,
        y * vx - x * vy
    );
};

/**
 * Component-wise equality test between this and Vector v.
 * @method equals
 * @param {Vector} v vector to compare
 * @return {boolean}
 */
Vector.prototype.equals = function equals(v) {
    return (v.x === this.x && v.y === this.y && v.z === this.z);
};

/**
 * Rotate clockwise around x-axis by theta radians.
 *   Note: This sets the internal result register, so other references to that vector will change.
 * @method rotateX
 * @param {number} theta radians
 * @return {Vector} rotated vector
 */
Vector.prototype.rotateX = function rotateX(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;

    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    return _setXYZ.call(_register,
        x,
        y * cosTheta - z * sinTheta,
        y * sinTheta + z * cosTheta
    );
};

/**
 * Rotate clockwise around y-axis by theta radians.
 *   Note: This sets the internal result register, so other references to that vector will change.
 * @method rotateY
 * @param {number} theta radians
 * @return {Vector} rotated vector
 */
Vector.prototype.rotateY = function rotateY(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;

    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    return _setXYZ.call(_register,
        z * sinTheta + x * cosTheta,
        y,
        z * cosTheta - x * sinTheta
    );
};

/**
 * Rotate clockwise around z-axis by theta radians.
 *   Note: This sets the internal result register, so other references to that vector will change.
 * @method rotateZ
 * @param {number} theta radians
 * @return {Vector} rotated vector
 */
Vector.prototype.rotateZ = function rotateZ(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;

    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    return _setXYZ.call(_register,
        x * cosTheta - y * sinTheta,
        x * sinTheta + y * cosTheta,
        z
    );
};

/**
 * Return dot product of this with a second Vector
 * @method dot
 * @param {Vector} v second vector
 * @return {number} dot product
 */
Vector.prototype.dot = function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
};

/**
 * Return squared length of this vector
 * @method normSquared
 * @return {number} squared length
 */
Vector.prototype.normSquared = function normSquared() {
    return this.dot(this);
};

/**
 * Return length of this vector
 * @method norm
 * @return {number} length
 */
Vector.prototype.norm = function norm() {
    return Math.sqrt(this.normSquared());
};

/**
 * Scale Vector to specified length.
 *   If length is less than internal tolerance, set vector to [length, 0, 0].
 *   Note: This sets the internal result register, so other references to that vector will change.
 * @method normalize
 *
 * @param {number} length target length, default 1.0
 * @return {Vector}
 */
Vector.prototype.normalize = function normalize(length) {
    if (arguments.length === 0) length = 1;
    var norm = this.norm();

    if (norm > 1e-7) return _setFromVector.call(_register, this.mult(length / norm));
    else return _setXYZ.call(_register, length, 0, 0);
};

/**
 * Make a separate copy of the Vector.
 *
 * @method clone
 *
 * @return {Vector}
 */
Vector.prototype.clone = function clone() {
    return new Vector(this);
};

/**
 * True if and only if every value is 0 (or falsy)
 *
 * @method isZero
 *
 * @return {boolean}
 */
Vector.prototype.isZero = function isZero() {
    return !(this.x || this.y || this.z);
};

function _setXYZ(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
}

function _setFromArray(v) {
    return _setXYZ.call(this,v[0],v[1],v[2] || 0);
}

function _setFromVector(v) {
    return _setXYZ.call(this, v.x, v.y, v.z);
}

function _setFromNumber(x) {
    return _setXYZ.call(this,x,0,0);
}

/**
 * Set this Vector to the values in the provided Array or Vector.
 *
 * @method set
 * @param {object} v array, Vector, or number
 * @return {Vector} this
 */
Vector.prototype.set = function set(v) {
    if (v instanceof Array)    return _setFromArray.call(this, v);
    if (v instanceof Vector)   return _setFromVector.call(this, v);
    if (typeof v === 'number') return _setFromNumber.call(this, v);
};

Vector.prototype.setXYZ = function(x,y,z) {
    return _setXYZ.apply(this, arguments);
};

Vector.prototype.set1D = function(x) {
    return _setFromNumber.call(this, x);
};

/**
 * Put result of last internal register calculation in specified output vector.
 *
 * @method put
 * @param {Vector} v destination vector
 * @return {Vector} destination vector
 */

Vector.prototype.put = function put(v) {
    if (this === _register) _setFromVector.call(v, _register);
    else _setFromVector.call(v, this);
};

/**
 * Set this vector to [0,0,0]
 *
 * @method clear
 */
Vector.prototype.clear = function clear() {
    return _setXYZ.call(this,0,0,0);
};

/**
 * Scale this Vector down to specified "cap" length.
 *   If Vector shorter than cap, or cap is Infinity, do nothing.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method cap
 * @return {Vector} capped vector
 */
Vector.prototype.cap = function cap(cap) {
    if (cap === Infinity) return _setFromVector.call(_register, this);
    var norm = this.norm();
    if (norm > cap) return _setFromVector.call(_register, this.mult(cap / norm));
    else return _setFromVector.call(_register, this);
};

/**
 * Return projection of this Vector onto another.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method project
 * @param {Vector} n vector to project upon
 * @return {Vector} projected vector
 */
Vector.prototype.project = function project(n) {
    return n.mult(this.dot(n));
};

/**
 * Reflect this Vector across provided vector.
 *   Note: This sets the internal result register, so other references to that vector will change.
 *
 * @method reflectAcross
 * @param {Vector} n vector to reflect across
 * @return {Vector} reflected vector
 */
Vector.prototype.reflectAcross = function reflectAcross(n) {
    n.normalize().put(n);
    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
};

/**
 * Convert Vector to three-element array.
 *
 * @method get
 * @return {array<number>} three-element array
 */
Vector.prototype.get = function get() {
    return [this.x, this.y, this.z];
};

Vector.prototype.get1D = function() {
    return this.x;
};

module.exports = Vector;
},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/modifiers/StateModifier.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Modifier = require('../core/Modifier');
var Transform = require('../core/Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');

/**
 *  A collection of visual changes to be
 *    applied to another renderable component, strongly coupled with the state that defines
 *    those changes. This collection includes a
 *    transform matrix, an opacity constant, a size, an origin specifier, and an alignment specifier.
 *    StateModifier objects can be added to any RenderNode or object
 *    capable of displaying renderables.  The StateModifier's children and descendants
 *    are transformed by the amounts specified in the modifier's properties.
 *
 * @class StateModifier
 * @constructor
 * @param {Object} [options] overrides of default options
 * @param {Transform} [options.transform] affine transformation matrix
 * @param {Number} [options.opacity]
 * @param {Array.Number} [options.origin] origin adjustment
 * @param {Array.Number} [options.align] align adjustment
 * @param {Array.Number} [options.size] size to apply to descendants
 */
function StateModifier(options) {
    this._transformState = new TransitionableTransform(Transform.identity);
    this._opacityState = new Transitionable(1);
    this._originState = new Transitionable([0, 0]);
    this._alignState = new Transitionable([0, 0]);
    this._sizeState = new Transitionable([0, 0]);

    this._modifier = new Modifier({
        transform: this._transformState,
        opacity: this._opacityState,
        origin: null,
        align: null,
        size: null
    });

    this._hasOrigin = false;
    this._hasAlign = false;
    this._hasSize = false;

    if (options) {
        if (options.transform) this.setTransform(options.transform);
        if (options.opacity !== undefined) this.setOpacity(options.opacity);
        if (options.origin) this.setOrigin(options.origin);
        if (options.align) this.setAlign(options.align);
        if (options.size) this.setSize(options.size);
    }
}

/**
 * Set the transform matrix of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setTransform
 *
 * @param {Transform} transform Transform to transition to.
 * @param {Transitionable} [transition] Valid transitionable object
 * @param {Function} [callback] callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    this._transformState.set(transform, transition, callback);
    return this;
};

/**
 * Set the opacity of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setOpacity
 *
 * @param {Number} opacity Opacity value to transition to.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    this._opacityState.set(opacity, transition, callback);
    return this;
};

/**
 * Set the origin of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setOrigin
 *
 * @param {Array.Number} origin two element array with values between 0 and 1.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (origin === null) {
        if (this._hasOrigin) {
            this._modifier.originFrom(null);
            this._hasOrigin = false;
        }
        return this;
    }
    else if (!this._hasOrigin) {
        this._hasOrigin = true;
        this._modifier.originFrom(this._originState);
    }
    this._originState.set(origin, transition, callback);
    return this;
};

/**
 * Set the alignment of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setAlign
 *
 * @param {Array.Number} align two element array with values between 0 and 1.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setAlign = function setOrigin(align, transition, callback) {
    if (align === null) {
        if (this._hasAlign) {
            this._modifier.alignFrom(null);
            this._hasAlign = false;
        }
        return this;
    }
    else if (!this._hasAlign) {
        this._hasAlign = true;
        this._modifier.alignFrom(this._alignState);
    }
    this._alignState.set(align, transition, callback);
    return this;
};

/**
 * Set the size of this modifier, either statically or
 *   through a provided Transitionable.
 *
 * @method setSize
 *
 * @param {Array.Number} size two element array with values between 0 and 1.
 * @param {Transitionable} transition Valid transitionable object
 * @param {Function} callback callback to call after transition completes
 * @return {StateModifier} this
 */
StateModifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size === null) {
        if (this._hasSize) {
            this._modifier.sizeFrom(null);
            this._hasSize = false;
        }
        return this;
    }
    else if (!this._hasSize) {
        this._hasSize = true;
        this._modifier.sizeFrom(this._sizeState);
    }
    this._sizeState.set(size, transition, callback);
    return this;
};

/**
 * Stop the transition.
 *
 * @method halt
 */
StateModifier.prototype.halt = function halt() {
    this._transformState.halt();
    this._opacityState.halt();
    this._originState.halt();
    this._alignState.halt();
    this._sizeState.halt();
};

/**
 * Get the current state of the transform matrix component.
 *
 * @method getTransform
 * @return {Object} transform provider object
 */
StateModifier.prototype.getTransform = function getTransform() {
    return this._transformState.get();
};

/**
 * Get the destination state of the transform component.
 *
 * @method getFinalTransform
 * @return {Transform} transform matrix
 */
StateModifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._transformState.getFinal();
};

/**
 * Get the current state of the opacity component.
 *
 * @method getOpacity
 * @return {Object} opacity provider object
 */
StateModifier.prototype.getOpacity = function getOpacity() {
    return this._opacityState.get();
};

/**
 * Get the current state of the origin component.
 *
 * @method getOrigin
 * @return {Object} origin provider object
 */
StateModifier.prototype.getOrigin = function getOrigin() {
    return this._hasOrigin ? this._originState.get() : null;
};

/**
 * Get the current state of the align component.
 *
 * @method getAlign
 * @return {Object} align provider object
 */
StateModifier.prototype.getAlign = function getAlign() {
    return this._hasAlign ? this._alignState.get() : null;
};

/**
 * Get the current state of the size component.
 *
 * @method getSize
 * @return {Object} size provider object
 */
StateModifier.prototype.getSize = function getSize() {
    return this._hasSize ? this._sizeState.get() : null;
};

/**
 * Return render spec for this StateModifier, applying to the provided
 *    target component.  This is similar to render() for Surfaces.
 *
 * @private
 * @method modify
 *
 * @param {Object} target (already rendered) render spec to
 *    which to apply the transform.
 * @return {Object} render spec for this StateModifier, including the
 *    provided target
 */
StateModifier.prototype.modify = function modify(target) {
    return this._modifier.modify(target);
};

module.exports = StateModifier;
},{"../core/Modifier":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Modifier.js","../core/Transform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js","../transitions/Transitionable":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/Transitionable.js","../transitions/TransitionableTransform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/TransitionableTransform.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/PhysicsEngine.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
var EventHandler = require('../core/EventHandler');

/**
 * The Physics Engine is responsible for mediating Bodies and their
 * interaction with forces and constraints. The Physics Engine handles the
 * logic of adding and removing bodies, updating their state of the over
 * time.
 *
 * @class PhysicsEngine
 * @constructor
 * @param options {Object} options
 */
function PhysicsEngine(options) {
    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
    if (options) this.setOptions(options);

    this._particles      = [];   //list of managed particles
    this._bodies         = [];   //list of managed bodies
    this._agents         = {};   //hash of managed agents
    this._forces         = [];   //list of IDs of agents that are forces
    this._constraints    = [];   //list of IDs of agents that are constraints

    this._buffer         = 0.0;
    this._prevTime       = now();
    this._isSleeping     = false;
    this._eventHandler   = null;
    this._currAgentId    = 0;
    this._hasBodies      = false;
}

var TIMESTEP = 17;
var MIN_TIME_STEP = 1000 / 120;
var MAX_TIME_STEP = 17;

/**
 * @property PhysicsEngine.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
PhysicsEngine.DEFAULT_OPTIONS = {

    /**
     * The number of iterations the engine takes to resolve constraints
     * @attribute constraintSteps
     * @type Number
     */
    constraintSteps : 1,

    /**
     * The energy threshold before the Engine stops updating
     * @attribute sleepTolerance
     * @type Number
     */
    sleepTolerance  : 1e-7
};

var now = (function() {
    return Date.now;
})();

/**
 * Options setter
 * @method setOptions
 * @param options {Object}
 */
PhysicsEngine.prototype.setOptions = function setOptions(opts) {
    for (var key in opts) if (this.options[key]) this.options[key] = opts[key];
};

/**
 * Method to add a physics body to the engine. Necessary to update the
 * body over time.
 *
 * @method addBody
 * @param body {Body}
 * @return body {Body}
 */
PhysicsEngine.prototype.addBody = function addBody(body) {
    body._engine = this;
    if (body.isBody) {
        this._bodies.push(body);
        this._hasBodies = true;
    }
    else this._particles.push(body);
    return body;
};

/**
 * Remove a body from the engine. Detaches body from all forces and
 * constraints.
 *
 * @method removeBody
 * @param body {Body}
 */
PhysicsEngine.prototype.removeBody = function removeBody(body) {
    var array = (body.isBody) ? this._bodies : this._particles;
    var index = array.indexOf(body);
    if (index > -1) {
        for (var i = 0; i < Object.keys(this._agents).length; i++) this.detachFrom(i, body);
        array.splice(index,1);
    }
    if (this.getBodies().length === 0) this._hasBodies = false;
};

function _mapAgentArray(agent) {
    if (agent.applyForce)      return this._forces;
    if (agent.applyConstraint) return this._constraints;
}

function _attachOne(agent, targets, source) {
    if (targets === undefined) targets = this.getParticlesAndBodies();
    if (!(targets instanceof Array)) targets = [targets];

    this._agents[this._currAgentId] = {
        agent   : agent,
        targets : targets,
        source  : source
    };

    _mapAgentArray.call(this, agent).push(this._currAgentId);
    return this._currAgentId++;
}

/**
 * Attaches a force or constraint to a Body. Returns an AgentId of the
 * attached agent which can be used to detach the agent.
 *
 * @method attach
 * @param agent {Agent|Array.Agent} A force, constraint, or array of them.
 * @param [targets=All] {Body|Array.Body} The Body or Bodies affected by the agent
 * @param [source] {Body} The source of the agent
 * @return AgentId {Number}
 */
PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
    if (agents instanceof Array) {
        var agentIDs = [];
        for (var i = 0; i < agents.length; i++)
            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
        return agentIDs;
    }
    else return _attachOne.call(this, agents, targets, source);
};

/**
 * Append a body to the targets of a previously defined physics agent.
 *
 * @method attachTo
 * @param agentID {AgentId} The agentId of a previously defined agent
 * @param target {Body} The Body affected by the agent
 */
PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
    _getBoundAgent.call(this, agentID).targets.push(target);
};

/**
 * Undoes PhysicsEngine.attach. Removes an agent and its associated
 * effect on its affected Bodies.
 *
 * @method detach
 * @param agentID {AgentId} The agentId of a previously defined agent
 */
PhysicsEngine.prototype.detach = function detach(id) {
    // detach from forces/constraints array
    var agent = this.getAgent(id);
    var agentArray = _mapAgentArray.call(this, agent);
    var index = agentArray.indexOf(id);
    agentArray.splice(index,1);

    // detach agents array
    delete this._agents[id];
};

/**
 * Remove a single Body from a previously defined agent.
 *
 * @method detach
 * @param agentID {AgentId} The agentId of a previously defined agent
 * @param target {Body} The body to remove from the agent
 */
PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
    var boundAgent = _getBoundAgent.call(this, id);
    if (boundAgent.source === target) this.detach(id);
    else {
        var targets = boundAgent.targets;
        var index = targets.indexOf(target);
        if (index > -1) targets.splice(index,1);
    }
};

/**
 * A convenience method to give the Physics Engine a clean slate of
 * agents. Preserves all added Body objects.
 *
 * @method detachAll
 */
PhysicsEngine.prototype.detachAll = function detachAll() {
    this._agents        = {};
    this._forces        = [];
    this._constraints   = [];
    this._currAgentId   = 0;
};

function _getBoundAgent(id) {
    return this._agents[id];
}

/**
 * Returns the corresponding agent given its agentId.
 *
 * @method getAgent
 * @param id {AgentId}
 */
PhysicsEngine.prototype.getAgent = function getAgent(id) {
    return _getBoundAgent.call(this, id).agent;
};

/**
 * Returns all particles that are currently managed by the Physics Engine.
 *
 * @method getParticles
 * @return particles {Array.Particles}
 */
PhysicsEngine.prototype.getParticles = function getParticles() {
    return this._particles;
};

/**
 * Returns all bodies, except particles, that are currently managed by the Physics Engine.
 *
 * @method getBodies
 * @return bodies {Array.Bodies}
 */
PhysicsEngine.prototype.getBodies = function getBodies() {
    return this._bodies;
};

/**
 * Returns all bodies that are currently managed by the Physics Engine.
 *
 * @method getBodies
 * @return bodies {Array.Bodies}
 */
PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
    return this.getParticles().concat(this.getBodies());
};

/**
 * Iterates over every Particle and applies a function whose first
 * argument is the Particle
 *
 * @method forEachParticle
 * @param fn {Function} Function to iterate over
 * @param [dt] {Number} Delta time
 */
PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
    var particles = this.getParticles();
    for (var index = 0, len = particles.length; index < len; index++)
        fn.call(this, particles[index], dt);
};

/**
 * Iterates over every Body that isn't a Particle and applies
 * a function whose first argument is the Body
 *
 * @method forEachBody
 * @param fn {Function} Function to iterate over
 * @param [dt] {Number} Delta time
 */
PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
    if (!this._hasBodies) return;
    var bodies = this.getBodies();
    for (var index = 0, len = bodies.length; index < len; index++)
        fn.call(this, bodies[index], dt);
};

/**
 * Iterates over every Body and applies a function whose first
 * argument is the Body
 *
 * @method forEach
 * @param fn {Function} Function to iterate over
 * @param [dt] {Number} Delta time
 */
PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
    this.forEachParticle(fn, dt);
    this.forEachBody(fn, dt);
};

function _updateForce(index) {
    var boundAgent = _getBoundAgent.call(this, this._forces[index]);
    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
}

function _updateForces() {
    for (var index = this._forces.length - 1; index > -1; index--)
        _updateForce.call(this, index);
}

function _updateConstraint(index, dt) {
    var boundAgent = this._agents[this._constraints[index]];
    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
}

function _updateConstraints(dt) {
    var iteration = 0;
    while (iteration < this.options.constraintSteps) {
        for (var index = this._constraints.length - 1; index > -1; index--)
            _updateConstraint.call(this, index, dt);
        iteration++;
    }
}

function _updateVelocities(particle, dt) {
    particle.integrateVelocity(dt);
}

function _updateAngularVelocities(body, dt) {
    body.integrateAngularMomentum(dt);
    body.updateAngularVelocity();
}

function _updateOrientations(body, dt) {
    body.integrateOrientation(dt);
}

function _updatePositions(particle, dt) {
    particle.integratePosition(dt);
    particle.emit('update', particle);
}

function _integrate(dt) {
    _updateForces.call(this, dt);
    this.forEach(_updateVelocities, dt);
    this.forEachBody(_updateAngularVelocities, dt);
    _updateConstraints.call(this, dt);
    this.forEachBody(_updateOrientations, dt);
    this.forEach(_updatePositions, dt);
}

function _getEnergyParticles() {
    var energy = 0.0;
    var particleEnergy = 0.0;
    this.forEach(function(particle) {
        particleEnergy = particle.getEnergy();
        energy += particleEnergy;
        if (particleEnergy < particle.sleepTolerance) particle.sleep();
    });
    return energy;
}

function _getEnergyForces() {
    var energy = 0;
    for (var index = this._forces.length - 1; index > -1; index--)
        energy += this._forces[index].getEnergy() || 0.0;
    return energy;
}

function _getEnergyConstraints() {
    var energy = 0;
    for (var index = this._constraints.length - 1; index > -1; index--)
        energy += this._constraints[index].getEnergy() || 0.0;
    return energy;
}

/**
 * Calculates the kinetic energy of all Body objects and potential energy
 * of all attached agents.
 *
 * TODO: implement.
 * @method getEnergy
 * @return energy {Number}
 */
PhysicsEngine.prototype.getEnergy = function getEnergy() {
    return _getEnergyParticles.call(this) + _getEnergyForces.call(this) + _getEnergyConstraints.call(this);
};

/**
 * Updates all Body objects managed by the physics engine over the
 * time duration since the last time step was called.
 *
 * @method step
 */
PhysicsEngine.prototype.step = function step() {
//        if (this.getEnergy() < this.options.sleepTolerance) {
//            this.sleep();
//            return;
//        };

    //set current frame's time
    var currTime = now();

    //milliseconds elapsed since last frame
    var dtFrame = currTime - this._prevTime;

    this._prevTime = currTime;

    if (dtFrame < MIN_TIME_STEP) return;
    if (dtFrame > MAX_TIME_STEP) dtFrame = MAX_TIME_STEP;

    //robust integration
//        this._buffer += dtFrame;
//        while (this._buffer > this._timestep){
//            _integrate.call(this, this._timestep);
//            this._buffer -= this._timestep;
//        };
//        _integrate.call(this, this._buffer);
//        this._buffer = 0.0;
    _integrate.call(this, TIMESTEP);

//        this.emit('update', this);
};

/**
 * Tells whether the Physics Engine is sleeping or awake.
 * @method isSleeping
 * @return {Boolean}
 */
PhysicsEngine.prototype.isSleeping = function isSleeping() {
    return this._isSleeping;
};

/**
 * Stops the Physics Engine from updating. Emits an 'end' event.
 * @method sleep
 */
PhysicsEngine.prototype.sleep = function sleep() {
    this.emit('end', this);
    this._isSleeping = true;
};

/**
 * Starts the Physics Engine from updating. Emits an 'start' event.
 * @method wake
 */
PhysicsEngine.prototype.wake = function wake() {
    this._prevTime = now();
    this.emit('start', this);
    this._isSleeping = false;
};

PhysicsEngine.prototype.emit = function emit(type, data) {
    if (this._eventHandler === null) return;
    this._eventHandler.emit(type, data);
};

PhysicsEngine.prototype.on = function on(event, fn) {
    if (this._eventHandler === null) this._eventHandler = new EventHandler();
    this._eventHandler.on(event, fn);
};

module.exports = PhysicsEngine;
},{"../core/EventHandler":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventHandler.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/bodies/Particle.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Vector = require('../../math/Vector');
var Transform = require('../../core/Transform');
var EventHandler = require('../../core/EventHandler');
var Integrator = require('../integrators/SymplecticEuler');

/**
 * A point body that is controlled by the Physics Engine. A particle has
 *   position and velocity states that are updated by the Physics Engine.
 *   Ultimately, a particle is a _special type of modifier, and can be added to
 *   the Famous render tree like any other modifier.
 *
 * @constructor
 * @class Particle
 * @uses EventHandler
 * @uses Modifier
 * @extensionfor Body
 * @param {Options} [options] An object of configurable options.
 * @param {Array} [options.position] The position of the particle.
 * @param {Array} [options.velocity] The velocity of the particle.
 * @param {Number} [options.mass] The mass of the particle.
 * @param {Hexadecimal} [options.axis] The axis a particle can move along. Can be bitwise ORed e.g., Particle.AXES.X, Particle.AXES.X | Particle.AXES.Y
 *
 */
 function Particle(options) {
    options = options || {};

    // registers
    this.position = new Vector();
    this.velocity = new Vector();
    this.force    = new Vector();

    var defaults  = Particle.DEFAULT_OPTIONS;

    // set vectors
    this.setPosition(options.position || defaults.position);
    this.setVelocity(options.velocity || defaults.velocity);
    this.force.set(options.force || [0,0,0]);

    // set scalars
    this.mass = (options.mass !== undefined)
        ? options.mass
        : defaults.mass;

    this.axis = (options.axis !== undefined)
        ? options.axis
        : defaults.axis;

    this.inverseMass = 1 / this.mass;

    // state variables
    this._isSleeping     = false;
    this._engine         = null;
    this._eventOutput    = null;
    this._positionGetter = null;

    this.transform = Transform.identity.slice();

    // cached _spec
    this._spec = {
        transform : this.transform,
        target    : null
    };
}

Particle.DEFAULT_OPTIONS = {
    position : [0,0,0],
    velocity : [0,0,0],
    mass : 1,
    axis : undefined
};

/**
 * Kinetic energy threshold needed to update the body
 *
 * @property SLEEP_TOLERANCE
 * @type Number
 * @static
 * @default 1e-7
 */
Particle.SLEEP_TOLERANCE = 1e-7;

/**
 * Axes by which a body can translate
 *
 * @property AXES
 * @type Hexadecimal
 * @static
 * @default 1e-7
 */
Particle.AXES = {
    X : 0x00, // hexadecimal for 0
    Y : 0x01, // hexadecimal for 1
    Z : 0x02  // hexadecimal for 2
};

// Integrator for updating the particle's state
// TODO: make this a singleton
Particle.INTEGRATOR = new Integrator();

//Catalogue of outputted events
var _events = {
    start  : 'start',
    update : 'update',
    end    : 'end'
};

// Cached timing function
var now = (function() {
    return Date.now;
})();

/**
 * Stops the particle from updating
 * @method sleep
 */
Particle.prototype.sleep = function sleep() {
    if (this._isSleeping) return;
    this.emit(_events.end, this);
    this._isSleeping = true;
};

/**
 * Starts the particle update
 * @method wake
 */
Particle.prototype.wake = function wake() {
    if (!this._isSleeping) return;
    this.emit(_events.start, this);
    this._isSleeping = false;
    this._prevTime = now();
};

/**
 * @attribute isBody
 * @type Boolean
 * @static
 */
Particle.prototype.isBody = false;

/**
 * Basic setter for position
 * @method getPosition
 * @param position {Array|Vector}
 */
Particle.prototype.setPosition = function setPosition(position) {
    this.position.set(position);
};

/**
 * 1-dimensional setter for position
 * @method setPosition1D
 * @param value {Number}
 */
Particle.prototype.setPosition1D = function setPosition1D(x) {
    this.position.x = x;
};

/**
 * Basic getter function for position
 * @method getPosition
 * @return position {Array}
 */
Particle.prototype.getPosition = function getPosition() {
    if (this._positionGetter instanceof Function)
        this.setPosition(this._positionGetter());

    this._engine.step();

    return this.position.get();
};

/**
 * 1-dimensional getter for position
 * @method getPosition1D
 * @return value {Number}
 */
Particle.prototype.getPosition1D = function getPosition1D() {
    this._engine.step();
    return this.position.x;
};

/**
 * Defines the position from outside the Physics Engine
 * @method positionFrom
 * @param positionGetter {Function}
 */
Particle.prototype.positionFrom = function positionFrom(positionGetter) {
    this._positionGetter = positionGetter;
};

/**
 * Basic setter function for velocity Vector
 * @method setVelocity
 * @function
 */
Particle.prototype.setVelocity = function setVelocity(velocity) {
    this.velocity.set(velocity);
    this.wake();
};

/**
 * 1-dimensional setter for velocity
 * @method setVelocity1D
 * @param velocity {Number}
 */
Particle.prototype.setVelocity1D = function setVelocity1D(x) {
    this.velocity.x = x;
    this.wake();
};

/**
 * Basic getter function for velocity Vector
 * @method getVelocity
 * @return velocity {Array}
 */
Particle.prototype.getVelocity = function getVelocity() {
    return this.velocity.get();
};

/**
 * 1-dimensional getter for velocity
 * @method getVelocity1D
 * @return velocity {Number}
 */
Particle.prototype.getVelocity1D = function getVelocity1D() {
    return this.velocity.x;
};

/**
 * Basic setter function for mass quantity
 * @method setMass
 * @param mass {Number} mass
 */
Particle.prototype.setMass = function setMass(mass) {
    this.mass = mass;
    this.inverseMass = 1 / mass;
};

/**
 * Basic getter function for mass quantity
 * @method getMass
 * @return mass {Number}
 */
Particle.prototype.getMass = function getMass() {
    return this.mass;
};

/**
 * Reset position and velocity
 * @method reset
 * @param position {Array|Vector}
 * @param velocity {Array|Vector}
 */
Particle.prototype.reset = function reset(position, velocity) {
    this.setPosition(position || [0,0,0]);
    this.setVelocity(velocity || [0,0,0]);
};

/**
 * Add force vector to existing internal force Vector
 * @method applyForce
 * @param force {Vector}
 */
Particle.prototype.applyForce = function applyForce(force) {
    if (force.isZero()) return;
    this.force.add(force).put(this.force);
    this.wake();
};

/**
 * Add impulse (change in velocity) Vector to this Vector's velocity.
 * @method applyImpulse
 * @param impulse {Vector}
 */
Particle.prototype.applyImpulse = function applyImpulse(impulse) {
    if (impulse.isZero()) return;
    var velocity = this.velocity;
    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
};

/**
 * Update a particle's velocity from its force accumulator
 * @method integrateVelocity
 * @param dt {Number} Time differential
 */
Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
    Particle.INTEGRATOR.integrateVelocity(this, dt);
};

/**
 * Update a particle's position from its velocity
 * @method integratePosition
 * @param dt {Number} Time differential
 */
Particle.prototype.integratePosition = function integratePosition(dt) {
    Particle.INTEGRATOR.integratePosition(this, dt);
};

/**
 * Update the position and velocity of the particle
 * @method _integrate
 * @protected
 * @param dt {Number} Time differential
 */
Particle.prototype._integrate = function _integrate(dt) {
    this.integrateVelocity(dt);
    this.integratePosition(dt);
};

/**
 * Get kinetic energy of the particle.
 * @method getEnergy
 * @function
 */
Particle.prototype.getEnergy = function getEnergy() {
    return 0.5 * this.mass * this.velocity.normSquared();
};

/**
 * Generate transform from the current position state
 * @method getTransform
 * @return Transform {Transform}
 */
Particle.prototype.getTransform = function getTransform() {
    this._engine.step();

    var position = this.position;
    var axis = this.axis;
    var transform = this.transform;

    if (axis !== undefined) {
        if (axis & ~Particle.AXES.X) {
            position.x = 0;
        }
        if (axis & ~Particle.AXES.Y) {
            position.y = 0;
        }
        if (axis & ~Particle.AXES.Z) {
            position.z = 0;
        }
    }

    transform[12] = position.x;
    transform[13] = position.y;
    transform[14] = position.z;

    return transform;
};

/**
 * The modify interface of a Modifier
 * @method modify
 * @param target {Spec}
 * @return Spec {Spec}
 */
Particle.prototype.modify = function modify(target) {
    var _spec = this._spec;
    _spec.transform = this.getTransform();
    _spec.target = target;
    return _spec;
};

// private
function _createEventOutput() {
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    //overrides on/removeListener/pipe/unpipe methods
    EventHandler.setOutputHandler(this, this._eventOutput);
}

Particle.prototype.emit = function emit(type, data) {
    if (!this._eventOutput) return;
    this._eventOutput.emit(type, data);
};

Particle.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
Particle.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
Particle.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
Particle.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};

module.exports = Particle;
},{"../../core/EventHandler":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventHandler.js","../../core/Transform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js","../../math/Vector":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/math/Vector.js","../integrators/SymplecticEuler":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/integrators/SymplecticEuler.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/constraints/Constraint.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var EventHandler = require('../../core/EventHandler');

/**
 *  Allows for two circular bodies to collide and bounce off each other.
 *
 *  @class Constraint
 *  @constructor
 *  @uses EventHandler
 *  @param options {Object}
 */
function Constraint() {
    this.options = this.options || {};
    this._energy = 0.0;
    this._eventOutput = null;
}

/*
 * Setter for options.
 *
 * @method setOptions
 * @param options {Objects}
 */
Constraint.prototype.setOptions = function setOptions(options) {
    for (var key in options) this.options[key] = options[key];
};

/**
 * Adds an impulse to a physics body's velocity due to the constraint
 *
 * @method applyConstraint
 */
Constraint.prototype.applyConstraint = function applyConstraint() {};

/**
 * Getter for energy
 *
 * @method getEnergy
 * @return energy {Number}
 */
Constraint.prototype.getEnergy = function getEnergy() {
    return this._energy;
};

/**
 * Setter for energy
 *
 * @method setEnergy
 * @param energy {Number}
 */
Constraint.prototype.setEnergy = function setEnergy(energy) {
    this._energy = energy;
};

function _createEventOutput() {
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this._eventOutput);
}

Constraint.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
Constraint.prototype.addListener = function addListener() {
    _createEventOutput.call(this);
    return this.addListener.apply(this, arguments);
};
Constraint.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
Constraint.prototype.removeListener = function removeListener() {
    return this.removeListener.apply(this, arguments);
};
Constraint.prototype.unpipe = function unpipe() {
    return this.unpipe.apply(this, arguments);
};

module.exports = Constraint;
},{"../../core/EventHandler":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/EventHandler.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/constraints/Snap.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Constraint = require('./Constraint');
var Vector = require('../../math/Vector');

/**
 *  A spring constraint is like a spring force, except that it is always
 *    numerically stable (even for low periods), at the expense of introducing
 *    damping (even with dampingRatio set to 0).
 *
 *    Use this if you need fast spring-like behavior, e.g., snapping
 *
 *  @class Snap
 *  @constructor
 *  @extends Constraint
 *  @param {Options} [options] An object of configurable options.
 *  @param {Number} [options.period] The amount of time in milliseconds taken for one complete oscillation when there is no damping. Range : [150, Infinity]
 *  @param {Number} [options.dampingRatio] Additional damping of the spring. Range : [0, 1]. At 0 this spring will still be damped, at 1 the spring will be critically damped (the spring will never oscillate)
 *  @param {Number} [options.length] The rest length of the spring. Range: [0, Infinity].
 *  @param {Array} [options.anchor] The location of the spring's anchor, if not another physics body.
 *
 */
function Snap(options) {
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options) this.setOptions(options);

    //registers
    this.pDiff  = new Vector();
    this.vDiff  = new Vector();
    this.impulse1 = new Vector();
    this.impulse2 = new Vector();

    Constraint.call(this);
}

Snap.prototype = Object.create(Constraint.prototype);
Snap.prototype.constructor = Snap;

Snap.DEFAULT_OPTIONS = {
    period        : 300,
    dampingRatio : 0.1,
    length : 0,
    anchor : undefined
};

/** const */ var pi = Math.PI;

function _calcEnergy(impulse, disp, dt) {
    return Math.abs(impulse.dot(disp)/dt);
}

/**
 * Basic options setter
 *
 * @method setOptions
 * @param options {Objects} options
 */
Snap.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor   instanceof Vector) this.options.anchor = options.anchor;
        if (options.anchor.position instanceof Vector) this.options.anchor = options.anchor.position;
        if (options.anchor   instanceof Array)  this.options.anchor = new Vector(options.anchor);
    }
    if (options.length !== undefined) this.options.length = options.length;
    if (options.dampingRatio !== undefined) this.options.dampingRatio = options.dampingRatio;
    if (options.period !== undefined) this.options.period = options.period;
};

/**
 * Set the anchor position
 *
 * @method setOptions
 * @param {Array} v TODO
 */

Snap.prototype.setAnchor = function setAnchor(v) {
    if (this.options.anchor !== undefined) this.options.anchor = new Vector();
    this.options.anchor.set(v);
};

/**
 * Calculates energy of spring
 *
 * @method getEnergy
 * @param {Object} target TODO
 * @param {Object} source TODO
 * @return energy {Number}
 */
Snap.prototype.getEnergy = function getEnergy(target, source) {
    var options     = this.options;
    var restLength  = options.length;
    var anchor      = options.anchor || source.position;
    var strength    = Math.pow(2 * pi / options.period, 2);

    var dist = anchor.sub(target.position).norm() - restLength;

    return 0.5 * strength * dist * dist;
};

/**
 * Adds a spring impulse to a physics body's velocity due to the constraint
 *
 * @method applyConstraint
 * @param targets {Array.Body}  Array of bodies to apply the constraint to
 * @param source {Body}         The source of the constraint
 * @param dt {Number}           Delta time
 */
Snap.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    var options         = this.options;
    var pDiff        = this.pDiff;
    var vDiff        = this.vDiff;
    var impulse1     = this.impulse1;
    var impulse2     = this.impulse2;
    var length       = options.length;
    var anchor       = options.anchor || source.position;
    var period       = options.period;
    var dampingRatio = options.dampingRatio;

    for (var i = 0; i < targets.length ; i++) {
        var target = targets[i];

        var p1 = target.position;
        var v1 = target.velocity;
        var m1 = target.mass;
        var w1 = target.inverseMass;

        pDiff.set(p1.sub(anchor));
        var dist = pDiff.norm() - length;
        var effMass;

        if (source) {
            var w2 = source.inverseMass;
            var v2 = source.velocity;
            vDiff.set(v1.sub(v2));
            effMass = 1/(w1 + w2);
        }
        else {
            vDiff.set(v1);
            effMass = m1;
        }

        var gamma;
        var beta;

        if (this.options.period === 0) {
            gamma = 0;
            beta = 1;
        }
        else {
            var k = 4 * effMass * pi * pi / (period * period);
            var c = 4 * effMass * pi * dampingRatio / period;

            beta  = dt * k / (c + dt * k);
            gamma = 1 / (c + dt*k);
        }

        var antiDrift = beta/dt * dist;
        pDiff.normalize(-antiDrift)
            .sub(vDiff)
            .mult(dt / (gamma + dt/effMass))
            .put(impulse1);

        // var n = new Vector();
        // n.set(pDiff.normalize());
        // var lambda = -(n.dot(vDiff) + antiDrift) / (gamma + dt/effMass);
        // impulse2.set(n.mult(dt*lambda));

        target.applyImpulse(impulse1);

        if (source) {
            impulse1.mult(-1).put(impulse2);
            source.applyImpulse(impulse2);
        }

        this.setEnergy(_calcEnergy(impulse1, pDiff, dt));
    }
};

module.exports = Snap;
},{"../../math/Vector":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/math/Vector.js","./Constraint":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/constraints/Constraint.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/integrators/SymplecticEuler.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var OptionsManager = require('../../core/OptionsManager');

/**
 * Ordinary Differential Equation (ODE) Integrator.
 * Manages updating a physics body's state over time.
 *
 *  p = position, v = velocity, m = mass, f = force, dt = change in time
 *
 *      v <- v + dt * f / m
 *      p <- p + dt * v
 *
 *  q = orientation, w = angular velocity, L = angular momentum
 *
 *      L <- L + dt * t
 *      q <- q + dt/2 * q * w
 *
 * @class SymplecticEuler
 * @constructor
 * @param {Object} options Options to set
 */
function SymplecticEuler(options) {
    this.options = Object.create(SymplecticEuler.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);

    if (options) this.setOptions(options);
}

/**
 * @property SymplecticEuler.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
SymplecticEuler.DEFAULT_OPTIONS = {

    /**
     * The maximum velocity of a physics body
     *      Range : [0, Infinity]
     * @attribute velocityCap
     * @type Number
     */

    velocityCap : undefined,

    /**
     * The maximum angular velocity of a physics body
     *      Range : [0, Infinity]
     * @attribute angularVelocityCap
     * @type Number
     */
    angularVelocityCap : undefined
};

/*
 * Setter for options
 *
 * @method setOptions
 * @param {Object} options
 */
SymplecticEuler.prototype.setOptions = function setOptions(options) {
    this._optionsManager.patch(options);
};

/*
 * Getter for options
 *
 * @method getOptions
 * @return {Object} options
 */
SymplecticEuler.prototype.getOptions = function getOptions() {
    return this._optionsManager.value();
};

/*
 * Updates the velocity of a physics body from its accumulated force.
 *      v <- v + dt * f / m
 *
 * @method integrateVelocity
 * @param {Body} physics body
 * @param {Number} dt delta time
 */
SymplecticEuler.prototype.integrateVelocity = function integrateVelocity(body, dt) {
    var v = body.velocity;
    var w = body.inverseMass;
    var f = body.force;

    if (f.isZero()) return;

    v.add(f.mult(dt * w)).put(v);
    f.clear();
};

/*
 * Updates the position of a physics body from its velocity.
 *      p <- p + dt * v
 *
 * @method integratePosition
 * @param {Body} physics body
 * @param {Number} dt delta time
 */
SymplecticEuler.prototype.integratePosition = function integratePosition(body, dt) {
    var p = body.position;
    var v = body.velocity;

    if (this.options.velocityCap) v.cap(this.options.velocityCap).put(v);
    p.add(v.mult(dt)).put(p);
};

/*
 * Updates the angular momentum of a physics body from its accumuled torque.
 *      L <- L + dt * t
 *
 * @method integrateAngularMomentum
 * @param {Body} physics body (except a particle)
 * @param {Number} dt delta time
 */
SymplecticEuler.prototype.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
    var L = body.angularMomentum;
    var t = body.torque;

    if (t.isZero()) return;

    if (this.options.angularVelocityCap) t.cap(this.options.angularVelocityCap).put(t);
    L.add(t.mult(dt)).put(L);
    t.clear();
};

/*
 * Updates the orientation of a physics body from its angular velocity.
 *      q <- q + dt/2 * q * w
 *
 * @method integrateOrientation
 * @param {Body} physics body (except a particle)
 * @param {Number} dt delta time
 */
SymplecticEuler.prototype.integrateOrientation = function integrateOrientation(body, dt) {
    var q = body.orientation;
    var w = body.angularVelocity;

    if (w.isZero()) return;
    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
//        q.normalize.put(q);
};

module.exports = SymplecticEuler;
},{"../../core/OptionsManager":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/OptionsManager.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/MultipleTransition.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Utility = require('../utilities/Utility');

/**
 * Transition meta-method to support transitioning multiple
 *   values with scalar-only methods.
 *
 *
 * @class MultipleTransition
 * @constructor
 *
 * @param {Object} method Transionable class to multiplex
 */
function MultipleTransition(method) {
    this.method = method;
    this._instances = [];
    this.state = [];
}

MultipleTransition.SUPPORTS_MULTIPLE = true;

/**
 * Get the state of each transition.
 *
 * @method get
 *
 * @return state {Number|Array} state array
 */
MultipleTransition.prototype.get = function get() {
    for (var i = 0; i < this._instances.length; i++) {
        this.state[i] = this._instances[i].get();
    }
    return this.state;
};

/**
 * Set the end states with a shared transition, with optional callback.
 *
 * @method set
 *
 * @param {Number|Array} endState Final State.  Use a multi-element argument for multiple transitions.
 * @param {Object} transition Transition definition, shared among all instances
 * @param {Function} callback called when all endStates have been reached.
 */
MultipleTransition.prototype.set = function set(endState, transition, callback) {
    var _allCallback = Utility.after(endState.length, callback);
    for (var i = 0; i < endState.length; i++) {
        if (!this._instances[i]) this._instances[i] = new (this.method)();
        this._instances[i].set(endState[i], transition, _allCallback);
    }
};

/**
 * Reset all transitions to start state.
 *
 * @method reset
 *
 * @param  {Number|Array} startState Start state
 */
MultipleTransition.prototype.reset = function reset(startState) {
    for (var i = 0; i < startState.length; i++) {
        if (!this._instances[i]) this._instances[i] = new (this.method)();
        this._instances[i].reset(startState[i]);
    }
};

module.exports = MultipleTransition;
},{"../utilities/Utility":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/utilities/Utility.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/SnapTransition.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var PE = require('../physics/PhysicsEngine');
var Particle = require('../physics/bodies/Particle');
var Spring = require('../physics/constraints/Snap');
var Vector = require('../math/Vector');

/**
 * SnapTransition is a method of transitioning between two values (numbers,
 * or arrays of numbers). It is similar to SpringTransition except
 * the transition can be much faster and always has a damping effect.
 *
 * @class SnapTransition
 * @constructor
 *
 * @param [state=0] {Number|Array} Initial state
 */
function SnapTransition(state) {
    state = state || 0;

    this.endState  = new Vector(state);
    this.initState = new Vector();

    this._dimensions       = 1;
    this._restTolerance    = 1e-10;
    this._absRestTolerance = this._restTolerance;
    this._callback         = undefined;

    this.PE       = new PE();
    this.particle = new Particle();
    this.spring   = new Spring({anchor : this.endState});

    this.PE.addBody(this.particle);
    this.PE.attach(this.spring, this.particle);
}

SnapTransition.SUPPORTS_MULTIPLE = 3;

/**
 * @property SnapTransition.DEFAULT_OPTIONS
 * @type Object
 * @protected
 * @static
 */
SnapTransition.DEFAULT_OPTIONS = {

    /**
     * The amount of time in milliseconds taken for one complete oscillation
     * when there is no damping
     *    Range : [0, Infinity]
     *
     * @attribute period
     * @type Number
     * @default 100
     */
    period : 100,

    /**
     * The damping of the snap.
     *    Range : [0, 1]
     *
     * @attribute dampingRatio
     * @type Number
     * @default 0.2
     */
    dampingRatio : 0.2,

    /**
     * The initial velocity of the transition.
     *
     * @attribute velocity
     * @type Number|Array
     * @default 0
     */
    velocity : 0
};

function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy(this.particle);
}

function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = (distance === 0)
        ? this._restTolerance
        : this._restTolerance * distance;
}

function _setTarget(target) {
    this.endState.set(target);
    _setAbsoluteRestTolerance.call(this);
}

function _wake() {
    this.PE.wake();
}

function _sleep() {
    this.PE.sleep();
}

function _setParticlePosition(p) {
    this.particle.position.set(p);
}

function _setParticleVelocity(v) {
    this.particle.velocity.set(v);
}

function _getParticlePosition() {
    return (this._dimensions === 0)
        ? this.particle.getPosition1D()
        : this.particle.getPosition();
}

function _getParticleVelocity() {
    return (this._dimensions === 0)
        ? this.particle.getVelocity1D()
        : this.particle.getVelocity();
}

function _setCallback(callback) {
    this._callback = callback;
}

function _setupDefinition(definition) {
    var defaults = SnapTransition.DEFAULT_OPTIONS;
    if (definition.period === undefined)       definition.period       = defaults.period;
    if (definition.dampingRatio === undefined) definition.dampingRatio = defaults.dampingRatio;
    if (definition.velocity === undefined)     definition.velocity     = defaults.velocity;

    //setup spring
    this.spring.setOptions({
        period       : definition.period,
        dampingRatio : definition.dampingRatio
    });

    //setup particle
    _setParticleVelocity.call(this, definition.velocity);
}

function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }

    if (_getEnergy.call(this) < this._absRestTolerance) {
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [0,0,0]);
        _sleep.call(this);
    }
}

/**
 * Resets the state and velocity
 *
 * @method reset
 *
 * @param state {Number|Array}      State
 * @param [velocity] {Number|Array} Velocity
 */
SnapTransition.prototype.reset = function reset(state, velocity) {
    this._dimensions = (state instanceof Array)
        ? state.length
        : 0;

    this.initState.set(state);
    _setParticlePosition.call(this, state);
    _setTarget.call(this, state);
    if (velocity) _setParticleVelocity.call(this, velocity);
    _setCallback.call(this, undefined);
};

/**
 * Getter for velocity
 *
 * @method getVelocity
 *
 * @return velocity {Number|Array}
 */
SnapTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};

/**
 * Setter for velocity
 *
 * @method setVelocity
 *
 * @return velocity {Number|Array}
 */
SnapTransition.prototype.setVelocity = function setVelocity(velocity) {
    this.call(this, _setParticleVelocity(velocity));
};

/**
 * Detects whether a transition is in progress
 *
 * @method isActive
 *
 * @return {Boolean}
 */
SnapTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};

/**
 * Halt the transition
 *
 * @method halt
 */
SnapTransition.prototype.halt = function halt() {
    this.set(this.get());
};

/**
 * Get the current position of the transition
s     *
 * @method get
 *
 * @return state {Number|Array}
 */
SnapTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};

/**
 * Set the end position and transition, with optional callback on completion.
 *
 * @method set
 *
 * @param state {Number|Array}      Final state
 * @param [definition] {Object}     Transition definition
 * @param [callback] {Function}     Callback
 */
SnapTransition.prototype.set = function set(state, definition, callback) {
    if (!definition) {
        this.reset(state);
        if (callback) callback();
        return;
    }

    this._dimensions = (state instanceof Array)
        ? state.length
        : 0;

    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, state);
    _setCallback.call(this, callback);
};

module.exports = SnapTransition;
},{"../math/Vector":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/math/Vector.js","../physics/PhysicsEngine":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/PhysicsEngine.js","../physics/bodies/Particle":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/bodies/Particle.js","../physics/constraints/Snap":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/physics/constraints/Snap.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/Transitionable.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var MultipleTransition = require('./MultipleTransition');
var TweenTransition = require('./TweenTransition');

/**
 * A state maintainer for a smooth transition between
 *    numerically-specified states. Example numeric states include floats or
 *    Transform objects.
 *
 * An initial state is set with the constructor or set(startState). A
 *    corresponding end state and transition are set with set(endState,
 *    transition). Subsequent calls to set(endState, transition) begin at
 *    the last state. Calls to get(timestamp) provide the interpolated state
 *    along the way.
 *
 * Note that there is no event loop here - calls to get() are the only way
 *    to find state projected to the current (or provided) time and are
 *    the only way to trigger callbacks. Usually this kind of object would
 *    be part of the render() path of a visible component.
 *
 * @class Transitionable
 * @constructor
 * @param {number|Array.Number|Object.<number|string, number>} start
 *    beginning state
 */
function Transitionable(start) {
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];

    this.state = 0;
    this.velocity = undefined;
    this._callback = undefined;
    this._engineInstance = null;
    this._currentMethod = null;

    this.set(start);
}

var transitionMethods = {};

Transitionable.registerMethod = function registerMethod(name, engineClass) {
    if (!(name in transitionMethods)) {
        transitionMethods[name] = engineClass;
        return true;
    }
    else return false;
};

Transitionable.unregisterMethod = function unregisterMethod(name) {
    if (name in transitionMethods) {
        delete transitionMethods[name];
        return true;
    }
    else return false;
};

function _loadNext() {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    if (this.actionQueue.length <= 0) {
        this.set(this.get()); // no update required
        return;
    }
    this.currentAction = this.actionQueue.shift();
    this._callback = this.callbackQueue.shift();

    var method = null;
    var endValue = this.currentAction[0];
    var transition = this.currentAction[1];
    if (transition instanceof Object && transition.method) {
        method = transition.method;
        if (typeof method === 'string') method = transitionMethods[method];
    }
    else {
        method = TweenTransition;
    }

    if (this._currentMethod !== method) {
        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
            this._engineInstance = new method();
        }
        else {
            this._engineInstance = new MultipleTransition(method);
        }
        this._currentMethod = method;
    }

    this._engineInstance.reset(this.state, this.velocity);
    if (this.velocity !== undefined) transition.velocity = this.velocity;
    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
}

/**
 * Add transition to end state to the queue of pending transitions. Special
 *    Use: calling without a transition resets the object to that state with
 *    no pending actions
 *
 * @method set
 *
 * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endState
 *    end state to which we interpolate
 * @param {transition=} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {function()=} callback Zero-argument function to call on observed
 *    completion (t=1)
 */
Transitionable.prototype.set = function set(endState, transition, callback) {
    if (!transition) {
        this.reset(endState);
        if (callback) callback();
        return this;
    }

    var action = [endState, transition];
    this.actionQueue.push(action);
    this.callbackQueue.push(callback);
    if (!this.currentAction) _loadNext.call(this);
    return this;
};

/**
 * Cancel all transitions and reset to a stable state
 *
 * @method reset
 *
 * @param {number|Array.Number|Object.<number, number>} startState
 *    stable state to set to
 */
Transitionable.prototype.reset = function reset(startState, startVelocity) {
    this._currentMethod = null;
    this._engineInstance = null;
    this._callback = undefined;
    this.state = startState;
    this.velocity = startVelocity;
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
};

/**
 * Add delay action to the pending action queue queue.
 *
 * @method delay
 *
 * @param {number} duration delay time (ms)
 * @param {function} callback Zero-argument function to call on observed
 *    completion (t=1)
 */
Transitionable.prototype.delay = function delay(duration, callback) {
    this.set(this.get(), {duration: duration,
        curve: function() {
            return 0;
        }},
        callback
    );
};

/**
 * Get interpolated state of current action at provided time. If the last
 *    action has completed, invoke its callback.
 *
 * @method get
 *
 * @param {number=} timestamp Evaluate the curve at a normalized version of this
 *    time. If omitted, use current time. (Unix epoch time)
 * @return {number|Object.<number|string, number>} beginning state
 *    interpolated to this point in time.
 */
Transitionable.prototype.get = function get(timestamp) {
    if (this._engineInstance) {
        if (this._engineInstance.getVelocity)
            this.velocity = this._engineInstance.getVelocity();
        this.state = this._engineInstance.get(timestamp);
    }
    return this.state;
};

/**
 * Is there at least one action pending completion?
 *
 * @method isActive
 *
 * @return {boolean}
 */
Transitionable.prototype.isActive = function isActive() {
    return !!this.currentAction;
};

/**
 * Halt transition at current state and erase all pending actions.
 *
 * @method halt
 */
Transitionable.prototype.halt = function halt() {
    this.set(this.get());
};

module.exports = Transitionable;
},{"./MultipleTransition":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/MultipleTransition.js","./TweenTransition":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/TweenTransition.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/TransitionableTransform.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

var Transitionable = require('./Transitionable');
var Transform = require('../core/Transform');
var Utility = require('../utilities/Utility');

/**
 * A class for transitioning the state of a Transform by transitioning
 * its translate, scale, skew and rotate components independently.
 *
 * @class TransitionableTransform
 * @constructor
 *
 * @param [transform=Transform.identity] {Transform} The initial transform state
 */
function TransitionableTransform(transform) {
    this._final = Transform.identity.slice();
    this.translate = new Transitionable([0, 0, 0]);
    this.rotate = new Transitionable([0, 0, 0]);
    this.skew = new Transitionable([0, 0, 0]);
    this.scale = new Transitionable([1, 1, 1]);

    if (transform) this.set(transform);
}

function _build() {
    return Transform.build({
        translate: this.translate.get(),
        rotate: this.rotate.get(),
        skew: this.skew.get(),
        scale: this.scale.get()
    });
}

/**
 * An optimized way of setting only the translation component of a Transform
 *
 * @method setTranslate
 * @chainable
 *
 * @param translate {Array}     New translation state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
    this.translate.set(translate, transition, callback);
    this._final = this._final.slice();
    this._final[12] = translate[0];
    this._final[13] = translate[1];
    if (translate[2] !== undefined) this._final[14] = translate[2];
    return this;
};

/**
 * An optimized way of setting only the scale component of a Transform
 *
 * @method setScale
 * @chainable
 *
 * @param scale {Array}         New scale state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
    this.scale.set(scale, transition, callback);
    this._final = this._final.slice();
    this._final[0] = scale[0];
    this._final[5] = scale[1];
    if (scale[2] !== undefined) this._final[10] = scale[2];
    return this;
};

/**
 * An optimized way of setting only the rotational component of a Transform
 *
 * @method setRotate
 * @chainable
 *
 * @param eulerAngles {Array}   Euler angles for new rotation state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
    this.rotate.set(eulerAngles, transition, callback);
    this._final = _build.call(this);
    this._final = Transform.build({
        translate: this.translate.get(),
        rotate: eulerAngles,
        scale: this.scale.get(),
        skew: this.skew.get()
    });
    return this;
};

/**
 * An optimized way of setting only the skew component of a Transform
 *
 * @method setSkew
 * @chainable
 *
 * @param skewAngles {Array}    New skew state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
    this.skew.set(skewAngles, transition, callback);
    this._final = Transform.build({
        translate: this.translate.get(),
        rotate: this.rotate.get(),
        scale: this.scale.get(),
        skew: skewAngles
    });
    return this;
};

/**
 * Setter for a TransitionableTransform with optional parameters to transition
 * between Transforms
 *
 * @method set
 * @chainable
 *
 * @param transform {Array}     New transform state
 * @param [transition] {Object} Transition definition
 * @param [callback] {Function} Callback
 * @return {TransitionableTransform}
 */
TransitionableTransform.prototype.set = function set(transform, transition, callback) {
    this._final = transform;
    var components = Transform.interpret(transform);

    var _callback = callback ? Utility.after(4, callback) : null;
    this.translate.set(components.translate, transition, _callback);
    this.rotate.set(components.rotate, transition, _callback);
    this.skew.set(components.skew, transition, _callback);
    this.scale.set(components.scale, transition, _callback);
    return this;
};

/**
 * Sets the default transition to use for transitioning betwen Transform states
 *
 * @method setDefaultTransition
 *
 * @param transition {Object} Transition definition
 */
TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
    this.translate.setDefault(transition);
    this.rotate.setDefault(transition);
    this.skew.setDefault(transition);
    this.scale.setDefault(transition);
};

/**
 * Getter. Returns the current state of the Transform
 *
 * @method get
 *
 * @return {Transform}
 */
TransitionableTransform.prototype.get = function get() {
    if (this.isActive()) {
        return _build.call(this);
    }
    else return this._final;
};

/**
 * Get the destination state of the Transform
 *
 * @method getFinal
 *
 * @return Transform {Transform}
 */
TransitionableTransform.prototype.getFinal = function getFinal() {
    return this._final;
};

/**
 * Determine if the TransitionalTransform is currently transitioning
 *
 * @method isActive
 *
 * @return {Boolean}
 */
TransitionableTransform.prototype.isActive = function isActive() {
    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
};

/**
 * Halts the transition
 *
 * @method halt
 */
TransitionableTransform.prototype.halt = function halt() {
    this._final = this.get();
    this.translate.halt();
    this.rotate.halt();
    this.skew.halt();
    this.scale.halt();
};

module.exports = TransitionableTransform;
},{"../core/Transform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js","../utilities/Utility":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/utilities/Utility.js","./Transitionable":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/Transitionable.js"}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/TweenTransition.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: david@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */




/**
 *
 * A state maintainer for a smooth transition between
 *    numerically-specified states.  Example numeric states include floats or
 *    Transfornm objects.
 *
 *    An initial state is set with the constructor or set(startValue). A
 *    corresponding end state and transition are set with set(endValue,
 *    transition). Subsequent calls to set(endValue, transition) begin at
 *    the last state. Calls to get(timestamp) provide the _interpolated state
 *    along the way.
 *
 *   Note that there is no event loop here - calls to get() are the only way
 *    to find out state projected to the current (or provided) time and are
 *    the only way to trigger callbacks. Usually this kind of object would
 *    be part of the render() path of a visible component.
 *
 * @class TweenTransition
 * @constructor
 *
 * @param {Object} options TODO
 *    beginning state
 */
function TweenTransition(options) {
    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
    if (options) this.setOptions(options);

    this._startTime = 0;
    this._startValue = 0;
    this._updateTime = 0;
    this._endValue = 0;
    this._curve = undefined;
    this._duration = 0;
    this._active = false;
    this._callback = undefined;
    this.state = 0;
    this.velocity = undefined;
}

/**
 * Transition curves mapping independent variable t from domain [0,1] to a
 *    range within [0,1]. Includes functions 'linear', 'easeIn', 'easeOut',
 *    'easeInOut', 'easeOutBounce', 'spring'.
 *
 * @property {object} Curve
 * @final
 */
TweenTransition.Curves = {
    linear: function(t) {
        return t;
    },
    easeIn: function(t) {
        return t*t;
    },
    easeOut: function(t) {
        return t*(2-t);
    },
    easeInOut: function(t) {
        if (t <= 0.5) return 2*t*t;
        else return -2*t*t + 4*t - 1;
    },
    easeOutBounce: function(t) {
        return t*(3 - 2*t);
    },
    spring: function(t) {
        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
    }
};

TweenTransition.SUPPORTS_MULTIPLE = true;
TweenTransition.DEFAULT_OPTIONS = {
    curve: TweenTransition.Curves.linear,
    duration: 500,
    speed: 0 /* considered only if positive */
};

var registeredCurves = {};

/**
 * Add "unit" curve to internal dictionary of registered curves.
 *
 * @method registerCurve
 *
 * @static
 *
 * @param {string} curveName dictionary key
 * @param {unitCurve} curve function of one numeric variable mapping [0,1]
 *    to range inside [0,1]
 * @return {boolean} false if key is taken, else true
 */
TweenTransition.registerCurve = function registerCurve(curveName, curve) {
    if (!registeredCurves[curveName]) {
        registeredCurves[curveName] = curve;
        return true;
    }
    else {
        return false;
    }
};

/**
 * Remove object with key "curveName" from internal dictionary of registered
 *    curves.
 *
 * @method unregisterCurve
 *
 * @static
 *
 * @param {string} curveName dictionary key
 * @return {boolean} false if key has no dictionary value
 */
TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
    if (registeredCurves[curveName]) {
        delete registeredCurves[curveName];
        return true;
    }
    else {
        return false;
    }
};

/**
 * Retrieve function with key "curveName" from internal dictionary of
 *    registered curves. Default curves are defined in the
 *    TweenTransition.Curves array, where the values represent
 *    unitCurve functions.
 *
 * @method getCurve
 *
 * @static
 *
 * @param {string} curveName dictionary key
 * @return {unitCurve} curve function of one numeric variable mapping [0,1]
 *    to range inside [0,1]
 */
TweenTransition.getCurve = function getCurve(curveName) {
    var curve = registeredCurves[curveName];
    if (curve !== undefined) return curve;
    else throw new Error('curve not registered');
};

/**
 * Retrieve all available curves.
 *
 * @method getCurves
 *
 * @static
 *
 * @return {object} curve functions of one numeric variable mapping [0,1]
 *    to range inside [0,1]
 */
TweenTransition.getCurves = function getCurves() {
    return registeredCurves;
};

 // Interpolate: If a linear function f(0) = a, f(1) = b, then return f(t)
function _interpolate(a, b, t) {
    return ((1 - t) * a) + (t * b);
}

function _clone(obj) {
    if (obj instanceof Object) {
        if (obj instanceof Array) return obj.slice(0);
        else return Object.create(obj);
    }
    else return obj;
}

// Fill in missing properties in "transition" with those in defaultTransition, and
//   convert internal named curve to function object, returning as new
//   object.
function _normalize(transition, defaultTransition) {
    var result = {curve: defaultTransition.curve};
    if (defaultTransition.duration) result.duration = defaultTransition.duration;
    if (defaultTransition.speed) result.speed = defaultTransition.speed;
    if (transition instanceof Object) {
        if (transition.duration !== undefined) result.duration = transition.duration;
        if (transition.curve) result.curve = transition.curve;
        if (transition.speed) result.speed = transition.speed;
    }
    if (typeof result.curve === 'string') result.curve = TweenTransition.getCurve(result.curve);
    return result;
}

/**
 * Set internal options, overriding any default options.
 *
 * @method setOptions
 *
 *
 * @param {Object} options options object
 * @param {Object} [options.curve] function mapping [0,1] to [0,1] or identifier
 * @param {Number} [options.duration] duration in ms
 * @param {Number} [options.speed] speed in pixels per ms
 */
TweenTransition.prototype.setOptions = function setOptions(options) {
    if (options.curve !== undefined) this.options.curve = options.curve;
    if (options.duration !== undefined) this.options.duration = options.duration;
    if (options.speed !== undefined) this.options.speed = options.speed;
};

/**
 * Add transition to end state to the queue of pending transitions. Special
 *    Use: calling without a transition resets the object to that state with
 *    no pending actions
 *
 * @method set
 *
 *
 * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endValue
 *    end state to which we _interpolate
 * @param {transition=} transition object of type {duration: number, curve:
 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
 *    instantaneous.
 * @param {function()=} callback Zero-argument function to call on observed
 *    completion (t=1)
 */
TweenTransition.prototype.set = function set(endValue, transition, callback) {
    if (!transition) {
        this.reset(endValue);
        if (callback) callback();
        return;
    }

    this._startValue = _clone(this.get());
    transition = _normalize(transition, this.options);
    if (transition.speed) {
        var startValue = this._startValue;
        if (startValue instanceof Object) {
            var variance = 0;
            for (var i in startValue) variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
            transition.duration = Math.sqrt(variance) / transition.speed;
        }
        else {
            transition.duration = Math.abs(endValue - startValue) / transition.speed;
        }
    }

    this._startTime = Date.now();
    this._endValue = _clone(endValue);
    this._startVelocity = _clone(transition.velocity);
    this._duration = transition.duration;
    this._curve = transition.curve;
    this._active = true;
    this._callback = callback;
};

/**
 * Cancel all transitions and reset to a stable state
 *
 * @method reset
 *
 * @param {number|Array.Number|Object.<number, number>} startValue
 *    starting state
 * @param {number} startVelocity
 *    starting velocity
 */
TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    this.state = _clone(startValue);
    this.velocity = _clone(startVelocity);
    this._startTime = 0;
    this._duration = 0;
    this._updateTime = 0;
    this._startValue = this.state;
    this._startVelocity = this.velocity;
    this._endValue = this.state;
    this._active = false;
};

/**
 * Get current velocity
 *
 * @method getVelocity
 *
 * @returns {Number} velocity
 */
TweenTransition.prototype.getVelocity = function getVelocity() {
    return this.velocity;
};

/**
 * Get interpolated state of current action at provided time. If the last
 *    action has completed, invoke its callback.
 *
 * @method get
 *
 *
 * @param {number=} timestamp Evaluate the curve at a normalized version of this
 *    time. If omitted, use current time. (Unix epoch time)
 * @return {number|Object.<number|string, number>} beginning state
 *    _interpolated to this point in time.
 */
TweenTransition.prototype.get = function get(timestamp) {
    this.update(timestamp);
    return this.state;
};

function _calculateVelocity(current, start, curve, duration, t) {
    var velocity;
    var eps = 1e-7;
    var speed = (curve(t) - curve(t - eps)) / eps;
    if (current instanceof Array) {
        velocity = [];
        for (var i = 0; i < current.length; i++){
            if (typeof current[i] === 'number')
                velocity[i] = speed * (current[i] - start[i]) / duration;
            else
                velocity[i] = 0;
        }

    }
    else velocity = speed * (current - start) / duration;
    return velocity;
}

function _calculateState(start, end, t) {
    var state;
    if (start instanceof Array) {
        state = [];
        for (var i = 0; i < start.length; i++) {
            if (typeof start[i] === 'number')
                state[i] = _interpolate(start[i], end[i], t);
            else
                state[i] = start[i];
        }
    }
    else state = _interpolate(start, end, t);
    return state;
}

/**
 * Update internal state to the provided timestamp. This may invoke the last
 *    callback and begin a new action.
 *
 * @method update
 *
 *
 * @param {number=} timestamp Evaluate the curve at a normalized version of this
 *    time. If omitted, use current time. (Unix epoch time)
 */
TweenTransition.prototype.update = function update(timestamp) {
    if (!this._active) {
        if (this._callback) {
            var callback = this._callback;
            this._callback = undefined;
            callback();
        }
        return;
    }

    if (!timestamp) timestamp = Date.now();
    if (this._updateTime >= timestamp) return;
    this._updateTime = timestamp;

    var timeSinceStart = timestamp - this._startTime;
    if (timeSinceStart >= this._duration) {
        this.state = this._endValue;
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
        this._active = false;
    }
    else if (timeSinceStart < 0) {
        this.state = this._startValue;
        this.velocity = this._startVelocity;
    }
    else {
        var t = timeSinceStart / this._duration;
        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
    }
};

/**
 * Is there at least one action pending completion?
 *
 * @method isActive
 *
 *
 * @return {boolean}
 */
TweenTransition.prototype.isActive = function isActive() {
    return this._active;
};

/**
 * Halt transition at current state and erase all pending actions.
 *
 * @method halt
 *
 */
TweenTransition.prototype.halt = function halt() {
    this.reset(this.get());
};

// Register all the default curves
TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);

TweenTransition.customCurve = function customCurve(v1, v2) {
    v1 = v1 || 0; v2 = v2 || 0;
    return function(t) {
        return v1*t + (-2*v1 - v2 + 3)*t*t + (v1 + v2 - 2)*t*t*t;
    };
};

module.exports = TweenTransition;
},{}],"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/utilities/Utility.js":[function(require,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */



/**
 * This namespace holds standalone functionality.
 *  Currently includes name mapping for transition curves,
 *  name mapping for origin pairs, and the after() function.
 *
 * @class Utility
 * @static
 */
var Utility = {};

/**
 * Table of direction array positions
 *
 * @property {object} Direction
 * @final
 */
Utility.Direction = {
    X: 0,
    Y: 1,
    Z: 2
};

/**
 * Return wrapper around callback function. Once the wrapper is called N
 *   times, invoke the callback function. Arguments and scope preserved.
 *
 * @method after
 *
 * @param {number} count number of calls before callback function invoked
 * @param {Function} callback wrapped callback function
 *
 * @return {function} wrapped callback with coundown feature
 */
Utility.after = function after(count, callback) {
    var counter = count;
    return function() {
        counter--;
        if (counter === 0) callback.apply(this, arguments);
    };
};

/**
 * Load a URL and return its contents in a callback
 *
 * @method loadURL
 *
 * @param {string} url URL of object
 * @param {function} callback callback to dispatch with content
 */
Utility.loadURL = function loadURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
            if (callback) callback(this.responseText);
        }
    };
    xhr.open('GET', url);
    xhr.send();
};

/**
 * Create a document fragment from a string of HTML
 *
 * @method createDocumentFragmentFromHTML
 *
 * @param {string} html HTML to convert to DocumentFragment
 *
 * @return {DocumentFragment} DocumentFragment representing input HTML
 */
Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
    var element = document.createElement('div');
    element.innerHTML = html;
    var result = document.createDocumentFragment();
    while (element.hasChildNodes()) result.appendChild(element.firstChild);
    return result;
};

module.exports = Utility;
},{}],"/Users/danemacaulay/Sites/browserify-seed/src/index.js":[function(require,module,exports){
'use strict';

// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var StateModifier = require('famous/modifiers/StateModifier');
var Transform = require('famous/core/Transform');
var Surface = require('famous/core/Surface');
var Transitionable = require('famous/transitions/Transitionable');
var SnapTransition = require('famous/transitions/SnapTransition');

// create the main context
var context = Engine.createContext();

// set up our snap transition
Transitionable.registerMethod('snap', SnapTransition);

var data = [
    {name: 'top left', position: [0, 0]},
    {name: 'top middle', position: [0.5, 0]},
    {name: 'top right', position: [1, 0]},
    {name: 'center left', position: [0, 0.5]},
    {name: 'center middle', position: [0.5, 0.5]},
    {name: 'center right', position: [1, 0.5]},
    {name: 'bottom left', position: [0, 1]},
    {name: 'bottom center', position: [0.5, 1]},
    {name: 'bottom right', position: [1, 1]},
]

data.forEach(function (item) {

    var surface = new Surface({
        content: item.name,
        classes: ["red-bg"],
        properties: {
            textAlign: "center",
            background: 'red',
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
        method: "snap",
        period: 500,
        dampingRatio: .6,
        velocity: 0
    }

    context.add(modifier).add(surface);

    var opacityState = new Transitionable(0);
    modifier.opacityFrom(opacityState);
    opacityState.set(1, transition)

    var sizeState = new Transitionable([0.5, 0.5]);
    modifier.sizeFrom(sizeState);
    sizeState.set([200,200], transition)

    var alignState = new Transitionable([0, 0]);
    modifier.alignFrom(alignState);
    alignState.set(item.position, transition)

})


},{"./styles":"/Users/danemacaulay/Sites/browserify-seed/src/styles/index.js","famous-polyfills":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous-polyfills/index.js","famous/core/Engine":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Engine.js","famous/core/Modifier":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Modifier.js","famous/core/Surface":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Surface.js","famous/core/Transform":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/core/Transform.js","famous/modifiers/StateModifier":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/modifiers/StateModifier.js","famous/transitions/SnapTransition":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/SnapTransition.js","famous/transitions/Transitionable":"/Users/danemacaulay/Sites/browserify-seed/node_modules/famous/transitions/Transitionable.js"}],"/Users/danemacaulay/Sites/browserify-seed/src/styles/app.css":[function(require,module,exports){
var css = "html {\n  background: #fff;\n}\n\n.backfaceVisibility {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n"; (require("/Users/danemacaulay/Sites/browserify-seed/node_modules/cssify"))(css); module.exports = css;
},{"/Users/danemacaulay/Sites/browserify-seed/node_modules/cssify":"/Users/danemacaulay/Sites/browserify-seed/node_modules/cssify/browser.js"}],"/Users/danemacaulay/Sites/browserify-seed/src/styles/famous.css":[function(require,module,exports){
var css = "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n\nhtml {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\nbody {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: transparent;\n    -webkit-perspective: 0;\n    perspective: none;\n    overflow: hidden;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: flat;\n    transform-style: preserve-3d; /* performance */\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n"; (require("/Users/danemacaulay/Sites/browserify-seed/node_modules/cssify"))(css); module.exports = css;
},{"/Users/danemacaulay/Sites/browserify-seed/node_modules/cssify":"/Users/danemacaulay/Sites/browserify-seed/node_modules/cssify/browser.js"}],"/Users/danemacaulay/Sites/browserify-seed/src/styles/index.js":[function(require,module,exports){
// load css
require('./famous.css');
require('./app.css');

},{"./app.css":"/Users/danemacaulay/Sites/browserify-seed/src/styles/app.css","./famous.css":"/Users/danemacaulay/Sites/browserify-seed/src/styles/famous.css"}]},{},["/Users/danemacaulay/Sites/browserify-seed/src/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvY3NzaWZ5L2Jyb3dzZXIuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9jbGFzc0xpc3QuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9mdW5jdGlvblByb3RvdHlwZUJpbmQuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9pbmRleC5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9mYW1vdXMtcG9seWZpbGxzL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9Db250ZXh0LmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL0VsZW1lbnRBbGxvY2F0b3IuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRW5naW5lLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL0VudGl0eS5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9FdmVudEVtaXR0ZXIuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL01vZGlmaWVyLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL1JlbmRlck5vZGUuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvU3BlY1BhcnNlci5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9TdXJmYWNlLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL1RyYW5zZm9ybS5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9mYW1vdXMvbWF0aC9WZWN0b3IuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzL21vZGlmaWVycy9TdGF0ZU1vZGlmaWVyLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL1BoeXNpY3NFbmdpbmUuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL0NvbnN0cmFpbnQuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvU25hcC5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9pbnRlZ3JhdG9ycy9TeW1wbGVjdGljRXVsZXIuanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzL3RyYW5zaXRpb25zL011bHRpcGxlVHJhbnNpdGlvbi5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9mYW1vdXMvdHJhbnNpdGlvbnMvU25hcFRyYW5zaXRpb24uanMiLCIvVXNlcnMvZGFuZW1hY2F1bGF5L1NpdGVzL2Jyb3dzZXJpZnktc2VlZC9ub2RlX21vZHVsZXMvZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9mYW1vdXMvdHJhbnNpdGlvbnMvVHdlZW5UcmFuc2l0aW9uLmpzIiwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eS5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL3NyYy9zdHlsZXMvYXBwLmNzcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL3NyYy9zdHlsZXMvZmFtb3VzLmNzcyIsIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL3NyYy9zdHlsZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbGxCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3phQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MsIGN1c3RvbURvY3VtZW50KSB7XG4gIHZhciBkb2MgPSBjdXN0b21Eb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgaWYgKGRvYy5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgZG9jLmNyZWF0ZVN0eWxlU2hlZXQoKS5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHZhciBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIHN0eWxlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgXG4gICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cbiAgICBcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTsgXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmJ5VXJsID0gZnVuY3Rpb24odXJsKSB7XG4gIGlmIChkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCh1cmwpO1xuICB9IGVsc2Uge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgXG4gICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTsgXG4gIH1cbn07XG4iLCJcbi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDIwMTEtMDYtMTVcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBQdWJsaWMgRG9tYWluLlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMqL1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXJcbiAgICAgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG4gICAgLCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG4gICAgLCBlbGVtQ3RyUHJvdG8gPSAodmlldy5IVE1MRWxlbWVudCB8fCB2aWV3LkVsZW1lbnQpW3Byb3RvUHJvcF1cbiAgICAsIG9iakN0ciA9IE9iamVjdFxuICAgICwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICB9XG4gICAgLCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgLCBsZW4gPSB0aGlzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLy8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG4gICAgLCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgLCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgICAgIFwiU1lOVEFYX0VSUlwiXG4gICAgICAgICAgICAgICAgLCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICAgICAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuICAgICAgICAgICAgICAgICwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuICAgIH1cbiAgICAsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmNsYXNzTmFtZSlcbiAgICAgICAgICAgICwgY2xhc3NlcyA9IHRyaW1tZWRDbGFzc2VzID8gdHJpbW1lZENsYXNzZXMuc3BsaXQoL1xccysvKSA6IFtdXG4gICAgICAgICAgICAsIGkgPSAwXG4gICAgICAgICAgICAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGNsYXNzZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAsIGNsYXNzTGlzdFByb3RvID0gQ2xhc3NMaXN0W3Byb3RvUHJvcF0gPSBbXVxuICAgICwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcbiAgICB9XG47XG4vLyBNb3N0IERPTUV4Y2VwdGlvbiBpbXBsZW1lbnRhdGlvbnMgZG9uJ3QgYWxsb3cgY2FsbGluZyBET01FeGNlcHRpb24ncyB0b1N0cmluZygpXG4vLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbkRPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuY2xhc3NMaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbn07XG5jbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgcmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xufTtcbmNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMucHVzaCh0b2tlbik7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIHZhciBpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICB0aGlzLmFkZCh0b2tlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmUodG9rZW4pO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcbiAgICB2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG4gICAgICAgICAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcbiAgICAgICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgfSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG4gICAgICAgIGlmIChleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG4gICAgICAgICAgICBjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgICAgIH1cbiAgICB9XG59IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICBlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHNlbGYpKTtcblxufVxuIiwiaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKG9UaGlzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDUgaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgIGZOT1AgPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgZkJvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1AgJiYgb1RoaXNcbiAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICA6IG9UaGlzLFxuICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICAgICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICAgICAgcmV0dXJuIGZCb3VuZDtcbiAgICB9O1xufVxuIiwicmVxdWlyZSgnLi9jbGFzc0xpc3QuanMnKTtcbnJlcXVpcmUoJy4vZnVuY3Rpb25Qcm90b3R5cGVCaW5kLmpzJyk7XG5yZXF1aXJlKCcuL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcycpOyIsIi8vIGFkZHMgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZ1bmN0aW9uYWxpdHlcbi8vIFNvdXJjZTogaHR0cDovL3N0cmQ2LmNvbS8yMDExLzA1L2JldHRlci13aW5kb3ctcmVxdWVzdGFuaW1hdGlvbmZyYW1lLXNoaW0vXG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxuICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gIGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbGJhY2soK25ldyBEYXRlKCkpO1xuICB9LCAxMDAwIC8gNjApO1xufSk7XG4iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cbnZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnLi9SZW5kZXJOb2RlJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi9FdmVudEhhbmRsZXInKTtcbnZhciBFbGVtZW50QWxsb2NhdG9yID0gcmVxdWlyZSgnLi9FbGVtZW50QWxsb2NhdG9yJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG5cbnZhciBfb3JpZ2luWmVyb1plcm8gPSBbMCwgMF07XG5cbmZ1bmN0aW9uIF9nZXRFbGVtZW50U2l6ZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIFtlbGVtZW50LmNsaWVudFdpZHRoLCBlbGVtZW50LmNsaWVudEhlaWdodF07XG59XG5cbi8qKlxuICogVGhlIHRvcC1sZXZlbCBjb250YWluZXIgZm9yIGEgRmFtb3VzLXJlbmRlcmFibGUgcGllY2Ugb2YgdGhlIGRvY3VtZW50LlxuICogICBJdCBpcyBkaXJlY3RseSB1cGRhdGVkIGJ5IHRoZSBwcm9jZXNzLXdpZGUgRW5naW5lIG9iamVjdCwgYW5kIG1hbmFnZXMgb25lXG4gKiAgIHJlbmRlciB0cmVlIHJvb3QsIHdoaWNoIGNhbiBjb250YWluIG90aGVyIHJlbmRlcmFibGVzLlxuICpcbiAqIEBjbGFzcyBDb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge05vZGV9IGNvbnRhaW5lciBFbGVtZW50IGluIHdoaWNoIGNvbnRlbnQgd2lsbCBiZSBpbnNlcnRlZFxuICovXG5mdW5jdGlvbiBDb250ZXh0KGNvbnRhaW5lcikge1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuX2FsbG9jYXRvciA9IG5ldyBFbGVtZW50QWxsb2NhdG9yKGNvbnRhaW5lcik7XG5cbiAgICB0aGlzLl9ub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zaXplID0gX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKTtcblxuICAgIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoMCk7XG4gICAgdGhpcy5fcGVyc3BlY3RpdmUgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLl9ub2RlQ29udGV4dCA9IHtcbiAgICAgICAgYWxsb2NhdG9yOiB0aGlzLl9hbGxvY2F0b3IsXG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmlkZW50aXR5LFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBvcmlnaW46IF9vcmlnaW5aZXJvWmVybyxcbiAgICAgICAgYWxpZ246IG51bGwsXG4gICAgICAgIHNpemU6IHRoaXMuX3NpemVcbiAgICB9O1xuXG4gICAgdGhpcy5fZXZlbnRPdXRwdXQub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFNpemUoX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxufVxuXG4vLyBOb3RlOiBVbnVzZWRcbkNvbnRleHQucHJvdG90eXBlLmdldEFsbG9jYXRvciA9IGZ1bmN0aW9uIGdldEFsbG9jYXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsb2NhdG9yO1xufTtcblxuLyoqXG4gKiBBZGQgcmVuZGVyYWJsZXMgdG8gdGhpcyBDb250ZXh0J3MgcmVuZGVyIHRyZWUuXG4gKlxuICogQG1ldGhvZCBhZGRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIHJlbmRlcmFibGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtSZW5kZXJOb2RlfSBSZW5kZXJOb2RlIHdyYXBwaW5nIHRoaXMgb2JqZWN0LCBpZiBub3QgYWxyZWFkeSBhIFJlbmRlck5vZGVcbiAqL1xuQ29udGV4dC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKG9iaikge1xuICAgIHJldHVybiB0aGlzLl9ub2RlLmFkZChvYmopO1xufTtcblxuLyoqXG4gKiBNb3ZlIHRoaXMgQ29udGV4dCB0byBhbm90aGVyIGNvbnRhaW5pbmcgZG9jdW1lbnQgZWxlbWVudC5cbiAqXG4gKiBAbWV0aG9kIG1pZ3JhdGVcbiAqXG4gKiBAcGFyYW0ge05vZGV9IGNvbnRhaW5lciBFbGVtZW50IHRvIHdoaWNoIGNvbnRlbnQgd2lsbCBiZSBtaWdyYXRlZFxuICovXG5Db250ZXh0LnByb3RvdHlwZS5taWdyYXRlID0gZnVuY3Rpb24gbWlncmF0ZShjb250YWluZXIpIHtcbiAgICBpZiAoY29udGFpbmVyID09PSB0aGlzLmNvbnRhaW5lcikgcmV0dXJuO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuX2FsbG9jYXRvci5taWdyYXRlKGNvbnRhaW5lcik7XG59O1xuXG4vKipcbiAqIEdldHMgdmlld3BvcnQgc2l6ZSBmb3IgQ29udGV4dC5cbiAqXG4gKiBAbWV0aG9kIGdldFNpemVcbiAqXG4gKiBAcmV0dXJuIHtBcnJheS5OdW1iZXJ9IHZpZXdwb3J0IHNpemUgYXMgW3dpZHRoLCBoZWlnaHRdXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xufTtcblxuLyoqXG4gKiBTZXRzIHZpZXdwb3J0IHNpemUgZm9yIENvbnRleHQuXG4gKlxuICogQG1ldGhvZCBzZXRTaXplXG4gKlxuICogQHBhcmFtIHtBcnJheS5OdW1iZXJ9IHNpemUgW3dpZHRoLCBoZWlnaHRdLiAgSWYgdW5zcGVjaWZpZWQsIHVzZSBzaXplIG9mIHJvb3QgZG9jdW1lbnQgZWxlbWVudC5cbiAqL1xuQ29udGV4dC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSkge1xuICAgIGlmICghc2l6ZSkgc2l6ZSA9IF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgdGhpcy5fc2l6ZVswXSA9IHNpemVbMF07XG4gICAgdGhpcy5fc2l6ZVsxXSA9IHNpemVbMV07XG59O1xuXG4vKipcbiAqIENvbW1pdCB0aGlzIENvbnRleHQncyBjb250ZW50IGNoYW5nZXMgdG8gdGhlIGRvY3VtZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWV0aG9kIHVwZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRQYXJhbWV0ZXJzIGVuZ2luZSBjb21taXQgc3BlY2lmaWNhdGlvblxuICovXG5Db250ZXh0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoY29udGV4dFBhcmFtZXRlcnMpIHtcbiAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMpIHtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLnRyYW5zZm9ybSkgdGhpcy5fbm9kZUNvbnRleHQudHJhbnNmb3JtID0gY29udGV4dFBhcmFtZXRlcnMudHJhbnNmb3JtO1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMub3BhY2l0eSkgdGhpcy5fbm9kZUNvbnRleHQub3BhY2l0eSA9IGNvbnRleHRQYXJhbWV0ZXJzLm9wYWNpdHk7XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5vcmlnaW4pIHRoaXMuX25vZGVDb250ZXh0Lm9yaWdpbiA9IGNvbnRleHRQYXJhbWV0ZXJzLm9yaWdpbjtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLmFsaWduKSB0aGlzLl9ub2RlQ29udGV4dC5hbGlnbiA9IGNvbnRleHRQYXJhbWV0ZXJzLmFsaWduO1xuICAgICAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMuc2l6ZSkgdGhpcy5fbm9kZUNvbnRleHQuc2l6ZSA9IGNvbnRleHRQYXJhbWV0ZXJzLnNpemU7XG4gICAgfVxuICAgIHZhciBwZXJzcGVjdGl2ZSA9IHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG4gICAgaWYgKHBlcnNwZWN0aXZlICE9PSB0aGlzLl9wZXJzcGVjdGl2ZSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlID8gcGVyc3BlY3RpdmUudG9GaXhlZCgpICsgJ3B4JyA6ICcnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlID8gcGVyc3BlY3RpdmUudG9GaXhlZCgpIDogJyc7XG4gICAgICAgIHRoaXMuX3BlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmU7XG4gICAgfVxuXG4gICAgdGhpcy5fbm9kZS5jb21taXQodGhpcy5fbm9kZUNvbnRleHQpO1xufTtcblxuLyoqXG4gKiBHZXQgY3VycmVudCBwZXJzcGVjdGl2ZSBvZiB0aGlzIGNvbnRleHQgaW4gcGl4ZWxzLlxuICpcbiAqIEBtZXRob2QgZ2V0UGVyc3BlY3RpdmVcbiAqIEByZXR1cm4ge051bWJlcn0gZGVwdGggcGVyc3BlY3RpdmUgaW4gcGl4ZWxzXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmdldFBlcnNwZWN0aXZlID0gZnVuY3Rpb24gZ2V0UGVyc3BlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG59O1xuXG4vKipcbiAqIFNldCBjdXJyZW50IHBlcnNwZWN0aXZlIG9mIHRoaXMgY29udGV4dCBpbiBwaXhlbHMuXG4gKlxuICogQG1ldGhvZCBzZXRQZXJzcGVjdGl2ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHBlcnNwZWN0aXZlIGluIHBpeGVsc1xuICogQHBhcmFtIHtPYmplY3R9IFt0cmFuc2l0aW9uXSBUcmFuc2l0aW9uYWJsZSBvYmplY3QgZm9yIGFwcGx5aW5nIHRoZSBjaGFuZ2VcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gY2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIG9uIGNvbXBsZXRpb24gb2YgdHJhbnNpdGlvblxuICovXG5Db250ZXh0LnByb3RvdHlwZS5zZXRQZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIHNldFBlcnNwZWN0aXZlKHBlcnNwZWN0aXZlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlLnNldChwZXJzcGVjdGl2ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGFuIGV2ZW50LCBzZW5kaW5nIHRvIGFsbCBkb3duc3RyZWFtIGhhbmRsZXJzXG4gKiAgIGxpc3RlbmluZyBmb3IgcHJvdmlkZWQgJ3R5cGUnIGtleS5cbiAqXG4gKiBAbWV0aG9kIGVtaXRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBldmVudCB0eXBlIGtleSAoZm9yIGV4YW1wbGUsICdjbGljaycpXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgZXZlbnQgZGF0YVxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSB0aGlzXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQodHlwZSwgZXZlbnQpO1xufTtcblxuLyoqXG4gKiBCaW5kIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYW4gZXZlbnQgdHlwZSBoYW5kbGVkIGJ5IHRoaXMgb2JqZWN0LlxuICpcbiAqIEBtZXRob2QgXCJvblwiXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgZXZlbnQgdHlwZSBrZXkgKGZvciBleGFtcGxlLCAnY2xpY2snKVxuICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcsIE9iamVjdCl9IGhhbmRsZXIgY2FsbGJhY2tcbiAqIEByZXR1cm4ge0V2ZW50SGFuZGxlcn0gdGhpc1xuICovXG5Db250ZXh0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQub24odHlwZSwgaGFuZGxlcik7XG59O1xuXG4vKipcbiAqIFVuYmluZCBhbiBldmVudCBieSB0eXBlIGFuZCBoYW5kbGVyLlxuICogICBUaGlzIHVuZG9lcyB0aGUgd29yayBvZiBcIm9uXCIuXG4gKlxuICogQG1ldGhvZCByZW1vdmVMaXN0ZW5lclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV2ZW50IHR5cGUga2V5IChmb3IgZXhhbXBsZSwgJ2NsaWNrJylcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXIgZnVuY3Rpb24gb2JqZWN0IHRvIHJlbW92ZVxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSBpbnRlcm5hbCBldmVudCBoYW5kbGVyIG9iamVjdCAoZm9yIGNoYWluaW5nKVxuICovXG5Db250ZXh0LnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG59O1xuXG4vKipcbiAqIEFkZCBldmVudCBoYW5kbGVyIG9iamVjdCB0byBzZXQgb2YgZG93bnN0cmVhbSBoYW5kbGVycy5cbiAqXG4gKiBAbWV0aG9kIHBpcGVcbiAqXG4gKiBAcGFyYW0ge0V2ZW50SGFuZGxlcn0gdGFyZ2V0IGV2ZW50IGhhbmRsZXIgdGFyZ2V0IG9iamVjdFxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSBwYXNzZWQgZXZlbnQgaGFuZGxlclxuICovXG5Db250ZXh0LnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucGlwZSh0YXJnZXQpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGFuZGxlciBvYmplY3QgZnJvbSBzZXQgb2YgZG93bnN0cmVhbSBoYW5kbGVycy5cbiAqICAgVW5kb2VzIHdvcmsgb2YgXCJwaXBlXCIuXG4gKlxuICogQG1ldGhvZCB1bnBpcGVcbiAqXG4gKiBAcGFyYW0ge0V2ZW50SGFuZGxlcn0gdGFyZ2V0IHRhcmdldCBoYW5kbGVyIG9iamVjdFxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSBwcm92aWRlZCB0YXJnZXRcbiAqL1xuQ29udGV4dC5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC51bnBpcGUodGFyZ2V0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dDsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cblxuXG5cbi8qKlxuICogSW50ZXJuYWwgaGVscGVyIG9iamVjdCB0byBDb250ZXh0IHRoYXQgaGFuZGxlcyB0aGUgcHJvY2VzcyBvZlxuICogICBjcmVhdGluZyBhbmQgYWxsb2NhdGluZyBET00gZWxlbWVudHMgd2l0aGluIGEgbWFuYWdlZCBkaXYuXG4gKiAgIFByaXZhdGUuXG4gKlxuICogQGNsYXNzIEVsZW1lbnRBbGxvY2F0b3JcbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Tm9kZX0gY29udGFpbmVyIGRvY3VtZW50IGVsZW1lbnQgaW4gd2hpY2ggRmFtby51cyBjb250ZW50IHdpbGwgYmUgaW5zZXJ0ZWRcbiAqL1xuZnVuY3Rpb24gRWxlbWVudEFsbG9jYXRvcihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcikgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuZGV0YWNoZWROb2RlcyA9IHt9O1xuICAgIHRoaXMubm9kZUNvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBNb3ZlIHRoZSBkb2N1bWVudCBlbGVtZW50cyBmcm9tIHRoZWlyIG9yaWdpbmFsIGNvbnRhaW5lciB0byBhIG5ldyBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgbWlncmF0ZVxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gY29udGFpbmVyIGRvY3VtZW50IGVsZW1lbnQgdG8gd2hpY2ggRmFtby51cyBjb250ZW50IHdpbGwgYmUgbWlncmF0ZWRcbiAqL1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUubWlncmF0ZSA9IGZ1bmN0aW9uIG1pZ3JhdGUoY29udGFpbmVyKSB7XG4gICAgdmFyIG9sZENvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGlmIChjb250YWluZXIgPT09IG9sZENvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgaWYgKG9sZENvbnRhaW5lciBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9sZENvbnRhaW5lcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB3aGlsZSAob2xkQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9sZENvbnRhaW5lci5yZW1vdmVDaGlsZChvbGRDb250YWluZXIuZmlyc3RDaGlsZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG59O1xuXG4vKipcbiAqIEFsbG9jYXRlIGFuIGVsZW1lbnQgb2Ygc3BlY2lmaWVkIHR5cGUgZnJvbSB0aGUgcG9vbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1ldGhvZCBhbGxvY2F0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIHR5cGUgb2YgZWxlbWVudCwgZS5nLiAnZGl2J1xuICogQHJldHVybiB7Tm9kZX0gYWxsb2NhdGVkIGRvY3VtZW50IGVsZW1lbnRcbiAqL1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUuYWxsb2NhdGUgPSBmdW5jdGlvbiBhbGxvY2F0ZSh0eXBlKSB7XG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuZGV0YWNoZWROb2RlcykpIHRoaXMuZGV0YWNoZWROb2Rlc1t0eXBlXSA9IFtdO1xuICAgIHZhciBub2RlU3RvcmUgPSB0aGlzLmRldGFjaGVkTm9kZXNbdHlwZV07XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAobm9kZVN0b3JlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzdWx0ID0gbm9kZVN0b3JlLnBvcCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICB9XG4gICAgdGhpcy5ub2RlQ291bnQrKztcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBEZS1hbGxvY2F0ZSBhbiBlbGVtZW50IG9mIHNwZWNpZmllZCB0eXBlIHRvIHRoZSBwb29sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWV0aG9kIGRlYWxsb2NhdGVcbiAqXG4gKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgZG9jdW1lbnQgZWxlbWVudCB0byBkZWFsbG9jYXRlXG4gKi9cbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmRlYWxsb2NhdGUgPSBmdW5jdGlvbiBkZWFsbG9jYXRlKGVsZW1lbnQpIHtcbiAgICB2YXIgbm9kZVR5cGUgPSBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG5vZGVTdG9yZSA9IHRoaXMuZGV0YWNoZWROb2Rlc1tub2RlVHlwZV07XG4gICAgbm9kZVN0b3JlLnB1c2goZWxlbWVudCk7XG4gICAgdGhpcy5ub2RlQ291bnQtLTtcbn07XG5cbi8qKlxuICogR2V0IGNvdW50IG9mIHRvdGFsIGFsbG9jYXRlZCBub2RlcyBpbiB0aGUgZG9jdW1lbnQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgZ2V0Tm9kZUNvdW50XG4gKlxuICogQHJldHVybiB7TnVtYmVyfSB0b3RhbCBub2RlIGNvdW50XG4gKi9cbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmdldE5vZGVDb3VudCA9IGZ1bmN0aW9uIGdldE5vZGVDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ291bnQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnRBbGxvY2F0b3I7IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBPd25lcjogbWFya0BmYW1vLnVzXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcbiAqL1xuXG4vKipcbiAqIFRoZSBzaW5nbGV0b24gb2JqZWN0IGluaXRpYXRlZCB1cG9uIHByb2Nlc3NcbiAqICAgc3RhcnR1cCB3aGljaCBtYW5hZ2VzIGFsbCBhY3RpdmUgQ29udGV4dCBpbnN0YW5jZXMsIHJ1bnNcbiAqICAgdGhlIHJlbmRlciBkaXNwYXRjaCBsb29wLCBhbmQgYWN0cyBhcyBhIGxpc3RlbmVyIGFuZCBkaXNwYXRjaGVyXG4gKiAgIGZvciBldmVudHMuICBBbGwgbWV0aG9kcyBhcmUgdGhlcmVmb3JlIHN0YXRpYy5cbiAqXG4gKiAgIE9uIHN0YXRpYyBpbml0aWFsaXphdGlvbiwgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSBpcyBjYWxsZWQgd2l0aFxuICogICAgIHRoZSBldmVudCBsb29wIGZ1bmN0aW9uLlxuICpcbiAqICAgTm90ZTogQW55IHdpbmRvdyBpbiB3aGljaCBFbmdpbmUgcnVucyB3aWxsIHByZXZlbnQgZGVmYXVsdFxuICogICAgIHNjcm9sbGluZyBiZWhhdmlvciBvbiB0aGUgJ3RvdWNobW92ZScgZXZlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQGNsYXNzIEVuZ2luZVxuICovXG52YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vQ29udGV4dCcpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuL09wdGlvbnNNYW5hZ2VyJyk7XG5cbnZhciBFbmdpbmUgPSB7fTtcblxudmFyIGNvbnRleHRzID0gW107XG52YXIgbmV4dFRpY2tRdWV1ZSA9IFtdO1xudmFyIGRlZmVyUXVldWUgPSBbXTtcblxudmFyIGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcbnZhciBmcmFtZVRpbWU7XG52YXIgZnJhbWVUaW1lTGltaXQ7XG52YXIgbG9vcEVuYWJsZWQgPSB0cnVlO1xudmFyIGV2ZW50Rm9yd2FyZGVycyA9IHt9O1xudmFyIGV2ZW50SGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcblxudmFyIG9wdGlvbnMgPSB7XG4gICAgY29udGFpbmVyVHlwZTogJ2RpdicsXG4gICAgY29udGFpbmVyQ2xhc3M6ICdmYW1vdXMtY29udGFpbmVyJyxcbiAgICBmcHNDYXA6IHVuZGVmaW5lZCxcbiAgICBydW5Mb29wOiB0cnVlXG59O1xudmFyIG9wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKG9wdGlvbnMpO1xuXG4vKiogQGNvbnN0ICovXG52YXIgTUFYX0RFRkVSX0ZSQU1FX1RJTUUgPSAxMDtcblxuLyoqXG4gKiBJbnNpZGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGxvb3AsIHN0ZXAoKSBpcyBjYWxsZWQsIHdoaWNoOlxuICogICBjYWxjdWxhdGVzIGN1cnJlbnQgRlBTICh0aHJvdHRsaW5nIGxvb3AgaWYgaXQgaXMgb3ZlciBsaW1pdCBzZXQgaW4gc2V0RlBTQ2FwKSxcbiAqICAgZW1pdHMgZGF0YWxlc3MgJ3ByZXJlbmRlcicgZXZlbnQgb24gc3RhcnQgb2YgbG9vcCxcbiAqICAgY2FsbHMgaW4gb3JkZXIgYW55IG9uZS1zaG90IGZ1bmN0aW9ucyByZWdpc3RlcmVkIGJ5IG5leHRUaWNrIG9uIGxhc3QgbG9vcCxcbiAqICAgY2FsbHMgQ29udGV4dC51cGRhdGUgb24gYWxsIENvbnRleHQgb2JqZWN0cyByZWdpc3RlcmVkLFxuICogICBhbmQgZW1pdHMgZGF0YWxlc3MgJ3Bvc3RyZW5kZXInIGV2ZW50IG9uIGVuZCBvZiBsb29wLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKiBAbWV0aG9kIHN0ZXBcbiAqL1xuRW5naW5lLnN0ZXAgPSBmdW5jdGlvbiBzdGVwKCkge1xuICAgIHZhciBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAvLyBza2lwIGZyYW1lIGlmIHdlJ3JlIG92ZXIgb3VyIGZyYW1lcmF0ZSBjYXBcbiAgICBpZiAoZnJhbWVUaW1lTGltaXQgJiYgY3VycmVudFRpbWUgLSBsYXN0VGltZSA8IGZyYW1lVGltZUxpbWl0KSByZXR1cm47XG5cbiAgICB2YXIgaSA9IDA7XG5cbiAgICBmcmFtZVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lO1xuICAgIGxhc3RUaW1lID0gY3VycmVudFRpbWU7XG5cbiAgICBldmVudEhhbmRsZXIuZW1pdCgncHJlcmVuZGVyJyk7XG5cbiAgICAvLyBlbXB0eSB0aGUgcXVldWVcbiAgICBmb3IgKGkgPSAwOyBpIDwgbmV4dFRpY2tRdWV1ZS5sZW5ndGg7IGkrKykgbmV4dFRpY2tRdWV1ZVtpXS5jYWxsKHRoaXMpO1xuICAgIG5leHRUaWNrUXVldWUuc3BsaWNlKDApO1xuXG4gICAgLy8gbGltaXQgdG90YWwgZXhlY3V0aW9uIHRpbWUgZm9yIGRlZmVycmFibGUgZnVuY3Rpb25zXG4gICAgd2hpbGUgKGRlZmVyUXVldWUubGVuZ3RoICYmIChEYXRlLm5vdygpIC0gY3VycmVudFRpbWUpIDwgTUFYX0RFRkVSX0ZSQU1FX1RJTUUpIHtcbiAgICAgICAgZGVmZXJRdWV1ZS5zaGlmdCgpLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRzLmxlbmd0aDsgaSsrKSBjb250ZXh0c1tpXS51cGRhdGUoKTtcblxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb3N0cmVuZGVyJyk7XG59O1xuXG4vLyBlbmdhZ2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5mdW5jdGlvbiBsb29wKCkge1xuICAgIGlmIChvcHRpb25zLnJ1bkxvb3ApIHtcbiAgICAgICAgRW5naW5lLnN0ZXAoKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICB9XG4gICAgZWxzZSBsb29wRW5hYmxlZCA9IGZhbHNlO1xufVxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuLy9cbi8vIFVwb24gbWFpbiBkb2N1bWVudCB3aW5kb3cgcmVzaXplICh1bmxlc3Mgb24gYW4gXCJpbnB1dFwiIEhUTUwgZWxlbWVudCk6XG4vLyAgIHNjcm9sbCB0byB0aGUgdG9wIGxlZnQgY29ybmVyIG9mIHRoZSB3aW5kb3csXG4vLyAgIGFuZCBmb3IgZWFjaCBtYW5hZ2VkIENvbnRleHQ6IGVtaXQgdGhlICdyZXNpemUnIGV2ZW50IGFuZCB1cGRhdGUgaXRzIHNpemUuXG4vLyBAcGFyYW0ge09iamVjdD19IGV2ZW50IGRvY3VtZW50IGV2ZW50XG4vL1xuZnVuY3Rpb24gaGFuZGxlUmVzaXplKGV2ZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb250ZXh0c1tpXS5lbWl0KCdyZXNpemUnKTtcbiAgICB9XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3Jlc2l6ZScpO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuaGFuZGxlUmVzaXplKCk7XG5cbi8vIHByZXZlbnQgc2Nyb2xsaW5nIHZpYSBicm93c2VyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufSwgdHJ1ZSk7XG5cbi8qKlxuICogQWRkIGV2ZW50IGhhbmRsZXIgb2JqZWN0IHRvIHNldCBvZiBkb3duc3RyZWFtIGhhbmRsZXJzLlxuICpcbiAqIEBtZXRob2QgcGlwZVxuICpcbiAqIEBwYXJhbSB7RXZlbnRIYW5kbGVyfSB0YXJnZXQgZXZlbnQgaGFuZGxlciB0YXJnZXQgb2JqZWN0XG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHBhc3NlZCBldmVudCBoYW5kbGVyXG4gKi9cbkVuZ2luZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSByZXR1cm4gdGFyZ2V0LnN1YnNjcmliZShFbmdpbmUpO1xuICAgIGVsc2UgcmV0dXJuIGV2ZW50SGFuZGxlci5waXBlKHRhcmdldCk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoYW5kbGVyIG9iamVjdCBmcm9tIHNldCBvZiBkb3duc3RyZWFtIGhhbmRsZXJzLlxuICogICBVbmRvZXMgd29yayBvZiBcInBpcGVcIi5cbiAqXG4gKiBAbWV0aG9kIHVucGlwZVxuICpcbiAqIEBwYXJhbSB7RXZlbnRIYW5kbGVyfSB0YXJnZXQgdGFyZ2V0IGhhbmRsZXIgb2JqZWN0XG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHByb3ZpZGVkIHRhcmdldFxuICovXG5FbmdpbmUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQudW5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbikgcmV0dXJuIHRhcmdldC51bnN1YnNjcmliZShFbmdpbmUpO1xuICAgIGVsc2UgcmV0dXJuIGV2ZW50SGFuZGxlci51bnBpcGUodGFyZ2V0KTtcbn07XG5cbi8qKlxuICogQmluZCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFuIGV2ZW50IHR5cGUgaGFuZGxlZCBieSB0aGlzIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIFwib25cIlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV2ZW50IHR5cGUga2V5IChmb3IgZXhhbXBsZSwgJ2NsaWNrJylcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nLCBPYmplY3QpfSBoYW5kbGVyIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHRoaXNcbiAqL1xuRW5naW5lLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIGlmICghKHR5cGUgaW4gZXZlbnRGb3J3YXJkZXJzKSkge1xuICAgICAgICBldmVudEZvcndhcmRlcnNbdHlwZV0gPSBldmVudEhhbmRsZXIuZW1pdC5iaW5kKGV2ZW50SGFuZGxlciwgdHlwZSk7XG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZXZlbnRGb3J3YXJkZXJzW3R5cGVdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEVuZ2luZS5uZXh0VGljayhmdW5jdGlvbih0eXBlLCBmb3J3YXJkZXIpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm9yd2FyZGVyKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0eXBlLCBldmVudEZvcndhcmRlcnNbdHlwZV0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyLm9uKHR5cGUsIGhhbmRsZXIpO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGFuIGV2ZW50LCBzZW5kaW5nIHRvIGFsbCBkb3duc3RyZWFtIGhhbmRsZXJzXG4gKiAgIGxpc3RlbmluZyBmb3IgcHJvdmlkZWQgJ3R5cGUnIGtleS5cbiAqXG4gKiBAbWV0aG9kIGVtaXRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBldmVudCB0eXBlIGtleSAoZm9yIGV4YW1wbGUsICdjbGljaycpXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgZXZlbnQgZGF0YVxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSB0aGlzXG4gKi9cbkVuZ2luZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHJldHVybiBldmVudEhhbmRsZXIuZW1pdCh0eXBlLCBldmVudCk7XG59O1xuXG4vKipcbiAqIFVuYmluZCBhbiBldmVudCBieSB0eXBlIGFuZCBoYW5kbGVyLlxuICogICBUaGlzIHVuZG9lcyB0aGUgd29yayBvZiBcIm9uXCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCByZW1vdmVMaXN0ZW5lclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV2ZW50IHR5cGUga2V5IChmb3IgZXhhbXBsZSwgJ2NsaWNrJylcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXIgZnVuY3Rpb24gb2JqZWN0IHRvIHJlbW92ZVxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSBpbnRlcm5hbCBldmVudCBoYW5kbGVyIG9iamVjdCAoZm9yIGNoYWluaW5nKVxuICovXG5FbmdpbmUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5yZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBjdXJyZW50IGNhbGN1bGF0ZWQgZnJhbWVzIHBlciBzZWNvbmQgb2YgdGhlIEVuZ2luZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGdldEZQU1xuICpcbiAqIEByZXR1cm4ge051bWJlcn0gY2FsY3VsYXRlZCBmcHNcbiAqL1xuRW5naW5lLmdldEZQUyA9IGZ1bmN0aW9uIGdldEZQUygpIHtcbiAgICByZXR1cm4gMTAwMCAvIGZyYW1lVGltZTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGZwcyBhdCB3aGljaCB0aGUgc3lzdGVtIHNob3VsZCBydW4uIElmIGludGVybmFsIHJlbmRlclxuICogICAgbG9vcCBpcyBjYWxsZWQgYXQgYSBncmVhdGVyIGZyZXF1ZW5jeSB0aGFuIHRoaXMgRlBTQ2FwLCBFbmdpbmUgd2lsbFxuICogICAgdGhyb3R0bGUgcmVuZGVyIGFuZCB1cGRhdGUgdW50aWwgdGhpcyByYXRlIGlzIGFjaGlldmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgc2V0RlBTQ2FwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGZwcyBtYXhpbXVtIGZyYW1lcyBwZXIgc2Vjb25kXG4gKi9cbkVuZ2luZS5zZXRGUFNDYXAgPSBmdW5jdGlvbiBzZXRGUFNDYXAoZnBzKSB7XG4gICAgZnJhbWVUaW1lTGltaXQgPSBNYXRoLmZsb29yKDEwMDAgLyBmcHMpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gZW5naW5lIG9wdGlvbnMuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBnZXRPcHRpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcmV0dXJuIHtPYmplY3R9IGVuZ2luZSBvcHRpb25zXG4gKi9cbkVuZ2luZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gb3B0aW9uc01hbmFnZXIuZ2V0T3B0aW9ucy5hcHBseShvcHRpb25zTWFuYWdlciwgYXJndW1lbnRzKTtcbn07XG5cbi8qKlxuICogU2V0IGVuZ2luZSBvcHRpb25zXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBzZXRPcHRpb25zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBvdmVycmlkZXMgb2YgZGVmYXVsdCBvcHRpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZnBzQ2FwXSAgbWF4aW11bSBmcHMgYXQgd2hpY2ggdGhlIHN5c3RlbSBzaG91bGQgcnVuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnJ1bkxvb3A9dHJ1ZV0gd2hldGhlciB0aGUgcnVuIGxvb3Agc2hvdWxkIGNvbnRpbnVlXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY29udGFpbmVyVHlwZT1cImRpdlwiXSB0eXBlIG9mIGNvbnRhaW5lciBlbGVtZW50LiAgRGVmYXVsdHMgdG8gJ2RpdicuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY29udGFpbmVyQ2xhc3M9XCJmYW1vdXMtY29udGFpbmVyXCJdIHR5cGUgb2YgY29udGFpbmVyIGVsZW1lbnQuICBEZWZhdWx0cyB0byAnZmFtb3VzLWNvbnRhaW5lcicuXG4gKi9cbkVuZ2luZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMuYXBwbHkob3B0aW9uc01hbmFnZXIsIGFyZ3VtZW50cyk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgQ29udGV4dCBmb3IgcmVuZGVyaW5nIGFuZCBldmVudCBoYW5kbGluZyB3aXRoXG4gKiAgICBwcm92aWRlZCBkb2N1bWVudCBlbGVtZW50IGFzIHRvcCBvZiBlYWNoIHRyZWUuIFRoaXMgd2lsbCBiZSB0cmFja2VkIGJ5IHRoZVxuICogICAgcHJvY2Vzcy13aWRlIEVuZ2luZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGNyZWF0ZUNvbnRleHRcbiAqXG4gKiBAcGFyYW0ge05vZGV9IGVsIHdpbGwgYmUgdG9wIG9mIEZhbW8udXMgZG9jdW1lbnQgZWxlbWVudCB0cmVlXG4gKiBAcmV0dXJuIHtDb250ZXh0fSBuZXcgQ29udGV4dCB3aXRoaW4gZWxcbiAqL1xuRW5naW5lLmNyZWF0ZUNvbnRleHQgPSBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KGVsKSB7XG4gICAgdmFyIG5lZWRNb3VudENvbnRhaW5lciA9IGZhbHNlO1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG9wdGlvbnMuY29udGFpbmVyVHlwZSk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jb250YWluZXJDbGFzcyk7XG4gICAgICAgIG5lZWRNb3VudENvbnRhaW5lciA9IHRydWU7XG4gICAgfVxuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoZWwpO1xuICAgIEVuZ2luZS5yZWdpc3RlckNvbnRleHQoY29udGV4dCk7XG4gICAgaWYgKG5lZWRNb3VudENvbnRhaW5lcikge1xuICAgICAgICBFbmdpbmUubmV4dFRpY2soZnVuY3Rpb24oY29udGV4dCwgZWwpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgY29udGV4dC5lbWl0KCdyZXNpemUnKTtcbiAgICAgICAgfS5iaW5kKHRoaXMsIGNvbnRleHQsIGVsKSk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xufTtcblxuLyoqXG4gKiBSZWdpc3RlcnMgYW4gZXhpc3RpbmcgY29udGV4dCB0byBiZSB1cGRhdGVkIHdpdGhpbiB0aGUgcnVuIGxvb3AuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCByZWdpc3RlckNvbnRleHRcbiAqXG4gKiBAcGFyYW0ge0NvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byByZWdpc3RlclxuICogQHJldHVybiB7RmFtb3VzQ29udGV4dH0gcHJvdmlkZWQgY29udGV4dFxuICovXG5FbmdpbmUucmVnaXN0ZXJDb250ZXh0ID0gZnVuY3Rpb24gcmVnaXN0ZXJDb250ZXh0KGNvbnRleHQpIHtcbiAgICBjb250ZXh0cy5wdXNoKGNvbnRleHQpO1xuICAgIHJldHVybiBjb250ZXh0O1xufTtcblxuLyoqXG4gKiBRdWV1ZSBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIHRoZSBuZXh0IHRpY2sgb2YgdGhlXG4gKiAgICBFbmdpbmUuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBuZXh0VGlja1xuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gZm4gZnVuY3Rpb24gYWNjZXB0aW5nIHdpbmRvdyBvYmplY3RcbiAqL1xuRW5naW5lLm5leHRUaWNrID0gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICBuZXh0VGlja1F1ZXVlLnB1c2goZm4pO1xufTtcblxuLyoqXG4gKiBRdWV1ZSBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIHNvbWV0aW1lIHNvb24sIGF0IGEgdGltZSB0aGF0IGlzXG4gKiAgICB1bmxpa2VseSB0byBhZmZlY3QgZnJhbWUgcmF0ZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGRlZmVyXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqL1xuRW5naW5lLmRlZmVyID0gZnVuY3Rpb24gZGVmZXIoZm4pIHtcbiAgICBkZWZlclF1ZXVlLnB1c2goZm4pO1xufTtcblxub3B0aW9uc01hbmFnZXIub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoZGF0YS5pZCA9PT0gJ2Zwc0NhcCcpIEVuZ2luZS5zZXRGUFNDYXAoZGF0YS52YWx1ZSk7XG4gICAgZWxzZSBpZiAoZGF0YS5pZCA9PT0gJ3J1bkxvb3AnKSB7XG4gICAgICAgIC8vIGtpY2sgb2ZmIHRoZSBsb29wIG9ubHkgaWYgaXQgd2FzIHN0b3BwZWRcbiAgICAgICAgaWYgKCFsb29wRW5hYmxlZCAmJiBkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICBsb29wRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW5naW5lOyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogT3duZXI6IG1hcmtAZmFtby51c1xuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XG4gKi9cblxuXG5cbi8qKlxuICogQSBzaW5nbGV0b24gdGhhdCBtYWludGFpbnMgYSBnbG9iYWwgcmVnaXN0cnkgb2YgU3VyZmFjZXMuXG4gKiAgIFByaXZhdGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBzdGF0aWNcbiAqIEBjbGFzcyBFbnRpdHlcbiAqL1xuXG52YXIgZW50aXRpZXMgPSBbXTtcblxuLyoqXG4gKiBHZXQgZW50aXR5IGZyb20gZ2xvYmFsIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWV0aG9kIGdldFxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIGVudGl0eSByZWlnc3RyYXRpb24gaWRcbiAqIEByZXR1cm4ge1N1cmZhY2V9IGVudGl0eSBpbiB0aGUgZ2xvYmFsIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGdldChpZCkge1xuICAgIHJldHVybiBlbnRpdGllc1tpZF07XG59XG5cbi8qKlxuICogT3ZlcndyaXRlIGVudGl0eSBpbiB0aGUgZ2xvYmFsIGluZGV4XG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2Qgc2V0XG4gKiBAcGFyYW0ge051bWJlcn0gaWQgZW50aXR5IHJlaWdzdHJhdGlvbiBpZFxuICogQHJldHVybiB7U3VyZmFjZX0gZW50aXR5IHRvIGFkZCB0byB0aGUgZ2xvYmFsIGluZGV4XG4gKi9cbmZ1bmN0aW9uIHNldChpZCwgZW50aXR5KSB7XG4gICAgZW50aXRpZXNbaWRdID0gZW50aXR5O1xufVxuXG4vKipcbiAqIEFkZCBlbnRpdHkgdG8gZ2xvYmFsIGluZGV4XG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgcmVnaXN0ZXJcbiAqIEBwYXJhbSB7U3VyZmFjZX0gZW50aXR5IHRvIGFkZCB0byBnbG9iYWwgaW5kZXhcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IGlkXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyKGVudGl0eSkge1xuICAgIHZhciBpZCA9IGVudGl0aWVzLmxlbmd0aDtcbiAgICBzZXQoaWQsIGVudGl0eSk7XG4gICAgcmV0dXJuIGlkO1xufVxuXG4vKipcbiAqIFJlbW92ZSBlbnRpdHkgZnJvbSBnbG9iYWwgaW5kZXhcbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1ldGhvZCB1bnJlZ2lzdGVyXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgZW50aXR5IHJlaWdzdHJhdGlvbiBpZFxuICovXG5mdW5jdGlvbiB1bnJlZ2lzdGVyKGlkKSB7XG4gICAgc2V0KGlkLCBudWxsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgIHVucmVnaXN0ZXI6IHVucmVnaXN0ZXIsXG4gICAgZ2V0OiBnZXQsXG4gICAgc2V0OiBzZXRcbn07IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBPd25lcjogbWFya0BmYW1vLnVzXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcbiAqL1xuXG5cblxuLyoqXG4gKiBFdmVudEVtaXR0ZXIgcmVwcmVzZW50cyBhIGNoYW5uZWwgZm9yIGV2ZW50cy5cbiAqXG4gKiBAY2xhc3MgRXZlbnRFbWl0dGVyXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5fb3duZXIgPSB0aGlzO1xufVxuXG4vKipcbiAqIFRyaWdnZXIgYW4gZXZlbnQsIHNlbmRpbmcgdG8gYWxsIGRvd25zdHJlYW0gaGFuZGxlcnNcbiAqICAgbGlzdGVuaW5nIGZvciBwcm92aWRlZCAndHlwZScga2V5LlxuICpcbiAqIEBtZXRob2QgZW1pdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV2ZW50IHR5cGUga2V5IChmb3IgZXhhbXBsZSwgJ2NsaWNrJylcbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBldmVudCBkYXRhXG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHRoaXNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHZhciBoYW5kbGVycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tpXS5jYWxsKHRoaXMuX293bmVyLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEJpbmQgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBhbiBldmVudCB0eXBlIGhhbmRsZWQgYnkgdGhpcyBvYmplY3QuXG4gKlxuICogQG1ldGhvZCBcIm9uXCJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBldmVudCB0eXBlIGtleSAoZm9yIGV4YW1wbGUsICdjbGljaycpXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZywgT2JqZWN0KX0gaGFuZGxlciBjYWxsYmFja1xuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSB0aGlzXG4gKi9cbiAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdmFyIGluZGV4ID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaW5kZXggPCAwKSB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3IgXCJvblwiLlxuICogQG1ldGhvZCBhZGRMaXN0ZW5lclxuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuICAgLyoqXG4gKiBVbmJpbmQgYW4gZXZlbnQgYnkgdHlwZSBhbmQgaGFuZGxlci5cbiAqICAgVGhpcyB1bmRvZXMgdGhlIHdvcmsgb2YgXCJvblwiLlxuICpcbiAqIEBtZXRob2QgcmVtb3ZlTGlzdGVuZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBldmVudCB0eXBlIGtleSAoZm9yIGV4YW1wbGUsICdjbGljaycpXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyIGZ1bmN0aW9uIG9iamVjdCB0byByZW1vdmVcbiAqIEByZXR1cm4ge0V2ZW50RW1pdHRlcn0gdGhpc1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIHZhciBpbmRleCA9IHRoaXMubGlzdGVuZXJzW3R5cGVdLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGluZGV4ID49IDApIHRoaXMubGlzdGVuZXJzW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGwgZXZlbnQgaGFuZGxlcnMgd2l0aCB0aGlzIHNldCB0byBvd25lci5cbiAqXG4gKiBAbWV0aG9kIGJpbmRUaGlzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG93bmVyIG9iamVjdCB0aGlzIEV2ZW50RW1pdHRlciBiZWxvbmdzIHRvXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYmluZFRoaXMgPSBmdW5jdGlvbiBiaW5kVGhpcyhvd25lcikge1xuICAgIHRoaXMuX293bmVyID0gb3duZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlcicpO1xuXG4vKipcbiAqIEV2ZW50SGFuZGxlciBmb3J3YXJkcyByZWNlaXZlZCBldmVudHMgdG8gYSBzZXQgb2YgcHJvdmlkZWQgY2FsbGJhY2sgZnVuY3Rpb25zLlxuICogSXQgYWxsb3dzIGV2ZW50cyB0byBiZSBjYXB0dXJlZCwgcHJvY2Vzc2VkLCBhbmQgb3B0aW9uYWxseSBwaXBlZCB0aHJvdWdoIHRvIG90aGVyIGV2ZW50IGhhbmRsZXJzLlxuICpcbiAqIEBjbGFzcyBFdmVudEhhbmRsZXJcbiAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEV2ZW50SGFuZGxlcigpIHtcbiAgICBFdmVudEVtaXR0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuZG93bnN0cmVhbSA9IFtdOyAvLyBkb3duc3RyZWFtIGV2ZW50IGhhbmRsZXJzXG4gICAgdGhpcy5kb3duc3RyZWFtRm4gPSBbXTsgLy8gZG93bnN0cmVhbSBmdW5jdGlvbnNcblxuICAgIHRoaXMudXBzdHJlYW0gPSBbXTsgLy8gdXBzdHJlYW0gZXZlbnQgaGFuZGxlcnNcbiAgICB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzID0ge307IC8vIHVwc3RyZWFtIGxpc3RlbmVyc1xufVxuRXZlbnRIYW5kbGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXZlbnRIYW5kbGVyO1xuXG4vKipcbiAqIEFzc2lnbiBhbiBldmVudCBoYW5kbGVyIHRvIHJlY2VpdmUgYW4gb2JqZWN0J3MgaW5wdXQgZXZlbnRzLlxuICpcbiAqIEBtZXRob2Qgc2V0SW5wdXRIYW5kbGVyXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBvYmplY3QgdG8gbWl4IHRyaWdnZXIsIHN1YnNjcmliZSwgYW5kIHVuc3Vic2NyaWJlIGZ1bmN0aW9ucyBpbnRvXG4gKiBAcGFyYW0ge0V2ZW50SGFuZGxlcn0gaGFuZGxlciBhc3NpZ25lZCBldmVudCBoYW5kbGVyXG4gKi9cbkV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIgPSBmdW5jdGlvbiBzZXRJbnB1dEhhbmRsZXIob2JqZWN0LCBoYW5kbGVyKSB7XG4gICAgb2JqZWN0LnRyaWdnZXIgPSBoYW5kbGVyLnRyaWdnZXIuYmluZChoYW5kbGVyKTtcbiAgICBpZiAoaGFuZGxlci5zdWJzY3JpYmUgJiYgaGFuZGxlci51bnN1YnNjcmliZSkge1xuICAgICAgICBvYmplY3Quc3Vic2NyaWJlID0gaGFuZGxlci5zdWJzY3JpYmUuYmluZChoYW5kbGVyKTtcbiAgICAgICAgb2JqZWN0LnVuc3Vic2NyaWJlID0gaGFuZGxlci51bnN1YnNjcmliZS5iaW5kKGhhbmRsZXIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQXNzaWduIGFuIGV2ZW50IGhhbmRsZXIgdG8gcmVjZWl2ZSBhbiBvYmplY3QncyBvdXRwdXQgZXZlbnRzLlxuICpcbiAqIEBtZXRob2Qgc2V0T3V0cHV0SGFuZGxlclxuICogQHN0YXRpY1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3Qgb2JqZWN0IHRvIG1peCBwaXBlLCB1bnBpcGUsIG9uLCBhZGRMaXN0ZW5lciwgYW5kIHJlbW92ZUxpc3RlbmVyIGZ1bmN0aW9ucyBpbnRvXG4gKiBAcGFyYW0ge0V2ZW50SGFuZGxlcn0gaGFuZGxlciBhc3NpZ25lZCBldmVudCBoYW5kbGVyXG4gKi9cbkV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyID0gZnVuY3Rpb24gc2V0T3V0cHV0SGFuZGxlcihvYmplY3QsIGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcikgaGFuZGxlci5iaW5kVGhpcyhvYmplY3QpO1xuICAgIG9iamVjdC5waXBlID0gaGFuZGxlci5waXBlLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0LnVucGlwZSA9IGhhbmRsZXIudW5waXBlLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0Lm9uID0gaGFuZGxlci5vbi5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC5hZGRMaXN0ZW5lciA9IG9iamVjdC5vbjtcbiAgICBvYmplY3QucmVtb3ZlTGlzdGVuZXIgPSBoYW5kbGVyLnJlbW92ZUxpc3RlbmVyLmJpbmQoaGFuZGxlcik7XG59O1xuXG4vKipcbiAqIFRyaWdnZXIgYW4gZXZlbnQsIHNlbmRpbmcgdG8gYWxsIGRvd25zdHJlYW0gaGFuZGxlcnNcbiAqICAgbGlzdGVuaW5nIGZvciBwcm92aWRlZCAndHlwZScga2V5LlxuICpcbiAqIEBtZXRob2QgZW1pdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV2ZW50IHR5cGUga2V5IChmb3IgZXhhbXBsZSwgJ2NsaWNrJylcbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBldmVudCBkYXRhXG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHRoaXNcbiAqL1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5kb3duc3RyZWFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmRvd25zdHJlYW1baV0udHJpZ2dlcikgdGhpcy5kb3duc3RyZWFtW2ldLnRyaWdnZXIodHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5kb3duc3RyZWFtRm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5kb3duc3RyZWFtRm5baV0odHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIGVtaXRcbiAqIEBtZXRob2QgYWRkTGlzdGVuZXJcbiAqL1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIEFkZCBldmVudCBoYW5kbGVyIG9iamVjdCB0byBzZXQgb2YgZG93bnN0cmVhbSBoYW5kbGVycy5cbiAqXG4gKiBAbWV0aG9kIHBpcGVcbiAqXG4gKiBAcGFyYW0ge0V2ZW50SGFuZGxlcn0gdGFyZ2V0IGV2ZW50IGhhbmRsZXIgdGFyZ2V0IG9iamVjdFxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSBwYXNzZWQgZXZlbnQgaGFuZGxlclxuICovXG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHJldHVybiB0YXJnZXQuc3Vic2NyaWJlKHRoaXMpO1xuXG4gICAgdmFyIGRvd25zdHJlYW1DdHggPSAodGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pID8gdGhpcy5kb3duc3RyZWFtRm4gOiB0aGlzLmRvd25zdHJlYW07XG4gICAgdmFyIGluZGV4ID0gZG93bnN0cmVhbUN0eC5pbmRleE9mKHRhcmdldCk7XG4gICAgaWYgKGluZGV4IDwgMCkgZG93bnN0cmVhbUN0eC5wdXNoKHRhcmdldCk7XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHRhcmdldCgncGlwZScsIG51bGwpO1xuICAgIGVsc2UgaWYgKHRhcmdldC50cmlnZ2VyKSB0YXJnZXQudHJpZ2dlcigncGlwZScsIG51bGwpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhhbmRsZXIgb2JqZWN0IGZyb20gc2V0IG9mIGRvd25zdHJlYW0gaGFuZGxlcnMuXG4gKiAgIFVuZG9lcyB3b3JrIG9mIFwicGlwZVwiLlxuICpcbiAqIEBtZXRob2QgdW5waXBlXG4gKlxuICogQHBhcmFtIHtFdmVudEhhbmRsZXJ9IHRhcmdldCB0YXJnZXQgaGFuZGxlciBvYmplY3RcbiAqIEByZXR1cm4ge0V2ZW50SGFuZGxlcn0gcHJvdmlkZWQgdGFyZ2V0XG4gKi9cbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQudW5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbikgcmV0dXJuIHRhcmdldC51bnN1YnNjcmliZSh0aGlzKTtcblxuICAgIHZhciBkb3duc3RyZWFtQ3R4ID0gKHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSA/IHRoaXMuZG93bnN0cmVhbUZuIDogdGhpcy5kb3duc3RyZWFtO1xuICAgIHZhciBpbmRleCA9IGRvd25zdHJlYW1DdHguaW5kZXhPZih0YXJnZXQpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIGRvd25zdHJlYW1DdHguc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0YXJnZXQoJ3VucGlwZScsIG51bGwpO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXQudHJpZ2dlcikgdGFyZ2V0LnRyaWdnZXIoJ3VucGlwZScsIG51bGwpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQmluZCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFuIGV2ZW50IHR5cGUgaGFuZGxlZCBieSB0aGlzIG9iamVjdC5cbiAqXG4gKiBAbWV0aG9kIFwib25cIlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV2ZW50IHR5cGUga2V5IChmb3IgZXhhbXBsZSwgJ2NsaWNrJylcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nLCBPYmplY3QpfSBoYW5kbGVyIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHRoaXNcbiAqL1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSkge1xuICAgICAgICB2YXIgdXBzdHJlYW1MaXN0ZW5lciA9IHRoaXMudHJpZ2dlci5iaW5kKHRoaXMsIHR5cGUpO1xuICAgICAgICB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdID0gdXBzdHJlYW1MaXN0ZW5lcjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVwc3RyZWFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnVwc3RyZWFtW2ldLm9uKHR5cGUsIHVwc3RyZWFtTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3IgXCJvblwiXG4gKiBAbWV0aG9kIGFkZExpc3RlbmVyXG4gKi9cbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEhhbmRsZXIucHJvdG90eXBlLm9uO1xuXG4vKipcbiAqIExpc3RlbiBmb3IgZXZlbnRzIGZyb20gYW4gdXBzdHJlYW0gZXZlbnQgaGFuZGxlci5cbiAqXG4gKiBAbWV0aG9kIHN1YnNjcmliZVxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBzb3VyY2Ugc291cmNlIGVtaXR0ZXIgb2JqZWN0XG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHRoaXNcbiAqL1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoc291cmNlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cHN0cmVhbS5pbmRleE9mKHNvdXJjZSk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLnVwc3RyZWFtLnB1c2goc291cmNlKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBzb3VyY2Uub24odHlwZSwgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN0b3AgbGlzdGVuaW5nIHRvIGV2ZW50cyBmcm9tIGFuIHVwc3RyZWFtIGV2ZW50IGhhbmRsZXIuXG4gKlxuICogQG1ldGhvZCB1bnN1YnNjcmliZVxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBzb3VyY2Ugc291cmNlIGVtaXR0ZXIgb2JqZWN0XG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHRoaXNcbiAqL1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKHNvdXJjZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXBzdHJlYW0uaW5kZXhPZihzb3VyY2UpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMudXBzdHJlYW0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIodHlwZSwgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50SGFuZGxlcjsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtJyk7XG5cbi8qKlxuICpcbiAqICBBIGNvbGxlY3Rpb24gb2YgdmlzdWFsIGNoYW5nZXMgdG8gYmVcbiAqICAgIGFwcGxpZWQgdG8gYW5vdGhlciByZW5kZXJhYmxlIGNvbXBvbmVudC4gVGhpcyBjb2xsZWN0aW9uIGluY2x1ZGVzIGFcbiAqICAgIHRyYW5zZm9ybSBtYXRyaXgsIGFuIG9wYWNpdHkgY29uc3RhbnQsIGEgc2l6ZSwgYW4gb3JpZ2luIHNwZWNpZmllci5cbiAqICAgIE1vZGlmaWVyIG9iamVjdHMgY2FuIGJlIGFkZGVkIHRvIGFueSBSZW5kZXJOb2RlIG9yIG9iamVjdFxuICogICAgY2FwYWJsZSBvZiBkaXNwbGF5aW5nIHJlbmRlcmFibGVzLiAgVGhlIE1vZGlmaWVyJ3MgY2hpbGRyZW4gYW5kIGRlc2NlbmRhbnRzXG4gKiAgICBhcmUgdHJhbnNmb3JtZWQgYnkgdGhlIGFtb3VudHMgc3BlY2lmaWVkIGluIHRoZSBNb2RpZmllcidzIHByb3BlcnRpZXMuXG4gKlxuICogQGNsYXNzIE1vZGlmaWVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gb3ZlcnJpZGVzIG9mIGRlZmF1bHQgb3B0aW9uc1xuICogQHBhcmFtIHtUcmFuc2Zvcm19IFtvcHRpb25zLnRyYW5zZm9ybV0gYWZmaW5lIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm9wYWNpdHldXG4gKiBAcGFyYW0ge0FycmF5Lk51bWJlcn0gW29wdGlvbnMub3JpZ2luXSBvcmlnaW4gYWRqdXN0bWVudFxuICogQHBhcmFtIHtBcnJheS5OdW1iZXJ9IFtvcHRpb25zLnNpemVdIHNpemUgdG8gYXBwbHkgdG8gZGVzY2VuZGFudHNcbiAqL1xuZnVuY3Rpb24gTW9kaWZpZXIob3B0aW9ucykge1xuICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG5cbiAgICAvKiBUT0RPOiByZW1vdmUgdGhpcyB3aGVuIGRlcHJlY2F0aW9uIGNvbXBsZXRlICovXG4gICAgdGhpcy5fbGVnYWN5U3RhdGVzID0ge307XG5cbiAgICB0aGlzLl9vdXRwdXQgPSB7XG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmlkZW50aXR5LFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBvcmlnaW46IG51bGwsXG4gICAgICAgIGFsaWduOiBudWxsLFxuICAgICAgICBzaXplOiBudWxsLFxuICAgICAgICB0YXJnZXQ6IG51bGxcbiAgICB9O1xuXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMudHJhbnNmb3JtKSB0aGlzLnRyYW5zZm9ybUZyb20ob3B0aW9ucy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAob3B0aW9ucy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHRoaXMub3BhY2l0eUZyb20ob3B0aW9ucy5vcGFjaXR5KTtcbiAgICAgICAgaWYgKG9wdGlvbnMub3JpZ2luKSB0aGlzLm9yaWdpbkZyb20ob3B0aW9ucy5vcmlnaW4pO1xuICAgICAgICBpZiAob3B0aW9ucy5hbGlnbikgdGhpcy5hbGlnbkZyb20ob3B0aW9ucy5hbGlnbik7XG4gICAgICAgIGlmIChvcHRpb25zLnNpemUpIHRoaXMuc2l6ZUZyb20ob3B0aW9ucy5zaXplKTtcbiAgICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb24sIG9iamVjdCwgb3Igc3RhdGljIHRyYW5zZm9ybSBtYXRyaXggd2hpY2ggcHJvdmlkZXMgdGhlIHRyYW5zZm9ybS5cbiAqICAgVGhpcyBpcyBldmFsdWF0ZWQgb24gZXZlcnkgdGljayBvZiB0aGUgZW5naW5lLlxuICpcbiAqIEBtZXRob2QgdHJhbnNmb3JtRnJvbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0cmFuc2Zvcm0gdHJhbnNmb3JtIHByb3ZpZGVyIG9iamVjdFxuICogQHJldHVybiB7TW9kaWZpZXJ9IHRoaXNcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLnRyYW5zZm9ybUZyb20gPSBmdW5jdGlvbiB0cmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSkge1xuICAgIGlmICh0cmFuc2Zvcm0gaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gdHJhbnNmb3JtO1xuICAgIGVsc2UgaWYgKHRyYW5zZm9ybSBpbnN0YW5jZW9mIE9iamVjdCAmJiB0cmFuc2Zvcm0uZ2V0KSB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSB0cmFuc2Zvcm0uZ2V0LmJpbmQodHJhbnNmb3JtKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBmdW5jdGlvbiwgb2JqZWN0LCBvciBudW1iZXIgdG8gcHJvdmlkZSBvcGFjaXR5LCBpbiByYW5nZSBbMCwxXS5cbiAqXG4gKiBAbWV0aG9kIG9wYWNpdHlGcm9tXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wYWNpdHkgcHJvdmlkZXIgb2JqZWN0XG4gKiBAcmV0dXJuIHtNb2RpZmllcn0gdGhpc1xuICovXG5Nb2RpZmllci5wcm90b3R5cGUub3BhY2l0eUZyb20gPSBmdW5jdGlvbiBvcGFjaXR5RnJvbShvcGFjaXR5KSB7XG4gICAgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5fb3BhY2l0eUdldHRlciA9IG9wYWNpdHk7XG4gICAgZWxzZSBpZiAob3BhY2l0eSBpbnN0YW5jZW9mIE9iamVjdCAmJiBvcGFjaXR5LmdldCkgdGhpcy5fb3BhY2l0eUdldHRlciA9IG9wYWNpdHkuZ2V0LmJpbmQob3BhY2l0eSk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgZnVuY3Rpb24sIG9iamVjdCwgb3IgbnVtZXJpY2FsIGFycmF5IHRvIHByb3ZpZGUgb3JpZ2luLCBhcyBbeCx5XSxcbiAqICAgd2hlcmUgeCBhbmQgeSBhcmUgaW4gdGhlIHJhbmdlIFswLDFdLlxuICpcbiAqIEBtZXRob2Qgb3JpZ2luRnJvbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnaW4gcHJvdmlkZXIgb2JqZWN0XG4gKiBAcmV0dXJuIHtNb2RpZmllcn0gdGhpc1xuICovXG5Nb2RpZmllci5wcm90b3R5cGUub3JpZ2luRnJvbSA9IGZ1bmN0aW9uIG9yaWdpbkZyb20ob3JpZ2luKSB7XG4gICAgaWYgKG9yaWdpbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBvcmlnaW47XG4gICAgZWxzZSBpZiAob3JpZ2luIGluc3RhbmNlb2YgT2JqZWN0ICYmIG9yaWdpbi5nZXQpIHRoaXMuX29yaWdpbkdldHRlciA9IG9yaWdpbi5nZXQuYmluZChvcmlnaW4pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQub3JpZ2luID0gb3JpZ2luO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGZ1bmN0aW9uLCBvYmplY3QsIG9yIG51bWVyaWNhbCBhcnJheSB0byBwcm92aWRlIGFsaWduLCBhcyBbeCx5XSxcbiAqICAgd2hlcmUgeCBhbmQgeSBhcmUgaW4gdGhlIHJhbmdlIFswLDFdLlxuICpcbiAqIEBtZXRob2QgYWxpZ25Gcm9tXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFsaWduIHByb3ZpZGVyIG9iamVjdFxuICogQHJldHVybiB7TW9kaWZpZXJ9IHRoaXNcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLmFsaWduRnJvbSA9IGZ1bmN0aW9uIGFsaWduRnJvbShhbGlnbikge1xuICAgIGlmIChhbGlnbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLl9hbGlnbkdldHRlciA9IGFsaWduO1xuICAgIGVsc2UgaWYgKGFsaWduIGluc3RhbmNlb2YgT2JqZWN0ICYmIGFsaWduLmdldCkgdGhpcy5fYWxpZ25HZXR0ZXIgPSBhbGlnbi5nZXQuYmluZChhbGlnbik7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX2FsaWduR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LmFsaWduID0gYWxpZ247XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgZnVuY3Rpb24sIG9iamVjdCwgb3IgbnVtZXJpY2FsIGFycmF5IHRvIHByb3ZpZGUgc2l6ZSwgYXMgW3dpZHRoLCBoZWlnaHRdLlxuICpcbiAqIEBtZXRob2Qgc2l6ZUZyb21cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2l6ZSBwcm92aWRlciBvYmplY3RcbiAqIEByZXR1cm4ge01vZGlmaWVyfSB0aGlzXG4gKi9cbk1vZGlmaWVyLnByb3RvdHlwZS5zaXplRnJvbSA9IGZ1bmN0aW9uIHNpemVGcm9tKHNpemUpIHtcbiAgICBpZiAoc2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLl9zaXplR2V0dGVyID0gc2l6ZTtcbiAgICBlbHNlIGlmIChzaXplIGluc3RhbmNlb2YgT2JqZWN0ICYmIHNpemUuZ2V0KSB0aGlzLl9zaXplR2V0dGVyID0gc2l6ZS5nZXQuYmluZChzaXplKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5zaXplID0gc2l6ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4gLyoqXG4gKiBEZXByZWNhdGVkOiBQcmVmZXIgdHJhbnNmb3JtRnJvbSB3aXRoIHN0YXRpYyBUcmFuc2Zvcm0sIG9yIHVzZSBhIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLlxuICogQGRlcHJlY2F0ZWRcbiAqIEBtZXRob2Qgc2V0VHJhbnNmb3JtXG4gKlxuICogQHBhcmFtIHtUcmFuc2Zvcm19IHRyYW5zZm9ybSBUcmFuc2Zvcm0gdG8gdHJhbnNpdGlvbiB0b1xuICogQHBhcmFtIHtUcmFuc2l0aW9uYWJsZX0gdHJhbnNpdGlvbiBWYWxpZCB0cmFuc2l0aW9uYWJsZSBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGNhbGxiYWNrIHRvIGNhbGwgYWZ0ZXIgdHJhbnNpdGlvbiBjb21wbGV0ZXNcbiAqIEByZXR1cm4ge01vZGlmaWVyfSB0aGlzXG4gKi9cbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBzZXRUcmFuc2Zvcm0odHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtID0gbmV3IFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKHRoaXMuX291dHB1dC50cmFuc2Zvcm0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fdHJhbnNmb3JtR2V0dGVyKSB0aGlzLnRyYW5zZm9ybUZyb20odGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSk7XG5cbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5zZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiB0aGlzLnRyYW5zZm9ybUZyb20odHJhbnNmb3JtKTtcbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZDogUHJlZmVyIG9wYWNpdHlGcm9tIHdpdGggc3RhdGljIG9wYWNpdHkgYXJyYXksIG9yIHVzZSBhIFRyYW5zaXRpb25hYmxlIHdpdGggdGhhdCBvcGFjaXR5LlxuICogQGRlcHJlY2F0ZWRcbiAqIEBtZXRob2Qgc2V0T3BhY2l0eVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcGFjaXR5IE9wYWNpdHkgdmFsdWUgdG8gdHJhbnNpdGlvbiB0by5cbiAqIEBwYXJhbSB7VHJhbnNpdGlvbmFibGV9IHRyYW5zaXRpb24gVmFsaWQgdHJhbnNpdGlvbmFibGUgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayB0byBjYWxsIGFmdGVyIHRyYW5zaXRpb24gY29tcGxldGVzXG4gKiBAcmV0dXJuIHtNb2RpZmllcn0gdGhpc1xuICovXG5Nb2RpZmllci5wcm90b3R5cGUuc2V0T3BhY2l0eSA9IGZ1bmN0aW9uIHNldE9wYWNpdHkob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQub3BhY2l0eSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9vcGFjaXR5R2V0dGVyKSB0aGlzLm9wYWNpdHlGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gdGhpcy5vcGFjaXR5RnJvbShvcGFjaXR5KTtcbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZDogUHJlZmVyIG9yaWdpbkZyb20gd2l0aCBzdGF0aWMgb3JpZ2luIGFycmF5LCBvciB1c2UgYSBUcmFuc2l0aW9uYWJsZSB3aXRoIHRoYXQgb3JpZ2luLlxuICogQGRlcHJlY2F0ZWRcbiAqIEBtZXRob2Qgc2V0T3JpZ2luXG4gKlxuICogQHBhcmFtIHtBcnJheS5OdW1iZXJ9IG9yaWdpbiB0d28gZWxlbWVudCBhcnJheSB3aXRoIHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAcGFyYW0ge1RyYW5zaXRpb25hYmxlfSB0cmFuc2l0aW9uIFZhbGlkIHRyYW5zaXRpb25hYmxlIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgdG8gY2FsbCBhZnRlciB0cmFuc2l0aW9uIGNvbXBsZXRlc1xuICogQHJldHVybiB7TW9kaWZpZXJ9IHRoaXNcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uIHNldE9yaWdpbihvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgLyogVE9ETzogcmVtb3ZlIHRoaXMgaWYgc3RhdGVtZW50IHdoZW4gZGVwcmVjYXRpb24gY29tcGxldGUgKi9cbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5vcmlnaW4gfHwgWzAsIDBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbkdldHRlcikgdGhpcy5vcmlnaW5Gcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pO1xuXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4uc2V0KG9yaWdpbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gdGhpcy5vcmlnaW5Gcm9tKG9yaWdpbik7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQ6IFByZWZlciBhbGlnbkZyb20gd2l0aCBzdGF0aWMgYWxpZ24gYXJyYXksIG9yIHVzZSBhIFRyYW5zaXRpb25hYmxlIHdpdGggdGhhdCBhbGlnbi5cbiAqIEBkZXByZWNhdGVkXG4gKiBAbWV0aG9kIHNldEFsaWduXG4gKlxuICogQHBhcmFtIHtBcnJheS5OdW1iZXJ9IGFsaWduIHR3byBlbGVtZW50IGFycmF5IHdpdGggdmFsdWVzIGJldHdlZW4gMCBhbmQgMS5cbiAqIEBwYXJhbSB7VHJhbnNpdGlvbmFibGV9IHRyYW5zaXRpb24gVmFsaWQgdHJhbnNpdGlvbmFibGUgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayB0byBjYWxsIGFmdGVyIHRyYW5zaXRpb24gY29tcGxldGVzXG4gKiBAcmV0dXJuIHtNb2RpZmllcn0gdGhpc1xuICovXG5Nb2RpZmllci5wcm90b3R5cGUuc2V0QWxpZ24gPSBmdW5jdGlvbiBzZXRBbGlnbihhbGlnbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICAvKiBUT0RPOiByZW1vdmUgdGhpcyBpZiBzdGF0ZW1lbnQgd2hlbiBkZXByZWNhdGlvbiBjb21wbGV0ZSAqL1xuICAgIGlmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbikge1xuXG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LmFsaWduIHx8IFswLCAwXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9hbGlnbkdldHRlcikgdGhpcy5hbGlnbkZyb20odGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKTtcblxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24uc2V0KGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiB0aGlzLmFsaWduRnJvbShhbGlnbik7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQ6IFByZWZlciBzaXplRnJvbSB3aXRoIHN0YXRpYyBvcmlnaW4gYXJyYXksIG9yIHVzZSBhIFRyYW5zaXRpb25hYmxlIHdpdGggdGhhdCBzaXplLlxuICogQGRlcHJlY2F0ZWRcbiAqIEBtZXRob2Qgc2V0U2l6ZVxuICogQHBhcmFtIHtBcnJheS5OdW1iZXJ9IHNpemUgdHdvIGVsZW1lbnQgYXJyYXkgb2YgW3dpZHRoLCBoZWlnaHRdXG4gKiBAcGFyYW0ge1RyYW5zaXRpb25hYmxlfSB0cmFuc2l0aW9uIFZhbGlkIHRyYW5zaXRpb25hYmxlIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgdG8gY2FsbCBhZnRlciB0cmFuc2l0aW9uIGNvbXBsZXRlc1xuICogQHJldHVybiB7TW9kaWZpZXJ9IHRoaXNcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplKHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHNpemUgJiYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUpKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX291dHB1dC5zaXplIHx8IFswLCAwXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9zaXplR2V0dGVyKSB0aGlzLnNpemVGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKTtcblxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZS5zZXQoc2l6ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gdGhpcy5zaXplRnJvbShzaXplKTtcbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZDogUHJlZmVyIHRvIHN0b3AgdHJhbnNmb3JtIGluIHlvdXIgcHJvdmlkZXIgb2JqZWN0LlxuICogQGRlcHJlY2F0ZWRcbiAqIEBtZXRob2QgaGFsdFxuICovXG5Nb2RpZmllci5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0pIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0uaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSkgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkuaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKSB0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24uaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSkgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUuaGFsdCgpO1xuICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQ6IFByZWZlciB0byB1c2UgeW91ciBwcm92aWRlZCB0cmFuc2Zvcm0gb3Igb3V0cHV0IG9mIHlvdXIgdHJhbnNmb3JtIHByb3ZpZGVyLlxuICogQGRlcHJlY2F0ZWRcbiAqIEBtZXRob2QgZ2V0VHJhbnNmb3JtXG4gKiBAcmV0dXJuIHtPYmplY3R9IHRyYW5zZm9ybSBwcm92aWRlciBvYmplY3RcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLmdldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtR2V0dGVyKCk7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQ6IFByZWZlciB0byBkZXRlcm1pbmUgdGhlIGVuZCBzdGF0ZSBvZiB5b3VyIHRyYW5zZm9ybSBmcm9tIHlvdXIgdHJhbnNmb3JtIHByb3ZpZGVyXG4gKiBAZGVwcmVjYXRlZFxuICogQG1ldGhvZCBnZXRGaW5hbFRyYW5zZm9ybVxuICogQHJldHVybiB7VHJhbnNmb3JtfSB0cmFuc2Zvcm0gbWF0cml4XG4gKi9cbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRGaW5hbFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldEZpbmFsVHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtID8gdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5nZXRGaW5hbCgpIDogdGhpcy5fb3V0cHV0LnRyYW5zZm9ybTtcbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZDogUHJlZmVyIHRvIHVzZSB5b3VyIHByb3ZpZGVkIG9wYWNpdHkgb3Igb3V0cHV0IG9mIHlvdXIgb3BhY2l0eSBwcm92aWRlci5cbiAqIEBkZXByZWNhdGVkXG4gKiBAbWV0aG9kIGdldE9wYWNpdHlcbiAqIEByZXR1cm4ge09iamVjdH0gb3BhY2l0eSBwcm92aWRlciBvYmplY3RcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLmdldE9wYWNpdHkgPSBmdW5jdGlvbiBnZXRPcGFjaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9vcGFjaXR5R2V0dGVyKCk7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQ6IFByZWZlciB0byB1c2UgeW91ciBwcm92aWRlZCBvcmlnaW4gb3Igb3V0cHV0IG9mIHlvdXIgb3JpZ2luIHByb3ZpZGVyLlxuICogQGRlcHJlY2F0ZWRcbiAqIEBtZXRob2QgZ2V0T3JpZ2luXG4gKiBAcmV0dXJuIHtPYmplY3R9IG9yaWdpbiBwcm92aWRlciBvYmplY3RcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLmdldE9yaWdpbiA9IGZ1bmN0aW9uIGdldE9yaWdpbigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luR2V0dGVyKCk7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQ6IFByZWZlciB0byB1c2UgeW91ciBwcm92aWRlZCBhbGlnbiBvciBvdXRwdXQgb2YgeW91ciBhbGlnbiBwcm92aWRlci5cbiAqIEBkZXByZWNhdGVkXG4gKiBAbWV0aG9kIGdldEFsaWduXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFsaWduIHByb3ZpZGVyIG9iamVjdFxuICovXG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0QWxpZ24gPSBmdW5jdGlvbiBnZXRBbGlnbigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxpZ25HZXR0ZXIoKTtcbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZDogUHJlZmVyIHRvIHVzZSB5b3VyIHByb3ZpZGVkIHNpemUgb3Igb3V0cHV0IG9mIHlvdXIgc2l6ZSBwcm92aWRlci5cbiAqIEBkZXByZWNhdGVkXG4gKiBAbWV0aG9kIGdldFNpemVcbiAqIEByZXR1cm4ge09iamVjdH0gc2l6ZSBwcm92aWRlciBvYmplY3RcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplR2V0dGVyID8gdGhpcy5fc2l6ZUdldHRlcigpIDogdGhpcy5fb3V0cHV0LnNpemU7XG59O1xuXG4vLyBjYWxsIHByb3ZpZGVycyBvbiB0aWNrIHRvIHJlY2VpdmUgcmVuZGVyIHNwZWMgZWxlbWVudHMgdG8gYXBwbHlcbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuX3RyYW5zZm9ybUdldHRlcikgdGhpcy5fb3V0cHV0LnRyYW5zZm9ybSA9IHRoaXMuX3RyYW5zZm9ybUdldHRlcigpO1xuICAgIGlmICh0aGlzLl9vcGFjaXR5R2V0dGVyKSB0aGlzLl9vdXRwdXQub3BhY2l0eSA9IHRoaXMuX29wYWNpdHlHZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fb3JpZ2luR2V0dGVyKSB0aGlzLl9vdXRwdXQub3JpZ2luID0gdGhpcy5fb3JpZ2luR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX2FsaWduR2V0dGVyKSB0aGlzLl9vdXRwdXQuYWxpZ24gPSB0aGlzLl9hbGlnbkdldHRlcigpO1xuICAgIGlmICh0aGlzLl9zaXplR2V0dGVyKSB0aGlzLl9vdXRwdXQuc2l6ZSA9IHRoaXMuX3NpemVHZXR0ZXIoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gcmVuZGVyIHNwZWMgZm9yIHRoaXMgTW9kaWZpZXIsIGFwcGx5aW5nIHRvIHRoZSBwcm92aWRlZFxuICogICAgdGFyZ2V0IGNvbXBvbmVudC4gIFRoaXMgaXMgc2ltaWxhciB0byByZW5kZXIoKSBmb3IgU3VyZmFjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgbW9kaWZ5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAoYWxyZWFkeSByZW5kZXJlZCkgcmVuZGVyIHNwZWMgdG9cbiAqICAgIHdoaWNoIHRvIGFwcGx5IHRoZSB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlbmRlciBzcGVjIGZvciB0aGlzIE1vZGlmaWVyLCBpbmNsdWRpbmcgdGhlXG4gKiAgICBwcm92aWRlZCB0YXJnZXRcbiAqL1xuTW9kaWZpZXIucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIG1vZGlmeSh0YXJnZXQpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fb3V0cHV0LnRhcmdldCA9IHRhcmdldDtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RpZmllcjsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xuXG4vKipcbiAqICBBIGNvbGxlY3Rpb24gb2YgbWV0aG9kcyBmb3Igc2V0dGluZyBvcHRpb25zIHdoaWNoIGNhbiBiZSBleHRlbmRlZFxuICogIG9udG8gb3RoZXIgY2xhc3Nlcy5cbiAqXG4gKlxuICogICoqKiogV0FSTklORyAqKioqXG4gKiAgWW91IGNhbiBvbmx5IHBhc3MgdGhyb3VnaCBvYmplY3RzIHRoYXQgd2lsbCBjb21waWxlIGludG8gdmFsaWQgSlNPTi5cbiAqXG4gKiAgVmFsaWQgb3B0aW9uczpcbiAqICAgICAgU3RyaW5ncyxcbiAqICAgICAgQXJyYXlzLFxuICogICAgICBPYmplY3RzLFxuICogICAgICBOdW1iZXJzLFxuICogICAgICBOZXN0ZWQgT2JqZWN0cyxcbiAqICAgICAgTmVzdGVkIEFycmF5cy5cbiAqXG4gKiAgICBUaGlzIGV4Y2x1ZGVzOlxuICogICAgICAgIERvY3VtZW50IEZyYWdtZW50cyxcbiAqICAgICAgICBGdW5jdGlvbnNcbiAqIEBjbGFzcyBPcHRpb25zTWFuYWdlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgb3B0aW9ucyBkaWN0aW9uYXJ5XG4gKi9cbmZ1bmN0aW9uIE9wdGlvbnNNYW5hZ2VyKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbnVsbDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgb3B0aW9ucyBtYW5hZ2VyIGZyb20gc291cmNlIGRpY3Rpb25hcnkgd2l0aCBhcmd1bWVudHMgb3ZlcnJpZGVuIGJ5IHBhdGNoIGRpY3Rpb25hcnkuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBPcHRpb25zTWFuYWdlci5wYXRjaFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2Ugc291cmNlIGFyZ3VtZW50c1xuICogQHBhcmFtIHsuLi5PYmplY3R9IGRhdGEgYXJndW1lbnQgYWRkaXRpb25zIGFuZCBvdmVyd3JpdGVzXG4gKiBAcmV0dXJuIHtPYmplY3R9IHNvdXJjZSBvYmplY3RcbiAqL1xuT3B0aW9uc01hbmFnZXIucGF0Y2ggPSBmdW5jdGlvbiBwYXRjaE9iamVjdChzb3VyY2UsIGRhdGEpIHtcbiAgICB2YXIgbWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcihzb3VyY2UpO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBtYW5hZ2VyLnBhdGNoKGFyZ3VtZW50c1tpXSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbn07XG5cbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG59XG5cbi8qKlxuICogQ3JlYXRlIE9wdGlvbnNNYW5hZ2VyIGZyb20gc291cmNlIHdpdGggYXJndW1lbnRzIG92ZXJyaWRlbiBieSBwYXRjaGVzLlxuICogICBUcmlnZ2VycyAnY2hhbmdlJyBldmVudCBvbiB0aGlzIG9iamVjdCdzIGV2ZW50IGhhbmRsZXIgaWYgdGhlIHN0YXRlIG9mXG4gKiAgIHRoZSBPcHRpb25zTWFuYWdlciBjaGFuZ2VzIGFzIGEgcmVzdWx0LlxuICpcbiAqIEBtZXRob2QgcGF0Y2hcbiAqXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gYXJndW1lbnRzIGxpc3Qgb2YgcGF0Y2ggb2JqZWN0c1xuICogQHJldHVybiB7T3B0aW9uc01hbmFnZXJ9IHRoaXNcbiAqL1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gcGF0Y2goKSB7XG4gICAgdmFyIG15U3RhdGUgPSB0aGlzLl92YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoKGsgaW4gbXlTdGF0ZSkgJiYgKGRhdGFba10gJiYgZGF0YVtrXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSAmJiAobXlTdGF0ZVtrXSAmJiBteVN0YXRlW2tdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFteVN0YXRlLmhhc093blByb3BlcnR5KGspKSBteVN0YXRlW2tdID0gT2JqZWN0LmNyZWF0ZShteVN0YXRlW2tdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtleShrKS5wYXRjaChkYXRhW2tdKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudE91dHB1dCkgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7aWQ6IGssIHZhbHVlOiB0aGlzLmtleShrKS52YWx1ZSgpfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHRoaXMuc2V0KGssIGRhdGFba10pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3IgcGF0Y2hcbiAqXG4gKiBAbWV0aG9kIHNldE9wdGlvbnNcbiAqXG4gKi9cbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnBhdGNoO1xuXG4vKipcbiAqIFJldHVybiBPcHRpb25zTWFuYWdlciBiYXNlZCBvbiBzdWItb2JqZWN0IHJldHJpZXZlZCBieSBrZXlcbiAqXG4gKiBAbWV0aG9kIGtleVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudGlmaWVyIGtleVxuICogQHJldHVybiB7T3B0aW9uc01hbmFnZXJ9IG5ldyBvcHRpb25zIG1hbmFnZXIgd2l0aCB0aGUgdmFsdWVcbiAqL1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmtleSA9IGZ1bmN0aW9uIGtleShpZGVudGlmaWVyKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLl92YWx1ZVtpZGVudGlmaWVyXSk7XG4gICAgaWYgKCEocmVzdWx0Ll92YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgfHwgcmVzdWx0Ll92YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSByZXN1bHQuX3ZhbHVlID0ge307XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogTG9vayB1cCB2YWx1ZSBieSBrZXlcbiAqIEBtZXRob2QgZ2V0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBrZXlcbiAqIEByZXR1cm4ge09iamVjdH0gYXNzb2NpYXRlZCBvYmplY3RcbiAqL1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVba2V5XTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIGdldFxuICogQG1ldGhvZCBnZXRPcHRpb25zXG4gKi9cbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXRPcHRpb25zID0gT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmdldDtcblxuLyoqXG4gKiBTZXQga2V5IHRvIHZhbHVlLiAgT3V0cHV0cyAnY2hhbmdlJyBldmVudCBpZiBhIHZhbHVlIGlzIG92ZXJ3cml0dGVuLlxuICpcbiAqIEBtZXRob2Qgc2V0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBrZXkgc3RyaW5nXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgdmFsdWUgb2JqZWN0XG4gKiBAcmV0dXJuIHtPcHRpb25zTWFuYWdlcn0gbmV3IG9wdGlvbnMgbWFuYWdlciBiYXNlZCBvbiB0aGUgdmFsdWUgb2JqZWN0XG4gKi9cbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHZhciBvcmlnaW5hbFZhbHVlID0gdGhpcy5nZXQoa2V5KTtcbiAgICB0aGlzLl92YWx1ZVtrZXldID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuZXZlbnRPdXRwdXQgJiYgdmFsdWUgIT09IG9yaWdpbmFsVmFsdWUpIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgnY2hhbmdlJywge2lkOiBrZXksIHZhbHVlOiB2YWx1ZX0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gZW50aXJlIG9iamVjdCBjb250ZW50cyBvZiB0aGlzIE9wdGlvbnNNYW5hZ2VyLlxuICpcbiAqIEBtZXRob2QgdmFsdWVcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGN1cnJlbnQgc3RhdGUgb2Ygb3B0aW9uc1xuICovXG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG59O1xuXG4vKipcbiAqIEJpbmQgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBhbiBldmVudCB0eXBlIGhhbmRsZWQgYnkgdGhpcyBvYmplY3QuXG4gKlxuICogQG1ldGhvZCBcIm9uXCJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBldmVudCB0eXBlIGtleSAoZm9yIGV4YW1wbGUsICdjaGFuZ2UnKVxuICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcsIE9iamVjdCl9IGhhbmRsZXIgY2FsbGJhY2tcbiAqIEByZXR1cm4ge0V2ZW50SGFuZGxlcn0gdGhpc1xuICovXG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5vbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuLyoqXG4gKiBVbmJpbmQgYW4gZXZlbnQgYnkgdHlwZSBhbmQgaGFuZGxlci5cbiAqICAgVGhpcyB1bmRvZXMgdGhlIHdvcmsgb2YgXCJvblwiLlxuICpcbiAqIEBtZXRob2QgcmVtb3ZlTGlzdGVuZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBldmVudCB0eXBlIGtleSAoZm9yIGV4YW1wbGUsICdjaGFuZ2UnKVxuICogQHBhcmFtIHtmdW5jdGlvbn0gaGFuZGxlciBmdW5jdGlvbiBvYmplY3QgdG8gcmVtb3ZlXG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IGludGVybmFsIGV2ZW50IGhhbmRsZXIgb2JqZWN0IChmb3IgY2hhaW5pbmcpXG4gKi9cbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG4vKipcbiAqIEFkZCBldmVudCBoYW5kbGVyIG9iamVjdCB0byBzZXQgb2YgZG93bnN0cmVhbSBoYW5kbGVycy5cbiAqXG4gKiBAbWV0aG9kIHBpcGVcbiAqXG4gKiBAcGFyYW0ge0V2ZW50SGFuZGxlcn0gdGFyZ2V0IGV2ZW50IGhhbmRsZXIgdGFyZ2V0IG9iamVjdFxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSBwYXNzZWQgZXZlbnQgaGFuZGxlclxuICovXG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGFuZGxlciBvYmplY3QgZnJvbSBzZXQgb2YgZG93bnN0cmVhbSBoYW5kbGVycy5cbiAqIFVuZG9lcyB3b3JrIG9mIFwicGlwZVwiXG4gKlxuICogQG1ldGhvZCB1bnBpcGVcbiAqXG4gKiBAcGFyYW0ge0V2ZW50SGFuZGxlcn0gdGFyZ2V0IHRhcmdldCBoYW5kbGVyIG9iamVjdFxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSBwcm92aWRlZCB0YXJnZXRcbiAqL1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy51bnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uc01hbmFnZXI7IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBPd25lcjogbWFya0BmYW1vLnVzXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcbiAqL1xuXG52YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9FbnRpdHknKTtcbnZhciBTcGVjUGFyc2VyID0gcmVxdWlyZSgnLi9TcGVjUGFyc2VyJyk7XG5cbi8qKlxuICogQSB3cmFwcGVyIGZvciBpbnNlcnRpbmcgYSByZW5kZXJhYmxlIGNvbXBvbmVudCAobGlrZSBhIE1vZGlmZXIgb3JcbiAqICAgU3VyZmFjZSkgaW50byB0aGUgcmVuZGVyIHRyZWUuXG4gKlxuICogQGNsYXNzIFJlbmRlck5vZGVcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGFyZ2V0IHJlbmRlcmFibGUgY29tcG9uZW50XG4gKi9cbmZ1bmN0aW9uIFJlbmRlck5vZGUob2JqZWN0KSB7XG4gICAgdGhpcy5fb2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLl9jaGlsZCA9IG51bGw7XG4gICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuX2lzTW9kaWZpZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuX3Jlc3VsdENhY2hlID0ge307XG4gICAgdGhpcy5fcHJldlJlc3VsdHMgPSB7fTtcblxuICAgIHRoaXMuX2NoaWxkUmVzdWx0ID0gbnVsbDtcblxuICAgIGlmIChvYmplY3QpIHRoaXMuc2V0KG9iamVjdCk7XG59XG5cbi8qKlxuICogQXBwZW5kIGEgcmVuZGVyYWJsZSB0byB0aGUgbGlzdCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAqICAgVGhpcyBwcm9kdWNlcyBhIG5ldyBSZW5kZXJOb2RlIGluIHRoZSB0cmVlLlxuICogICBOb3RlOiBEb2VzIG5vdCBkb3VibGUtd3JhcCBpZiBjaGlsZCBpcyBhIFJlbmRlck5vZGUgYWxyZWFkeS5cbiAqXG4gKiBAbWV0aG9kIGFkZFxuICogQHBhcmFtIHtPYmplY3R9IGNoaWxkIHJlbmRlcmFibGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtSZW5kZXJOb2RlfSBuZXcgcmVuZGVyIG5vZGUgd3JhcHBpbmcgY2hpbGRcbiAqL1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKGNoaWxkKSB7XG4gICAgdmFyIGNoaWxkTm9kZSA9IChjaGlsZCBpbnN0YW5jZW9mIFJlbmRlck5vZGUpID8gY2hpbGQgOiBuZXcgUmVuZGVyTm9kZShjaGlsZCk7XG4gICAgaWYgKHRoaXMuX2NoaWxkIGluc3RhbmNlb2YgQXJyYXkpIHRoaXMuX2NoaWxkLnB1c2goY2hpbGROb2RlKTtcbiAgICBlbHNlIGlmICh0aGlzLl9jaGlsZCkge1xuICAgICAgICB0aGlzLl9jaGlsZCA9IFt0aGlzLl9jaGlsZCwgY2hpbGROb2RlXTtcbiAgICAgICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NoaWxkUmVzdWx0ID0gW107IC8vIHRvIGJlIHVzZWQgbGF0ZXJcbiAgICB9XG4gICAgZWxzZSB0aGlzLl9jaGlsZCA9IGNoaWxkTm9kZTtcblxuICAgIHJldHVybiBjaGlsZE5vZGU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgc2luZ2xlIHdyYXBwZWQgb2JqZWN0LiAgUmV0dXJucyBudWxsIGlmIHRoaXMgbm9kZSBoYXMgbXVsdGlwbGUgY2hpbGQgbm9kZXMuXG4gKlxuICogQG1ldGhvZCBnZXRcbiAqXG4gKiBAcmV0dXJuIHtPamJlY3R9IGNvbnRhaW5lZCByZW5kZXJhYmxlIG9iamVjdFxuICovXG5SZW5kZXJOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29iamVjdCB8fCAodGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA/IG51bGwgOiAodGhpcy5fY2hpbGQgPyB0aGlzLl9jaGlsZC5nZXQoKSA6IG51bGwpKTtcbn07XG5cbi8qKlxuICogT3ZlcndyaXRlIHRoZSBsaXN0IG9mIGNoaWxkcmVuIHRvIGNvbnRhaW4gdGhlIHNpbmdsZSBwcm92aWRlZCBvYmplY3RcbiAqXG4gKiBAbWV0aG9kIHNldFxuICogQHBhcmFtIHtPYmplY3R9IGNoaWxkIHJlbmRlcmFibGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtSZW5kZXJOb2RlfSB0aGlzIHJlbmRlciBub2RlLCBvciBjaGlsZCBpZiBpdCBpcyBhIFJlbmRlck5vZGVcbiAqL1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGNoaWxkKSB7XG4gICAgdGhpcy5fY2hpbGRSZXN1bHQgPSBudWxsO1xuICAgIHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9pc1JlbmRlcmFibGUgPSBjaGlsZC5yZW5kZXIgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5faXNNb2RpZmllciA9IGNoaWxkLm1vZGlmeSA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLl9vYmplY3QgPSBjaGlsZDtcbiAgICB0aGlzLl9jaGlsZCA9IG51bGw7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgUmVuZGVyTm9kZSkgcmV0dXJuIGNoaWxkO1xuICAgIGVsc2UgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCByZW5kZXIgc2l6ZSBvZiBjb250YWluZWQgb2JqZWN0LlxuICpcbiAqIEBtZXRob2QgZ2V0U2l6ZVxuICogQHJldHVybiB7QXJyYXkuTnVtYmVyfSBzaXplIG9mIHRoaXMgb3Igc2l6ZSBvZiBzaW5nbGUgY2hpbGQuXG4gKi9cblJlbmRlck5vZGUucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldCgpO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmdldFNpemUpIHJlc3VsdCA9IHRhcmdldC5nZXRTaXplKCk7XG4gICAgaWYgKCFyZXN1bHQgJiYgdGhpcy5fY2hpbGQgJiYgdGhpcy5fY2hpbGQuZ2V0U2l6ZSkgcmVzdWx0ID0gdGhpcy5fY2hpbGQuZ2V0U2l6ZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyBhcHBseSByZXN1bHRzIG9mIHJlbmRlcmluZyB0aGlzIHN1YnRyZWUgdG8gdGhlIGRvY3VtZW50XG5mdW5jdGlvbiBfYXBwbHlDb21taXQoc3BlYywgY29udGV4dCwgY2FjaGVTdG9yYWdlKSB7XG4gICAgdmFyIHJlc3VsdCA9IFNwZWNQYXJzZXIucGFyc2Uoc3BlYywgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZXN1bHQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gRW50aXR5LmdldChpZCk7XG4gICAgICAgIHZhciBjb21taXRQYXJhbXMgPSByZXN1bHRbaWRdO1xuICAgICAgICBjb21taXRQYXJhbXMuYWxsb2NhdG9yID0gY29udGV4dC5hbGxvY2F0b3I7XG4gICAgICAgIHZhciBjb21taXRSZXN1bHQgPSBjaGlsZE5vZGUuY29tbWl0KGNvbW1pdFBhcmFtcyk7XG4gICAgICAgIGlmIChjb21taXRSZXN1bHQpIF9hcHBseUNvbW1pdChjb21taXRSZXN1bHQsIGNvbnRleHQsIGNhY2hlU3RvcmFnZSk7XG4gICAgICAgIGVsc2UgY2FjaGVTdG9yYWdlW2lkXSA9IGNvbW1pdFBhcmFtcztcbiAgICB9XG59XG5cbi8qKlxuICogQ29tbWl0IHRoZSBjb250ZW50IGNoYW5nZSBmcm9tIHRoaXMgbm9kZSB0byB0aGUgZG9jdW1lbnQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgY29tbWl0XG4gKiBAcGFyYW0ge0NvbnRleHR9IGNvbnRleHQgcmVuZGVyIGNvbnRleHRcbiAqL1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICAvLyBmcmVlIHVwIHNvbWUgZGl2cyBmcm9tIHRoZSBsYXN0IGxvb3BcbiAgICB2YXIgcHJldktleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9wcmV2UmVzdWx0cyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmV2S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBwcmV2S2V5c1tpXTtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc3VsdENhY2hlW2lkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gRW50aXR5LmdldChpZCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmNsZWFudXApIG9iamVjdC5jbGVhbnVwKGNvbnRleHQuYWxsb2NhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3ByZXZSZXN1bHRzID0gdGhpcy5fcmVzdWx0Q2FjaGU7XG4gICAgdGhpcy5fcmVzdWx0Q2FjaGUgPSB7fTtcbiAgICBfYXBwbHlDb21taXQodGhpcy5yZW5kZXIoKSwgY29udGV4dCwgdGhpcy5fcmVzdWx0Q2FjaGUpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHJlbmRlciBzcGVjIGZyb20gdGhlIGNvbnRlbnRzIG9mIHRoZSB3cmFwcGVkIGNvbXBvbmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1ldGhvZCByZW5kZXJcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlbmRlciBzcGVjaWZpY2F0aW9uIGZvciB0aGUgY29tcG9uZW50IHN1YnRyZWVcbiAqICAgIG9ubHkgdW5kZXIgdGhpcyBub2RlLlxuICovXG5SZW5kZXJOb2RlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVuZGVyYWJsZSkgcmV0dXJuIHRoaXMuX29iamVjdC5yZW5kZXIoKTtcblxuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGlmICh0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkUmVzdWx0O1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gY2hpbGRyZW5baV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5fY2hpbGQpIHJlc3VsdCA9IHRoaXMuX2NoaWxkLnJlbmRlcigpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2lzTW9kaWZpZXIgPyB0aGlzLl9vYmplY3QubW9kaWZ5KHJlc3VsdCkgOiByZXN1bHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlck5vZGU7IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBPd25lcjogbWFya0BmYW1vLnVzXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcbiAqL1xuXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcblxuLyoqXG4gKlxuICogVGhpcyBvYmplY3QgdHJhbnNsYXRlcyB0aGUgcmVuZGVyaW5nIGluc3RydWN0aW9ucyAoXCJyZW5kZXIgc3BlY3NcIilcbiAqICAgdGhhdCByZW5kZXJhYmxlIGNvbXBvbmVudHMgZ2VuZXJhdGUgaW50byBkb2N1bWVudCB1cGRhdGVcbiAqICAgaW5zdHJ1Y3Rpb25zIChcInVwZGF0ZSBzcGVjc1wiKS4gIFByaXZhdGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjbGFzcyBTcGVjUGFyc2VyXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU3BlY1BhcnNlcigpIHtcbiAgICB0aGlzLnJlc3VsdCA9IHt9O1xufVxuU3BlY1BhcnNlci5faW5zdGFuY2UgPSBuZXcgU3BlY1BhcnNlcigpO1xuXG4vKipcbiAqIENvbnZlcnQgYSByZW5kZXIgc3BlYyBjb21pbmcgZnJvbSB0aGUgY29udGV4dCdzIHJlbmRlciBjaGFpbiB0byBhblxuICogICAgdXBkYXRlIHNwZWMgZm9yIHRoZSB1cGRhdGUgY2hhaW4uIFRoaXMgaXMgdGhlIG9ubHkgbWFqb3IgZW50cnkgcG9pbnRcbiAqICAgIGZvciBhIGNvbnN1bWVyIG9mIHRoaXMgY2xhc3MuXG4gKlxuICogQG1ldGhvZCBwYXJzZVxuICogQHN0YXRpY1xuICogQHByaXZhdGVcbiAqXG4gKiBAcGFyYW0ge3JlbmRlclNwZWN9IHNwZWMgaW5wdXQgcmVuZGVyIHNwZWNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IGNvbnRleHQgdG8gZG8gdGhlIHBhcnNlIGluXG4gKiBAcmV0dXJuIHtPYmplY3R9IHRoZSByZXN1bHRpbmcgdXBkYXRlIHNwZWMgKGlmIG5vIGNhbGxiYWNrXG4gKiAgIHNwZWNpZmllZCwgZWxzZSBub25lKVxuICovXG5TcGVjUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24gcGFyc2Uoc3BlYywgY29udGV4dCkge1xuICAgIHJldHVybiBTcGVjUGFyc2VyLl9pbnN0YW5jZS5wYXJzZShzcGVjLCBjb250ZXh0KTtcbn07XG5cbi8qKlxuICogQ29udmVydCBhIHJlbmRlclNwZWMgY29taW5nIGZyb20gdGhlIGNvbnRleHQncyByZW5kZXIgY2hhaW4gdG8gYW4gdXBkYXRlXG4gKiAgICBzcGVjIGZvciB0aGUgdXBkYXRlIGNoYWluLiBUaGlzIGlzIHRoZSBvbmx5IG1ham9yIGVudHJ5cG9pbnQgZm9yIGFcbiAqICAgIGNvbnN1bWVyIG9mIHRoaXMgY2xhc3MuXG4gKlxuICogQG1ldGhvZCBwYXJzZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3JlbmRlclNwZWN9IHNwZWMgaW5wdXQgcmVuZGVyIHNwZWNcbiAqIEBwYXJhbSB7Q29udGV4dH0gY29udGV4dFxuICogQHJldHVybiB7dXBkYXRlU3BlY30gdGhlIHJlc3VsdGluZyB1cGRhdGUgc3BlY1xuICovXG5TcGVjUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHNwZWMsIGNvbnRleHQpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5fcGFyc2VTcGVjKHNwZWMsIGNvbnRleHQsIFRyYW5zZm9ybS5pZGVudGl0eSk7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0O1xufTtcblxuLyoqXG4gKiBQcmVwYXJlIFNwZWNQYXJzZXIgZm9yIHJlLXVzZSAob3IgZmlyc3QgdXNlKSBieSBzZXR0aW5nIGludGVybmFsIHN0YXRlXG4gKiAgdG8gYmxhbmsuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgcmVzZXRcbiAqL1xuU3BlY1BhcnNlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICB0aGlzLnJlc3VsdCA9IHt9O1xufTtcblxuLy8gTXVsdGlwbHkgbWF0cml4IE0gYnkgdmVjdG9yIHZcbmZ1bmN0aW9uIF92ZWNJbkNvbnRleHQodiwgbSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XSxcbiAgICAgICAgdlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldLFxuICAgICAgICB2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdXG4gICAgXTtcbn1cblxudmFyIF9vcmlnaW5aZXJvWmVybyA9IFswLCAwXTtcblxuLy8gRnJvbSB0aGUgcHJvdmlkZWQgcmVuZGVyU3BlYyB0cmVlLCByZWN1cnNpdmVseSBjb21wb3NlIG9wYWNpdGllcyxcbi8vICAgIG9yaWdpbnMsIHRyYW5zZm9ybXMsIGFuZCBzaXplcyBjb3JyZXNwb25kaW5nIHRvIGVhY2ggc3VyZmFjZSBpZCBmcm9tXG4vLyAgICB0aGUgcHJvdmlkZWQgcmVuZGVyU3BlYyB0cmVlIHN0cnVjdHVyZS4gT24gY29tcGxldGlvbiwgdGhvc2Vcbi8vICAgIHByb3BlcnRpZXMgb2YgJ3RoaXMnIG9iamVjdCBzaG91bGQgYmUgcmVhZHkgdG8gdXNlIHRvIGJ1aWxkIGFuXG4vLyAgICB1cGRhdGVTcGVjLlxuU3BlY1BhcnNlci5wcm90b3R5cGUuX3BhcnNlU3BlYyA9IGZ1bmN0aW9uIF9wYXJzZVNwZWMoc3BlYywgcGFyZW50Q29udGV4dCwgc2l6ZUNvbnRleHQpIHtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIHRhcmdldDtcbiAgICB2YXIgdHJhbnNmb3JtO1xuICAgIHZhciBvcGFjaXR5O1xuICAgIHZhciBvcmlnaW47XG4gICAgdmFyIGFsaWduO1xuICAgIHZhciBzaXplO1xuXG4gICAgaWYgKHR5cGVvZiBzcGVjID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZCA9IHNwZWM7XG4gICAgICAgIHRyYW5zZm9ybSA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICBhbGlnbiA9IHBhcmVudENvbnRleHQuYWxpZ24gfHwgcGFyZW50Q29udGV4dC5vcmlnaW47XG4gICAgICAgIGlmIChwYXJlbnRDb250ZXh0LnNpemUgJiYgYWxpZ24gJiYgKGFsaWduWzBdIHx8IGFsaWduWzFdKSkge1xuICAgICAgICAgICAgdmFyIGFsaWduQWRqdXN0ID0gW2FsaWduWzBdICogcGFyZW50Q29udGV4dC5zaXplWzBdLCBhbGlnblsxXSAqIHBhcmVudENvbnRleHQuc2l6ZVsxXSwgMF07XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0udGhlbk1vdmUodHJhbnNmb3JtLCBfdmVjSW5Db250ZXh0KGFsaWduQWRqdXN0LCBzaXplQ29udGV4dCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzdWx0W2lkXSA9IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICAgICAgb3BhY2l0eTogcGFyZW50Q29udGV4dC5vcGFjaXR5LFxuICAgICAgICAgICAgb3JpZ2luOiBwYXJlbnRDb250ZXh0Lm9yaWdpbiB8fCBfb3JpZ2luWmVyb1plcm8sXG4gICAgICAgICAgICBhbGlnbjogcGFyZW50Q29udGV4dC5hbGlnbiB8fCBwYXJlbnRDb250ZXh0Lm9yaWdpbiB8fCBfb3JpZ2luWmVyb1plcm8sXG4gICAgICAgICAgICBzaXplOiBwYXJlbnRDb250ZXh0LnNpemVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIXNwZWMpIHsgLy8gcGxhY2VkIGhlcmUgc28gMCB3aWxsIGJlIGNhY2hlZCBlYXJsaWVyXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3BlYyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlYy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcGFyc2VTcGVjKHNwZWNbaV0sIHBhcmVudENvbnRleHQsIHNpemVDb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gc3BlYy50YXJnZXQ7XG4gICAgICAgIHRyYW5zZm9ybSA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICBvcGFjaXR5ID0gcGFyZW50Q29udGV4dC5vcGFjaXR5O1xuICAgICAgICBvcmlnaW4gPSBwYXJlbnRDb250ZXh0Lm9yaWdpbjtcbiAgICAgICAgYWxpZ24gPSBwYXJlbnRDb250ZXh0LmFsaWduO1xuICAgICAgICBzaXplID0gcGFyZW50Q29udGV4dC5zaXplO1xuICAgICAgICB2YXIgbmV4dFNpemVDb250ZXh0ID0gc2l6ZUNvbnRleHQ7XG5cbiAgICAgICAgaWYgKHNwZWMub3BhY2l0eSAhPT0gdW5kZWZpbmVkKSBvcGFjaXR5ID0gcGFyZW50Q29udGV4dC5vcGFjaXR5ICogc3BlYy5vcGFjaXR5O1xuICAgICAgICBpZiAoc3BlYy50cmFuc2Zvcm0pIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tdWx0aXBseShwYXJlbnRDb250ZXh0LnRyYW5zZm9ybSwgc3BlYy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAoc3BlYy5vcmlnaW4pIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IHNwZWMub3JpZ2luO1xuICAgICAgICAgICAgbmV4dFNpemVDb250ZXh0ID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwZWMuYWxpZ24pIGFsaWduID0gc3BlYy5hbGlnbjtcbiAgICAgICAgaWYgKHNwZWMuc2l6ZSkge1xuICAgICAgICAgICAgdmFyIHBhcmVudFNpemUgPSBwYXJlbnRDb250ZXh0LnNpemU7XG4gICAgICAgICAgICBzaXplID0gW1xuICAgICAgICAgICAgICAgIHNwZWMuc2l6ZVswXSAhPT0gdW5kZWZpbmVkID8gc3BlYy5zaXplWzBdIDogcGFyZW50U2l6ZVswXSxcbiAgICAgICAgICAgICAgICBzcGVjLnNpemVbMV0gIT09IHVuZGVmaW5lZCA/IHNwZWMuc2l6ZVsxXSA6IHBhcmVudFNpemVbMV1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAocGFyZW50U2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmICghYWxpZ24pIGFsaWduID0gb3JpZ2luO1xuICAgICAgICAgICAgICAgIGlmIChhbGlnbiAmJiAoYWxpZ25bMF0gfHwgYWxpZ25bMV0pKSB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0udGhlbk1vdmUodHJhbnNmb3JtLCBfdmVjSW5Db250ZXh0KFthbGlnblswXSAqIHBhcmVudFNpemVbMF0sIGFsaWduWzFdICogcGFyZW50U2l6ZVsxXSwgMF0sIHNpemVDb250ZXh0KSk7XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbiAmJiAob3JpZ2luWzBdIHx8IG9yaWdpblsxXSkpIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tb3ZlVGhlbihbLW9yaWdpblswXSAqIHNpemVbMF0sIC1vcmlnaW5bMV0gKiBzaXplWzFdLCAwXSwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHRTaXplQ29udGV4dCA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICAgICAgb3JpZ2luID0gbnVsbDtcbiAgICAgICAgICAgIGFsaWduID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BhcnNlU3BlYyh0YXJnZXQsIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICAgICAgYWxpZ246IGFsaWduLFxuICAgICAgICAgICAgc2l6ZTogc2l6ZVxuICAgICAgICB9LCBuZXh0U2l6ZUNvbnRleHQpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3BlY1BhcnNlcjsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cbnZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcblxudmFyIGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xudmFyIHVzZVByZWZpeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlLndlYmtpdFRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgYmFzZSBjbGFzcyBmb3Igdmlld2FibGUgY29udGVudCBhbmQgZXZlbnRcbiAqICAgdGFyZ2V0cyBpbnNpZGUgYSBGYW1vLnVzIGFwcGxpY2F0aW9uLCBjb250YWluaW5nIGEgcmVuZGVyYWJsZSBkb2N1bWVudFxuICogICBmcmFnbWVudC4gTGlrZSBhbiBIVE1MIGRpdiwgaXQgY2FuIGFjY2VwdCBpbnRlcm5hbCBtYXJrdXAsXG4gKiAgIHByb3BlcnRpZXMsIGNsYXNzZXMsIGFuZCBoYW5kbGUgZXZlbnRzLlxuICpcbiAqIEBjbGFzcyBTdXJmYWNlXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIGRlZmF1bHQgb3B0aW9uIG92ZXJyaWRlc1xuICogQHBhcmFtIHtBcnJheS5OdW1iZXJ9IFtvcHRpb25zLnNpemVdIFt3aWR0aCwgaGVpZ2h0XSBpbiBwaXhlbHNcbiAqIEBwYXJhbSB7QXJyYXkuc3RyaW5nfSBbb3B0aW9ucy5jbGFzc2VzXSBDU1MgY2xhc3NlcyB0byBzZXQgb24gaW5uZXIgY29udGVudFxuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMucHJvcGVydGllc10gc3RyaW5nIGRpY3Rpb25hcnkgb2YgSFRNTCBhdHRyaWJ1dGVzIHRvIHNldCBvbiB0YXJnZXQgZGl2XG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY29udGVudF0gaW5uZXIgKEhUTUwpIGNvbnRlbnQgb2Ygc3VyZmFjZVxuICovXG5mdW5jdGlvbiBTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xuICAgIHRoaXMuY29udGVudCA9ICcnO1xuICAgIHRoaXMuY2xhc3NMaXN0ID0gW107XG4gICAgdGhpcy5zaXplID0gbnVsbDtcblxuICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcblxuICAgIHRoaXMuX2RpcnR5Q2xhc3NlcyA9IFtdO1xuXG4gICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcbiAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB0aGlzLl9vcmlnaW4gPSBudWxsO1xuICAgIHRoaXMuX3NpemUgPSBudWxsO1xuXG4gICAgLyoqIEBpZ25vcmUgKi9cbiAgICB0aGlzLmV2ZW50Rm9yd2FyZGVyID0gZnVuY3Rpb24gZXZlbnRGb3J3YXJkZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICB9LmJpbmQodGhpcyk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYmluZFRoaXModGhpcyk7XG5cbiAgICB0aGlzLmlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuXG4gICAgaWYgKG9wdGlvbnMpIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblxuICAgIHRoaXMuX2N1cnJUYXJnZXQgPSBudWxsO1xufVxuU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAnZGl2JztcblN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtc3VyZmFjZSc7XG5cbi8qKlxuICogQmluZCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFuIGV2ZW50IHR5cGUgaGFuZGxlZCBieSB0aGlzIG9iamVjdC5cbiAqXG4gKiBAbWV0aG9kIFwib25cIlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIGV2ZW50IHR5cGUga2V5IChmb3IgZXhhbXBsZSwgJ2NsaWNrJylcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nLCBPYmplY3QpfSBmbiBoYW5kbGVyIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtFdmVudEhhbmRsZXJ9IHRoaXNcbiAqL1xuU3VyZmFjZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBmbikge1xuICAgIGlmICh0aGlzLl9jdXJyVGFyZ2V0KSB0aGlzLl9jdXJyVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIub24odHlwZSwgZm4pO1xufTtcblxuLyoqXG4gKiBVbmJpbmQgYW4gZXZlbnQgYnkgdHlwZSBhbmQgaGFuZGxlci5cbiAqICAgVGhpcyB1bmRvZXMgdGhlIHdvcmsgb2YgXCJvblwiXG4gKlxuICogQG1ldGhvZCByZW1vdmVMaXN0ZW5lclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgZXZlbnQgdHlwZSBrZXkgKGZvciBleGFtcGxlLCAnY2xpY2snKVxuICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcsIE9iamVjdCl9IGZuIGhhbmRsZXJcbiAqL1xuU3VyZmFjZS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBmbikge1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGZuKTtcbn07XG5cbi8qKlxuICogVHJpZ2dlciBhbiBldmVudCwgc2VuZGluZyB0byBhbGwgZG93bnN0cmVhbSBoYW5kbGVyc1xuICogICBsaXN0ZW5pbmcgZm9yIHByb3ZpZGVkICd0eXBlJyBrZXkuXG4gKlxuICogQG1ldGhvZCBlbWl0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgZXZlbnQgdHlwZSBrZXkgKGZvciBleGFtcGxlLCAnY2xpY2snKVxuICogQHBhcmFtIHtPYmplY3R9IFtldmVudF0gZXZlbnQgZGF0YVxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSB0aGlzXG4gKi9cblN1cmZhY2UucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICYmICFldmVudC5vcmlnaW4pIGV2ZW50Lm9yaWdpbiA9IHRoaXM7XG4gICAgdmFyIGhhbmRsZWQgPSB0aGlzLmV2ZW50SGFuZGxlci5lbWl0KHR5cGUsIGV2ZW50KTtcbiAgICBpZiAoaGFuZGxlZCAmJiBldmVudCAmJiBldmVudC5zdG9wUHJvcGFnYXRpb24pIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHJldHVybiBoYW5kbGVkO1xufTtcblxuLyoqXG4gKiBBZGQgZXZlbnQgaGFuZGxlciBvYmplY3QgdG8gc2V0IG9mIGRvd25zdHJlYW0gaGFuZGxlcnMuXG4gKlxuICogQG1ldGhvZCBwaXBlXG4gKlxuICogQHBhcmFtIHtFdmVudEhhbmRsZXJ9IHRhcmdldCBldmVudCBoYW5kbGVyIHRhcmdldCBvYmplY3RcbiAqIEByZXR1cm4ge0V2ZW50SGFuZGxlcn0gcGFzc2VkIGV2ZW50IGhhbmRsZXJcbiAqL1xuU3VyZmFjZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnBpcGUodGFyZ2V0KTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhhbmRsZXIgb2JqZWN0IGZyb20gc2V0IG9mIGRvd25zdHJlYW0gaGFuZGxlcnMuXG4gKiAgIFVuZG9lcyB3b3JrIG9mIFwicGlwZVwiXG4gKlxuICogQG1ldGhvZCB1bnBpcGVcbiAqXG4gKiBAcGFyYW0ge0V2ZW50SGFuZGxlcn0gdGFyZ2V0IHRhcmdldCBoYW5kbGVyIG9iamVjdFxuICogQHJldHVybiB7RXZlbnRIYW5kbGVyfSBwcm92aWRlZCB0YXJnZXRcbiAqL1xuU3VyZmFjZS5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci51bnBpcGUodGFyZ2V0KTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHNwZWMgZm9yIHRoaXMgc3VyZmFjZS4gTm90ZSB0aGF0IGZvciBhIGJhc2Ugc3VyZmFjZSwgdGhpcyBpc1xuICogICAgc2ltcGx5IGFuIGlkLlxuICpcbiAqIEBtZXRob2QgcmVuZGVyXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybiB7T2JqZWN0fSByZW5kZXIgc3BlYyBmb3IgdGhpcyBzdXJmYWNlIChzcGVjIGlkKVxuICovXG5TdXJmYWNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG59O1xuXG4vKipcbiAqIFNldCBDU1Mtc3R5bGUgcHJvcGVydGllcyBvbiB0aGlzIFN1cmZhY2UuIE5vdGUgdGhhdCB0aGlzIHdpbGwgY2F1c2VcbiAqICAgIGRpcnR5aW5nIGFuZCB0aHVzIHJlLXJlbmRlcmluZywgZXZlbiBpZiB2YWx1ZXMgZG8gbm90IGNoYW5nZS5cbiAqXG4gKiBAbWV0aG9kIHNldFByb3BlcnRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIHByb3BlcnR5IGRpY3Rpb25hcnkgb2YgXCJrZXlcIiA9PiBcInZhbHVlXCJcbiAqL1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIHNldFByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGZvciAodmFyIG4gaW4gcHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbbl0gPSBwcm9wZXJ0aWVzW25dO1xuICAgIH1cbiAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IHRydWU7XG59O1xuXG4vKipcbiAqIEdldCBDU1Mtc3R5bGUgcHJvcGVydGllcyBvbiB0aGlzIFN1cmZhY2UuXG4gKlxuICogQG1ldGhvZCBnZXRQcm9wZXJ0aWVzXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBEaWN0aW9uYXJ5IG9mIHRoaXMgU3VyZmFjZSdzIHByb3BlcnRpZXMuXG4gKi9cblN1cmZhY2UucHJvdG90eXBlLmdldFByb3BlcnRpZXMgPSBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG59O1xuXG4vKipcbiAqIEFkZCBDU1Mtc3R5bGUgY2xhc3MgdG8gdGhlIGxpc3Qgb2YgY2xhc3NlcyBvbiB0aGlzIFN1cmZhY2UuIE5vdGVcbiAqICAgdGhpcyB3aWxsIG1hcCBkaXJlY3RseSB0byB0aGUgSFRNTCBwcm9wZXJ0eSBvZiB0aGUgYWN0dWFsXG4gKiAgIGNvcnJlc3BvbmRpbmcgcmVuZGVyZWQgPGRpdj4uXG4gKlxuICogQG1ldGhvZCBhZGRDbGFzc1xuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSBuYW1lIG9mIGNsYXNzIHRvIGFkZFxuICovXG5TdXJmYWNlLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSkgPCAwKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSBDU1Mtc3R5bGUgY2xhc3MgZnJvbSB0aGUgbGlzdCBvZiBjbGFzc2VzIG9uIHRoaXMgU3VyZmFjZS5cbiAqICAgTm90ZSB0aGlzIHdpbGwgbWFwIGRpcmVjdGx5IHRvIHRoZSBIVE1MIHByb3BlcnR5IG9mIHRoZSBhY3R1YWxcbiAqICAgY29ycmVzcG9uZGluZyByZW5kZXJlZCA8ZGl2Pi5cbiAqXG4gKiBAbWV0aG9kIHJlbW92ZUNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIG5hbWUgb2YgY2xhc3MgdG8gcmVtb3ZlXG4gKi9cblN1cmZhY2UucHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgICB0aGlzLl9kaXJ0eUNsYXNzZXMucHVzaCh0aGlzLmNsYXNzTGlzdC5zcGxpY2UoaSwgMSlbMF0pO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIH1cbn07XG5cbi8qKlxuICogUmVzZXQgY2xhc3MgbGlzdCB0byBwcm92aWRlZCBkaWN0aW9uYXJ5LlxuICogQG1ldGhvZCBzZXRDbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LnN0cmluZ30gY2xhc3NMaXN0XG4gKi9cblN1cmZhY2UucHJvdG90eXBlLnNldENsYXNzZXMgPSBmdW5jdGlvbiBzZXRDbGFzc2VzKGNsYXNzTGlzdCkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVtb3ZhbCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNsYXNzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2xhc3NMaXN0LmluZGV4T2YodGhpcy5jbGFzc0xpc3RbaV0pIDwgMCkgcmVtb3ZhbC5wdXNoKHRoaXMuY2xhc3NMaXN0W2ldKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHJlbW92YWwubGVuZ3RoOyBpKyspIHRoaXMucmVtb3ZlQ2xhc3MocmVtb3ZhbFtpXSk7XG4gICAgLy8gZHVwbGljYXRlcyBhcmUgYWxyZWFkeSBjaGVja2VkIGJ5IGFkZENsYXNzKClcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB0aGlzLmFkZENsYXNzKGNsYXNzTGlzdFtpXSk7XG59O1xuXG4vKipcbiAqIEdldCBhcnJheSBvZiBDU1Mtc3R5bGUgY2xhc3NlcyBhdHRhY2hlZCB0byB0aGlzIGRpdi5cbiAqXG4gKiBAbWV0aG9kIGdldENsYXNzbGlzdFxuICogQHJldHVybiB7QXJyYXkuc3RyaW5nfSBhcnJheSBvZiBjbGFzcyBuYW1lc1xuICovXG5TdXJmYWNlLnByb3RvdHlwZS5nZXRDbGFzc0xpc3QgPSBmdW5jdGlvbiBnZXRDbGFzc0xpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0O1xufTtcblxuLyoqXG4gKiBTZXQgb3Igb3ZlcndyaXRlIGlubmVyIChIVE1MKSBjb250ZW50IG9mIHRoaXMgc3VyZmFjZS4gTm90ZSB0aGF0IHRoaXNcbiAqICAgIGNhdXNlcyBhIHJlLXJlbmRlcmluZyBpZiB0aGUgY29udGVudCBoYXMgY2hhbmdlZC5cbiAqXG4gKiBAbWV0aG9kIHNldENvbnRlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfERvY3VtZW50IEZyYWdtZW50fSBjb250ZW50IEhUTUwgY29udGVudFxuICovXG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuY29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIH1cbn07XG5cbi8qKlxuICogUmV0dXJuIGlubmVyIChIVE1MKSBjb250ZW50IG9mIHRoaXMgc3VyZmFjZS5cbiAqXG4gKiBAbWV0aG9kIGdldENvbnRlbnRcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGlubmVyIChIVE1MKSBjb250ZW50XG4gKi9cblN1cmZhY2UucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG59O1xuXG4vKipcbiAqIFNldCBvcHRpb25zIGZvciB0aGlzIHN1cmZhY2VcbiAqXG4gKiBAbWV0aG9kIHNldE9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gb3ZlcnJpZGVzIGZvciBkZWZhdWx0IG9wdGlvbnMuICBTZWUgY29uc3RydWN0b3IuXG4gKi9cblN1cmZhY2UucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5zaXplKSB0aGlzLnNldFNpemUob3B0aW9ucy5zaXplKTtcbiAgICBpZiAob3B0aW9ucy5jbGFzc2VzKSB0aGlzLnNldENsYXNzZXMob3B0aW9ucy5jbGFzc2VzKTtcbiAgICBpZiAob3B0aW9ucy5wcm9wZXJ0aWVzKSB0aGlzLnNldFByb3BlcnRpZXMob3B0aW9ucy5wcm9wZXJ0aWVzKTtcbiAgICBpZiAob3B0aW9ucy5jb250ZW50KSB0aGlzLnNldENvbnRlbnQob3B0aW9ucy5jb250ZW50KTtcbn07XG5cbi8vICBBdHRhY2ggRmFtb3VzIGV2ZW50IGhhbmRsaW5nIHRvIGRvY3VtZW50IGV2ZW50cyBlbWFuYXRpbmcgZnJvbSB0YXJnZXRcbi8vICAgIGRvY3VtZW50IGVsZW1lbnQuICBUaGlzIG9jY3VycyBqdXN0IGFmdGVyIGRlcGxveW1lbnQgdG8gdGhlIGRvY3VtZW50LlxuLy8gICAgQ2FsbGluZyB0aGlzIGVuYWJsZXMgbWV0aG9kcyBsaWtlICNvbiBhbmQgI3BpcGUuXG5mdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoaSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgfVxufVxuXG4vLyAgRGV0YWNoIEZhbW91cyBldmVudCBoYW5kbGluZyBmcm9tIGRvY3VtZW50IGV2ZW50cyBlbWFuYXRpbmcgZnJvbSB0YXJnZXRcbi8vICBkb2N1bWVudCBlbGVtZW50LiAgVGhpcyBvY2N1cnMganVzdCBiZWZvcmUgcmVjYWxsIGZyb20gdGhlIGRvY3VtZW50LlxuZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5ldmVudEhhbmRsZXIubGlzdGVuZXJzKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGksIHRoaXMuZXZlbnRGb3J3YXJkZXIpO1xuICAgIH1cbn1cblxuIC8vICBBcHBseSB0byBkb2N1bWVudCBhbGwgY2hhbmdlcyBmcm9tIHJlbW92ZUNsYXNzKCkgc2luY2UgbGFzdCBzZXR1cCgpLlxuZnVuY3Rpb24gX2NsZWFudXBDbGFzc2VzKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGlydHlDbGFzc2VzLmxlbmd0aDsgaSsrKSB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9kaXJ0eUNsYXNzZXNbaV0pO1xuICAgIHRoaXMuX2RpcnR5Q2xhc3NlcyA9IFtdO1xufVxuXG4vLyBBcHBseSB2YWx1ZXMgb2YgYWxsIEZhbW91cy1tYW5hZ2VkIHN0eWxlcyB0byB0aGUgZG9jdW1lbnQgZWxlbWVudC5cbi8vICBUaGVzZSB3aWxsIGJlIGRlcGxveWVkIHRvIHRoZSBkb2N1bWVudCBvbiBjYWxsIHRvICNzZXR1cCgpLlxuZnVuY3Rpb24gX2FwcGx5U3R5bGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRhcmdldC5zdHlsZVtuXSA9IHRoaXMucHJvcGVydGllc1tuXTtcbiAgICB9XG59XG5cbi8vIENsZWFyIGFsbCBGYW1vdXMtbWFuYWdlZCBzdHlsZXMgZnJvbSB0aGUgZG9jdW1lbnQgZWxlbWVudC5cbi8vIFRoZXNlIHdpbGwgYmUgZGVwbG95ZWQgdG8gdGhlIGRvY3VtZW50IG9uIGNhbGwgdG8gI3NldHVwKCkuXG5mdW5jdGlvbiBfY2xlYW51cFN0eWxlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICB0YXJnZXQuc3R5bGVbbl0gPSAnJztcbiAgICB9XG59XG5cbi8qKlxuICogUmV0dXJuIGEgTWF0cml4J3Mgd2Via2l0IGNzcyByZXByZXNlbnRhdGlvbiB0byBiZSB1c2VkIHdpdGggdGhlXG4gKiAgICBDU1MzIC13ZWJraXQtdHJhbnNmb3JtIHN0eWxlLlxuICogICAgRXhhbXBsZTogLXdlYmtpdC10cmFuc2Zvcm06IG1hdHJpeDNkKDEsMCwwLDAsMCwxLDAsMCwwLDAsMSwwLDcxNiwyNDMsMCwxKVxuICpcbiAqIEBtZXRob2QgX2Zvcm1hdENTU1RyYW5zZm9ybVxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RmFtb3VzTWF0cml4fSBtIG1hdHJpeFxuICogQHJldHVybiB7c3RyaW5nfSBtYXRyaXgzZCBDU1Mgc3R5bGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyYW5zZm9ybVxuICovXG5mdW5jdGlvbiBfZm9ybWF0Q1NTVHJhbnNmb3JtKG0pIHtcbiAgICBtWzEyXSA9IE1hdGgucm91bmQobVsxMl0gKiBkZXZpY2VQaXhlbFJhdGlvKSAvIGRldmljZVBpeGVsUmF0aW87XG4gICAgbVsxM10gPSBNYXRoLnJvdW5kKG1bMTNdICogZGV2aWNlUGl4ZWxSYXRpbykgLyBkZXZpY2VQaXhlbFJhdGlvO1xuXG4gICAgdmFyIHJlc3VsdCA9ICdtYXRyaXgzZCgnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gKG1baV0gPCAwLjAwMDAwMSAmJiBtW2ldID4gLTAuMDAwMDAxKSA/ICcwLCcgOiBtW2ldICsgJywnO1xuICAgIH1cbiAgICByZXN1bHQgKz0gbVsxNV0gKyAnKSc7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEaXJlY3RseSBhcHBseSBnaXZlbiBGYW1vdXNNYXRyaXggdG8gdGhlIGRvY3VtZW50IGVsZW1lbnQgYXMgdGhlXG4gKiAgIGFwcHJvcHJpYXRlIHdlYmtpdCBDU1Mgc3R5bGUuXG4gKlxuICogQG1ldGhvZCBzZXRNYXRyaXhcbiAqXG4gKiBAc3RhdGljXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IGRvY3VtZW50IGVsZW1lbnRcbiAqIEBwYXJhbSB7RmFtb3VzTWF0cml4fSBtYXRyaXhcbiAqL1xuXG52YXIgX3NldE1hdHJpeDtcbmlmIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gLTEpIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24oZWxlbWVudCwgbWF0cml4KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuekluZGV4ID0gKG1hdHJpeFsxNF0gKiAxMDAwMDAwKSB8IDA7ICAgIC8vIGZpeCBmb3IgRmlyZWZveCB6LWJ1ZmZlciBpc3N1ZXNcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn1cbmVsc2UgaWYgKHVzZVByZWZpeCkge1xuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbihlbGVtZW50LCBtYXRyaXgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn1cbmVsc2Uge1xuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbihlbGVtZW50LCBtYXRyaXgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn1cblxuLy8gZm9ybWF0IG9yaWdpbiBhcyBDU1MgcGVyY2VudGFnZSBzdHJpbmdcbmZ1bmN0aW9uIF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKSB7XG4gICAgcmV0dXJuICgxMDAgKiBvcmlnaW5bMF0pICsgJyUgJyArICgxMDAgKiBvcmlnaW5bMV0pICsgJyUnO1xufVxuXG4gLy8gRGlyZWN0bHkgYXBwbHkgZ2l2ZW4gb3JpZ2luIGNvb3JkaW5hdGVzIHRvIHRoZSBkb2N1bWVudCBlbGVtZW50IGFzIHRoZVxuIC8vIGFwcHJvcHJpYXRlIHdlYmtpdCBDU1Mgc3R5bGUuXG52YXIgX3NldE9yaWdpbiA9IHVzZVByZWZpeCA/IGZ1bmN0aW9uKGVsZW1lbnQsIG9yaWdpbikge1xuICAgIGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gX2Zvcm1hdENTU09yaWdpbihvcmlnaW4pO1xufSA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9yaWdpbikge1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gX2Zvcm1hdENTU09yaWdpbihvcmlnaW4pO1xufTtcblxuIC8vIFNocmluayBnaXZlbiBkb2N1bWVudCBlbGVtZW50IHVudGlsIGl0IGlzIGVmZmVjdGl2ZWx5IGludmlzaWJsZS5cbnZhciBfc2V0SW52aXNpYmxlID0gdXNlUHJlZml4ID8gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlM2QoMC4wMDAxLDAuMDAwMSwxKSc7XG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbn0gOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgwLjAwMDEsMC4wMDAxLDEpJztcbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xufTtcblxuZnVuY3Rpb24gX3h5Tm90RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gKGEgJiYgYikgPyAoYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdKSA6IGEgIT09IGI7XG59XG5cbi8qKlxuICogT25lLXRpbWUgc2V0dXAgZm9yIGFuIGVsZW1lbnQgdG8gYmUgcmVhZHkgZm9yIGNvbW1pdHMgdG8gZG9jdW1lbnQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2Qgc2V0dXBcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnRBbGxvY2F0b3J9IGFsbG9jYXRvciBkb2N1bWVudCBlbGVtZW50IHBvb2wgZm9yIHRoaXMgY29udGV4dFxuICovXG5TdXJmYWNlLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uIHNldHVwKGFsbG9jYXRvcikge1xuICAgIHZhciB0YXJnZXQgPSBhbGxvY2F0b3IuYWxsb2NhdGUodGhpcy5lbGVtZW50VHlwZSk7XG4gICAgaWYgKHRoaXMuZWxlbWVudENsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudENsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5lbGVtZW50Q2xhc3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5lbGVtZW50Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICB0aGlzLl9jdXJyVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fb3JpZ2luID0gbnVsbDtcbiAgICB0aGlzLl9zaXplID0gbnVsbDtcbn07XG5cbi8qKlxuICogQXBwbHkgY2hhbmdlcyBmcm9tIHRoaXMgY29tcG9uZW50IHRvIHRoZSBjb3JyZXNwb25kaW5nIGRvY3VtZW50IGVsZW1lbnQuXG4gKiBUaGlzIGluY2x1ZGVzIGNoYW5nZXMgdG8gY2xhc3Nlcywgc3R5bGVzLCBzaXplLCBjb250ZW50LCBvcGFjaXR5LCBvcmlnaW4sXG4gKiBhbmQgbWF0cml4IHRyYW5zZm9ybXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgY29tbWl0XG4gKiBAcGFyYW0ge0NvbnRleHR9IGNvbnRleHQgY29tbWl0IGNvbnRleHRcbiAqL1xuU3VyZmFjZS5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICBpZiAoIXRoaXMuX2N1cnJUYXJnZXQpIHRoaXMuc2V0dXAoY29udGV4dC5hbGxvY2F0b3IpO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9jdXJyVGFyZ2V0O1xuXG4gICAgdmFyIG1hdHJpeCA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIHZhciBvcGFjaXR5ID0gY29udGV4dC5vcGFjaXR5O1xuICAgIHZhciBvcmlnaW4gPSBjb250ZXh0Lm9yaWdpbjtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcblxuICAgIGlmICh0aGlzLl9jbGFzc2VzRGlydHkpIHtcbiAgICAgICAgX2NsZWFudXBDbGFzc2VzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIGNsYXNzTGlzdCA9IHRoaXMuZ2V0Q2xhc3NMaXN0KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB0YXJnZXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3RbaV0pO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3R5bGVzRGlydHkpIHtcbiAgICAgICAgX2FwcGx5U3R5bGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fc3R5bGVzRGlydHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29udGVudERpcnR5KSB7XG4gICAgICAgIHRoaXMuZGVwbG95KHRhcmdldCk7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLmVtaXQoJ2RlcGxveScpO1xuICAgICAgICB0aGlzLl9jb250ZW50RGlydHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIHZhciBvcmlnU2l6ZSA9IHNpemU7XG4gICAgICAgIHNpemUgPSBbdGhpcy5zaXplWzBdLCB0aGlzLnNpemVbMV1dO1xuICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdW5kZWZpbmVkICYmIG9yaWdTaXplWzBdKSBzaXplWzBdID0gb3JpZ1NpemVbMF07XG4gICAgICAgIGlmIChzaXplWzFdID09PSB1bmRlZmluZWQgJiYgb3JpZ1NpemVbMV0pIHNpemVbMV0gPSBvcmlnU2l6ZVsxXTtcbiAgICB9XG5cbiAgICBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSkgc2l6ZVswXSA9IHRhcmdldC5jbGllbnRXaWR0aDtcbiAgICBpZiAoc2l6ZVsxXSA9PT0gdHJ1ZSkgc2l6ZVsxXSA9IHRhcmdldC5jbGllbnRIZWlnaHQ7XG5cbiAgICBpZiAoX3h5Tm90RXF1YWxzKHRoaXMuX3NpemUsIHNpemUpKSB7XG4gICAgICAgIGlmICghdGhpcy5fc2l6ZSkgdGhpcy5fc2l6ZSA9IFswLCAwXTtcbiAgICAgICAgdGhpcy5fc2l6ZVswXSA9IHNpemVbMF07XG4gICAgICAgIHRoaXMuX3NpemVbMV0gPSBzaXplWzFdO1xuICAgICAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghbWF0cml4ICYmIHRoaXMuX21hdHJpeCkge1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMDtcbiAgICAgICAgX3NldEludmlzaWJsZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX29wYWNpdHkgIT09IG9wYWNpdHkpIHtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgICAgIHRhcmdldC5zdHlsZS5vcGFjaXR5ID0gKG9wYWNpdHkgPj0gMSkgPyAnMC45OTk5OTknIDogb3BhY2l0eTtcbiAgICB9XG5cbiAgICBpZiAoX3h5Tm90RXF1YWxzKHRoaXMuX29yaWdpbiwgb3JpZ2luKSB8fCBUcmFuc2Zvcm0ubm90RXF1YWxzKHRoaXMuX21hdHJpeCwgbWF0cml4KSB8fCB0aGlzLl9zaXplRGlydHkpIHtcbiAgICAgICAgaWYgKCFtYXRyaXgpIG1hdHJpeCA9IFRyYW5zZm9ybS5pZGVudGl0eTtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gbWF0cml4O1xuICAgICAgICB2YXIgYWFNYXRyaXggPSBtYXRyaXg7XG4gICAgICAgIGlmIChvcmlnaW4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fb3JpZ2luKSB0aGlzLl9vcmlnaW4gPSBbMCwgMF07XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5bMF0gPSBvcmlnaW5bMF07XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5bMV0gPSBvcmlnaW5bMV07XG4gICAgICAgICAgICBhYU1hdHJpeCA9IFRyYW5zZm9ybS50aGVuTW92ZShtYXRyaXgsIFstdGhpcy5fc2l6ZVswXSAqIG9yaWdpblswXSwgLXRoaXMuX3NpemVbMV0gKiBvcmlnaW5bMV0sIDBdKTtcbiAgICAgICAgICAgIF9zZXRPcmlnaW4odGFyZ2V0LCBvcmlnaW4pO1xuICAgICAgICB9XG4gICAgICAgIF9zZXRNYXRyaXgodGFyZ2V0LCBhYU1hdHJpeCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NpemVEaXJ0eSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gKHRoaXMuc2l6ZSAmJiB0aGlzLnNpemVbMF0gPT09IHRydWUpID8gJycgOiB0aGlzLl9zaXplWzBdICsgJ3B4JztcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAodGhpcy5zaXplICYmIHRoaXMuc2l6ZVsxXSA9PT0gdHJ1ZSkgPyAgJycgOiB0aGlzLl9zaXplWzFdICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaXplRGlydHkgPSBmYWxzZTtcbiAgICB9XG59O1xuXG4vKipcbiAqICBSZW1vdmUgYWxsIEZhbW91cy1yZWxldmFudCBhdHRyaWJ1dGVzIGZyb20gYSBkb2N1bWVudCBlbGVtZW50LlxuICogICAgVGhpcyBpcyBjYWxsZWQgYnkgU3VyZmFjZU1hbmFnZXIncyBkZXRhY2goKS5cbiAqICAgIFRoaXMgaXMgaW4gc29tZSBzZW5zZSB0aGUgcmV2ZXJzZSBvZiAuZGVwbG95KCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgY2xlYW51cFxuICogQHBhcmFtIHtFbGVtZW50QWxsb2NhdG9yfSBhbGxvY2F0b3JcbiAqL1xuU3VyZmFjZS5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIGNsZWFudXAoYWxsb2NhdG9yKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9jdXJyVGFyZ2V0O1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLmVtaXQoJ3JlY2FsbCcpO1xuICAgIHRoaXMucmVjYWxsKHRhcmdldCk7XG4gICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gJyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIHRoaXMuX3NpemUgPSBudWxsO1xuICAgIF9jbGVhbnVwU3R5bGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICB2YXIgY2xhc3NMaXN0ID0gdGhpcy5nZXRDbGFzc0xpc3QoKTtcbiAgICBfY2xlYW51cENsYXNzZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTGlzdFtpXSk7XG4gICAgaWYgKHRoaXMuZWxlbWVudENsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50Q2xhc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVsZW1lbnRDbGFzc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVsZW1lbnRDbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3JlbW92ZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICB0aGlzLl9jdXJyVGFyZ2V0ID0gbnVsbDtcbiAgICBhbGxvY2F0b3IuZGVhbGxvY2F0ZSh0YXJnZXQpO1xuICAgIF9zZXRJbnZpc2libGUodGFyZ2V0KTtcbn07XG5cbi8qKlxuICogUGxhY2UgdGhlIGRvY3VtZW50IGVsZW1lbnQgdGhhdCB0aGlzIGNvbXBvbmVudCBtYW5hZ2VzIGludG8gdGhlIGRvY3VtZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWV0aG9kIGRlcGxveVxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXQgZG9jdW1lbnQgcGFyZW50IG9mIHRoaXMgY29udGFpbmVyXG4gKi9cblN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpO1xuICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICB3aGlsZSAodGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSkgdGFyZ2V0LnJlbW92ZUNoaWxkKHRhcmdldC5maXJzdENoaWxkKTtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH1cbiAgICBlbHNlIHRhcmdldC5pbm5lckhUTUwgPSBjb250ZW50O1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW55IGNvbnRhaW5lZCBkb2N1bWVudCBjb250ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGlzIHN1cmZhY2VcbiAqICAgZnJvbSB0aGUgYWN0dWFsIGRvY3VtZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWV0aG9kIHJlY2FsbFxuICovXG5TdXJmYWNlLnByb3RvdHlwZS5yZWNhbGwgPSBmdW5jdGlvbiByZWNhbGwodGFyZ2V0KSB7XG4gICAgdmFyIGRmID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlICh0YXJnZXQuaGFzQ2hpbGROb2RlcygpKSBkZi5hcHBlbmRDaGlsZCh0YXJnZXQuZmlyc3RDaGlsZCk7XG4gICAgdGhpcy5zZXRDb250ZW50KGRmKTtcbn07XG5cbi8qKlxuICogIEdldCB0aGUgeCBhbmQgeSBkaW1lbnNpb25zIG9mIHRoZSBzdXJmYWNlLlxuICpcbiAqIEBtZXRob2QgZ2V0U2l6ZVxuICogQHBhcmFtIHtib29sZWFufSBhY3R1YWwgcmV0dXJuIGNvbXB1dGVkIHNpemUgcmF0aGVyIHRoYW4gcHJvdmlkZWRcbiAqIEByZXR1cm4ge0FycmF5Lk51bWJlcn0gW3gseV0gc2l6ZSBvZiBzdXJmYWNlXG4gKi9cblN1cmZhY2UucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKGFjdHVhbCkge1xuICAgIHJldHVybiBhY3R1YWwgPyB0aGlzLl9zaXplIDogKHRoaXMuc2l6ZSB8fCB0aGlzLl9zaXplKTtcbn07XG5cbi8qKlxuICogU2V0IHggYW5kIHkgZGltZW5zaW9ucyBvZiB0aGUgc3VyZmFjZS5cbiAqXG4gKiBAbWV0aG9kIHNldFNpemVcbiAqIEBwYXJhbSB7QXJyYXkuTnVtYmVyfSBzaXplIGFzIFt3aWR0aCwgaGVpZ2h0XVxuICovXG5TdXJmYWNlLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZSA/IFtzaXplWzBdLCBzaXplWzFdXSA6IG51bGw7XG4gICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3VyZmFjZTsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cblxuXG5cbi8qKlxuICogIEEgaGlnaC1wZXJmb3JtYW5jZSBzdGF0aWMgbWF0cml4IG1hdGggbGlicmFyeSB1c2VkIHRvIGNhbGN1bGF0ZVxuICogICAgYWZmaW5lIHRyYW5zZm9ybXMgb24gc3VyZmFjZXMgYW5kIG90aGVyIHJlbmRlcmFibGVzLlxuICogICAgRmFtby51cyB1c2VzIDR4NCBtYXRyaWNlcyBjb3JyZXNwb25kaW5nIGRpcmVjdGx5IHRvXG4gKiAgICBXZWJLaXQgbWF0cmljZXMgKGNvbHVtbi1tYWpvciBvcmRlcikuXG4gKlxuICogICAgVGhlIGludGVybmFsIFwidHlwZVwiIG9mIGEgTWF0cml4IGlzIGEgMTYtbG9uZyBmbG9hdCBhcnJheSBpblxuICogICAgcm93LW1ham9yIG9yZGVyLCB3aXRoOlxuICogICAgZWxlbWVudHMgWzBdLFsxXSxbMl0sWzRdLFs1XSxbNl0sWzhdLFs5XSxbMTBdIGZvcm1pbmcgdGhlIDN4M1xuICogICAgICAgICAgdHJhbnNmb3JtYXRpb24gbWF0cml4O1xuICogICAgZWxlbWVudHMgWzEyXSwgWzEzXSwgWzE0XSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0X3gsIHRfeSwgdF96XG4gKiAgICAgICAgICAgdHJhbnNsYXRpb247XG4gKiAgICBlbGVtZW50cyBbM10sIFs3XSwgWzExXSBzZXQgdG8gMDtcbiAqICAgIGVsZW1lbnQgWzE1XSBzZXQgdG8gMS5cbiAqICAgIEFsbCBtZXRob2RzIGFyZSBzdGF0aWMuXG4gKlxuICogQHN0YXRpY1xuICpcbiAqIEBjbGFzcyBUcmFuc2Zvcm1cbiAqL1xudmFyIFRyYW5zZm9ybSA9IHt9O1xuXG4vLyBXQVJOSU5HOiB0aGVzZSBtYXRyaWNlcyBjb3JyZXNwb25kIHRvIFdlYktpdCBtYXRyaWNlcywgd2hpY2ggYXJlXG4vLyAgICB0cmFuc3Bvc2VkIGZyb20gdGhlaXIgbWF0aCBjb3VudGVycGFydHNcblRyYW5zZm9ybS5wcmVjaXNpb24gPSAxZS02O1xuVHJhbnNmb3JtLmlkZW50aXR5ID0gWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdO1xuXG4vKipcbiAqIE11bHRpcGx5IHR3byBvciBtb3JlIFRyYW5zZm9ybSBtYXRyaXggdHlwZXMgdG8gcmV0dXJuIGEgVHJhbnNmb3JtIG1hdHJpeC5cbiAqXG4gKiBAbWV0aG9kIG11bHRpcGx5NHg0XG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gYSBsZWZ0IFRyYW5zZm9ybVxuICogQHBhcmFtIHtUcmFuc2Zvcm19IGIgcmlnaHQgVHJhbnNmb3JtXG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19XG4gKi9cblRyYW5zZm9ybS5tdWx0aXBseTR4NCA9IGZ1bmN0aW9uIG11bHRpcGx5NHg0KGEsIGIpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBhWzBdICogYlswXSArIGFbNF0gKiBiWzFdICsgYVs4XSAqIGJbMl0gKyBhWzEyXSAqIGJbM10sXG4gICAgICAgIGFbMV0gKiBiWzBdICsgYVs1XSAqIGJbMV0gKyBhWzldICogYlsyXSArIGFbMTNdICogYlszXSxcbiAgICAgICAgYVsyXSAqIGJbMF0gKyBhWzZdICogYlsxXSArIGFbMTBdICogYlsyXSArIGFbMTRdICogYlszXSxcbiAgICAgICAgYVszXSAqIGJbMF0gKyBhWzddICogYlsxXSArIGFbMTFdICogYlsyXSArIGFbMTVdICogYlszXSxcbiAgICAgICAgYVswXSAqIGJbNF0gKyBhWzRdICogYls1XSArIGFbOF0gKiBiWzZdICsgYVsxMl0gKiBiWzddLFxuICAgICAgICBhWzFdICogYls0XSArIGFbNV0gKiBiWzVdICsgYVs5XSAqIGJbNl0gKyBhWzEzXSAqIGJbN10sXG4gICAgICAgIGFbMl0gKiBiWzRdICsgYVs2XSAqIGJbNV0gKyBhWzEwXSAqIGJbNl0gKyBhWzE0XSAqIGJbN10sXG4gICAgICAgIGFbM10gKiBiWzRdICsgYVs3XSAqIGJbNV0gKyBhWzExXSAqIGJbNl0gKyBhWzE1XSAqIGJbN10sXG4gICAgICAgIGFbMF0gKiBiWzhdICsgYVs0XSAqIGJbOV0gKyBhWzhdICogYlsxMF0gKyBhWzEyXSAqIGJbMTFdLFxuICAgICAgICBhWzFdICogYls4XSArIGFbNV0gKiBiWzldICsgYVs5XSAqIGJbMTBdICsgYVsxM10gKiBiWzExXSxcbiAgICAgICAgYVsyXSAqIGJbOF0gKyBhWzZdICogYls5XSArIGFbMTBdICogYlsxMF0gKyBhWzE0XSAqIGJbMTFdLFxuICAgICAgICBhWzNdICogYls4XSArIGFbN10gKiBiWzldICsgYVsxMV0gKiBiWzEwXSArIGFbMTVdICogYlsxMV0sXG4gICAgICAgIGFbMF0gKiBiWzEyXSArIGFbNF0gKiBiWzEzXSArIGFbOF0gKiBiWzE0XSArIGFbMTJdICogYlsxNV0sXG4gICAgICAgIGFbMV0gKiBiWzEyXSArIGFbNV0gKiBiWzEzXSArIGFbOV0gKiBiWzE0XSArIGFbMTNdICogYlsxNV0sXG4gICAgICAgIGFbMl0gKiBiWzEyXSArIGFbNl0gKiBiWzEzXSArIGFbMTBdICogYlsxNF0gKyBhWzE0XSAqIGJbMTVdLFxuICAgICAgICBhWzNdICogYlsxMl0gKyBhWzddICogYlsxM10gKyBhWzExXSAqIGJbMTRdICsgYVsxNV0gKiBiWzE1XVxuICAgIF07XG59O1xuXG4vKipcbiAqIEZhc3QtbXVsdGlwbHkgdHdvIG9yIG1vcmUgVHJhbnNmb3JtIG1hdHJpeCB0eXBlcyB0byByZXR1cm4gYVxuICogICAgTWF0cml4LCBhc3N1bWluZyBib3R0b20gcm93IG9uIGVhY2ggaXMgWzAgMCAwIDFdLlxuICpcbiAqIEBtZXRob2QgbXVsdGlwbHlcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBhIGxlZnQgVHJhbnNmb3JtXG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gYiByaWdodCBUcmFuc2Zvcm1cbiAqIEByZXR1cm4ge1RyYW5zZm9ybX1cbiAqL1xuVHJhbnNmb3JtLm11bHRpcGx5ID0gZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMF0gKiBiWzBdICsgYVs0XSAqIGJbMV0gKyBhWzhdICogYlsyXSxcbiAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzVdICogYlsxXSArIGFbOV0gKiBiWzJdLFxuICAgICAgICBhWzJdICogYlswXSArIGFbNl0gKiBiWzFdICsgYVsxMF0gKiBiWzJdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYls0XSArIGFbNF0gKiBiWzVdICsgYVs4XSAqIGJbNl0sXG4gICAgICAgIGFbMV0gKiBiWzRdICsgYVs1XSAqIGJbNV0gKyBhWzldICogYls2XSxcbiAgICAgICAgYVsyXSAqIGJbNF0gKyBhWzZdICogYls1XSArIGFbMTBdICogYls2XSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbOF0gKyBhWzRdICogYls5XSArIGFbOF0gKiBiWzEwXSxcbiAgICAgICAgYVsxXSAqIGJbOF0gKyBhWzVdICogYls5XSArIGFbOV0gKiBiWzEwXSxcbiAgICAgICAgYVsyXSAqIGJbOF0gKyBhWzZdICogYls5XSArIGFbMTBdICogYlsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzEyXSArIGFbNF0gKiBiWzEzXSArIGFbOF0gKiBiWzE0XSArIGFbMTJdLFxuICAgICAgICBhWzFdICogYlsxMl0gKyBhWzVdICogYlsxM10gKyBhWzldICogYlsxNF0gKyBhWzEzXSxcbiAgICAgICAgYVsyXSAqIGJbMTJdICsgYVs2XSAqIGJbMTNdICsgYVsxMF0gKiBiWzE0XSArIGFbMTRdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIHRyYW5zbGF0ZWQgYnkgYWRkaXRpb25hbCBhbW91bnRzIGluIGVhY2hcbiAqICAgIGRpbWVuc2lvbi4gVGhpcyBpcyBlcXVpdmFsZW50IHRvIHRoZSByZXN1bHQgb2ZcbiAqXG4gKiAgICBUcmFuc2Zvcm0ubXVsdGlwbHkoTWF0cml4LnRyYW5zbGF0ZSh0WzBdLCB0WzFdLCB0WzJdKSwgbSkuXG4gKlxuICogQG1ldGhvZCB0aGVuTW92ZVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtUcmFuc2Zvcm19IG0gYSBUcmFuc2Zvcm1cbiAqIEBwYXJhbSB7QXJyYXkuTnVtYmVyfSB0IGZsb2F0cyBkZWx0YSB2ZWN0b3Igb2YgbGVuZ3RoIDIgb3IgM1xuICogQHJldHVybiB7VHJhbnNmb3JtfVxuICovXG5UcmFuc2Zvcm0udGhlbk1vdmUgPSBmdW5jdGlvbiB0aGVuTW92ZShtLCB0KSB7XG4gICAgaWYgKCF0WzJdKSB0WzJdID0gMDtcbiAgICByZXR1cm4gW21bMF0sIG1bMV0sIG1bMl0sIDAsIG1bNF0sIG1bNV0sIG1bNl0sIDAsIG1bOF0sIG1bOV0sIG1bMTBdLCAwLCBtWzEyXSArIHRbMF0sIG1bMTNdICsgdFsxXSwgbVsxNF0gKyB0WzJdLCAxXTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIGF0cml4IHdoaWNoIHJlcHJlc2VudHMgdGhlIHJlc3VsdCBvZiBhIHRyYW5zZm9ybSBtYXRyaXhcbiAqICAgIGFwcGxpZWQgYWZ0ZXIgYSBtb3ZlLiBUaGlzIGlzIGZhc3RlciB0aGFuIHRoZSBlcXVpdmFsZW50IG11bHRpcGx5LlxuICogICAgVGhpcyBpcyBlcXVpdmFsZW50IHRvIHRoZSByZXN1bHQgb2Y6XG4gKlxuICogICAgVHJhbnNmb3JtLm11bHRpcGx5KG0sIFRyYW5zZm9ybS50cmFuc2xhdGUodFswXSwgdFsxXSwgdFsyXSkpLlxuICpcbiAqIEBtZXRob2QgbW92ZVRoZW5cbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7QXJyYXkuTnVtYmVyfSB2IHZlY3RvciByZXByZXNlbnRpbmcgaW5pdGlhbCBtb3ZlbWVudFxuICogQHBhcmFtIHtUcmFuc2Zvcm19IG0gbWF0cml4IHRvIGFwcGx5IGFmdGVyd2FyZHNcbiAqIEByZXR1cm4ge1RyYW5zZm9ybX0gdGhlIHJlc3VsdGluZyBtYXRyaXhcbiAqL1xuVHJhbnNmb3JtLm1vdmVUaGVuID0gZnVuY3Rpb24gbW92ZVRoZW4odiwgbSkge1xuICAgIGlmICghdlsyXSkgdlsyXSA9IDA7XG4gICAgdmFyIHQwID0gdlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdO1xuICAgIHZhciB0MSA9IHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XTtcbiAgICB2YXIgdDIgPSB2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUobSwgW3QwLCB0MSwgdDJdKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIHdoaWNoIHJlcHJlc2VudHMgYSB0cmFuc2xhdGlvbiBieSBzcGVjaWZpZWRcbiAqICAgIGFtb3VudHMgaW4gZWFjaCBkaW1lbnNpb24uXG4gKlxuICogQG1ldGhvZCB0cmFuc2xhdGVcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IHggdHJhbnNsYXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IHkgdHJhbnNsYXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB6IHogdHJhbnNsYXRpb25cbiAqIEByZXR1cm4ge1RyYW5zZm9ybX1cbiAqL1xuVHJhbnNmb3JtLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIHRyYW5zbGF0ZSh4LCB5LCB6KSB7XG4gICAgaWYgKHogPT09IHVuZGVmaW5lZCkgeiA9IDA7XG4gICAgcmV0dXJuIFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCB4LCB5LCB6LCAxXTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIHNjYWxlZCBieSBhIHZlY3RvciBpbiBlYWNoXG4gKiAgICBkaW1lbnNpb24uIFRoaXMgaXMgYSBtb3JlIHBlcmZvcm1hbnQgZXF1aXZhbGVudCB0byB0aGUgcmVzdWx0IG9mXG4gKlxuICogICAgVHJhbnNmb3JtLm11bHRpcGx5KFRyYW5zZm9ybS5zY2FsZShzWzBdLCBzWzFdLCBzWzJdKSwgbSkuXG4gKlxuICogQG1ldGhvZCB0aGVuU2NhbGVcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBtIGEgbWF0cml4XG4gKiBAcGFyYW0ge0FycmF5Lk51bWJlcn0gcyBkZWx0YSB2ZWN0b3IgKGFycmF5IG9mIGZsb2F0cyAmJlxuICogICAgYXJyYXkubGVuZ3RoID09IDMpXG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19XG4gKi9cblRyYW5zZm9ybS50aGVuU2NhbGUgPSBmdW5jdGlvbiB0aGVuU2NhbGUobSwgcykge1xuICAgIHJldHVybiBbXG4gICAgICAgIHNbMF0gKiBtWzBdLCBzWzFdICogbVsxXSwgc1syXSAqIG1bMl0sIDAsXG4gICAgICAgIHNbMF0gKiBtWzRdLCBzWzFdICogbVs1XSwgc1syXSAqIG1bNl0sIDAsXG4gICAgICAgIHNbMF0gKiBtWzhdLCBzWzFdICogbVs5XSwgc1syXSAqIG1bMTBdLCAwLFxuICAgICAgICBzWzBdICogbVsxMl0sIHNbMV0gKiBtWzEzXSwgc1syXSAqIG1bMTRdLCAxXG4gICAgXTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIHdoaWNoIHJlcHJlc2VudHMgYSBzY2FsZSBieSBzcGVjaWZpZWQgYW1vdW50c1xuICogICAgaW4gZWFjaCBkaW1lbnNpb24uXG4gKlxuICogQG1ldGhvZCBzY2FsZVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtOdW1iZXJ9IHggeCBzY2FsZSBmYWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IHkgc2NhbGUgZmFjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geiB6IHNjYWxlIGZhY3RvclxuICogQHJldHVybiB7VHJhbnNmb3JtfVxuICovXG5UcmFuc2Zvcm0uc2NhbGUgPSBmdW5jdGlvbiBzY2FsZSh4LCB5LCB6KSB7XG4gICAgaWYgKHogPT09IHVuZGVmaW5lZCkgeiA9IDE7XG4gICAgcmV0dXJuIFt4LCAwLCAwLCAwLCAwLCB5LCAwLCAwLCAwLCAwLCB6LCAwLCAwLCAwLCAwLCAxXTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIHdoaWNoIHJlcHJlc2VudHMgYSBjbG9ja3dpc2VcbiAqICAgIHJvdGF0aW9uIGFyb3VuZCB0aGUgeCBheGlzLlxuICpcbiAqIEBtZXRob2Qgcm90YXRlWFxuICogQHN0YXRpY1xuICogQHBhcmFtIHtOdW1iZXJ9IHRoZXRhIHJhZGlhbnNcbiAqIEByZXR1cm4ge1RyYW5zZm9ybX1cbiAqL1xuVHJhbnNmb3JtLnJvdGF0ZVggPSBmdW5jdGlvbiByb3RhdGVYKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDAsIGNvc1RoZXRhLCBzaW5UaGV0YSwgMCwgMCwgLXNpblRoZXRhLCBjb3NUaGV0YSwgMCwgMCwgMCwgMCwgMV07XG59O1xuXG4vKipcbiAqIFJldHVybiBhIFRyYW5zZm9ybSB3aGljaCByZXByZXNlbnRzIGEgY2xvY2t3aXNlXG4gKiAgICByb3RhdGlvbiBhcm91bmQgdGhlIHkgYXhpcy5cbiAqXG4gKiBAbWV0aG9kIHJvdGF0ZVlcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aGV0YSByYWRpYW5zXG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19XG4gKi9cblRyYW5zZm9ybS5yb3RhdGVZID0gZnVuY3Rpb24gcm90YXRlWSh0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtjb3NUaGV0YSwgMCwgLXNpblRoZXRhLCAwLCAwLCAxLCAwLCAwLCBzaW5UaGV0YSwgMCwgY29zVGhldGEsIDAsIDAsIDAsIDAsIDFdO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBUcmFuc2Zvcm0gd2hpY2ggcmVwcmVzZW50cyBhIGNsb2Nrd2lzZVxuICogICAgcm90YXRpb24gYXJvdW5kIHRoZSB6IGF4aXMuXG4gKlxuICogQG1ldGhvZCByb3RhdGVaXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge051bWJlcn0gdGhldGEgcmFkaWFuc1xuICogQHJldHVybiB7VHJhbnNmb3JtfVxuICovXG5UcmFuc2Zvcm0ucm90YXRlWiA9IGZ1bmN0aW9uIHJvdGF0ZVoodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbY29zVGhldGEsIHNpblRoZXRhLCAwLCAwLCAtc2luVGhldGEsIGNvc1RoZXRhLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxXTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIHdoaWNoIHJlcHJlc2VudHMgY29tcG9zZWQgY2xvY2t3aXNlXG4gKiAgICByb3RhdGlvbnMgYWxvbmcgZWFjaCBvZiB0aGUgYXhlcy4gRXF1aXZhbGVudCB0byB0aGUgcmVzdWx0IG9mXG4gKiAgICBNYXRyaXgubXVsdGlwbHkocm90YXRlWChwaGkpLCByb3RhdGVZKHRoZXRhKSwgcm90YXRlWihwc2kpKS5cbiAqXG4gKiBAbWV0aG9kIHJvdGF0ZVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtOdW1iZXJ9IHBoaSByYWRpYW5zIHRvIHJvdGF0ZSBhYm91dCB0aGUgcG9zaXRpdmUgeCBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0gdGhldGEgcmFkaWFucyB0byByb3RhdGUgYWJvdXQgdGhlIHBvc2l0aXZlIHkgYXhpc1xuICogQHBhcmFtIHtOdW1iZXJ9IHBzaSByYWRpYW5zIHRvIHJvdGF0ZSBhYm91dCB0aGUgcG9zaXRpdmUgeiBheGlzXG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19XG4gKi9cblRyYW5zZm9ybS5yb3RhdGUgPSBmdW5jdGlvbiByb3RhdGUocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgdmFyIGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgdmFyIHNpblBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICB2YXIgY29zUHNpID0gTWF0aC5jb3MocHNpKTtcbiAgICB2YXIgc2luUHNpID0gTWF0aC5zaW4ocHNpKTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICBjb3NUaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgY29zUGhpICogc2luUHNpICsgc2luUGhpICogc2luVGhldGEgKiBjb3NQc2ksXG4gICAgICAgIHNpblBoaSAqIHNpblBzaSAtIGNvc1BoaSAqIHNpblRoZXRhICogY29zUHNpLFxuICAgICAgICAwLFxuICAgICAgICAtY29zVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgIGNvc1BoaSAqIGNvc1BzaSAtIHNpblBoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICBzaW5QaGkgKiBjb3NQc2kgKyBjb3NQaGkgKiBzaW5UaGV0YSAqIHNpblBzaSxcbiAgICAgICAgMCxcbiAgICAgICAgc2luVGhldGEsXG4gICAgICAgIC1zaW5QaGkgKiBjb3NUaGV0YSxcbiAgICAgICAgY29zUGhpICogY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsIDAsIDAsIDFcbiAgICBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIFRyYW5zZm9ybSB3aGljaCByZXByZXNlbnRzIGFuIGF4aXMtYW5nbGUgcm90YXRpb25cbiAqXG4gKiBAbWV0aG9kIHJvdGF0ZUF4aXNcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7QXJyYXkuTnVtYmVyfSB2IHVuaXQgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcyB0byByb3RhdGUgYWJvdXRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aGV0YSByYWRpYW5zIHRvIHJvdGF0ZSBjbG9ja3dpc2UgYWJvdXQgdGhlIGF4aXNcbiAqIEByZXR1cm4ge1RyYW5zZm9ybX1cbiAqL1xuVHJhbnNmb3JtLnJvdGF0ZUF4aXMgPSBmdW5jdGlvbiByb3RhdGVBeGlzKHYsIHRoZXRhKSB7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgdmVyVGhldGEgPSAxIC0gY29zVGhldGE7IC8vIHZlcnNpbmUgb2YgdGhldGFcblxuICAgIHZhciB4eFYgPSB2WzBdICogdlswXSAqIHZlclRoZXRhO1xuICAgIHZhciB4eVYgPSB2WzBdICogdlsxXSAqIHZlclRoZXRhO1xuICAgIHZhciB4elYgPSB2WzBdICogdlsyXSAqIHZlclRoZXRhO1xuICAgIHZhciB5eVYgPSB2WzFdICogdlsxXSAqIHZlclRoZXRhO1xuICAgIHZhciB5elYgPSB2WzFdICogdlsyXSAqIHZlclRoZXRhO1xuICAgIHZhciB6elYgPSB2WzJdICogdlsyXSAqIHZlclRoZXRhO1xuICAgIHZhciB4cyA9IHZbMF0gKiBzaW5UaGV0YTtcbiAgICB2YXIgeXMgPSB2WzFdICogc2luVGhldGE7XG4gICAgdmFyIHpzID0gdlsyXSAqIHNpblRoZXRhO1xuXG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgeHhWICsgY29zVGhldGEsIHh5ViArIHpzLCB4elYgLSB5cywgMCxcbiAgICAgICAgeHlWIC0genMsIHl5ViArIGNvc1RoZXRhLCB5elYgKyB4cywgMCxcbiAgICAgICAgeHpWICsgeXMsIHl6ViAtIHhzLCB6elYgKyBjb3NUaGV0YSwgMCxcbiAgICAgICAgMCwgMCwgMCwgMVxuICAgIF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIHdoaWNoIHJlcHJlc2VudHMgYSB0cmFuc2Zvcm0gbWF0cml4IGFwcGxpZWQgYWJvdXRcbiAqIGEgc2VwYXJhdGUgb3JpZ2luIHBvaW50LlxuICpcbiAqIEBtZXRob2QgYWJvdXRPcmlnaW5cbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7QXJyYXkuTnVtYmVyfSB2IG9yaWdpbiBwb2ludCB0byBhcHBseSBtYXRyaXhcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBtIG1hdHJpeCB0byBhcHBseVxuICogQHJldHVybiB7VHJhbnNmb3JtfVxuICovXG5UcmFuc2Zvcm0uYWJvdXRPcmlnaW4gPSBmdW5jdGlvbiBhYm91dE9yaWdpbih2LCBtKSB7XG4gICAgdmFyIHQwID0gdlswXSAtICh2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF0pO1xuICAgIHZhciB0MSA9IHZbMV0gLSAodlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldKTtcbiAgICB2YXIgdDIgPSB2WzJdIC0gKHZbMF0gKiBtWzJdICsgdlsxXSAqIG1bNl0gKyB2WzJdICogbVsxMF0pO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUobSwgW3QwLCB0MSwgdDJdKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgVHJhbnNmb3JtIHJlcHJlc2VudGF0aW9uIG9mIGEgc2tldyB0cmFuc2Zvcm1hdGlvblxuICpcbiAqIEBtZXRob2Qgc2tld1xuICogQHN0YXRpY1xuICogQHBhcmFtIHtOdW1iZXJ9IHBoaSBzY2FsZSBmYWN0b3Igc2tldyBpbiB0aGUgeCBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0gdGhldGEgc2NhbGUgZmFjdG9yIHNrZXcgaW4gdGhlIHkgYXhpc1xuICogQHBhcmFtIHtOdW1iZXJ9IHBzaSBzY2FsZSBmYWN0b3Igc2tldyBpbiB0aGUgeiBheGlzXG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19XG4gKi9cblRyYW5zZm9ybS5za2V3ID0gZnVuY3Rpb24gc2tldyhwaGksIHRoZXRhLCBwc2kpIHtcbiAgICByZXR1cm4gWzEsIDAsIDAsIDAsIE1hdGgudGFuKHBzaSksIDEsIDAsIDAsIE1hdGgudGFuKHRoZXRhKSwgTWF0aC50YW4ocGhpKSwgMSwgMCwgMCwgMCwgMCwgMV07XG59O1xuXG4vKipcbiAqIFJldHVybiBhIFRyYW5zZm9ybSByZXByZXNlbnRhdGlvbiBvZiBhIHNrZXcgaW4gdGhlIHgtZGlyZWN0aW9uXG4gKlxuICogQG1ldGhvZCBza2V3WFxuICogQHN0YXRpY1xuICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlIHRoZSBhbmdsZSBiZXR3ZWVuIHRoZSB0b3AgYW5kIGxlZnQgc2lkZXNcbiAqIEByZXR1cm4ge1RyYW5zZm9ybX1cbiAqL1xuVHJhbnNmb3JtLnNrZXdYID0gZnVuY3Rpb24gc2tld1goYW5nbGUpIHtcbiAgICByZXR1cm4gWzEsIDAsIDAsIDAsIE1hdGgudGFuKGFuZ2xlKSwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV07XG59O1xuXG4vKipcbiAqIFJldHVybiBhIFRyYW5zZm9ybSByZXByZXNlbnRhdGlvbiBvZiBhIHNrZXcgaW4gdGhlIHktZGlyZWN0aW9uXG4gKlxuICogQG1ldGhvZCBza2V3WVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlIHRoZSBhbmdsZSBiZXR3ZWVuIHRoZSB0b3AgYW5kIHJpZ2h0IHNpZGVzXG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19XG4gKi9cblRyYW5zZm9ybS5za2V3WSA9IGZ1bmN0aW9uIHNrZXdZKGFuZ2xlKSB7XG4gICAgcmV0dXJuIFsxLCBNYXRoLnRhbihhbmdsZSksIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGVyc3BlY3RpdmUgVHJhbnNmb3JtIG1hdHJpeFxuICpcbiAqIEBtZXRob2QgcGVyc3BlY3RpdmVcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7TnVtYmVyfSBmb2N1c1ogeiBwb3NpdGlvbiBvZiBmb2NhbCBwb2ludFxuICogQHJldHVybiB7VHJhbnNmb3JtfVxuICovXG5UcmFuc2Zvcm0ucGVyc3BlY3RpdmUgPSBmdW5jdGlvbiBwZXJzcGVjdGl2ZShmb2N1c1opIHtcbiAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIC0xIC8gZm9jdXNaLCAwLCAwLCAwLCAxXTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgZ2l2ZW4gVHJhbnNmb3JtXG4gKlxuICogQG1ldGhvZCBnZXRUcmFuc2xhdGVcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBtIFRyYW5zZm9ybVxuICogQHJldHVybiB7QXJyYXkuTnVtYmVyfSB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIFt0X3gsIHRfeSwgdF96XVxuICovXG5UcmFuc2Zvcm0uZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKG0pIHtcbiAgICByZXR1cm4gW21bMTJdLCBtWzEzXSwgbVsxNF1dO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gaW52ZXJzZSBhZmZpbmUgdHJhbnNmb3JtIGZvciBnaXZlbiBUcmFuc2Zvcm0uXG4gKiAgIE5vdGU6IFRoaXMgYXNzdW1lcyBtWzNdID0gbVs3XSA9IG1bMTFdID0gMCwgYW5kIG1bMTVdID0gMS5cbiAqICAgV2lsbCBwcm92aWRlIGluY29ycmVjdCByZXN1bHRzIGlmIG5vdCBpbnZlcnRpYmxlIG9yIHByZWNvbmRpdGlvbnMgbm90IG1ldC5cbiAqXG4gKiBAbWV0aG9kIGludmVyc2VcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBtIFRyYW5zZm9ybVxuICogQHJldHVybiB7VHJhbnNmb3JtfVxuICovXG5UcmFuc2Zvcm0uaW52ZXJzZSA9IGZ1bmN0aW9uIGludmVyc2UobSkge1xuICAgIC8vIG9ubHkgbmVlZCB0byBjb25zaWRlciAzeDMgc2VjdGlvbiBmb3IgYWZmaW5lXG4gICAgdmFyIGMwID0gbVs1XSAqIG1bMTBdIC0gbVs2XSAqIG1bOV07XG4gICAgdmFyIGMxID0gbVs0XSAqIG1bMTBdIC0gbVs2XSAqIG1bOF07XG4gICAgdmFyIGMyID0gbVs0XSAqIG1bOV0gLSBtWzVdICogbVs4XTtcbiAgICB2YXIgYzQgPSBtWzFdICogbVsxMF0gLSBtWzJdICogbVs5XTtcbiAgICB2YXIgYzUgPSBtWzBdICogbVsxMF0gLSBtWzJdICogbVs4XTtcbiAgICB2YXIgYzYgPSBtWzBdICogbVs5XSAtIG1bMV0gKiBtWzhdO1xuICAgIHZhciBjOCA9IG1bMV0gKiBtWzZdIC0gbVsyXSAqIG1bNV07XG4gICAgdmFyIGM5ID0gbVswXSAqIG1bNl0gLSBtWzJdICogbVs0XTtcbiAgICB2YXIgYzEwID0gbVswXSAqIG1bNV0gLSBtWzFdICogbVs0XTtcbiAgICB2YXIgZGV0TSA9IG1bMF0gKiBjMCAtIG1bMV0gKiBjMSArIG1bMl0gKiBjMjtcbiAgICB2YXIgaW52RCA9IDEgLyBkZXRNO1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgIGludkQgKiBjMCwgLWludkQgKiBjNCwgaW52RCAqIGM4LCAwLFxuICAgICAgICAtaW52RCAqIGMxLCBpbnZEICogYzUsIC1pbnZEICogYzksIDAsXG4gICAgICAgIGludkQgKiBjMiwgLWludkQgKiBjNiwgaW52RCAqIGMxMCwgMCxcbiAgICAgICAgMCwgMCwgMCwgMVxuICAgIF07XG4gICAgcmVzdWx0WzEyXSA9IC1tWzEyXSAqIHJlc3VsdFswXSAtIG1bMTNdICogcmVzdWx0WzRdIC0gbVsxNF0gKiByZXN1bHRbOF07XG4gICAgcmVzdWx0WzEzXSA9IC1tWzEyXSAqIHJlc3VsdFsxXSAtIG1bMTNdICogcmVzdWx0WzVdIC0gbVsxNF0gKiByZXN1bHRbOV07XG4gICAgcmVzdWx0WzE0XSA9IC1tWzEyXSAqIHJlc3VsdFsyXSAtIG1bMTNdICogcmVzdWx0WzZdIC0gbVsxNF0gKiByZXN1bHRbMTBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHRyYW5zcG9zZSBvZiBhIDR4NCBtYXRyaXhcbiAqXG4gKiBAbWV0aG9kIHRyYW5zcG9zZVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtUcmFuc2Zvcm19IG0gbWF0cml4XG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19IHRoZSByZXN1bHRpbmcgdHJhbnNwb3NlZCBtYXRyaXhcbiAqL1xuVHJhbnNmb3JtLnRyYW5zcG9zZSA9IGZ1bmN0aW9uIHRyYW5zcG9zZShtKSB7XG4gICAgcmV0dXJuIFttWzBdLCBtWzRdLCBtWzhdLCBtWzEyXSwgbVsxXSwgbVs1XSwgbVs5XSwgbVsxM10sIG1bMl0sIG1bNl0sIG1bMTBdLCBtWzE0XSwgbVszXSwgbVs3XSwgbVsxMV0sIG1bMTVdXTtcbn07XG5cbmZ1bmN0aW9uIF9ub3JtU3F1YXJlZCh2KSB7XG4gICAgcmV0dXJuICh2Lmxlbmd0aCA9PT0gMikgPyB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdIDogdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdO1xufVxuZnVuY3Rpb24gX25vcm0odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoX25vcm1TcXVhcmVkKHYpKTtcbn1cbmZ1bmN0aW9uIF9zaWduKG4pIHtcbiAgICByZXR1cm4gKG4gPCAwKSA/IC0xIDogMTtcbn1cblxuLyoqXG4gKiBEZWNvbXBvc2UgVHJhbnNmb3JtIGludG8gc2VwYXJhdGUgLnRyYW5zbGF0ZSwgLnJvdGF0ZSwgLnNjYWxlLFxuICogICAgYW5kIC5za2V3IGNvbXBvbmVudHMuXG4gKlxuICogQG1ldGhvZCBpbnRlcnByZXRcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBNIHRyYW5zZm9ybSBtYXRyaXhcbiAqIEByZXR1cm4ge09iamVjdH0gbWF0cml4IHNwZWMgb2JqZWN0IHdpdGggY29tcG9uZW50IG1hdHJpY2VzIC50cmFuc2xhdGUsXG4gKiAgICAucm90YXRlLCAuc2NhbGUsIC5za2V3XG4gKi9cblRyYW5zZm9ybS5pbnRlcnByZXQgPSBmdW5jdGlvbiBpbnRlcnByZXQoTSkge1xuXG4gICAgLy8gUVIgZGVjb21wb3NpdGlvbiB2aWEgSG91c2Vob2xkZXIgcmVmbGVjdGlvbnNcbiAgICAvL0ZJUlNUIElURVJBVElPTlxuXG4gICAgLy9kZWZhdWx0IFExIHRvIHRoZSBpZGVudGl0eSBtYXRyaXg7XG4gICAgdmFyIHggPSBbTVswXSwgTVsxXSwgTVsyXV07ICAgICAgICAgICAgICAgIC8vIGZpcnN0IGNvbHVtbiB2ZWN0b3JcbiAgICB2YXIgc2duID0gX3NpZ24oeFswXSk7ICAgICAgICAgICAgICAgICAgICAgLy8gc2lnbiBvZiBmaXJzdCBjb21wb25lbnQgb2YgeCAoZm9yIHN0YWJpbGl0eSlcbiAgICB2YXIgeE5vcm0gPSBfbm9ybSh4KTsgICAgICAgICAgICAgICAgICAgICAgLy8gbm9ybSBvZiBmaXJzdCBjb2x1bW4gdmVjdG9yXG4gICAgdmFyIHYgPSBbeFswXSArIHNnbiAqIHhOb3JtLCB4WzFdLCB4WzJdXTsgIC8vIHYgPSB4ICsgc2lnbih4WzBdKXx4fGUxXG4gICAgdmFyIG11bHQgPSAyIC8gX25vcm1TcXVhcmVkKHYpOyAgICAgICAgICAgIC8vIG11bHQgPSAyL3YndlxuXG4gICAgLy9iYWlsIG91dCBpZiBvdXIgTWF0cml4IGlzIHNpbmd1bGFyXG4gICAgaWYgKG11bHQgPj0gSW5maW5pdHkpIHtcbiAgICAgICAgcmV0dXJuIHt0cmFuc2xhdGU6IFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoTSksIHJvdGF0ZTogWzAsIDAsIDBdLCBzY2FsZTogWzAsIDAsIDBdLCBza2V3OiBbMCwgMCwgMF19O1xuICAgIH1cblxuICAgIC8vZXZhbHVhdGUgUTEgPSBJIC0gMnZ2Jy92J3ZcbiAgICB2YXIgUTEgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMV07XG5cbiAgICAvL2RpYWdvbmFsc1xuICAgIFExWzBdICA9IDEgLSBtdWx0ICogdlswXSAqIHZbMF07ICAgIC8vIDAsMCBlbnRyeVxuICAgIFExWzVdICA9IDEgLSBtdWx0ICogdlsxXSAqIHZbMV07ICAgIC8vIDEsMSBlbnRyeVxuICAgIFExWzEwXSA9IDEgLSBtdWx0ICogdlsyXSAqIHZbMl07ICAgIC8vIDIsMiBlbnRyeVxuXG4gICAgLy91cHBlciBkaWFnb25hbFxuICAgIFExWzFdID0gLW11bHQgKiB2WzBdICogdlsxXTsgICAgICAgIC8vIDAsMSBlbnRyeVxuICAgIFExWzJdID0gLW11bHQgKiB2WzBdICogdlsyXTsgICAgICAgIC8vIDAsMiBlbnRyeVxuICAgIFExWzZdID0gLW11bHQgKiB2WzFdICogdlsyXTsgICAgICAgIC8vIDEsMiBlbnRyeVxuXG4gICAgLy9sb3dlciBkaWFnb25hbFxuICAgIFExWzRdID0gUTFbMV07ICAgICAgICAgICAgICAgICAgICAgIC8vIDEsMCBlbnRyeVxuICAgIFExWzhdID0gUTFbMl07ICAgICAgICAgICAgICAgICAgICAgIC8vIDIsMCBlbnRyeVxuICAgIFExWzldID0gUTFbNl07ICAgICAgICAgICAgICAgICAgICAgIC8vIDIsMSBlbnRyeVxuXG4gICAgLy9yZWR1Y2UgZmlyc3QgY29sdW1uIG9mIE1cbiAgICB2YXIgTVExID0gVHJhbnNmb3JtLm11bHRpcGx5KFExLCBNKTtcblxuICAgIC8vU0VDT05EIElURVJBVElPTiBvbiAoMSwxKSBtaW5vclxuICAgIHZhciB4MiA9IFtNUTFbNV0sIE1RMVs2XV07XG4gICAgdmFyIHNnbjIgPSBfc2lnbih4MlswXSk7ICAgICAgICAgICAgICAgICAgICAvLyBzaWduIG9mIGZpcnN0IGNvbXBvbmVudCBvZiB4IChmb3Igc3RhYmlsaXR5KVxuICAgIHZhciB4Mk5vcm0gPSBfbm9ybSh4Mik7ICAgICAgICAgICAgICAgICAgICAgLy8gbm9ybSBvZiBmaXJzdCBjb2x1bW4gdmVjdG9yXG4gICAgdmFyIHYyID0gW3gyWzBdICsgc2duMiAqIHgyTm9ybSwgeDJbMV1dOyAgICAvLyB2ID0geCArIHNpZ24oeFswXSl8eHxlMVxuICAgIHZhciBtdWx0MiA9IDIgLyBfbm9ybVNxdWFyZWQodjIpOyAgICAgICAgICAgLy8gbXVsdCA9IDIvdid2XG5cbiAgICAvL2V2YWx1YXRlIFEyID0gSSAtIDJ2dicvdid2XG4gICAgdmFyIFEyID0gWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdO1xuXG4gICAgLy9kaWFnb25hbFxuICAgIFEyWzVdICA9IDEgLSBtdWx0MiAqIHYyWzBdICogdjJbMF07IC8vIDEsMSBlbnRyeVxuICAgIFEyWzEwXSA9IDEgLSBtdWx0MiAqIHYyWzFdICogdjJbMV07IC8vIDIsMiBlbnRyeVxuXG4gICAgLy9vZmYgZGlhZ29uYWxzXG4gICAgUTJbNl0gPSAtbXVsdDIgKiB2MlswXSAqIHYyWzFdOyAgICAgLy8gMiwxIGVudHJ5XG4gICAgUTJbOV0gPSBRMls2XTsgICAgICAgICAgICAgICAgICAgICAgLy8gMSwyIGVudHJ5XG5cbiAgICAvL2NhbGMgUVIgZGVjb21wb3NpdGlvbi4gUSA9IFExKlEyLCBSID0gUScqTVxuICAgIHZhciBRID0gVHJhbnNmb3JtLm11bHRpcGx5KFEyLCBRMSk7ICAgICAgLy9ub3RlOiByZWFsbHkgUSB0cmFuc3Bvc2VcbiAgICB2YXIgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShRLCBNKTtcblxuICAgIC8vcmVtb3ZlIG5lZ2F0aXZlIHNjYWxpbmdcbiAgICB2YXIgcmVtb3ZlciA9IFRyYW5zZm9ybS5zY2FsZShSWzBdIDwgMCA/IC0xIDogMSwgUls1XSA8IDAgPyAtMSA6IDEsIFJbMTBdIDwgMCA/IC0xIDogMSk7XG4gICAgUiA9IFRyYW5zZm9ybS5tdWx0aXBseShSLCByZW1vdmVyKTtcbiAgICBRID0gVHJhbnNmb3JtLm11bHRpcGx5KHJlbW92ZXIsIFEpO1xuXG4gICAgLy9kZWNvbXBvc2UgaW50byByb3RhdGUvc2NhbGUvc2tldyBtYXRyaWNlc1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQudHJhbnNsYXRlID0gVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShNKTtcbiAgICByZXN1bHQucm90YXRlID0gW01hdGguYXRhbjIoLVFbNl0sIFFbMTBdKSwgTWF0aC5hc2luKFFbMl0pLCBNYXRoLmF0YW4yKC1RWzFdLCBRWzBdKV07XG4gICAgaWYgKCFyZXN1bHQucm90YXRlWzBdKSB7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMF0gPSAwO1xuICAgICAgICByZXN1bHQucm90YXRlWzJdID0gTWF0aC5hdGFuMihRWzRdLCBRWzVdKTtcbiAgICB9XG4gICAgcmVzdWx0LnNjYWxlID0gW1JbMF0sIFJbNV0sIFJbMTBdXTtcbiAgICByZXN1bHQuc2tldyA9IFtNYXRoLmF0YW4yKFJbOV0sIHJlc3VsdC5zY2FsZVsyXSksIE1hdGguYXRhbjIoUls4XSwgcmVzdWx0LnNjYWxlWzJdKSwgTWF0aC5hdGFuMihSWzRdLCByZXN1bHQuc2NhbGVbMF0pXTtcblxuICAgIC8vZG91YmxlIHJvdGF0aW9uIHdvcmthcm91bmRcbiAgICBpZiAoTWF0aC5hYnMocmVzdWx0LnJvdGF0ZVswXSkgKyBNYXRoLmFicyhyZXN1bHQucm90YXRlWzJdKSA+IDEuNSAqIE1hdGguUEkpIHtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSA9IE1hdGguUEkgLSByZXN1bHQucm90YXRlWzFdO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsxXSA+IE1hdGguUEkpIHJlc3VsdC5yb3RhdGVbMV0gLT0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzFdIDwgLU1hdGguUEkpIHJlc3VsdC5yb3RhdGVbMV0gKz0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzBdIDwgMCkgcmVzdWx0LnJvdGF0ZVswXSArPSBNYXRoLlBJO1xuICAgICAgICBlbHNlIHJlc3VsdC5yb3RhdGVbMF0gLT0gTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMl0gPCAwKSByZXN1bHQucm90YXRlWzJdICs9IE1hdGguUEk7XG4gICAgICAgIGVsc2UgcmVzdWx0LnJvdGF0ZVsyXSAtPSBNYXRoLlBJO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFdlaWdodGVkIGF2ZXJhZ2UgYmV0d2VlbiB0d28gbWF0cmljZXMgYnkgYXZlcmFnaW5nIHRoZWlyXG4gKiAgICAgdHJhbnNsYXRpb24sIHJvdGF0aW9uLCBzY2FsZSwgc2tldyBjb21wb25lbnRzLlxuICogICAgIGYoTTEsTTIsdCkgPSAoMSAtIHQpICogTTEgKyB0ICogTTJcbiAqXG4gKiBAbWV0aG9kIGF2ZXJhZ2VcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBNMSBmKE0xLE0yLDApID0gTTFcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBNMiBmKE0xLE0yLDEpID0gTTJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19XG4gKi9cblRyYW5zZm9ybS5hdmVyYWdlID0gZnVuY3Rpb24gYXZlcmFnZShNMSwgTTIsIHQpIHtcbiAgICB0ID0gKHQgPT09IHVuZGVmaW5lZCkgPyAwLjUgOiB0O1xuICAgIHZhciBzcGVjTTEgPSBUcmFuc2Zvcm0uaW50ZXJwcmV0KE0xKTtcbiAgICB2YXIgc3BlY00yID0gVHJhbnNmb3JtLmludGVycHJldChNMik7XG5cbiAgICB2YXIgc3BlY0F2ZyA9IHtcbiAgICAgICAgdHJhbnNsYXRlOiBbMCwgMCwgMF0sXG4gICAgICAgIHJvdGF0ZTogWzAsIDAsIDBdLFxuICAgICAgICBzY2FsZTogWzAsIDAsIDBdLFxuICAgICAgICBza2V3OiBbMCwgMCwgMF1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgc3BlY0F2Zy50cmFuc2xhdGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnRyYW5zbGF0ZVtpXSArIHQgKiBzcGVjTTIudHJhbnNsYXRlW2ldO1xuICAgICAgICBzcGVjQXZnLnJvdGF0ZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEucm90YXRlW2ldICsgdCAqIHNwZWNNMi5yb3RhdGVbaV07XG4gICAgICAgIHNwZWNBdmcuc2NhbGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnNjYWxlW2ldICsgdCAqIHNwZWNNMi5zY2FsZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5za2V3W2ldID0gKDEgLSB0KSAqIHNwZWNNMS5za2V3W2ldICsgdCAqIHNwZWNNMi5za2V3W2ldO1xuICAgIH1cbiAgICByZXR1cm4gVHJhbnNmb3JtLmJ1aWxkKHNwZWNBdmcpO1xufTtcblxuLyoqXG4gKiBDb21wb3NlIC50cmFuc2xhdGUsIC5yb3RhdGUsIC5zY2FsZSwgLnNrZXcgY29tcG9uZW50cyBpbnRvXG4gKiBUcmFuc2Zvcm0gbWF0cml4XG4gKlxuICogQG1ldGhvZCBidWlsZFxuICogQHN0YXRpY1xuICogQHBhcmFtIHttYXRyaXhTcGVjfSBzcGVjIG9iamVjdCB3aXRoIGNvbXBvbmVudCBtYXRyaWNlcyAudHJhbnNsYXRlLFxuICogICAgLnJvdGF0ZSwgLnNjYWxlLCAuc2tld1xuICogQHJldHVybiB7VHJhbnNmb3JtfSBjb21wb3NlZCB0cmFuc2Zvcm1cbiAqL1xuVHJhbnNmb3JtLmJ1aWxkID0gZnVuY3Rpb24gYnVpbGQoc3BlYykge1xuICAgIHZhciBzY2FsZU1hdHJpeCA9IFRyYW5zZm9ybS5zY2FsZShzcGVjLnNjYWxlWzBdLCBzcGVjLnNjYWxlWzFdLCBzcGVjLnNjYWxlWzJdKTtcbiAgICB2YXIgc2tld01hdHJpeCA9IFRyYW5zZm9ybS5za2V3KHNwZWMuc2tld1swXSwgc3BlYy5za2V3WzFdLCBzcGVjLnNrZXdbMl0pO1xuICAgIHZhciByb3RhdGVNYXRyaXggPSBUcmFuc2Zvcm0ucm90YXRlKHNwZWMucm90YXRlWzBdLCBzcGVjLnJvdGF0ZVsxXSwgc3BlYy5yb3RhdGVbMl0pO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUoVHJhbnNmb3JtLm11bHRpcGx5KFRyYW5zZm9ybS5tdWx0aXBseShyb3RhdGVNYXRyaXgsIHNrZXdNYXRyaXgpLCBzY2FsZU1hdHJpeCksIHNwZWMudHJhbnNsYXRlKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHR3byBUcmFuc2Zvcm1zIGFyZSBjb21wb25lbnQtd2lzZSBlcXVhbFxuICogICBXYXJuaW5nOiBicmVha3Mgb24gcGVyc3BlY3RpdmUgVHJhbnNmb3Jtc1xuICpcbiAqIEBtZXRob2QgZXF1YWxzXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gYSBtYXRyaXhcbiAqIEBwYXJhbSB7VHJhbnNmb3JtfSBiIG1hdHJpeFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuVHJhbnNmb3JtLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuICFUcmFuc2Zvcm0ubm90RXF1YWxzKGEsIGIpO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdHdvIFRyYW5zZm9ybXMgYXJlIGNvbXBvbmVudC13aXNlIHVuZXF1YWxcbiAqICAgV2FybmluZzogYnJlYWtzIG9uIHBlcnNwZWN0aXZlIFRyYW5zZm9ybXNcbiAqXG4gKiBAbWV0aG9kIG5vdEVxdWFsc1xuICogQHN0YXRpY1xuICogQHBhcmFtIHtUcmFuc2Zvcm19IGEgbWF0cml4XG4gKiBAcGFyYW0ge1RyYW5zZm9ybX0gYiBtYXRyaXhcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblRyYW5zZm9ybS5ub3RFcXVhbHMgPSBmdW5jdGlvbiBub3RFcXVhbHMoYSwgYikge1xuICAgIGlmIChhID09PSBiKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBzaG9ydGNpXG4gICAgcmV0dXJuICEoYSAmJiBiKSB8fFxuICAgICAgICBhWzEyXSAhPT0gYlsxMl0gfHwgYVsxM10gIT09IGJbMTNdIHx8IGFbMTRdICE9PSBiWzE0XSB8fFxuICAgICAgICBhWzBdICE9PSBiWzBdIHx8IGFbMV0gIT09IGJbMV0gfHwgYVsyXSAhPT0gYlsyXSB8fFxuICAgICAgICBhWzRdICE9PSBiWzRdIHx8IGFbNV0gIT09IGJbNV0gfHwgYVs2XSAhPT0gYls2XSB8fFxuICAgICAgICBhWzhdICE9PSBiWzhdIHx8IGFbOV0gIT09IGJbOV0gfHwgYVsxMF0gIT09IGJbMTBdO1xufTtcblxuLyoqXG4gKiBDb25zdHJhaW4gYW5nbGUtdHJpbyBjb21wb25lbnRzIHRvIHJhbmdlIG9mIFstcGksIHBpKS5cbiAqXG4gKiBAbWV0aG9kIG5vcm1hbGl6ZVJvdGF0aW9uXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge0FycmF5Lk51bWJlcn0gcm90YXRpb24gcGhpLCB0aGV0YSwgcHNpIChhcnJheSBvZiBmbG9hdHNcbiAqICAgICYmIGFycmF5Lmxlbmd0aCA9PSAzKVxuICogQHJldHVybiB7QXJyYXkuTnVtYmVyfSBuZXcgcGhpLCB0aGV0YSwgcHNpIHRyaXBsZXRcbiAqICAgIChhcnJheSBvZiBmbG9hdHMgJiYgYXJyYXkubGVuZ3RoID09IDMpXG4gKi9cblRyYW5zZm9ybS5ub3JtYWxpemVSb3RhdGlvbiA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVJvdGF0aW9uKHJvdGF0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHJvdGF0aW9uLnNsaWNlKDApO1xuICAgIGlmIChyZXN1bHRbMF0gPT09IE1hdGguUEkgKiAwLjUgfHwgcmVzdWx0WzBdID09PSAtTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSAtcmVzdWx0WzBdO1xuICAgICAgICByZXN1bHRbMV0gPSBNYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFswXSA+IE1hdGguUEkgKiAwLjUpIHtcbiAgICAgICAgcmVzdWx0WzBdID0gcmVzdWx0WzBdIC0gTWF0aC5QSTtcbiAgICAgICAgcmVzdWx0WzFdID0gTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIGlmIChyZXN1bHRbMF0gPCAtTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSByZXN1bHRbMF0gKyBNYXRoLlBJO1xuICAgICAgICByZXN1bHRbMV0gPSAtTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIHdoaWxlIChyZXN1bHRbMV0gPCAtTWF0aC5QSSkgcmVzdWx0WzFdICs9IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMV0gPj0gTWF0aC5QSSkgcmVzdWx0WzFdIC09IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMl0gPCAtTWF0aC5QSSkgcmVzdWx0WzJdICs9IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMl0gPj0gTWF0aC5QSSkgcmVzdWx0WzJdIC09IDIgKiBNYXRoLlBJO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIChQcm9wZXJ0eSkgQXJyYXkgZGVmaW5pbmcgYSB0cmFuc2xhdGlvbiBmb3J3YXJkIGluIHogYnkgMVxuICpcbiAqIEBwcm9wZXJ0eSB7YXJyYXl9IGluRnJvbnRcbiAqIEBzdGF0aWNcbiAqIEBmaW5hbFxuICovXG5UcmFuc2Zvcm0uaW5Gcm9udCA9IFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxZS0zLCAxXTtcblxuLyoqXG4gKiAoUHJvcGVydHkpIEFycmF5IGRlZmluaW5nIGEgdHJhbnNsYXRpb24gYmFja3dhcmRzIGluIHogYnkgMVxuICpcbiAqIEBwcm9wZXJ0eSB7YXJyYXl9IGJlaGluZFxuICogQHN0YXRpY1xuICogQGZpbmFsXG4gKi9cblRyYW5zZm9ybS5iZWhpbmQgPSBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgLTFlLTMsIDFdO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zZm9ybTsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBkYXZpZEBmYW1vLnVzXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcbiAqL1xuXG5cblxuXG4vKipcbiAqIFRocmVlLWVsZW1lbnQgZmxvYXRpbmcgcG9pbnQgdmVjdG9yLlxuICpcbiAqIEBjbGFzcyBWZWN0b3JcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IHggZWxlbWVudCB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IHkgeSBlbGVtZW50IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0geiB6IGVsZW1lbnQgdmFsdWVcbiAqL1xuZnVuY3Rpb24gVmVjdG9yKHgseSx6KSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHRoaXMuc2V0KHgpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgdGhpcy56ID0geiB8fCAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn1cblxudmFyIF9yZWdpc3RlciA9IG5ldyBWZWN0b3IoMCwwLDApO1xuXG4vKipcbiAqIEFkZCB0aGlzIGVsZW1lbnQtd2lzZSB0byBhbm90aGVyIFZlY3RvciwgZWxlbWVudC13aXNlLlxuICogICBOb3RlOiBUaGlzIHNldHMgdGhlIGludGVybmFsIHJlc3VsdCByZWdpc3Rlciwgc28gb3RoZXIgcmVmZXJlbmNlcyB0byB0aGF0IHZlY3RvciB3aWxsIGNoYW5nZS5cbiAqXG4gKiBAbWV0aG9kIGFkZFxuICogQHBhcmFtIHtWZWN0b3J9IHYgYWRkZW5kXG4gKiBAcmV0dXJuIHtWZWN0b3J9IHZlY3RvciBzdW1cbiAqL1xuVmVjdG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQodikge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLFxuICAgICAgICB0aGlzLnggKyB2LngsXG4gICAgICAgIHRoaXMueSArIHYueSxcbiAgICAgICAgdGhpcy56ICsgdi56XG4gICAgKTtcbn07XG5cbi8qKlxuICogU3VidHJhY3QgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIHZlY3RvciwgZWxlbWVudC13aXNlLlxuICogICBOb3RlOiBUaGlzIHNldHMgdGhlIGludGVybmFsIHJlc3VsdCByZWdpc3Rlciwgc28gb3RoZXIgcmVmZXJlbmNlcyB0byB0aGF0IHZlY3RvciB3aWxsIGNoYW5nZS5cbiAqXG4gKiBAbWV0aG9kIHN1YlxuICogQHBhcmFtIHtWZWN0b3J9IHYgc3VidHJhaGVuZFxuICogQHJldHVybiB7VmVjdG9yfSB2ZWN0b3IgZGlmZmVyZW5jZVxuICovXG5WZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uIHN1Yih2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsXG4gICAgICAgIHRoaXMueCAtIHYueCxcbiAgICAgICAgdGhpcy55IC0gdi55LFxuICAgICAgICB0aGlzLnogLSB2LnpcbiAgICApO1xufTtcblxuLyoqXG4gKiBTY2FsZSBWZWN0b3IgYnkgZmxvYXRpbmcgcG9pbnQgci5cbiAqICAgTm90ZTogVGhpcyBzZXRzIHRoZSBpbnRlcm5hbCByZXN1bHQgcmVnaXN0ZXIsIHNvIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhhdCB2ZWN0b3Igd2lsbCBjaGFuZ2UuXG4gKlxuICogQG1ldGhvZCBtdWx0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHIgc2NhbGFyXG4gKiBAcmV0dXJuIHtWZWN0b3J9IHZlY3RvciByZXN1bHRcbiAqL1xuVmVjdG9yLnByb3RvdHlwZS5tdWx0ID0gZnVuY3Rpb24gbXVsdChyKSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsXG4gICAgICAgIHIgKiB0aGlzLngsXG4gICAgICAgIHIgKiB0aGlzLnksXG4gICAgICAgIHIgKiB0aGlzLnpcbiAgICApO1xufTtcblxuLyoqXG4gKiBTY2FsZSBWZWN0b3IgYnkgZmxvYXRpbmcgcG9pbnQgMS9yLlxuICogICBOb3RlOiBUaGlzIHNldHMgdGhlIGludGVybmFsIHJlc3VsdCByZWdpc3Rlciwgc28gb3RoZXIgcmVmZXJlbmNlcyB0byB0aGF0IHZlY3RvciB3aWxsIGNoYW5nZS5cbiAqXG4gKiBAbWV0aG9kIGRpdlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSByIHNjYWxhclxuICogQHJldHVybiB7VmVjdG9yfSB2ZWN0b3IgcmVzdWx0XG4gKi9cblZlY3Rvci5wcm90b3R5cGUuZGl2ID0gZnVuY3Rpb24gZGl2KHIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0KDEgLyByKTtcbn07XG5cbi8qKlxuICogR2l2ZW4gYW5vdGhlciB2ZWN0b3IgdiwgcmV0dXJuIGNyb3NzIHByb2R1Y3QgKHYpeCh0aGlzKS5cbiAqICAgTm90ZTogVGhpcyBzZXRzIHRoZSBpbnRlcm5hbCByZXN1bHQgcmVnaXN0ZXIsIHNvIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhhdCB2ZWN0b3Igd2lsbCBjaGFuZ2UuXG4gKlxuICogQG1ldGhvZCBjcm9zc1xuICogQHBhcmFtIHtWZWN0b3J9IHYgTGVmdCBIYW5kIFZlY3RvclxuICogQHJldHVybiB7VmVjdG9yfSB2ZWN0b3IgcmVzdWx0XG4gKi9cblZlY3Rvci5wcm90b3R5cGUuY3Jvc3MgPSBmdW5jdGlvbiBjcm9zcyh2KSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIHZ4ID0gdi54O1xuICAgIHZhciB2eSA9IHYueTtcbiAgICB2YXIgdnogPSB2Lno7XG5cbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlcixcbiAgICAgICAgeiAqIHZ5IC0geSAqIHZ6LFxuICAgICAgICB4ICogdnogLSB6ICogdngsXG4gICAgICAgIHkgKiB2eCAtIHggKiB2eVxuICAgICk7XG59O1xuXG4vKipcbiAqIENvbXBvbmVudC13aXNlIGVxdWFsaXR5IHRlc3QgYmV0d2VlbiB0aGlzIGFuZCBWZWN0b3Igdi5cbiAqIEBtZXRob2QgZXF1YWxzXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gdiB2ZWN0b3IgdG8gY29tcGFyZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuVmVjdG9yLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHModikge1xuICAgIHJldHVybiAodi54ID09PSB0aGlzLnggJiYgdi55ID09PSB0aGlzLnkgJiYgdi56ID09PSB0aGlzLnopO1xufTtcblxuLyoqXG4gKiBSb3RhdGUgY2xvY2t3aXNlIGFyb3VuZCB4LWF4aXMgYnkgdGhldGEgcmFkaWFucy5cbiAqICAgTm90ZTogVGhpcyBzZXRzIHRoZSBpbnRlcm5hbCByZXN1bHQgcmVnaXN0ZXIsIHNvIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhhdCB2ZWN0b3Igd2lsbCBjaGFuZ2UuXG4gKiBAbWV0aG9kIHJvdGF0ZVhcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aGV0YSByYWRpYW5zXG4gKiBAcmV0dXJuIHtWZWN0b3J9IHJvdGF0ZWQgdmVjdG9yXG4gKi9cblZlY3Rvci5wcm90b3R5cGUucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlcixcbiAgICAgICAgeCxcbiAgICAgICAgeSAqIGNvc1RoZXRhIC0geiAqIHNpblRoZXRhLFxuICAgICAgICB5ICogc2luVGhldGEgKyB6ICogY29zVGhldGFcbiAgICApO1xufTtcblxuLyoqXG4gKiBSb3RhdGUgY2xvY2t3aXNlIGFyb3VuZCB5LWF4aXMgYnkgdGhldGEgcmFkaWFucy5cbiAqICAgTm90ZTogVGhpcyBzZXRzIHRoZSBpbnRlcm5hbCByZXN1bHQgcmVnaXN0ZXIsIHNvIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhhdCB2ZWN0b3Igd2lsbCBjaGFuZ2UuXG4gKiBAbWV0aG9kIHJvdGF0ZVlcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aGV0YSByYWRpYW5zXG4gKiBAcmV0dXJuIHtWZWN0b3J9IHJvdGF0ZWQgdmVjdG9yXG4gKi9cblZlY3Rvci5wcm90b3R5cGUucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlcixcbiAgICAgICAgeiAqIHNpblRoZXRhICsgeCAqIGNvc1RoZXRhLFxuICAgICAgICB5LFxuICAgICAgICB6ICogY29zVGhldGEgLSB4ICogc2luVGhldGFcbiAgICApO1xufTtcblxuLyoqXG4gKiBSb3RhdGUgY2xvY2t3aXNlIGFyb3VuZCB6LWF4aXMgYnkgdGhldGEgcmFkaWFucy5cbiAqICAgTm90ZTogVGhpcyBzZXRzIHRoZSBpbnRlcm5hbCByZXN1bHQgcmVnaXN0ZXIsIHNvIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhhdCB2ZWN0b3Igd2lsbCBjaGFuZ2UuXG4gKiBAbWV0aG9kIHJvdGF0ZVpcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aGV0YSByYWRpYW5zXG4gKiBAcmV0dXJuIHtWZWN0b3J9IHJvdGF0ZWQgdmVjdG9yXG4gKi9cblZlY3Rvci5wcm90b3R5cGUucm90YXRlWiA9IGZ1bmN0aW9uIHJvdGF0ZVoodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlcixcbiAgICAgICAgeCAqIGNvc1RoZXRhIC0geSAqIHNpblRoZXRhLFxuICAgICAgICB4ICogc2luVGhldGEgKyB5ICogY29zVGhldGEsXG4gICAgICAgIHpcbiAgICApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gZG90IHByb2R1Y3Qgb2YgdGhpcyB3aXRoIGEgc2Vjb25kIFZlY3RvclxuICogQG1ldGhvZCBkb3RcbiAqIEBwYXJhbSB7VmVjdG9yfSB2IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge251bWJlcn0gZG90IHByb2R1Y3RcbiAqL1xuVmVjdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiBkb3Qodikge1xuICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XG59O1xuXG4vKipcbiAqIFJldHVybiBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3RvclxuICogQG1ldGhvZCBub3JtU3F1YXJlZFxuICogQHJldHVybiB7bnVtYmVyfSBzcXVhcmVkIGxlbmd0aFxuICovXG5WZWN0b3IucHJvdG90eXBlLm5vcm1TcXVhcmVkID0gZnVuY3Rpb24gbm9ybVNxdWFyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gbGVuZ3RoIG9mIHRoaXMgdmVjdG9yXG4gKiBAbWV0aG9kIG5vcm1cbiAqIEByZXR1cm4ge251bWJlcn0gbGVuZ3RoXG4gKi9cblZlY3Rvci5wcm90b3R5cGUubm9ybSA9IGZ1bmN0aW9uIG5vcm0oKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLm5vcm1TcXVhcmVkKCkpO1xufTtcblxuLyoqXG4gKiBTY2FsZSBWZWN0b3IgdG8gc3BlY2lmaWVkIGxlbmd0aC5cbiAqICAgSWYgbGVuZ3RoIGlzIGxlc3MgdGhhbiBpbnRlcm5hbCB0b2xlcmFuY2UsIHNldCB2ZWN0b3IgdG8gW2xlbmd0aCwgMCwgMF0uXG4gKiAgIE5vdGU6IFRoaXMgc2V0cyB0aGUgaW50ZXJuYWwgcmVzdWx0IHJlZ2lzdGVyLCBzbyBvdGhlciByZWZlcmVuY2VzIHRvIHRoYXQgdmVjdG9yIHdpbGwgY2hhbmdlLlxuICogQG1ldGhvZCBub3JtYWxpemVcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIHRhcmdldCBsZW5ndGgsIGRlZmF1bHQgMS4wXG4gKiBAcmV0dXJuIHtWZWN0b3J9XG4gKi9cblZlY3Rvci5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gbm9ybWFsaXplKGxlbmd0aCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSBsZW5ndGggPSAxO1xuICAgIHZhciBub3JtID0gdGhpcy5ub3JtKCk7XG5cbiAgICBpZiAobm9ybSA+IDFlLTcpIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcy5tdWx0KGxlbmd0aCAvIG5vcm0pKTtcbiAgICBlbHNlIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCBsZW5ndGgsIDAsIDApO1xufTtcblxuLyoqXG4gKiBNYWtlIGEgc2VwYXJhdGUgY29weSBvZiB0aGUgVmVjdG9yLlxuICpcbiAqIEBtZXRob2QgY2xvbmVcbiAqXG4gKiBAcmV0dXJuIHtWZWN0b3J9XG4gKi9cblZlY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzKTtcbn07XG5cbi8qKlxuICogVHJ1ZSBpZiBhbmQgb25seSBpZiBldmVyeSB2YWx1ZSBpcyAwIChvciBmYWxzeSlcbiAqXG4gKiBAbWV0aG9kIGlzWmVyb1xuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblZlY3Rvci5wcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24gaXNaZXJvKCkge1xuICAgIHJldHVybiAhKHRoaXMueCB8fCB0aGlzLnkgfHwgdGhpcy56KTtcbn07XG5cbmZ1bmN0aW9uIF9zZXRYWVooeCx5LHopIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy56ID0gejtcbiAgICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gX3NldEZyb21BcnJheSh2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLHZbMF0sdlsxXSx2WzJdIHx8IDApO1xufVxuXG5mdW5jdGlvbiBfc2V0RnJvbVZlY3Rvcih2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB2LngsIHYueSwgdi56KTtcbn1cblxuZnVuY3Rpb24gX3NldEZyb21OdW1iZXIoeCkge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcyx4LDAsMCk7XG59XG5cbi8qKlxuICogU2V0IHRoaXMgVmVjdG9yIHRvIHRoZSB2YWx1ZXMgaW4gdGhlIHByb3ZpZGVkIEFycmF5IG9yIFZlY3Rvci5cbiAqXG4gKiBAbWV0aG9kIHNldFxuICogQHBhcmFtIHtvYmplY3R9IHYgYXJyYXksIFZlY3Rvciwgb3IgbnVtYmVyXG4gKiBAcmV0dXJuIHtWZWN0b3J9IHRoaXNcbiAqL1xuVmVjdG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodikge1xuICAgIGlmICh2IGluc3RhbmNlb2YgQXJyYXkpICAgIHJldHVybiBfc2V0RnJvbUFycmF5LmNhbGwodGhpcywgdik7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBWZWN0b3IpICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwodGhpcywgdik7XG4gICAgaWYgKHR5cGVvZiB2ID09PSAnbnVtYmVyJykgcmV0dXJuIF9zZXRGcm9tTnVtYmVyLmNhbGwodGhpcywgdik7XG59O1xuXG5WZWN0b3IucHJvdG90eXBlLnNldFhZWiA9IGZ1bmN0aW9uKHgseSx6KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cblZlY3Rvci5wcm90b3R5cGUuc2V0MUQgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIF9zZXRGcm9tTnVtYmVyLmNhbGwodGhpcywgeCk7XG59O1xuXG4vKipcbiAqIFB1dCByZXN1bHQgb2YgbGFzdCBpbnRlcm5hbCByZWdpc3RlciBjYWxjdWxhdGlvbiBpbiBzcGVjaWZpZWQgb3V0cHV0IHZlY3Rvci5cbiAqXG4gKiBAbWV0aG9kIHB1dFxuICogQHBhcmFtIHtWZWN0b3J9IHYgZGVzdGluYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJuIHtWZWN0b3J9IGRlc3RpbmF0aW9uIHZlY3RvclxuICovXG5cblZlY3Rvci5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gcHV0KHYpIHtcbiAgICBpZiAodGhpcyA9PT0gX3JlZ2lzdGVyKSBfc2V0RnJvbVZlY3Rvci5jYWxsKHYsIF9yZWdpc3Rlcik7XG4gICAgZWxzZSBfc2V0RnJvbVZlY3Rvci5jYWxsKHYsIHRoaXMpO1xufTtcblxuLyoqXG4gKiBTZXQgdGhpcyB2ZWN0b3IgdG8gWzAsMCwwXVxuICpcbiAqIEBtZXRob2QgY2xlYXJcbiAqL1xuVmVjdG9yLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywwLDAsMCk7XG59O1xuXG4vKipcbiAqIFNjYWxlIHRoaXMgVmVjdG9yIGRvd24gdG8gc3BlY2lmaWVkIFwiY2FwXCIgbGVuZ3RoLlxuICogICBJZiBWZWN0b3Igc2hvcnRlciB0aGFuIGNhcCwgb3IgY2FwIGlzIEluZmluaXR5LCBkbyBub3RoaW5nLlxuICogICBOb3RlOiBUaGlzIHNldHMgdGhlIGludGVybmFsIHJlc3VsdCByZWdpc3Rlciwgc28gb3RoZXIgcmVmZXJlbmNlcyB0byB0aGF0IHZlY3RvciB3aWxsIGNoYW5nZS5cbiAqXG4gKiBAbWV0aG9kIGNhcFxuICogQHJldHVybiB7VmVjdG9yfSBjYXBwZWQgdmVjdG9yXG4gKi9cblZlY3Rvci5wcm90b3R5cGUuY2FwID0gZnVuY3Rpb24gY2FwKGNhcCkge1xuICAgIGlmIChjYXAgPT09IEluZmluaXR5KSByZXR1cm4gX3NldEZyb21WZWN0b3IuY2FsbChfcmVnaXN0ZXIsIHRoaXMpO1xuICAgIHZhciBub3JtID0gdGhpcy5ub3JtKCk7XG4gICAgaWYgKG5vcm0gPiBjYXApIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcy5tdWx0KGNhcCAvIG5vcm0pKTtcbiAgICBlbHNlIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBwcm9qZWN0aW9uIG9mIHRoaXMgVmVjdG9yIG9udG8gYW5vdGhlci5cbiAqICAgTm90ZTogVGhpcyBzZXRzIHRoZSBpbnRlcm5hbCByZXN1bHQgcmVnaXN0ZXIsIHNvIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhhdCB2ZWN0b3Igd2lsbCBjaGFuZ2UuXG4gKlxuICogQG1ldGhvZCBwcm9qZWN0XG4gKiBAcGFyYW0ge1ZlY3Rvcn0gbiB2ZWN0b3IgdG8gcHJvamVjdCB1cG9uXG4gKiBAcmV0dXJuIHtWZWN0b3J9IHByb2plY3RlZCB2ZWN0b3JcbiAqL1xuVmVjdG9yLnByb3RvdHlwZS5wcm9qZWN0ID0gZnVuY3Rpb24gcHJvamVjdChuKSB7XG4gICAgcmV0dXJuIG4ubXVsdCh0aGlzLmRvdChuKSk7XG59O1xuXG4vKipcbiAqIFJlZmxlY3QgdGhpcyBWZWN0b3IgYWNyb3NzIHByb3ZpZGVkIHZlY3Rvci5cbiAqICAgTm90ZTogVGhpcyBzZXRzIHRoZSBpbnRlcm5hbCByZXN1bHQgcmVnaXN0ZXIsIHNvIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhhdCB2ZWN0b3Igd2lsbCBjaGFuZ2UuXG4gKlxuICogQG1ldGhvZCByZWZsZWN0QWNyb3NzXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gbiB2ZWN0b3IgdG8gcmVmbGVjdCBhY3Jvc3NcbiAqIEByZXR1cm4ge1ZlY3Rvcn0gcmVmbGVjdGVkIHZlY3RvclxuICovXG5WZWN0b3IucHJvdG90eXBlLnJlZmxlY3RBY3Jvc3MgPSBmdW5jdGlvbiByZWZsZWN0QWNyb3NzKG4pIHtcbiAgICBuLm5vcm1hbGl6ZSgpLnB1dChuKTtcbiAgICByZXR1cm4gX3NldEZyb21WZWN0b3IoX3JlZ2lzdGVyLCB0aGlzLnN1Yih0aGlzLnByb2plY3QobikubXVsdCgyKSkpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IFZlY3RvciB0byB0aHJlZS1lbGVtZW50IGFycmF5LlxuICpcbiAqIEBtZXRob2QgZ2V0XG4gKiBAcmV0dXJuIHthcnJheTxudW1iZXI+fSB0aHJlZS1lbGVtZW50IGFycmF5XG4gKi9cblZlY3Rvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnksIHRoaXMuel07XG59O1xuXG5WZWN0b3IucHJvdG90eXBlLmdldDFEID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMueDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yOyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogT3duZXI6IG1hcmtAZmFtby51c1xuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XG4gKi9cblxudmFyIE1vZGlmaWVyID0gcmVxdWlyZSgnLi4vY29yZS9Nb2RpZmllcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4uL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuLi90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnLi4vdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcblxuLyoqXG4gKiAgQSBjb2xsZWN0aW9uIG9mIHZpc3VhbCBjaGFuZ2VzIHRvIGJlXG4gKiAgICBhcHBsaWVkIHRvIGFub3RoZXIgcmVuZGVyYWJsZSBjb21wb25lbnQsIHN0cm9uZ2x5IGNvdXBsZWQgd2l0aCB0aGUgc3RhdGUgdGhhdCBkZWZpbmVzXG4gKiAgICB0aG9zZSBjaGFuZ2VzLiBUaGlzIGNvbGxlY3Rpb24gaW5jbHVkZXMgYVxuICogICAgdHJhbnNmb3JtIG1hdHJpeCwgYW4gb3BhY2l0eSBjb25zdGFudCwgYSBzaXplLCBhbiBvcmlnaW4gc3BlY2lmaWVyLCBhbmQgYW4gYWxpZ25tZW50IHNwZWNpZmllci5cbiAqICAgIFN0YXRlTW9kaWZpZXIgb2JqZWN0cyBjYW4gYmUgYWRkZWQgdG8gYW55IFJlbmRlck5vZGUgb3Igb2JqZWN0XG4gKiAgICBjYXBhYmxlIG9mIGRpc3BsYXlpbmcgcmVuZGVyYWJsZXMuICBUaGUgU3RhdGVNb2RpZmllcidzIGNoaWxkcmVuIGFuZCBkZXNjZW5kYW50c1xuICogICAgYXJlIHRyYW5zZm9ybWVkIGJ5IHRoZSBhbW91bnRzIHNwZWNpZmllZCBpbiB0aGUgbW9kaWZpZXIncyBwcm9wZXJ0aWVzLlxuICpcbiAqIEBjbGFzcyBTdGF0ZU1vZGlmaWVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gb3ZlcnJpZGVzIG9mIGRlZmF1bHQgb3B0aW9uc1xuICogQHBhcmFtIHtUcmFuc2Zvcm19IFtvcHRpb25zLnRyYW5zZm9ybV0gYWZmaW5lIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm9wYWNpdHldXG4gKiBAcGFyYW0ge0FycmF5Lk51bWJlcn0gW29wdGlvbnMub3JpZ2luXSBvcmlnaW4gYWRqdXN0bWVudFxuICogQHBhcmFtIHtBcnJheS5OdW1iZXJ9IFtvcHRpb25zLmFsaWduXSBhbGlnbiBhZGp1c3RtZW50XG4gKiBAcGFyYW0ge0FycmF5Lk51bWJlcn0gW29wdGlvbnMuc2l6ZV0gc2l6ZSB0byBhcHBseSB0byBkZXNjZW5kYW50c1xuICovXG5mdW5jdGlvbiBTdGF0ZU1vZGlmaWVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1TdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybShUcmFuc2Zvcm0uaWRlbnRpdHkpO1xuICAgIHRoaXMuX29wYWNpdHlTdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSgxKTtcbiAgICB0aGlzLl9vcmlnaW5TdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZShbMCwgMF0pO1xuICAgIHRoaXMuX2FsaWduU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoWzAsIDBdKTtcbiAgICB0aGlzLl9zaXplU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoWzAsIDBdKTtcblxuICAgIHRoaXMuX21vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgdHJhbnNmb3JtOiB0aGlzLl90cmFuc2Zvcm1TdGF0ZSxcbiAgICAgICAgb3BhY2l0eTogdGhpcy5fb3BhY2l0eVN0YXRlLFxuICAgICAgICBvcmlnaW46IG51bGwsXG4gICAgICAgIGFsaWduOiBudWxsLFxuICAgICAgICBzaXplOiBudWxsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9oYXNPcmlnaW4gPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNBbGlnbiA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc1NpemUgPSBmYWxzZTtcblxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnRyYW5zZm9ybSkgdGhpcy5zZXRUcmFuc2Zvcm0ob3B0aW9ucy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAob3B0aW9ucy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHRoaXMuc2V0T3BhY2l0eShvcHRpb25zLm9wYWNpdHkpO1xuICAgICAgICBpZiAob3B0aW9ucy5vcmlnaW4pIHRoaXMuc2V0T3JpZ2luKG9wdGlvbnMub3JpZ2luKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxpZ24pIHRoaXMuc2V0QWxpZ24ob3B0aW9ucy5hbGlnbik7XG4gICAgICAgIGlmIChvcHRpb25zLnNpemUpIHRoaXMuc2V0U2l6ZShvcHRpb25zLnNpemUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHRyYW5zZm9ybSBtYXRyaXggb2YgdGhpcyBtb2RpZmllciwgZWl0aGVyIHN0YXRpY2FsbHkgb3JcbiAqICAgdGhyb3VnaCBhIHByb3ZpZGVkIFRyYW5zaXRpb25hYmxlLlxuICpcbiAqIEBtZXRob2Qgc2V0VHJhbnNmb3JtXG4gKlxuICogQHBhcmFtIHtUcmFuc2Zvcm19IHRyYW5zZm9ybSBUcmFuc2Zvcm0gdG8gdHJhbnNpdGlvbiB0by5cbiAqIEBwYXJhbSB7VHJhbnNpdGlvbmFibGV9IFt0cmFuc2l0aW9uXSBWYWxpZCB0cmFuc2l0aW9uYWJsZSBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gY2FsbGJhY2sgdG8gY2FsbCBhZnRlciB0cmFuc2l0aW9uIGNvbXBsZXRlc1xuICogQHJldHVybiB7U3RhdGVNb2RpZmllcn0gdGhpc1xuICovXG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBzZXRUcmFuc2Zvcm0odHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX3RyYW5zZm9ybVN0YXRlLnNldCh0cmFuc2Zvcm0sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBvcGFjaXR5IG9mIHRoaXMgbW9kaWZpZXIsIGVpdGhlciBzdGF0aWNhbGx5IG9yXG4gKiAgIHRocm91Z2ggYSBwcm92aWRlZCBUcmFuc2l0aW9uYWJsZS5cbiAqXG4gKiBAbWV0aG9kIHNldE9wYWNpdHlcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gb3BhY2l0eSBPcGFjaXR5IHZhbHVlIHRvIHRyYW5zaXRpb24gdG8uXG4gKiBAcGFyYW0ge1RyYW5zaXRpb25hYmxlfSB0cmFuc2l0aW9uIFZhbGlkIHRyYW5zaXRpb25hYmxlIG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgdG8gY2FsbCBhZnRlciB0cmFuc2l0aW9uIGNvbXBsZXRlc1xuICogQHJldHVybiB7U3RhdGVNb2RpZmllcn0gdGhpc1xuICovXG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcGFjaXR5ID0gZnVuY3Rpb24gc2V0T3BhY2l0eShvcGFjaXR5LCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX29wYWNpdHlTdGF0ZS5zZXQob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG9yaWdpbiBvZiB0aGlzIG1vZGlmaWVyLCBlaXRoZXIgc3RhdGljYWxseSBvclxuICogICB0aHJvdWdoIGEgcHJvdmlkZWQgVHJhbnNpdGlvbmFibGUuXG4gKlxuICogQG1ldGhvZCBzZXRPcmlnaW5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Lk51bWJlcn0gb3JpZ2luIHR3byBlbGVtZW50IGFycmF5IHdpdGggdmFsdWVzIGJldHdlZW4gMCBhbmQgMS5cbiAqIEBwYXJhbSB7VHJhbnNpdGlvbmFibGV9IHRyYW5zaXRpb24gVmFsaWQgdHJhbnNpdGlvbmFibGUgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayB0byBjYWxsIGFmdGVyIHRyYW5zaXRpb24gY29tcGxldGVzXG4gKiBAcmV0dXJuIHtTdGF0ZU1vZGlmaWVyfSB0aGlzXG4gKi9cblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uIHNldE9yaWdpbihvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKG9yaWdpbiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzT3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9tb2RpZmllci5vcmlnaW5Gcm9tKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faGFzT3JpZ2luID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVsc2UgaWYgKCF0aGlzLl9oYXNPcmlnaW4pIHtcbiAgICAgICAgdGhpcy5faGFzT3JpZ2luID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbW9kaWZpZXIub3JpZ2luRnJvbSh0aGlzLl9vcmlnaW5TdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX29yaWdpblN0YXRlLnNldChvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBhbGlnbm1lbnQgb2YgdGhpcyBtb2RpZmllciwgZWl0aGVyIHN0YXRpY2FsbHkgb3JcbiAqICAgdGhyb3VnaCBhIHByb3ZpZGVkIFRyYW5zaXRpb25hYmxlLlxuICpcbiAqIEBtZXRob2Qgc2V0QWxpZ25cbiAqXG4gKiBAcGFyYW0ge0FycmF5Lk51bWJlcn0gYWxpZ24gdHdvIGVsZW1lbnQgYXJyYXkgd2l0aCB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxLlxuICogQHBhcmFtIHtUcmFuc2l0aW9uYWJsZX0gdHJhbnNpdGlvbiBWYWxpZCB0cmFuc2l0aW9uYWJsZSBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGNhbGxiYWNrIHRvIGNhbGwgYWZ0ZXIgdHJhbnNpdGlvbiBjb21wbGV0ZXNcbiAqIEByZXR1cm4ge1N0YXRlTW9kaWZpZXJ9IHRoaXNcbiAqL1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0QWxpZ24gPSBmdW5jdGlvbiBzZXRPcmlnaW4oYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKGFsaWduID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNBbGlnbikge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIuYWxpZ25Gcm9tKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faGFzQWxpZ24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZWxzZSBpZiAoIXRoaXMuX2hhc0FsaWduKSB7XG4gICAgICAgIHRoaXMuX2hhc0FsaWduID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbW9kaWZpZXIuYWxpZ25Gcm9tKHRoaXMuX2FsaWduU3RhdGUpO1xuICAgIH1cbiAgICB0aGlzLl9hbGlnblN0YXRlLnNldChhbGlnbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIHNpemUgb2YgdGhpcyBtb2RpZmllciwgZWl0aGVyIHN0YXRpY2FsbHkgb3JcbiAqICAgdGhyb3VnaCBhIHByb3ZpZGVkIFRyYW5zaXRpb25hYmxlLlxuICpcbiAqIEBtZXRob2Qgc2V0U2l6ZVxuICpcbiAqIEBwYXJhbSB7QXJyYXkuTnVtYmVyfSBzaXplIHR3byBlbGVtZW50IGFycmF5IHdpdGggdmFsdWVzIGJldHdlZW4gMCBhbmQgMS5cbiAqIEBwYXJhbSB7VHJhbnNpdGlvbmFibGV9IHRyYW5zaXRpb24gVmFsaWQgdHJhbnNpdGlvbmFibGUgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayB0byBjYWxsIGFmdGVyIHRyYW5zaXRpb24gY29tcGxldGVzXG4gKiBAcmV0dXJuIHtTdGF0ZU1vZGlmaWVyfSB0aGlzXG4gKi9cblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplKHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHNpemUgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1NpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVyLnNpemVGcm9tKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faGFzU2l6ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbHNlIGlmICghdGhpcy5faGFzU2l6ZSkge1xuICAgICAgICB0aGlzLl9oYXNTaXplID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbW9kaWZpZXIuc2l6ZUZyb20odGhpcy5fc2l6ZVN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fc2l6ZVN0YXRlLnNldChzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN0b3AgdGhlIHRyYW5zaXRpb24uXG4gKlxuICogQG1ldGhvZCBoYWx0XG4gKi9cblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMuX3RyYW5zZm9ybVN0YXRlLmhhbHQoKTtcbiAgICB0aGlzLl9vcGFjaXR5U3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX29yaWdpblN0YXRlLmhhbHQoKTtcbiAgICB0aGlzLl9hbGlnblN0YXRlLmhhbHQoKTtcbiAgICB0aGlzLl9zaXplU3RhdGUuaGFsdCgpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHRyYW5zZm9ybSBtYXRyaXggY29tcG9uZW50LlxuICpcbiAqIEBtZXRob2QgZ2V0VHJhbnNmb3JtXG4gKiBAcmV0dXJuIHtPYmplY3R9IHRyYW5zZm9ybSBwcm92aWRlciBvYmplY3RcbiAqL1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5nZXQoKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBkZXN0aW5hdGlvbiBzdGF0ZSBvZiB0aGUgdHJhbnNmb3JtIGNvbXBvbmVudC5cbiAqXG4gKiBAbWV0aG9kIGdldEZpbmFsVHJhbnNmb3JtXG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19IHRyYW5zZm9ybSBtYXRyaXhcbiAqL1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0RmluYWxUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRGaW5hbFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtU3RhdGUuZ2V0RmluYWwoKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBvcGFjaXR5IGNvbXBvbmVudC5cbiAqXG4gKiBAbWV0aG9kIGdldE9wYWNpdHlcbiAqIEByZXR1cm4ge09iamVjdH0gb3BhY2l0eSBwcm92aWRlciBvYmplY3RcbiAqL1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uIGdldE9wYWNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wYWNpdHlTdGF0ZS5nZXQoKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBvcmlnaW4gY29tcG9uZW50LlxuICpcbiAqIEBtZXRob2QgZ2V0T3JpZ2luXG4gKiBAcmV0dXJuIHtPYmplY3R9IG9yaWdpbiBwcm92aWRlciBvYmplY3RcbiAqL1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24gZ2V0T3JpZ2luKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNPcmlnaW4gPyB0aGlzLl9vcmlnaW5TdGF0ZS5nZXQoKSA6IG51bGw7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgYWxpZ24gY29tcG9uZW50LlxuICpcbiAqIEBtZXRob2QgZ2V0QWxpZ25cbiAqIEByZXR1cm4ge09iamVjdH0gYWxpZ24gcHJvdmlkZXIgb2JqZWN0XG4gKi9cblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldEFsaWduID0gZnVuY3Rpb24gZ2V0QWxpZ24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0FsaWduID8gdGhpcy5fYWxpZ25TdGF0ZS5nZXQoKSA6IG51bGw7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc2l6ZSBjb21wb25lbnQuXG4gKlxuICogQG1ldGhvZCBnZXRTaXplXG4gKiBAcmV0dXJuIHtPYmplY3R9IHNpemUgcHJvdmlkZXIgb2JqZWN0XG4gKi9cblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNTaXplID8gdGhpcy5fc2l6ZVN0YXRlLmdldCgpIDogbnVsbDtcbn07XG5cbi8qKlxuICogUmV0dXJuIHJlbmRlciBzcGVjIGZvciB0aGlzIFN0YXRlTW9kaWZpZXIsIGFwcGx5aW5nIHRvIHRoZSBwcm92aWRlZFxuICogICAgdGFyZ2V0IGNvbXBvbmVudC4gIFRoaXMgaXMgc2ltaWxhciB0byByZW5kZXIoKSBmb3IgU3VyZmFjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZXRob2QgbW9kaWZ5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAoYWxyZWFkeSByZW5kZXJlZCkgcmVuZGVyIHNwZWMgdG9cbiAqICAgIHdoaWNoIHRvIGFwcGx5IHRoZSB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlbmRlciBzcGVjIGZvciB0aGlzIFN0YXRlTW9kaWZpZXIsIGluY2x1ZGluZyB0aGVcbiAqICAgIHByb3ZpZGVkIHRhcmdldFxuICovXG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGlmaWVyLm1vZGlmeSh0YXJnZXQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZU1vZGlmaWVyOyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XG4gKi9cbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuXG4vKipcbiAqIFRoZSBQaHlzaWNzIEVuZ2luZSBpcyByZXNwb25zaWJsZSBmb3IgbWVkaWF0aW5nIEJvZGllcyBhbmQgdGhlaXJcbiAqIGludGVyYWN0aW9uIHdpdGggZm9yY2VzIGFuZCBjb25zdHJhaW50cy4gVGhlIFBoeXNpY3MgRW5naW5lIGhhbmRsZXMgdGhlXG4gKiBsb2dpYyBvZiBhZGRpbmcgYW5kIHJlbW92aW5nIGJvZGllcywgdXBkYXRpbmcgdGhlaXIgc3RhdGUgb2YgdGhlIG92ZXJcbiAqIHRpbWUuXG4gKlxuICogQGNsYXNzIFBoeXNpY3NFbmdpbmVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIG9wdGlvbnMge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBQaHlzaWNzRW5naW5lKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFBoeXNpY3NFbmdpbmUuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucykgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fcGFydGljbGVzICAgICAgPSBbXTsgICAvL2xpc3Qgb2YgbWFuYWdlZCBwYXJ0aWNsZXNcbiAgICB0aGlzLl9ib2RpZXMgICAgICAgICA9IFtdOyAgIC8vbGlzdCBvZiBtYW5hZ2VkIGJvZGllc1xuICAgIHRoaXMuX2FnZW50cyAgICAgICAgID0ge307ICAgLy9oYXNoIG9mIG1hbmFnZWQgYWdlbnRzXG4gICAgdGhpcy5fZm9yY2VzICAgICAgICAgPSBbXTsgICAvL2xpc3Qgb2YgSURzIG9mIGFnZW50cyB0aGF0IGFyZSBmb3JjZXNcbiAgICB0aGlzLl9jb25zdHJhaW50cyAgICA9IFtdOyAgIC8vbGlzdCBvZiBJRHMgb2YgYWdlbnRzIHRoYXQgYXJlIGNvbnN0cmFpbnRzXG5cbiAgICB0aGlzLl9idWZmZXIgICAgICAgICA9IDAuMDtcbiAgICB0aGlzLl9wcmV2VGltZSAgICAgICA9IG5vdygpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgICAgID0gZmFsc2U7XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyICAgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJBZ2VudElkICAgID0gMDtcbiAgICB0aGlzLl9oYXNCb2RpZXMgICAgICA9IGZhbHNlO1xufVxuXG52YXIgVElNRVNURVAgPSAxNztcbnZhciBNSU5fVElNRV9TVEVQID0gMTAwMCAvIDEyMDtcbnZhciBNQVhfVElNRV9TVEVQID0gMTc7XG5cbi8qKlxuICogQHByb3BlcnR5IFBoeXNpY3NFbmdpbmUuREVGQVVMVF9PUFRJT05TXG4gKiBAdHlwZSBPYmplY3RcbiAqIEBwcm90ZWN0ZWRcbiAqIEBzdGF0aWNcbiAqL1xuUGh5c2ljc0VuZ2luZS5ERUZBVUxUX09QVElPTlMgPSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIGl0ZXJhdGlvbnMgdGhlIGVuZ2luZSB0YWtlcyB0byByZXNvbHZlIGNvbnN0cmFpbnRzXG4gICAgICogQGF0dHJpYnV0ZSBjb25zdHJhaW50U3RlcHNcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICBjb25zdHJhaW50U3RlcHMgOiAxLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGVuZXJneSB0aHJlc2hvbGQgYmVmb3JlIHRoZSBFbmdpbmUgc3RvcHMgdXBkYXRpbmdcbiAgICAgKiBAYXR0cmlidXRlIHNsZWVwVG9sZXJhbmNlXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgc2xlZXBUb2xlcmFuY2UgIDogMWUtN1xufTtcblxudmFyIG5vdyA9IChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gRGF0ZS5ub3c7XG59KSgpO1xuXG4vKipcbiAqIE9wdGlvbnMgc2V0dGVyXG4gKiBAbWV0aG9kIHNldE9wdGlvbnNcbiAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0cykgaWYgKHRoaXMub3B0aW9uc1trZXldKSB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbn07XG5cbi8qKlxuICogTWV0aG9kIHRvIGFkZCBhIHBoeXNpY3MgYm9keSB0byB0aGUgZW5naW5lLiBOZWNlc3NhcnkgdG8gdXBkYXRlIHRoZVxuICogYm9keSBvdmVyIHRpbWUuXG4gKlxuICogQG1ldGhvZCBhZGRCb2R5XG4gKiBAcGFyYW0gYm9keSB7Qm9keX1cbiAqIEByZXR1cm4gYm9keSB7Qm9keX1cbiAqL1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuYWRkQm9keSA9IGZ1bmN0aW9uIGFkZEJvZHkoYm9keSkge1xuICAgIGJvZHkuX2VuZ2luZSA9IHRoaXM7XG4gICAgaWYgKGJvZHkuaXNCb2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZGllcy5wdXNoKGJvZHkpO1xuICAgICAgICB0aGlzLl9oYXNCb2RpZXMgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHRoaXMuX3BhcnRpY2xlcy5wdXNoKGJvZHkpO1xuICAgIHJldHVybiBib2R5O1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSBib2R5IGZyb20gdGhlIGVuZ2luZS4gRGV0YWNoZXMgYm9keSBmcm9tIGFsbCBmb3JjZXMgYW5kXG4gKiBjb25zdHJhaW50cy5cbiAqXG4gKiBAbWV0aG9kIHJlbW92ZUJvZHlcbiAqIEBwYXJhbSBib2R5IHtCb2R5fVxuICovXG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5yZW1vdmVCb2R5ID0gZnVuY3Rpb24gcmVtb3ZlQm9keShib2R5KSB7XG4gICAgdmFyIGFycmF5ID0gKGJvZHkuaXNCb2R5KSA/IHRoaXMuX2JvZGllcyA6IHRoaXMuX3BhcnRpY2xlcztcbiAgICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKGJvZHkpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5fYWdlbnRzKS5sZW5ndGg7IGkrKykgdGhpcy5kZXRhY2hGcm9tKGksIGJvZHkpO1xuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsMSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdldEJvZGllcygpLmxlbmd0aCA9PT0gMCkgdGhpcy5faGFzQm9kaWVzID0gZmFsc2U7XG59O1xuXG5mdW5jdGlvbiBfbWFwQWdlbnRBcnJheShhZ2VudCkge1xuICAgIGlmIChhZ2VudC5hcHBseUZvcmNlKSAgICAgIHJldHVybiB0aGlzLl9mb3JjZXM7XG4gICAgaWYgKGFnZW50LmFwcGx5Q29uc3RyYWludCkgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xufVxuXG5mdW5jdGlvbiBfYXR0YWNoT25lKGFnZW50LCB0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICBpZiAodGFyZ2V0cyA9PT0gdW5kZWZpbmVkKSB0YXJnZXRzID0gdGhpcy5nZXRQYXJ0aWNsZXNBbmRCb2RpZXMoKTtcbiAgICBpZiAoISh0YXJnZXRzIGluc3RhbmNlb2YgQXJyYXkpKSB0YXJnZXRzID0gW3RhcmdldHNdO1xuXG4gICAgdGhpcy5fYWdlbnRzW3RoaXMuX2N1cnJBZ2VudElkXSA9IHtcbiAgICAgICAgYWdlbnQgICA6IGFnZW50LFxuICAgICAgICB0YXJnZXRzIDogdGFyZ2V0cyxcbiAgICAgICAgc291cmNlICA6IHNvdXJjZVxuICAgIH07XG5cbiAgICBfbWFwQWdlbnRBcnJheS5jYWxsKHRoaXMsIGFnZW50KS5wdXNoKHRoaXMuX2N1cnJBZ2VudElkKTtcbiAgICByZXR1cm4gdGhpcy5fY3VyckFnZW50SWQrKztcbn1cblxuLyoqXG4gKiBBdHRhY2hlcyBhIGZvcmNlIG9yIGNvbnN0cmFpbnQgdG8gYSBCb2R5LiBSZXR1cm5zIGFuIEFnZW50SWQgb2YgdGhlXG4gKiBhdHRhY2hlZCBhZ2VudCB3aGljaCBjYW4gYmUgdXNlZCB0byBkZXRhY2ggdGhlIGFnZW50LlxuICpcbiAqIEBtZXRob2QgYXR0YWNoXG4gKiBAcGFyYW0gYWdlbnQge0FnZW50fEFycmF5LkFnZW50fSBBIGZvcmNlLCBjb25zdHJhaW50LCBvciBhcnJheSBvZiB0aGVtLlxuICogQHBhcmFtIFt0YXJnZXRzPUFsbF0ge0JvZHl8QXJyYXkuQm9keX0gVGhlIEJvZHkgb3IgQm9kaWVzIGFmZmVjdGVkIGJ5IHRoZSBhZ2VudFxuICogQHBhcmFtIFtzb3VyY2VdIHtCb2R5fSBUaGUgc291cmNlIG9mIHRoZSBhZ2VudFxuICogQHJldHVybiBBZ2VudElkIHtOdW1iZXJ9XG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIGF0dGFjaChhZ2VudHMsIHRhcmdldHMsIHNvdXJjZSkge1xuICAgIGlmIChhZ2VudHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB2YXIgYWdlbnRJRHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBhZ2VudElEc1tpXSA9IF9hdHRhY2hPbmUuY2FsbCh0aGlzLCBhZ2VudHNbaV0sIHRhcmdldHMsIHNvdXJjZSk7XG4gICAgICAgIHJldHVybiBhZ2VudElEcztcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gX2F0dGFjaE9uZS5jYWxsKHRoaXMsIGFnZW50cywgdGFyZ2V0cywgc291cmNlKTtcbn07XG5cbi8qKlxuICogQXBwZW5kIGEgYm9keSB0byB0aGUgdGFyZ2V0cyBvZiBhIHByZXZpb3VzbHkgZGVmaW5lZCBwaHlzaWNzIGFnZW50LlxuICpcbiAqIEBtZXRob2QgYXR0YWNoVG9cbiAqIEBwYXJhbSBhZ2VudElEIHtBZ2VudElkfSBUaGUgYWdlbnRJZCBvZiBhIHByZXZpb3VzbHkgZGVmaW5lZCBhZ2VudFxuICogQHBhcmFtIHRhcmdldCB7Qm9keX0gVGhlIEJvZHkgYWZmZWN0ZWQgYnkgdGhlIGFnZW50XG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmF0dGFjaFRvID0gZnVuY3Rpb24gYXR0YWNoVG8oYWdlbnRJRCwgdGFyZ2V0KSB7XG4gICAgX2dldEJvdW5kQWdlbnQuY2FsbCh0aGlzLCBhZ2VudElEKS50YXJnZXRzLnB1c2godGFyZ2V0KTtcbn07XG5cbi8qKlxuICogVW5kb2VzIFBoeXNpY3NFbmdpbmUuYXR0YWNoLiBSZW1vdmVzIGFuIGFnZW50IGFuZCBpdHMgYXNzb2NpYXRlZFxuICogZWZmZWN0IG9uIGl0cyBhZmZlY3RlZCBCb2RpZXMuXG4gKlxuICogQG1ldGhvZCBkZXRhY2hcbiAqIEBwYXJhbSBhZ2VudElEIHtBZ2VudElkfSBUaGUgYWdlbnRJZCBvZiBhIHByZXZpb3VzbHkgZGVmaW5lZCBhZ2VudFxuICovXG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbiBkZXRhY2goaWQpIHtcbiAgICAvLyBkZXRhY2ggZnJvbSBmb3JjZXMvY29uc3RyYWludHMgYXJyYXlcbiAgICB2YXIgYWdlbnQgPSB0aGlzLmdldEFnZW50KGlkKTtcbiAgICB2YXIgYWdlbnRBcnJheSA9IF9tYXBBZ2VudEFycmF5LmNhbGwodGhpcywgYWdlbnQpO1xuICAgIHZhciBpbmRleCA9IGFnZW50QXJyYXkuaW5kZXhPZihpZCk7XG4gICAgYWdlbnRBcnJheS5zcGxpY2UoaW5kZXgsMSk7XG5cbiAgICAvLyBkZXRhY2ggYWdlbnRzIGFycmF5XG4gICAgZGVsZXRlIHRoaXMuX2FnZW50c1tpZF07XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhIHNpbmdsZSBCb2R5IGZyb20gYSBwcmV2aW91c2x5IGRlZmluZWQgYWdlbnQuXG4gKlxuICogQG1ldGhvZCBkZXRhY2hcbiAqIEBwYXJhbSBhZ2VudElEIHtBZ2VudElkfSBUaGUgYWdlbnRJZCBvZiBhIHByZXZpb3VzbHkgZGVmaW5lZCBhZ2VudFxuICogQHBhcmFtIHRhcmdldCB7Qm9keX0gVGhlIGJvZHkgdG8gcmVtb3ZlIGZyb20gdGhlIGFnZW50XG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmRldGFjaEZyb20gPSBmdW5jdGlvbiBkZXRhY2hGcm9tKGlkLCB0YXJnZXQpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IF9nZXRCb3VuZEFnZW50LmNhbGwodGhpcywgaWQpO1xuICAgIGlmIChib3VuZEFnZW50LnNvdXJjZSA9PT0gdGFyZ2V0KSB0aGlzLmRldGFjaChpZCk7XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciB0YXJnZXRzID0gYm91bmRBZ2VudC50YXJnZXRzO1xuICAgICAgICB2YXIgaW5kZXggPSB0YXJnZXRzLmluZGV4T2YodGFyZ2V0KTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHRhcmdldHMuc3BsaWNlKGluZGV4LDEpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQSBjb252ZW5pZW5jZSBtZXRob2QgdG8gZ2l2ZSB0aGUgUGh5c2ljcyBFbmdpbmUgYSBjbGVhbiBzbGF0ZSBvZlxuICogYWdlbnRzLiBQcmVzZXJ2ZXMgYWxsIGFkZGVkIEJvZHkgb2JqZWN0cy5cbiAqXG4gKiBAbWV0aG9kIGRldGFjaEFsbFxuICovXG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5kZXRhY2hBbGwgPSBmdW5jdGlvbiBkZXRhY2hBbGwoKSB7XG4gICAgdGhpcy5fYWdlbnRzICAgICAgICA9IHt9O1xuICAgIHRoaXMuX2ZvcmNlcyAgICAgICAgPSBbXTtcbiAgICB0aGlzLl9jb25zdHJhaW50cyAgID0gW107XG4gICAgdGhpcy5fY3VyckFnZW50SWQgICA9IDA7XG59O1xuXG5mdW5jdGlvbiBfZ2V0Qm91bmRBZ2VudChpZCkge1xuICAgIHJldHVybiB0aGlzLl9hZ2VudHNbaWRdO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgYWdlbnQgZ2l2ZW4gaXRzIGFnZW50SWQuXG4gKlxuICogQG1ldGhvZCBnZXRBZ2VudFxuICogQHBhcmFtIGlkIHtBZ2VudElkfVxuICovXG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRBZ2VudCA9IGZ1bmN0aW9uIGdldEFnZW50KGlkKSB7XG4gICAgcmV0dXJuIF9nZXRCb3VuZEFnZW50LmNhbGwodGhpcywgaWQpLmFnZW50O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBwYXJ0aWNsZXMgdGhhdCBhcmUgY3VycmVudGx5IG1hbmFnZWQgYnkgdGhlIFBoeXNpY3MgRW5naW5lLlxuICpcbiAqIEBtZXRob2QgZ2V0UGFydGljbGVzXG4gKiBAcmV0dXJuIHBhcnRpY2xlcyB7QXJyYXkuUGFydGljbGVzfVxuICovXG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRQYXJ0aWNsZXMgPSBmdW5jdGlvbiBnZXRQYXJ0aWNsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnRpY2xlcztcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbGwgYm9kaWVzLCBleGNlcHQgcGFydGljbGVzLCB0aGF0IGFyZSBjdXJyZW50bHkgbWFuYWdlZCBieSB0aGUgUGh5c2ljcyBFbmdpbmUuXG4gKlxuICogQG1ldGhvZCBnZXRCb2RpZXNcbiAqIEByZXR1cm4gYm9kaWVzIHtBcnJheS5Cb2RpZXN9XG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEJvZGllcyA9IGZ1bmN0aW9uIGdldEJvZGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYm9kaWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBib2RpZXMgdGhhdCBhcmUgY3VycmVudGx5IG1hbmFnZWQgYnkgdGhlIFBoeXNpY3MgRW5naW5lLlxuICpcbiAqIEBtZXRob2QgZ2V0Qm9kaWVzXG4gKiBAcmV0dXJuIGJvZGllcyB7QXJyYXkuQm9kaWVzfVxuICovXG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRQYXJ0aWNsZXNBbmRCb2RpZXMgPSBmdW5jdGlvbiBnZXRQYXJ0aWNsZXNBbmRCb2RpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGFydGljbGVzKCkuY29uY2F0KHRoaXMuZ2V0Qm9kaWVzKCkpO1xufTtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGV2ZXJ5IFBhcnRpY2xlIGFuZCBhcHBsaWVzIGEgZnVuY3Rpb24gd2hvc2UgZmlyc3RcbiAqIGFyZ3VtZW50IGlzIHRoZSBQYXJ0aWNsZVxuICpcbiAqIEBtZXRob2QgZm9yRWFjaFBhcnRpY2xlXG4gKiBAcGFyYW0gZm4ge0Z1bmN0aW9ufSBGdW5jdGlvbiB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSBbZHRdIHtOdW1iZXJ9IERlbHRhIHRpbWVcbiAqL1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaFBhcnRpY2xlID0gZnVuY3Rpb24gZm9yRWFjaFBhcnRpY2xlKGZuLCBkdCkge1xuICAgIHZhciBwYXJ0aWNsZXMgPSB0aGlzLmdldFBhcnRpY2xlcygpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuID0gcGFydGljbGVzLmxlbmd0aDsgaW5kZXggPCBsZW47IGluZGV4KyspXG4gICAgICAgIGZuLmNhbGwodGhpcywgcGFydGljbGVzW2luZGV4XSwgZHQpO1xufTtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGV2ZXJ5IEJvZHkgdGhhdCBpc24ndCBhIFBhcnRpY2xlIGFuZCBhcHBsaWVzXG4gKiBhIGZ1bmN0aW9uIHdob3NlIGZpcnN0IGFyZ3VtZW50IGlzIHRoZSBCb2R5XG4gKlxuICogQG1ldGhvZCBmb3JFYWNoQm9keVxuICogQHBhcmFtIGZuIHtGdW5jdGlvbn0gRnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0gW2R0XSB7TnVtYmVyfSBEZWx0YSB0aW1lXG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmZvckVhY2hCb2R5ID0gZnVuY3Rpb24gZm9yRWFjaEJvZHkoZm4sIGR0KSB7XG4gICAgaWYgKCF0aGlzLl9oYXNCb2RpZXMpIHJldHVybjtcbiAgICB2YXIgYm9kaWVzID0gdGhpcy5nZXRCb2RpZXMoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbiA9IGJvZGllcy5sZW5ndGg7IGluZGV4IDwgbGVuOyBpbmRleCsrKVxuICAgICAgICBmbi5jYWxsKHRoaXMsIGJvZGllc1tpbmRleF0sIGR0KTtcbn07XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBldmVyeSBCb2R5IGFuZCBhcHBsaWVzIGEgZnVuY3Rpb24gd2hvc2UgZmlyc3RcbiAqIGFyZ3VtZW50IGlzIHRoZSBCb2R5XG4gKlxuICogQG1ldGhvZCBmb3JFYWNoXG4gKiBAcGFyYW0gZm4ge0Z1bmN0aW9ufSBGdW5jdGlvbiB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSBbZHRdIHtOdW1iZXJ9IERlbHRhIHRpbWVcbiAqL1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4sIGR0KSB7XG4gICAgdGhpcy5mb3JFYWNoUGFydGljbGUoZm4sIGR0KTtcbiAgICB0aGlzLmZvckVhY2hCb2R5KGZuLCBkdCk7XG59O1xuXG5mdW5jdGlvbiBfdXBkYXRlRm9yY2UoaW5kZXgpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IF9nZXRCb3VuZEFnZW50LmNhbGwodGhpcywgdGhpcy5fZm9yY2VzW2luZGV4XSk7XG4gICAgYm91bmRBZ2VudC5hZ2VudC5hcHBseUZvcmNlKGJvdW5kQWdlbnQudGFyZ2V0cywgYm91bmRBZ2VudC5zb3VyY2UpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlRm9yY2VzKCkge1xuICAgIGZvciAodmFyIGluZGV4ID0gdGhpcy5fZm9yY2VzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgIF91cGRhdGVGb3JjZS5jYWxsKHRoaXMsIGluZGV4KTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUNvbnN0cmFpbnQoaW5kZXgsIGR0KSB7XG4gICAgdmFyIGJvdW5kQWdlbnQgPSB0aGlzLl9hZ2VudHNbdGhpcy5fY29uc3RyYWludHNbaW5kZXhdXTtcbiAgICByZXR1cm4gYm91bmRBZ2VudC5hZ2VudC5hcHBseUNvbnN0cmFpbnQoYm91bmRBZ2VudC50YXJnZXRzLCBib3VuZEFnZW50LnNvdXJjZSwgZHQpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlQ29uc3RyYWludHMoZHQpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gMDtcbiAgICB3aGlsZSAoaXRlcmF0aW9uIDwgdGhpcy5vcHRpb25zLmNvbnN0cmFpbnRTdGVwcykge1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2NvbnN0cmFpbnRzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgICAgICBfdXBkYXRlQ29uc3RyYWludC5jYWxsKHRoaXMsIGluZGV4LCBkdCk7XG4gICAgICAgIGl0ZXJhdGlvbisrO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX3VwZGF0ZVZlbG9jaXRpZXMocGFydGljbGUsIGR0KSB7XG4gICAgcGFydGljbGUuaW50ZWdyYXRlVmVsb2NpdHkoZHQpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlQW5ndWxhclZlbG9jaXRpZXMoYm9keSwgZHQpIHtcbiAgICBib2R5LmludGVncmF0ZUFuZ3VsYXJNb21lbnR1bShkdCk7XG4gICAgYm9keS51cGRhdGVBbmd1bGFyVmVsb2NpdHkoKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZU9yaWVudGF0aW9ucyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlT3JpZW50YXRpb24oZHQpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlUG9zaXRpb25zKHBhcnRpY2xlLCBkdCkge1xuICAgIHBhcnRpY2xlLmludGVncmF0ZVBvc2l0aW9uKGR0KTtcbiAgICBwYXJ0aWNsZS5lbWl0KCd1cGRhdGUnLCBwYXJ0aWNsZSk7XG59XG5cbmZ1bmN0aW9uIF9pbnRlZ3JhdGUoZHQpIHtcbiAgICBfdXBkYXRlRm9yY2VzLmNhbGwodGhpcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaChfdXBkYXRlVmVsb2NpdGllcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoX3VwZGF0ZUFuZ3VsYXJWZWxvY2l0aWVzLCBkdCk7XG4gICAgX3VwZGF0ZUNvbnN0cmFpbnRzLmNhbGwodGhpcywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoX3VwZGF0ZU9yaWVudGF0aW9ucywgZHQpO1xuICAgIHRoaXMuZm9yRWFjaChfdXBkYXRlUG9zaXRpb25zLCBkdCk7XG59XG5cbmZ1bmN0aW9uIF9nZXRFbmVyZ3lQYXJ0aWNsZXMoKSB7XG4gICAgdmFyIGVuZXJneSA9IDAuMDtcbiAgICB2YXIgcGFydGljbGVFbmVyZ3kgPSAwLjA7XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHBhcnRpY2xlKSB7XG4gICAgICAgIHBhcnRpY2xlRW5lcmd5ID0gcGFydGljbGUuZ2V0RW5lcmd5KCk7XG4gICAgICAgIGVuZXJneSArPSBwYXJ0aWNsZUVuZXJneTtcbiAgICAgICAgaWYgKHBhcnRpY2xlRW5lcmd5IDwgcGFydGljbGUuc2xlZXBUb2xlcmFuY2UpIHBhcnRpY2xlLnNsZWVwKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGVuZXJneTtcbn1cblxuZnVuY3Rpb24gX2dldEVuZXJneUZvcmNlcygpIHtcbiAgICB2YXIgZW5lcmd5ID0gMDtcbiAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2ZvcmNlcy5sZW5ndGggLSAxOyBpbmRleCA+IC0xOyBpbmRleC0tKVxuICAgICAgICBlbmVyZ3kgKz0gdGhpcy5fZm9yY2VzW2luZGV4XS5nZXRFbmVyZ3koKSB8fCAwLjA7XG4gICAgcmV0dXJuIGVuZXJneTtcbn1cblxuZnVuY3Rpb24gX2dldEVuZXJneUNvbnN0cmFpbnRzKCkge1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGluZGV4ID0gdGhpcy5fY29uc3RyYWludHMubGVuZ3RoIC0gMTsgaW5kZXggPiAtMTsgaW5kZXgtLSlcbiAgICAgICAgZW5lcmd5ICs9IHRoaXMuX2NvbnN0cmFpbnRzW2luZGV4XS5nZXRFbmVyZ3koKSB8fCAwLjA7XG4gICAgcmV0dXJuIGVuZXJneTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBraW5ldGljIGVuZXJneSBvZiBhbGwgQm9keSBvYmplY3RzIGFuZCBwb3RlbnRpYWwgZW5lcmd5XG4gKiBvZiBhbGwgYXR0YWNoZWQgYWdlbnRzLlxuICpcbiAqIFRPRE86IGltcGxlbWVudC5cbiAqIEBtZXRob2QgZ2V0RW5lcmd5XG4gKiBAcmV0dXJuIGVuZXJneSB7TnVtYmVyfVxuICovXG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIF9nZXRFbmVyZ3lQYXJ0aWNsZXMuY2FsbCh0aGlzKSArIF9nZXRFbmVyZ3lGb3JjZXMuY2FsbCh0aGlzKSArIF9nZXRFbmVyZ3lDb25zdHJhaW50cy5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIGFsbCBCb2R5IG9iamVjdHMgbWFuYWdlZCBieSB0aGUgcGh5c2ljcyBlbmdpbmUgb3ZlciB0aGVcbiAqIHRpbWUgZHVyYXRpb24gc2luY2UgdGhlIGxhc3QgdGltZSBzdGVwIHdhcyBjYWxsZWQuXG4gKlxuICogQG1ldGhvZCBzdGVwXG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiBzdGVwKCkge1xuLy8gICAgICAgIGlmICh0aGlzLmdldEVuZXJneSgpIDwgdGhpcy5vcHRpb25zLnNsZWVwVG9sZXJhbmNlKSB7XG4vLyAgICAgICAgICAgIHRoaXMuc2xlZXAoKTtcbi8vICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgIH07XG5cbiAgICAvL3NldCBjdXJyZW50IGZyYW1lJ3MgdGltZVxuICAgIHZhciBjdXJyVGltZSA9IG5vdygpO1xuXG4gICAgLy9taWxsaXNlY29uZHMgZWxhcHNlZCBzaW5jZSBsYXN0IGZyYW1lXG4gICAgdmFyIGR0RnJhbWUgPSBjdXJyVGltZSAtIHRoaXMuX3ByZXZUaW1lO1xuXG4gICAgdGhpcy5fcHJldlRpbWUgPSBjdXJyVGltZTtcblxuICAgIGlmIChkdEZyYW1lIDwgTUlOX1RJTUVfU1RFUCkgcmV0dXJuO1xuICAgIGlmIChkdEZyYW1lID4gTUFYX1RJTUVfU1RFUCkgZHRGcmFtZSA9IE1BWF9USU1FX1NURVA7XG5cbiAgICAvL3JvYnVzdCBpbnRlZ3JhdGlvblxuLy8gICAgICAgIHRoaXMuX2J1ZmZlciArPSBkdEZyYW1lO1xuLy8gICAgICAgIHdoaWxlICh0aGlzLl9idWZmZXIgPiB0aGlzLl90aW1lc3RlcCl7XG4vLyAgICAgICAgICAgIF9pbnRlZ3JhdGUuY2FsbCh0aGlzLCB0aGlzLl90aW1lc3RlcCk7XG4vLyAgICAgICAgICAgIHRoaXMuX2J1ZmZlciAtPSB0aGlzLl90aW1lc3RlcDtcbi8vICAgICAgICB9O1xuLy8gICAgICAgIF9pbnRlZ3JhdGUuY2FsbCh0aGlzLCB0aGlzLl9idWZmZXIpO1xuLy8gICAgICAgIHRoaXMuX2J1ZmZlciA9IDAuMDtcbiAgICBfaW50ZWdyYXRlLmNhbGwodGhpcywgVElNRVNURVApO1xuXG4vLyAgICAgICAgdGhpcy5lbWl0KCd1cGRhdGUnLCB0aGlzKTtcbn07XG5cbi8qKlxuICogVGVsbHMgd2hldGhlciB0aGUgUGh5c2ljcyBFbmdpbmUgaXMgc2xlZXBpbmcgb3IgYXdha2UuXG4gKiBAbWV0aG9kIGlzU2xlZXBpbmdcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmlzU2xlZXBpbmcgPSBmdW5jdGlvbiBpc1NsZWVwaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1NsZWVwaW5nO1xufTtcblxuLyoqXG4gKiBTdG9wcyB0aGUgUGh5c2ljcyBFbmdpbmUgZnJvbSB1cGRhdGluZy4gRW1pdHMgYW4gJ2VuZCcgZXZlbnQuXG4gKiBAbWV0aG9kIHNsZWVwXG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnNsZWVwID0gZnVuY3Rpb24gc2xlZXAoKSB7XG4gICAgdGhpcy5lbWl0KCdlbmQnLCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogU3RhcnRzIHRoZSBQaHlzaWNzIEVuZ2luZSBmcm9tIHVwZGF0aW5nLiBFbWl0cyBhbiAnc3RhcnQnIGV2ZW50LlxuICogQG1ldGhvZCB3YWtlXG4gKi9cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLndha2UgPSBmdW5jdGlvbiB3YWtlKCkge1xuICAgIHRoaXMuX3ByZXZUaW1lID0gbm93KCk7XG4gICAgdGhpcy5lbWl0KCdzdGFydCcsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbn07XG5cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5fZXZlbnRIYW5kbGVyID09PSBudWxsKSByZXR1cm47XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLmVtaXQodHlwZSwgZGF0YSk7XG59O1xuXG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbikge1xuICAgIGlmICh0aGlzLl9ldmVudEhhbmRsZXIgPT09IG51bGwpIHRoaXMuX2V2ZW50SGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIub24oZXZlbnQsIGZuKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0VuZ2luZTsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBkYXZpZEBmYW1vLnVzXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcbiAqL1xuXG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vLi4vbWF0aC9WZWN0b3InKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuLi8uLi9jb3JlL1RyYW5zZm9ybScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgSW50ZWdyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlcicpO1xuXG4vKipcbiAqIEEgcG9pbnQgYm9keSB0aGF0IGlzIGNvbnRyb2xsZWQgYnkgdGhlIFBoeXNpY3MgRW5naW5lLiBBIHBhcnRpY2xlIGhhc1xuICogICBwb3NpdGlvbiBhbmQgdmVsb2NpdHkgc3RhdGVzIHRoYXQgYXJlIHVwZGF0ZWQgYnkgdGhlIFBoeXNpY3MgRW5naW5lLlxuICogICBVbHRpbWF0ZWx5LCBhIHBhcnRpY2xlIGlzIGEgX3NwZWNpYWwgdHlwZSBvZiBtb2RpZmllciwgYW5kIGNhbiBiZSBhZGRlZCB0b1xuICogICB0aGUgRmFtb3VzIHJlbmRlciB0cmVlIGxpa2UgYW55IG90aGVyIG1vZGlmaWVyLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGNsYXNzIFBhcnRpY2xlXG4gKiBAdXNlcyBFdmVudEhhbmRsZXJcbiAqIEB1c2VzIE1vZGlmaWVyXG4gKiBAZXh0ZW5zaW9uZm9yIEJvZHlcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdIEFuIG9iamVjdCBvZiBjb25maWd1cmFibGUgb3B0aW9ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLnBvc2l0aW9uXSBUaGUgcG9zaXRpb24gb2YgdGhlIHBhcnRpY2xlLlxuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMudmVsb2NpdHldIFRoZSB2ZWxvY2l0eSBvZiB0aGUgcGFydGljbGUuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWFzc10gVGhlIG1hc3Mgb2YgdGhlIHBhcnRpY2xlLlxuICogQHBhcmFtIHtIZXhhZGVjaW1hbH0gW29wdGlvbnMuYXhpc10gVGhlIGF4aXMgYSBwYXJ0aWNsZSBjYW4gbW92ZSBhbG9uZy4gQ2FuIGJlIGJpdHdpc2UgT1JlZCBlLmcuLCBQYXJ0aWNsZS5BWEVTLlgsIFBhcnRpY2xlLkFYRVMuWCB8IFBhcnRpY2xlLkFYRVMuWVxuICpcbiAqL1xuIGZ1bmN0aW9uIFBhcnRpY2xlKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIHJlZ2lzdGVyc1xuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmZvcmNlICAgID0gbmV3IFZlY3RvcigpO1xuXG4gICAgdmFyIGRlZmF1bHRzICA9IFBhcnRpY2xlLkRFRkFVTFRfT1BUSU9OUztcblxuICAgIC8vIHNldCB2ZWN0b3JzXG4gICAgdGhpcy5zZXRQb3NpdGlvbihvcHRpb25zLnBvc2l0aW9uIHx8IGRlZmF1bHRzLnBvc2l0aW9uKTtcbiAgICB0aGlzLnNldFZlbG9jaXR5KG9wdGlvbnMudmVsb2NpdHkgfHwgZGVmYXVsdHMudmVsb2NpdHkpO1xuICAgIHRoaXMuZm9yY2Uuc2V0KG9wdGlvbnMuZm9yY2UgfHwgWzAsMCwwXSk7XG5cbiAgICAvLyBzZXQgc2NhbGFyc1xuICAgIHRoaXMubWFzcyA9IChvcHRpb25zLm1hc3MgIT09IHVuZGVmaW5lZClcbiAgICAgICAgPyBvcHRpb25zLm1hc3NcbiAgICAgICAgOiBkZWZhdWx0cy5tYXNzO1xuXG4gICAgdGhpcy5heGlzID0gKG9wdGlvbnMuYXhpcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICA/IG9wdGlvbnMuYXhpc1xuICAgICAgICA6IGRlZmF1bHRzLmF4aXM7XG5cbiAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIHRoaXMubWFzcztcblxuICAgIC8vIHN0YXRlIHZhcmlhYmxlc1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgICAgID0gZmFsc2U7XG4gICAgdGhpcy5fZW5naW5lICAgICAgICAgPSBudWxsO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ICAgID0gbnVsbDtcbiAgICB0aGlzLl9wb3NpdGlvbkdldHRlciA9IG51bGw7XG5cbiAgICB0aGlzLnRyYW5zZm9ybSA9IFRyYW5zZm9ybS5pZGVudGl0eS5zbGljZSgpO1xuXG4gICAgLy8gY2FjaGVkIF9zcGVjXG4gICAgdGhpcy5fc3BlYyA9IHtcbiAgICAgICAgdHJhbnNmb3JtIDogdGhpcy50cmFuc2Zvcm0sXG4gICAgICAgIHRhcmdldCAgICA6IG51bGxcbiAgICB9O1xufVxuXG5QYXJ0aWNsZS5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcG9zaXRpb24gOiBbMCwwLDBdLFxuICAgIHZlbG9jaXR5IDogWzAsMCwwXSxcbiAgICBtYXNzIDogMSxcbiAgICBheGlzIDogdW5kZWZpbmVkXG59O1xuXG4vKipcbiAqIEtpbmV0aWMgZW5lcmd5IHRocmVzaG9sZCBuZWVkZWQgdG8gdXBkYXRlIHRoZSBib2R5XG4gKlxuICogQHByb3BlcnR5IFNMRUVQX1RPTEVSQU5DRVxuICogQHR5cGUgTnVtYmVyXG4gKiBAc3RhdGljXG4gKiBAZGVmYXVsdCAxZS03XG4gKi9cblBhcnRpY2xlLlNMRUVQX1RPTEVSQU5DRSA9IDFlLTc7XG5cbi8qKlxuICogQXhlcyBieSB3aGljaCBhIGJvZHkgY2FuIHRyYW5zbGF0ZVxuICpcbiAqIEBwcm9wZXJ0eSBBWEVTXG4gKiBAdHlwZSBIZXhhZGVjaW1hbFxuICogQHN0YXRpY1xuICogQGRlZmF1bHQgMWUtN1xuICovXG5QYXJ0aWNsZS5BWEVTID0ge1xuICAgIFggOiAweDAwLCAvLyBoZXhhZGVjaW1hbCBmb3IgMFxuICAgIFkgOiAweDAxLCAvLyBoZXhhZGVjaW1hbCBmb3IgMVxuICAgIFogOiAweDAyICAvLyBoZXhhZGVjaW1hbCBmb3IgMlxufTtcblxuLy8gSW50ZWdyYXRvciBmb3IgdXBkYXRpbmcgdGhlIHBhcnRpY2xlJ3Mgc3RhdGVcbi8vIFRPRE86IG1ha2UgdGhpcyBhIHNpbmdsZXRvblxuUGFydGljbGUuSU5URUdSQVRPUiA9IG5ldyBJbnRlZ3JhdG9yKCk7XG5cbi8vQ2F0YWxvZ3VlIG9mIG91dHB1dHRlZCBldmVudHNcbnZhciBfZXZlbnRzID0ge1xuICAgIHN0YXJ0ICA6ICdzdGFydCcsXG4gICAgdXBkYXRlIDogJ3VwZGF0ZScsXG4gICAgZW5kICAgIDogJ2VuZCdcbn07XG5cbi8vIENhY2hlZCB0aW1pbmcgZnVuY3Rpb25cbnZhciBub3cgPSAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIERhdGUubm93O1xufSkoKTtcblxuLyoqXG4gKiBTdG9wcyB0aGUgcGFydGljbGUgZnJvbSB1cGRhdGluZ1xuICogQG1ldGhvZCBzbGVlcFxuICovXG5QYXJ0aWNsZS5wcm90b3R5cGUuc2xlZXAgPSBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICBpZiAodGhpcy5faXNTbGVlcGluZykgcmV0dXJuO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLmVuZCwgdGhpcyk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IHRydWU7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyB0aGUgcGFydGljbGUgdXBkYXRlXG4gKiBAbWV0aG9kIHdha2VcbiAqL1xuUGFydGljbGUucHJvdG90eXBlLndha2UgPSBmdW5jdGlvbiB3YWtlKCkge1xuICAgIGlmICghdGhpcy5faXNTbGVlcGluZykgcmV0dXJuO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLnN0YXJ0LCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBub3coKTtcbn07XG5cbi8qKlxuICogQGF0dHJpYnV0ZSBpc0JvZHlcbiAqIEB0eXBlIEJvb2xlYW5cbiAqIEBzdGF0aWNcbiAqL1xuUGFydGljbGUucHJvdG90eXBlLmlzQm9keSA9IGZhbHNlO1xuXG4vKipcbiAqIEJhc2ljIHNldHRlciBmb3IgcG9zaXRpb25cbiAqIEBtZXRob2QgZ2V0UG9zaXRpb25cbiAqIEBwYXJhbSBwb3NpdGlvbiB7QXJyYXl8VmVjdG9yfVxuICovXG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiBzZXRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgIHRoaXMucG9zaXRpb24uc2V0KHBvc2l0aW9uKTtcbn07XG5cbi8qKlxuICogMS1kaW1lbnNpb25hbCBzZXR0ZXIgZm9yIHBvc2l0aW9uXG4gKiBAbWV0aG9kIHNldFBvc2l0aW9uMURcbiAqIEBwYXJhbSB2YWx1ZSB7TnVtYmVyfVxuICovXG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0UG9zaXRpb24xRCA9IGZ1bmN0aW9uIHNldFBvc2l0aW9uMUQoeCkge1xuICAgIHRoaXMucG9zaXRpb24ueCA9IHg7XG59O1xuXG4vKipcbiAqIEJhc2ljIGdldHRlciBmdW5jdGlvbiBmb3IgcG9zaXRpb25cbiAqIEBtZXRob2QgZ2V0UG9zaXRpb25cbiAqIEByZXR1cm4gcG9zaXRpb24ge0FycmF5fVxuICovXG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5fcG9zaXRpb25HZXR0ZXIgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLl9wb3NpdGlvbkdldHRlcigpKTtcblxuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG5cbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5nZXQoKTtcbn07XG5cbi8qKlxuICogMS1kaW1lbnNpb25hbCBnZXR0ZXIgZm9yIHBvc2l0aW9uXG4gKiBAbWV0aG9kIGdldFBvc2l0aW9uMURcbiAqIEByZXR1cm4gdmFsdWUge051bWJlcn1cbiAqL1xuUGFydGljbGUucHJvdG90eXBlLmdldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBnZXRQb3NpdGlvbjFEKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcbn07XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgcG9zaXRpb24gZnJvbSBvdXRzaWRlIHRoZSBQaHlzaWNzIEVuZ2luZVxuICogQG1ldGhvZCBwb3NpdGlvbkZyb21cbiAqIEBwYXJhbSBwb3NpdGlvbkdldHRlciB7RnVuY3Rpb259XG4gKi9cblBhcnRpY2xlLnByb3RvdHlwZS5wb3NpdGlvbkZyb20gPSBmdW5jdGlvbiBwb3NpdGlvbkZyb20ocG9zaXRpb25HZXR0ZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbkdldHRlciA9IHBvc2l0aW9uR2V0dGVyO1xufTtcblxuLyoqXG4gKiBCYXNpYyBzZXR0ZXIgZnVuY3Rpb24gZm9yIHZlbG9jaXR5IFZlY3RvclxuICogQG1ldGhvZCBzZXRWZWxvY2l0eVxuICogQGZ1bmN0aW9uXG4gKi9cblBhcnRpY2xlLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHZlbG9jaXR5KSB7XG4gICAgdGhpcy52ZWxvY2l0eS5zZXQodmVsb2NpdHkpO1xuICAgIHRoaXMud2FrZSgpO1xufTtcblxuLyoqXG4gKiAxLWRpbWVuc2lvbmFsIHNldHRlciBmb3IgdmVsb2NpdHlcbiAqIEBtZXRob2Qgc2V0VmVsb2NpdHkxRFxuICogQHBhcmFtIHZlbG9jaXR5IHtOdW1iZXJ9XG4gKi9cblBhcnRpY2xlLnByb3RvdHlwZS5zZXRWZWxvY2l0eTFEID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkxRCh4KSB7XG4gICAgdGhpcy52ZWxvY2l0eS54ID0geDtcbiAgICB0aGlzLndha2UoKTtcbn07XG5cbi8qKlxuICogQmFzaWMgZ2V0dGVyIGZ1bmN0aW9uIGZvciB2ZWxvY2l0eSBWZWN0b3JcbiAqIEBtZXRob2QgZ2V0VmVsb2NpdHlcbiAqIEByZXR1cm4gdmVsb2NpdHkge0FycmF5fVxuICovXG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy52ZWxvY2l0eS5nZXQoKTtcbn07XG5cbi8qKlxuICogMS1kaW1lbnNpb25hbCBnZXR0ZXIgZm9yIHZlbG9jaXR5XG4gKiBAbWV0aG9kIGdldFZlbG9jaXR5MURcbiAqIEByZXR1cm4gdmVsb2NpdHkge051bWJlcn1cbiAqL1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5MUQgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eTFEKCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5Lng7XG59O1xuXG4vKipcbiAqIEJhc2ljIHNldHRlciBmdW5jdGlvbiBmb3IgbWFzcyBxdWFudGl0eVxuICogQG1ldGhvZCBzZXRNYXNzXG4gKiBAcGFyYW0gbWFzcyB7TnVtYmVyfSBtYXNzXG4gKi9cblBhcnRpY2xlLnByb3RvdHlwZS5zZXRNYXNzID0gZnVuY3Rpb24gc2V0TWFzcyhtYXNzKSB7XG4gICAgdGhpcy5tYXNzID0gbWFzcztcbiAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIG1hc3M7XG59O1xuXG4vKipcbiAqIEJhc2ljIGdldHRlciBmdW5jdGlvbiBmb3IgbWFzcyBxdWFudGl0eVxuICogQG1ldGhvZCBnZXRNYXNzXG4gKiBAcmV0dXJuIG1hc3Mge051bWJlcn1cbiAqL1xuUGFydGljbGUucHJvdG90eXBlLmdldE1hc3MgPSBmdW5jdGlvbiBnZXRNYXNzKCkge1xuICAgIHJldHVybiB0aGlzLm1hc3M7XG59O1xuXG4vKipcbiAqIFJlc2V0IHBvc2l0aW9uIGFuZCB2ZWxvY2l0eVxuICogQG1ldGhvZCByZXNldFxuICogQHBhcmFtIHBvc2l0aW9uIHtBcnJheXxWZWN0b3J9XG4gKiBAcGFyYW0gdmVsb2NpdHkge0FycmF5fFZlY3Rvcn1cbiAqL1xuUGFydGljbGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQocG9zaXRpb24sIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvbihwb3NpdGlvbiB8fCBbMCwwLDBdKTtcbiAgICB0aGlzLnNldFZlbG9jaXR5KHZlbG9jaXR5IHx8IFswLDAsMF0pO1xufTtcblxuLyoqXG4gKiBBZGQgZm9yY2UgdmVjdG9yIHRvIGV4aXN0aW5nIGludGVybmFsIGZvcmNlIFZlY3RvclxuICogQG1ldGhvZCBhcHBseUZvcmNlXG4gKiBAcGFyYW0gZm9yY2Uge1ZlY3Rvcn1cbiAqL1xuUGFydGljbGUucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKGZvcmNlKSB7XG4gICAgaWYgKGZvcmNlLmlzWmVybygpKSByZXR1cm47XG4gICAgdGhpcy5mb3JjZS5hZGQoZm9yY2UpLnB1dCh0aGlzLmZvcmNlKTtcbiAgICB0aGlzLndha2UoKTtcbn07XG5cbi8qKlxuICogQWRkIGltcHVsc2UgKGNoYW5nZSBpbiB2ZWxvY2l0eSkgVmVjdG9yIHRvIHRoaXMgVmVjdG9yJ3MgdmVsb2NpdHkuXG4gKiBAbWV0aG9kIGFwcGx5SW1wdWxzZVxuICogQHBhcmFtIGltcHVsc2Uge1ZlY3Rvcn1cbiAqL1xuUGFydGljbGUucHJvdG90eXBlLmFwcGx5SW1wdWxzZSA9IGZ1bmN0aW9uIGFwcGx5SW1wdWxzZShpbXB1bHNlKSB7XG4gICAgaWYgKGltcHVsc2UuaXNaZXJvKCkpIHJldHVybjtcbiAgICB2YXIgdmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHZlbG9jaXR5LmFkZChpbXB1bHNlLm11bHQodGhpcy5pbnZlcnNlTWFzcykpLnB1dCh2ZWxvY2l0eSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBhIHBhcnRpY2xlJ3MgdmVsb2NpdHkgZnJvbSBpdHMgZm9yY2UgYWNjdW11bGF0b3JcbiAqIEBtZXRob2QgaW50ZWdyYXRlVmVsb2NpdHlcbiAqIEBwYXJhbSBkdCB7TnVtYmVyfSBUaW1lIGRpZmZlcmVudGlhbFxuICovXG5QYXJ0aWNsZS5wcm90b3R5cGUuaW50ZWdyYXRlVmVsb2NpdHkgPSBmdW5jdGlvbiBpbnRlZ3JhdGVWZWxvY2l0eShkdCkge1xuICAgIFBhcnRpY2xlLklOVEVHUkFUT1IuaW50ZWdyYXRlVmVsb2NpdHkodGhpcywgZHQpO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgYSBwYXJ0aWNsZSdzIHBvc2l0aW9uIGZyb20gaXRzIHZlbG9jaXR5XG4gKiBAbWV0aG9kIGludGVncmF0ZVBvc2l0aW9uXG4gKiBAcGFyYW0gZHQge051bWJlcn0gVGltZSBkaWZmZXJlbnRpYWxcbiAqL1xuUGFydGljbGUucHJvdG90eXBlLmludGVncmF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlUG9zaXRpb24oZHQpIHtcbiAgICBQYXJ0aWNsZS5JTlRFR1JBVE9SLmludGVncmF0ZVBvc2l0aW9uKHRoaXMsIGR0KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBwb3NpdGlvbiBhbmQgdmVsb2NpdHkgb2YgdGhlIHBhcnRpY2xlXG4gKiBAbWV0aG9kIF9pbnRlZ3JhdGVcbiAqIEBwcm90ZWN0ZWRcbiAqIEBwYXJhbSBkdCB7TnVtYmVyfSBUaW1lIGRpZmZlcmVudGlhbFxuICovXG5QYXJ0aWNsZS5wcm90b3R5cGUuX2ludGVncmF0ZSA9IGZ1bmN0aW9uIF9pbnRlZ3JhdGUoZHQpIHtcbiAgICB0aGlzLmludGVncmF0ZVZlbG9jaXR5KGR0KTtcbiAgICB0aGlzLmludGVncmF0ZVBvc2l0aW9uKGR0KTtcbn07XG5cbi8qKlxuICogR2V0IGtpbmV0aWMgZW5lcmd5IG9mIHRoZSBwYXJ0aWNsZS5cbiAqIEBtZXRob2QgZ2V0RW5lcmd5XG4gKiBAZnVuY3Rpb25cbiAqL1xuUGFydGljbGUucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMC41ICogdGhpcy5tYXNzICogdGhpcy52ZWxvY2l0eS5ub3JtU3F1YXJlZCgpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0cmFuc2Zvcm0gZnJvbSB0aGUgY3VycmVudCBwb3NpdGlvbiBzdGF0ZVxuICogQG1ldGhvZCBnZXRUcmFuc2Zvcm1cbiAqIEByZXR1cm4gVHJhbnNmb3JtIHtUcmFuc2Zvcm19XG4gKi9cblBhcnRpY2xlLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgdGhpcy5fZW5naW5lLnN0ZXAoKTtcblxuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgdmFyIGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtO1xuXG4gICAgaWYgKGF4aXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXhpcyAmIH5QYXJ0aWNsZS5BWEVTLlgpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLnggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChheGlzICYgflBhcnRpY2xlLkFYRVMuWSkge1xuICAgICAgICAgICAgcG9zaXRpb24ueSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF4aXMgJiB+UGFydGljbGUuQVhFUy5aKSB7XG4gICAgICAgICAgICBwb3NpdGlvbi56ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zZm9ybVsxMl0gPSBwb3NpdGlvbi54O1xuICAgIHRyYW5zZm9ybVsxM10gPSBwb3NpdGlvbi55O1xuICAgIHRyYW5zZm9ybVsxNF0gPSBwb3NpdGlvbi56O1xuXG4gICAgcmV0dXJuIHRyYW5zZm9ybTtcbn07XG5cbi8qKlxuICogVGhlIG1vZGlmeSBpbnRlcmZhY2Ugb2YgYSBNb2RpZmllclxuICogQG1ldGhvZCBtb2RpZnlcbiAqIEBwYXJhbSB0YXJnZXQge1NwZWN9XG4gKiBAcmV0dXJuIFNwZWMge1NwZWN9XG4gKi9cblBhcnRpY2xlLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgdmFyIF9zcGVjID0gdGhpcy5fc3BlYztcbiAgICBfc3BlYy50cmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuICAgIF9zcGVjLnRhcmdldCA9IHRhcmdldDtcbiAgICByZXR1cm4gX3NwZWM7XG59O1xuXG4vLyBwcml2YXRlXG5mdW5jdGlvbiBfY3JlYXRlRXZlbnRPdXRwdXQoKSB7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgLy9vdmVycmlkZXMgb24vcmVtb3ZlTGlzdGVuZXIvcGlwZS91bnBpcGUgbWV0aG9kc1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cblxuUGFydGljbGUucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGRhdGEpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50T3V0cHV0KSByZXR1cm47XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCh0eXBlLCBkYXRhKTtcbn07XG5cblBhcnRpY2xlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2xlOyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogT3duZXI6IGRhdmlkQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuXG4vKipcbiAqICBBbGxvd3MgZm9yIHR3byBjaXJjdWxhciBib2RpZXMgdG8gY29sbGlkZSBhbmQgYm91bmNlIG9mZiBlYWNoIG90aGVyLlxuICpcbiAqICBAY2xhc3MgQ29uc3RyYWludFxuICogIEBjb25zdHJ1Y3RvclxuICogIEB1c2VzIEV2ZW50SGFuZGxlclxuICogIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIENvbnN0cmFpbnQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX2VuZXJneSA9IDAuMDtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG51bGw7XG59XG5cbi8qXG4gKiBTZXR0ZXIgZm9yIG9wdGlvbnMuXG4gKlxuICogQG1ldGhvZCBzZXRPcHRpb25zXG4gKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0c31cbiAqL1xuQ29uc3RyYWludC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbn07XG5cbi8qKlxuICogQWRkcyBhbiBpbXB1bHNlIHRvIGEgcGh5c2ljcyBib2R5J3MgdmVsb2NpdHkgZHVlIHRvIHRoZSBjb25zdHJhaW50XG4gKlxuICogQG1ldGhvZCBhcHBseUNvbnN0cmFpbnRcbiAqL1xuQ29uc3RyYWludC5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50ID0gZnVuY3Rpb24gYXBwbHlDb25zdHJhaW50KCkge307XG5cbi8qKlxuICogR2V0dGVyIGZvciBlbmVyZ3lcbiAqXG4gKiBAbWV0aG9kIGdldEVuZXJneVxuICogQHJldHVybiBlbmVyZ3kge051bWJlcn1cbiAqL1xuQ29uc3RyYWludC5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiB0aGlzLl9lbmVyZ3k7XG59O1xuXG4vKipcbiAqIFNldHRlciBmb3IgZW5lcmd5XG4gKlxuICogQG1ldGhvZCBzZXRFbmVyZ3lcbiAqIEBwYXJhbSBlbmVyZ3kge051bWJlcn1cbiAqL1xuQ29uc3RyYWludC5wcm90b3R5cGUuc2V0RW5lcmd5ID0gZnVuY3Rpb24gc2V0RW5lcmd5KGVuZXJneSkge1xuICAgIHRoaXMuX2VuZXJneSA9IGVuZXJneTtcbn07XG5cbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5iaW5kVGhpcyh0aGlzKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5cbkNvbnN0cmFpbnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5Db25zdHJhaW50LnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuQ29uc3RyYWludC5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbkNvbnN0cmFpbnQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5Db25zdHJhaW50LnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnN0cmFpbnQ7IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBPd25lcjogZGF2aWRAZmFtby51c1xuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XG4gKi9cblxudmFyIENvbnN0cmFpbnQgPSByZXF1aXJlKCcuL0NvbnN0cmFpbnQnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCcuLi8uLi9tYXRoL1ZlY3RvcicpO1xuXG4vKipcbiAqICBBIHNwcmluZyBjb25zdHJhaW50IGlzIGxpa2UgYSBzcHJpbmcgZm9yY2UsIGV4Y2VwdCB0aGF0IGl0IGlzIGFsd2F5c1xuICogICAgbnVtZXJpY2FsbHkgc3RhYmxlIChldmVuIGZvciBsb3cgcGVyaW9kcyksIGF0IHRoZSBleHBlbnNlIG9mIGludHJvZHVjaW5nXG4gKiAgICBkYW1waW5nIChldmVuIHdpdGggZGFtcGluZ1JhdGlvIHNldCB0byAwKS5cbiAqXG4gKiAgICBVc2UgdGhpcyBpZiB5b3UgbmVlZCBmYXN0IHNwcmluZy1saWtlIGJlaGF2aW9yLCBlLmcuLCBzbmFwcGluZ1xuICpcbiAqICBAY2xhc3MgU25hcFxuICogIEBjb25zdHJ1Y3RvclxuICogIEBleHRlbmRzIENvbnN0cmFpbnRcbiAqICBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXSBBbiBvYmplY3Qgb2YgY29uZmlndXJhYmxlIG9wdGlvbnMuXG4gKiAgQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnBlcmlvZF0gVGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyB0YWtlbiBmb3Igb25lIGNvbXBsZXRlIG9zY2lsbGF0aW9uIHdoZW4gdGhlcmUgaXMgbm8gZGFtcGluZy4gUmFuZ2UgOiBbMTUwLCBJbmZpbml0eV1cbiAqICBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGFtcGluZ1JhdGlvXSBBZGRpdGlvbmFsIGRhbXBpbmcgb2YgdGhlIHNwcmluZy4gUmFuZ2UgOiBbMCwgMV0uIEF0IDAgdGhpcyBzcHJpbmcgd2lsbCBzdGlsbCBiZSBkYW1wZWQsIGF0IDEgdGhlIHNwcmluZyB3aWxsIGJlIGNyaXRpY2FsbHkgZGFtcGVkICh0aGUgc3ByaW5nIHdpbGwgbmV2ZXIgb3NjaWxsYXRlKVxuICogIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5sZW5ndGhdIFRoZSByZXN0IGxlbmd0aCBvZiB0aGUgc3ByaW5nLiBSYW5nZTogWzAsIEluZmluaXR5XS5cbiAqICBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5hbmNob3JdIFRoZSBsb2NhdGlvbiBvZiB0aGUgc3ByaW5nJ3MgYW5jaG9yLCBpZiBub3QgYW5vdGhlciBwaHlzaWNzIGJvZHkuXG4gKlxuICovXG5mdW5jdGlvbiBTbmFwKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucykgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy9yZWdpc3RlcnNcbiAgICB0aGlzLnBEaWZmICA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnZEaWZmICA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UxID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuaW1wdWxzZTIgPSBuZXcgVmVjdG9yKCk7XG5cbiAgICBDb25zdHJhaW50LmNhbGwodGhpcyk7XG59XG5cblNuYXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb25zdHJhaW50LnByb3RvdHlwZSk7XG5TbmFwLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNuYXA7XG5cblNuYXAuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZCAgICAgICAgOiAzMDAsXG4gICAgZGFtcGluZ1JhdGlvIDogMC4xLFxuICAgIGxlbmd0aCA6IDAsXG4gICAgYW5jaG9yIDogdW5kZWZpbmVkXG59O1xuXG4vKiogY29uc3QgKi8gdmFyIHBpID0gTWF0aC5QSTtcblxuZnVuY3Rpb24gX2NhbGNFbmVyZ3koaW1wdWxzZSwgZGlzcCwgZHQpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoaW1wdWxzZS5kb3QoZGlzcCkvZHQpO1xufVxuXG4vKipcbiAqIEJhc2ljIG9wdGlvbnMgc2V0dGVyXG4gKlxuICogQG1ldGhvZCBzZXRPcHRpb25zXG4gKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0c30gb3B0aW9uc1xuICovXG5TbmFwLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuYW5jaG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yICAgaW5zdGFuY2VvZiBWZWN0b3IpIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvcjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uIGluc3RhbmNlb2YgVmVjdG9yKSB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3IucG9zaXRpb247XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciAgIGluc3RhbmNlb2YgQXJyYXkpICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcihvcHRpb25zLmFuY2hvcik7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZGFtcGluZ1JhdGlvICE9PSB1bmRlZmluZWQpIHRoaXMub3B0aW9ucy5kYW1waW5nUmF0aW8gPSBvcHRpb25zLmRhbXBpbmdSYXRpbztcbiAgICBpZiAob3B0aW9ucy5wZXJpb2QgIT09IHVuZGVmaW5lZCkgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGFuY2hvciBwb3NpdGlvblxuICpcbiAqIEBtZXRob2Qgc2V0T3B0aW9uc1xuICogQHBhcmFtIHtBcnJheX0gdiBUT0RPXG4gKi9cblxuU25hcC5wcm90b3R5cGUuc2V0QW5jaG9yID0gZnVuY3Rpb24gc2V0QW5jaG9yKHYpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuY2hvciAhPT0gdW5kZWZpbmVkKSB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMub3B0aW9ucy5hbmNob3Iuc2V0KHYpO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIGVuZXJneSBvZiBzcHJpbmdcbiAqXG4gKiBAbWV0aG9kIGdldEVuZXJneVxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBUT0RPXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRPRE9cbiAqIEByZXR1cm4gZW5lcmd5IHtOdW1iZXJ9XG4gKi9cblNuYXAucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBvcHRpb25zICAgICA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcmVzdExlbmd0aCAgPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yICAgICAgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIHN0cmVuZ3RoICAgID0gTWF0aC5wb3coMiAqIHBpIC8gb3B0aW9ucy5wZXJpb2QsIDIpO1xuXG4gICAgdmFyIGRpc3QgPSBhbmNob3Iuc3ViKHRhcmdldC5wb3NpdGlvbikubm9ybSgpIC0gcmVzdExlbmd0aDtcblxuICAgIHJldHVybiAwLjUgKiBzdHJlbmd0aCAqIGRpc3QgKiBkaXN0O1xufTtcblxuLyoqXG4gKiBBZGRzIGEgc3ByaW5nIGltcHVsc2UgdG8gYSBwaHlzaWNzIGJvZHkncyB2ZWxvY2l0eSBkdWUgdG8gdGhlIGNvbnN0cmFpbnRcbiAqXG4gKiBAbWV0aG9kIGFwcGx5Q29uc3RyYWludFxuICogQHBhcmFtIHRhcmdldHMge0FycmF5LkJvZHl9ICBBcnJheSBvZiBib2RpZXMgdG8gYXBwbHkgdGhlIGNvbnN0cmFpbnQgdG9cbiAqIEBwYXJhbSBzb3VyY2Uge0JvZHl9ICAgICAgICAgVGhlIHNvdXJjZSBvZiB0aGUgY29uc3RyYWludFxuICogQHBhcmFtIGR0IHtOdW1iZXJ9ICAgICAgICAgICBEZWx0YSB0aW1lXG4gKi9cblNuYXAucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KSB7XG4gICAgdmFyIG9wdGlvbnMgICAgICAgICA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcERpZmYgICAgICAgID0gdGhpcy5wRGlmZjtcbiAgICB2YXIgdkRpZmYgICAgICAgID0gdGhpcy52RGlmZjtcbiAgICB2YXIgaW1wdWxzZTEgICAgID0gdGhpcy5pbXB1bHNlMTtcbiAgICB2YXIgaW1wdWxzZTIgICAgID0gdGhpcy5pbXB1bHNlMjtcbiAgICB2YXIgbGVuZ3RoICAgICAgID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGFuY2hvciAgICAgICA9IG9wdGlvbnMuYW5jaG9yIHx8IHNvdXJjZS5wb3NpdGlvbjtcbiAgICB2YXIgcGVyaW9kICAgICAgID0gb3B0aW9ucy5wZXJpb2Q7XG4gICAgdmFyIGRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcblxuICAgICAgICB2YXIgcDEgPSB0YXJnZXQucG9zaXRpb247XG4gICAgICAgIHZhciB2MSA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgdmFyIG0xID0gdGFyZ2V0Lm1hc3M7XG4gICAgICAgIHZhciB3MSA9IHRhcmdldC5pbnZlcnNlTWFzcztcblxuICAgICAgICBwRGlmZi5zZXQocDEuc3ViKGFuY2hvcikpO1xuICAgICAgICB2YXIgZGlzdCA9IHBEaWZmLm5vcm0oKSAtIGxlbmd0aDtcbiAgICAgICAgdmFyIGVmZk1hc3M7XG5cbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIHcyID0gc291cmNlLmludmVyc2VNYXNzO1xuICAgICAgICAgICAgdmFyIHYyID0gc291cmNlLnZlbG9jaXR5O1xuICAgICAgICAgICAgdkRpZmYuc2V0KHYxLnN1Yih2MikpO1xuICAgICAgICAgICAgZWZmTWFzcyA9IDEvKHcxICsgdzIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdkRpZmYuc2V0KHYxKTtcbiAgICAgICAgICAgIGVmZk1hc3MgPSBtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBnYW1tYTtcbiAgICAgICAgdmFyIGJldGE7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZXJpb2QgPT09IDApIHtcbiAgICAgICAgICAgIGdhbW1hID0gMDtcbiAgICAgICAgICAgIGJldGEgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGsgPSA0ICogZWZmTWFzcyAqIHBpICogcGkgLyAocGVyaW9kICogcGVyaW9kKTtcbiAgICAgICAgICAgIHZhciBjID0gNCAqIGVmZk1hc3MgKiBwaSAqIGRhbXBpbmdSYXRpbyAvIHBlcmlvZDtcblxuICAgICAgICAgICAgYmV0YSAgPSBkdCAqIGsgLyAoYyArIGR0ICogayk7XG4gICAgICAgICAgICBnYW1tYSA9IDEgLyAoYyArIGR0KmspO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFudGlEcmlmdCA9IGJldGEvZHQgKiBkaXN0O1xuICAgICAgICBwRGlmZi5ub3JtYWxpemUoLWFudGlEcmlmdClcbiAgICAgICAgICAgIC5zdWIodkRpZmYpXG4gICAgICAgICAgICAubXVsdChkdCAvIChnYW1tYSArIGR0L2VmZk1hc3MpKVxuICAgICAgICAgICAgLnB1dChpbXB1bHNlMSk7XG5cbiAgICAgICAgLy8gdmFyIG4gPSBuZXcgVmVjdG9yKCk7XG4gICAgICAgIC8vIG4uc2V0KHBEaWZmLm5vcm1hbGl6ZSgpKTtcbiAgICAgICAgLy8gdmFyIGxhbWJkYSA9IC0obi5kb3QodkRpZmYpICsgYW50aURyaWZ0KSAvIChnYW1tYSArIGR0L2VmZk1hc3MpO1xuICAgICAgICAvLyBpbXB1bHNlMi5zZXQobi5tdWx0KGR0KmxhbWJkYSkpO1xuXG4gICAgICAgIHRhcmdldC5hcHBseUltcHVsc2UoaW1wdWxzZTEpO1xuXG4gICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIGltcHVsc2UxLm11bHQoLTEpLnB1dChpbXB1bHNlMik7XG4gICAgICAgICAgICBzb3VyY2UuYXBwbHlJbXB1bHNlKGltcHVsc2UyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RW5lcmd5KF9jYWxjRW5lcmd5KGltcHVsc2UxLCBwRGlmZiwgZHQpKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNuYXA7IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBPd25lcjogZGF2aWRAZmFtby51c1xuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XG4gKi9cblxudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xuXG4vKipcbiAqIE9yZGluYXJ5IERpZmZlcmVudGlhbCBFcXVhdGlvbiAoT0RFKSBJbnRlZ3JhdG9yLlxuICogTWFuYWdlcyB1cGRhdGluZyBhIHBoeXNpY3MgYm9keSdzIHN0YXRlIG92ZXIgdGltZS5cbiAqXG4gKiAgcCA9IHBvc2l0aW9uLCB2ID0gdmVsb2NpdHksIG0gPSBtYXNzLCBmID0gZm9yY2UsIGR0ID0gY2hhbmdlIGluIHRpbWVcbiAqXG4gKiAgICAgIHYgPC0gdiArIGR0ICogZiAvIG1cbiAqICAgICAgcCA8LSBwICsgZHQgKiB2XG4gKlxuICogIHEgPSBvcmllbnRhdGlvbiwgdyA9IGFuZ3VsYXIgdmVsb2NpdHksIEwgPSBhbmd1bGFyIG1vbWVudHVtXG4gKlxuICogICAgICBMIDwtIEwgKyBkdCAqIHRcbiAqICAgICAgcSA8LSBxICsgZHQvMiAqIHEgKiB3XG4gKlxuICogQGNsYXNzIFN5bXBsZWN0aWNFdWxlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIHRvIHNldFxuICovXG5mdW5jdGlvbiBTeW1wbGVjdGljRXVsZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoU3ltcGxlY3RpY0V1bGVyLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zKSB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG59XG5cbi8qKlxuICogQHByb3BlcnR5IFN5bXBsZWN0aWNFdWxlci5ERUZBVUxUX09QVElPTlNcbiAqIEB0eXBlIE9iamVjdFxuICogQHByb3RlY3RlZFxuICogQHN0YXRpY1xuICovXG5TeW1wbGVjdGljRXVsZXIuREVGQVVMVF9PUFRJT05TID0ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1heGltdW0gdmVsb2NpdHkgb2YgYSBwaHlzaWNzIGJvZHlcbiAgICAgKiAgICAgIFJhbmdlIDogWzAsIEluZmluaXR5XVxuICAgICAqIEBhdHRyaWJ1dGUgdmVsb2NpdHlDYXBcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cblxuICAgIHZlbG9jaXR5Q2FwIDogdW5kZWZpbmVkLFxuXG4gICAgLyoqXG4gICAgICogVGhlIG1heGltdW0gYW5ndWxhciB2ZWxvY2l0eSBvZiBhIHBoeXNpY3MgYm9keVxuICAgICAqICAgICAgUmFuZ2UgOiBbMCwgSW5maW5pdHldXG4gICAgICogQGF0dHJpYnV0ZSBhbmd1bGFyVmVsb2NpdHlDYXBcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICBhbmd1bGFyVmVsb2NpdHlDYXAgOiB1bmRlZmluZWRcbn07XG5cbi8qXG4gKiBTZXR0ZXIgZm9yIG9wdGlvbnNcbiAqXG4gKiBAbWV0aG9kIHNldE9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cblN5bXBsZWN0aWNFdWxlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnBhdGNoKG9wdGlvbnMpO1xufTtcblxuLypcbiAqIEdldHRlciBmb3Igb3B0aW9uc1xuICpcbiAqIEBtZXRob2QgZ2V0T3B0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSBvcHRpb25zXG4gKi9cblN5bXBsZWN0aWNFdWxlci5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnZhbHVlKCk7XG59O1xuXG4vKlxuICogVXBkYXRlcyB0aGUgdmVsb2NpdHkgb2YgYSBwaHlzaWNzIGJvZHkgZnJvbSBpdHMgYWNjdW11bGF0ZWQgZm9yY2UuXG4gKiAgICAgIHYgPC0gdiArIGR0ICogZiAvIG1cbiAqXG4gKiBAbWV0aG9kIGludGVncmF0ZVZlbG9jaXR5XG4gKiBAcGFyYW0ge0JvZHl9IHBoeXNpY3MgYm9keVxuICogQHBhcmFtIHtOdW1iZXJ9IGR0IGRlbHRhIHRpbWVcbiAqL1xuU3ltcGxlY3RpY0V1bGVyLnByb3RvdHlwZS5pbnRlZ3JhdGVWZWxvY2l0eSA9IGZ1bmN0aW9uIGludGVncmF0ZVZlbG9jaXR5KGJvZHksIGR0KSB7XG4gICAgdmFyIHYgPSBib2R5LnZlbG9jaXR5O1xuICAgIHZhciB3ID0gYm9keS5pbnZlcnNlTWFzcztcbiAgICB2YXIgZiA9IGJvZHkuZm9yY2U7XG5cbiAgICBpZiAoZi5pc1plcm8oKSkgcmV0dXJuO1xuXG4gICAgdi5hZGQoZi5tdWx0KGR0ICogdykpLnB1dCh2KTtcbiAgICBmLmNsZWFyKCk7XG59O1xuXG4vKlxuICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgYSBwaHlzaWNzIGJvZHkgZnJvbSBpdHMgdmVsb2NpdHkuXG4gKiAgICAgIHAgPC0gcCArIGR0ICogdlxuICpcbiAqIEBtZXRob2QgaW50ZWdyYXRlUG9zaXRpb25cbiAqIEBwYXJhbSB7Qm9keX0gcGh5c2ljcyBib2R5XG4gKiBAcGFyYW0ge051bWJlcn0gZHQgZGVsdGEgdGltZVxuICovXG5TeW1wbGVjdGljRXVsZXIucHJvdG90eXBlLmludGVncmF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlUG9zaXRpb24oYm9keSwgZHQpIHtcbiAgICB2YXIgcCA9IGJvZHkucG9zaXRpb247XG4gICAgdmFyIHYgPSBib2R5LnZlbG9jaXR5O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy52ZWxvY2l0eUNhcCkgdi5jYXAodGhpcy5vcHRpb25zLnZlbG9jaXR5Q2FwKS5wdXQodik7XG4gICAgcC5hZGQodi5tdWx0KGR0KSkucHV0KHApO1xufTtcblxuLypcbiAqIFVwZGF0ZXMgdGhlIGFuZ3VsYXIgbW9tZW50dW0gb2YgYSBwaHlzaWNzIGJvZHkgZnJvbSBpdHMgYWNjdW11bGVkIHRvcnF1ZS5cbiAqICAgICAgTCA8LSBMICsgZHQgKiB0XG4gKlxuICogQG1ldGhvZCBpbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW1cbiAqIEBwYXJhbSB7Qm9keX0gcGh5c2ljcyBib2R5IChleGNlcHQgYSBwYXJ0aWNsZSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdCBkZWx0YSB0aW1lXG4gKi9cblN5bXBsZWN0aWNFdWxlci5wcm90b3R5cGUuaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtID0gZnVuY3Rpb24gaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtKGJvZHksIGR0KSB7XG4gICAgdmFyIEwgPSBib2R5LmFuZ3VsYXJNb21lbnR1bTtcbiAgICB2YXIgdCA9IGJvZHkudG9ycXVlO1xuXG4gICAgaWYgKHQuaXNaZXJvKCkpIHJldHVybjtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5ndWxhclZlbG9jaXR5Q2FwKSB0LmNhcCh0aGlzLm9wdGlvbnMuYW5ndWxhclZlbG9jaXR5Q2FwKS5wdXQodCk7XG4gICAgTC5hZGQodC5tdWx0KGR0KSkucHV0KEwpO1xuICAgIHQuY2xlYXIoKTtcbn07XG5cbi8qXG4gKiBVcGRhdGVzIHRoZSBvcmllbnRhdGlvbiBvZiBhIHBoeXNpY3MgYm9keSBmcm9tIGl0cyBhbmd1bGFyIHZlbG9jaXR5LlxuICogICAgICBxIDwtIHEgKyBkdC8yICogcSAqIHdcbiAqXG4gKiBAbWV0aG9kIGludGVncmF0ZU9yaWVudGF0aW9uXG4gKiBAcGFyYW0ge0JvZHl9IHBoeXNpY3MgYm9keSAoZXhjZXB0IGEgcGFydGljbGUpXG4gKiBAcGFyYW0ge051bWJlcn0gZHQgZGVsdGEgdGltZVxuICovXG5TeW1wbGVjdGljRXVsZXIucHJvdG90eXBlLmludGVncmF0ZU9yaWVudGF0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlT3JpZW50YXRpb24oYm9keSwgZHQpIHtcbiAgICB2YXIgcSA9IGJvZHkub3JpZW50YXRpb247XG4gICAgdmFyIHcgPSBib2R5LmFuZ3VsYXJWZWxvY2l0eTtcblxuICAgIGlmICh3LmlzWmVybygpKSByZXR1cm47XG4gICAgcS5hZGQocS5tdWx0aXBseSh3KS5zY2FsYXJNdWx0aXBseSgwLjUgKiBkdCkpLnB1dChxKTtcbi8vICAgICAgICBxLm5vcm1hbGl6ZS5wdXQocSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bXBsZWN0aWNFdWxlcjsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBkYXZpZEBmYW1vLnVzXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcbiAqL1xuXG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5cbi8qKlxuICogVHJhbnNpdGlvbiBtZXRhLW1ldGhvZCB0byBzdXBwb3J0IHRyYW5zaXRpb25pbmcgbXVsdGlwbGVcbiAqICAgdmFsdWVzIHdpdGggc2NhbGFyLW9ubHkgbWV0aG9kcy5cbiAqXG4gKlxuICogQGNsYXNzIE11bHRpcGxlVHJhbnNpdGlvblxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG1ldGhvZCBUcmFuc2lvbmFibGUgY2xhc3MgdG8gbXVsdGlwbGV4XG4gKi9cbmZ1bmN0aW9uIE11bHRpcGxlVHJhbnNpdGlvbihtZXRob2QpIHtcbiAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICB0aGlzLl9pbnN0YW5jZXMgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0gW107XG59XG5cbk11bHRpcGxlVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IHRydWU7XG5cbi8qKlxuICogR2V0IHRoZSBzdGF0ZSBvZiBlYWNoIHRyYW5zaXRpb24uXG4gKlxuICogQG1ldGhvZCBnZXRcbiAqXG4gKiBAcmV0dXJuIHN0YXRlIHtOdW1iZXJ8QXJyYXl9IHN0YXRlIGFycmF5XG4gKi9cbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc3RhdGVbaV0gPSB0aGlzLl9pbnN0YW5jZXNbaV0uZ2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGVuZCBzdGF0ZXMgd2l0aCBhIHNoYXJlZCB0cmFuc2l0aW9uLCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrLlxuICpcbiAqIEBtZXRob2Qgc2V0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ8QXJyYXl9IGVuZFN0YXRlIEZpbmFsIFN0YXRlLiAgVXNlIGEgbXVsdGktZWxlbWVudCBhcmd1bWVudCBmb3IgbXVsdGlwbGUgdHJhbnNpdGlvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uIGRlZmluaXRpb24sIHNoYXJlZCBhbW9uZyBhbGwgaW5zdGFuY2VzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsZWQgd2hlbiBhbGwgZW5kU3RhdGVzIGhhdmUgYmVlbiByZWFjaGVkLlxuICovXG5NdWx0aXBsZVRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgX2FsbENhbGxiYWNrID0gVXRpbGl0eS5hZnRlcihlbmRTdGF0ZS5sZW5ndGgsIGNhbGxiYWNrKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZFN0YXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2VzW2ldKSB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgKHRoaXMubWV0aG9kKSgpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0uc2V0KGVuZFN0YXRlW2ldLCB0cmFuc2l0aW9uLCBfYWxsQ2FsbGJhY2spO1xuICAgIH1cbn07XG5cbi8qKlxuICogUmVzZXQgYWxsIHRyYW5zaXRpb25zIHRvIHN0YXJ0IHN0YXRlLlxuICpcbiAqIEBtZXRob2QgcmVzZXRcbiAqXG4gKiBAcGFyYW0gIHtOdW1iZXJ8QXJyYXl9IHN0YXJ0U3RhdGUgU3RhcnQgc3RhdGVcbiAqL1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0U3RhdGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0U3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pIHRoaXMuX2luc3RhbmNlc1tpXSA9IG5ldyAodGhpcy5tZXRob2QpKCk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXS5yZXNldChzdGFydFN0YXRlW2ldKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlVHJhbnNpdGlvbjsiLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICpcbiAqIE93bmVyOiBkYXZpZEBmYW1vLnVzXG4gKiBAbGljZW5zZSBNUEwgMi4wXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcbiAqL1xuXG52YXIgUEUgPSByZXF1aXJlKCcuLi9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKTtcbnZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4uL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyk7XG52YXIgU3ByaW5nID0gcmVxdWlyZSgnLi4vcGh5c2ljcy9jb25zdHJhaW50cy9TbmFwJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnLi4vbWF0aC9WZWN0b3InKTtcblxuLyoqXG4gKiBTbmFwVHJhbnNpdGlvbiBpcyBhIG1ldGhvZCBvZiB0cmFuc2l0aW9uaW5nIGJldHdlZW4gdHdvIHZhbHVlcyAobnVtYmVycyxcbiAqIG9yIGFycmF5cyBvZiBudW1iZXJzKS4gSXQgaXMgc2ltaWxhciB0byBTcHJpbmdUcmFuc2l0aW9uIGV4Y2VwdFxuICogdGhlIHRyYW5zaXRpb24gY2FuIGJlIG11Y2ggZmFzdGVyIGFuZCBhbHdheXMgaGFzIGEgZGFtcGluZyBlZmZlY3QuXG4gKlxuICogQGNsYXNzIFNuYXBUcmFuc2l0aW9uXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0gW3N0YXRlPTBdIHtOdW1iZXJ8QXJyYXl9IEluaXRpYWwgc3RhdGVcbiAqL1xuZnVuY3Rpb24gU25hcFRyYW5zaXRpb24oc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IDA7XG5cbiAgICB0aGlzLmVuZFN0YXRlICA9IG5ldyBWZWN0b3Ioc3RhdGUpO1xuICAgIHRoaXMuaW5pdFN0YXRlID0gbmV3IFZlY3RvcigpO1xuXG4gICAgdGhpcy5fZGltZW5zaW9ucyAgICAgICA9IDE7XG4gICAgdGhpcy5fcmVzdFRvbGVyYW5jZSAgICA9IDFlLTEwO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSB0aGlzLl9yZXN0VG9sZXJhbmNlO1xuICAgIHRoaXMuX2NhbGxiYWNrICAgICAgICAgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLlBFICAgICAgID0gbmV3IFBFKCk7XG4gICAgdGhpcy5wYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xuICAgIHRoaXMuc3ByaW5nICAgPSBuZXcgU3ByaW5nKHthbmNob3IgOiB0aGlzLmVuZFN0YXRlfSk7XG5cbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2godGhpcy5zcHJpbmcsIHRoaXMucGFydGljbGUpO1xufVxuXG5TbmFwVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5cbi8qKlxuICogQHByb3BlcnR5IFNuYXBUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OU1xuICogQHR5cGUgT2JqZWN0XG4gKiBAcHJvdGVjdGVkXG4gKiBAc3RhdGljXG4gKi9cblNuYXBUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgdGFrZW4gZm9yIG9uZSBjb21wbGV0ZSBvc2NpbGxhdGlvblxuICAgICAqIHdoZW4gdGhlcmUgaXMgbm8gZGFtcGluZ1xuICAgICAqICAgIFJhbmdlIDogWzAsIEluZmluaXR5XVxuICAgICAqXG4gICAgICogQGF0dHJpYnV0ZSBwZXJpb2RcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKiBAZGVmYXVsdCAxMDBcbiAgICAgKi9cbiAgICBwZXJpb2QgOiAxMDAsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGFtcGluZyBvZiB0aGUgc25hcC5cbiAgICAgKiAgICBSYW5nZSA6IFswLCAxXVxuICAgICAqXG4gICAgICogQGF0dHJpYnV0ZSBkYW1waW5nUmF0aW9cbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKiBAZGVmYXVsdCAwLjJcbiAgICAgKi9cbiAgICBkYW1waW5nUmF0aW8gOiAwLjIsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5pdGlhbCB2ZWxvY2l0eSBvZiB0aGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEBhdHRyaWJ1dGUgdmVsb2NpdHlcbiAgICAgKiBAdHlwZSBOdW1iZXJ8QXJyYXlcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgdmVsb2NpdHkgOiAwXG59O1xuXG5mdW5jdGlvbiBfZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiB0aGlzLnBhcnRpY2xlLmdldEVuZXJneSgpICsgdGhpcy5zcHJpbmcuZ2V0RW5lcmd5KHRoaXMucGFydGljbGUpO1xufVxuXG5mdW5jdGlvbiBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlKCkge1xuICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtU3F1YXJlZCgpO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSAoZGlzdGFuY2UgPT09IDApXG4gICAgICAgID8gdGhpcy5fcmVzdFRvbGVyYW5jZVxuICAgICAgICA6IHRoaXMuX3Jlc3RUb2xlcmFuY2UgKiBkaXN0YW5jZTtcbn1cblxuZnVuY3Rpb24gX3NldFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmVuZFN0YXRlLnNldCh0YXJnZXQpO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cblxuZnVuY3Rpb24gX3dha2UoKSB7XG4gICAgdGhpcy5QRS53YWtlKCk7XG59XG5cbmZ1bmN0aW9uIF9zbGVlcCgpIHtcbiAgICB0aGlzLlBFLnNsZWVwKCk7XG59XG5cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnNldChwKTtcbn1cblxuZnVuY3Rpb24gX3NldFBhcnRpY2xlVmVsb2NpdHkodikge1xuICAgIHRoaXMucGFydGljbGUudmVsb2NpdHkuc2V0KHYpO1xufVxuXG5mdW5jdGlvbiBfZ2V0UGFydGljbGVQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX2RpbWVuc2lvbnMgPT09IDApXG4gICAgICAgID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKClcbiAgICAgICAgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVZlbG9jaXR5KCkge1xuICAgIHJldHVybiAodGhpcy5fZGltZW5zaW9ucyA9PT0gMClcbiAgICAgICAgPyB0aGlzLnBhcnRpY2xlLmdldFZlbG9jaXR5MUQoKVxuICAgICAgICA6IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkoKTtcbn1cblxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cblxuZnVuY3Rpb24gX3NldHVwRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgdmFyIGRlZmF1bHRzID0gU25hcFRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TO1xuICAgIGlmIChkZWZpbml0aW9uLnBlcmlvZCA9PT0gdW5kZWZpbmVkKSAgICAgICBkZWZpbml0aW9uLnBlcmlvZCAgICAgICA9IGRlZmF1bHRzLnBlcmlvZDtcbiAgICBpZiAoZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPT09IHVuZGVmaW5lZCkgZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPSBkZWZhdWx0cy5kYW1waW5nUmF0aW87XG4gICAgaWYgKGRlZmluaXRpb24udmVsb2NpdHkgPT09IHVuZGVmaW5lZCkgICAgIGRlZmluaXRpb24udmVsb2NpdHkgICAgID0gZGVmYXVsdHMudmVsb2NpdHk7XG5cbiAgICAvL3NldHVwIHNwcmluZ1xuICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICBwZXJpb2QgICAgICAgOiBkZWZpbml0aW9uLnBlcmlvZCxcbiAgICAgICAgZGFtcGluZ1JhdGlvIDogZGVmaW5pdGlvbi5kYW1waW5nUmF0aW9cbiAgICB9KTtcblxuICAgIC8vc2V0dXAgcGFydGljbGVcbiAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIGRlZmluaXRpb24udmVsb2NpdHkpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLlBFLmlzU2xlZXBpbmcoKSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYiA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoX2dldEVuZXJneS5jYWxsKHRoaXMpIDwgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSkge1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFswLDAsMF0pO1xuICAgICAgICBfc2xlZXAuY2FsbCh0aGlzKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBzdGF0ZSBhbmQgdmVsb2NpdHlcbiAqXG4gKiBAbWV0aG9kIHJlc2V0XG4gKlxuICogQHBhcmFtIHN0YXRlIHtOdW1iZXJ8QXJyYXl9ICAgICAgU3RhdGVcbiAqIEBwYXJhbSBbdmVsb2NpdHldIHtOdW1iZXJ8QXJyYXl9IFZlbG9jaXR5XG4gKi9cblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXRlLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSAoc3RhdGUgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgPyBzdGF0ZS5sZW5ndGhcbiAgICAgICAgOiAwO1xuXG4gICAgdGhpcy5pbml0U3RhdGUuc2V0KHN0YXRlKTtcbiAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIGlmICh2ZWxvY2l0eSkgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCB2ZWxvY2l0eSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgdW5kZWZpbmVkKTtcbn07XG5cbi8qKlxuICogR2V0dGVyIGZvciB2ZWxvY2l0eVxuICpcbiAqIEBtZXRob2QgZ2V0VmVsb2NpdHlcbiAqXG4gKiBAcmV0dXJuIHZlbG9jaXR5IHtOdW1iZXJ8QXJyYXl9XG4gKi9cblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBTZXR0ZXIgZm9yIHZlbG9jaXR5XG4gKlxuICogQG1ldGhvZCBzZXRWZWxvY2l0eVxuICpcbiAqIEByZXR1cm4gdmVsb2NpdHkge051bWJlcnxBcnJheX1cbiAqL1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLnNldFZlbG9jaXR5ID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkodmVsb2NpdHkpIHtcbiAgICB0aGlzLmNhbGwodGhpcywgX3NldFBhcnRpY2xlVmVsb2NpdHkodmVsb2NpdHkpKTtcbn07XG5cbi8qKlxuICogRGV0ZWN0cyB3aGV0aGVyIGEgdHJhbnNpdGlvbiBpcyBpbiBwcm9ncmVzc1xuICpcbiAqIEBtZXRob2QgaXNBY3RpdmVcbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuUEUuaXNTbGVlcGluZygpO1xufTtcblxuLyoqXG4gKiBIYWx0IHRoZSB0cmFuc2l0aW9uXG4gKlxuICogQG1ldGhvZCBoYWx0XG4gKi9cblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSB0cmFuc2l0aW9uXG5zICAgICAqXG4gKiBAbWV0aG9kIGdldFxuICpcbiAqIEByZXR1cm4gc3RhdGUge051bWJlcnxBcnJheX1cbiAqL1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcyk7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgZW5kIHBvc2l0aW9uIGFuZCB0cmFuc2l0aW9uLCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIG9uIGNvbXBsZXRpb24uXG4gKlxuICogQG1ldGhvZCBzZXRcbiAqXG4gKiBAcGFyYW0gc3RhdGUge051bWJlcnxBcnJheX0gICAgICBGaW5hbCBzdGF0ZVxuICogQHBhcmFtIFtkZWZpbml0aW9uXSB7T2JqZWN0fSAgICAgVHJhbnNpdGlvbiBkZWZpbml0aW9uXG4gKiBAcGFyYW0gW2NhbGxiYWNrXSB7RnVuY3Rpb259ICAgICBDYWxsYmFja1xuICovXG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHN0YXRlLCBkZWZpbml0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KHN0YXRlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IChzdGF0ZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICA/IHN0YXRlLmxlbmd0aFxuICAgICAgICA6IDA7XG5cbiAgICBfd2FrZS5jYWxsKHRoaXMpO1xuICAgIF9zZXR1cERlZmluaXRpb24uY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU25hcFRyYW5zaXRpb247IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cbiAqXG4gKiBPd25lcjogZGF2aWRAZmFtby51c1xuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XG4gKi9cblxudmFyIE11bHRpcGxlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVUcmFuc2l0aW9uJyk7XG52YXIgVHdlZW5UcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9Ud2VlblRyYW5zaXRpb24nKTtcblxuLyoqXG4gKiBBIHN0YXRlIG1haW50YWluZXIgZm9yIGEgc21vb3RoIHRyYW5zaXRpb24gYmV0d2VlblxuICogICAgbnVtZXJpY2FsbHktc3BlY2lmaWVkIHN0YXRlcy4gRXhhbXBsZSBudW1lcmljIHN0YXRlcyBpbmNsdWRlIGZsb2F0cyBvclxuICogICAgVHJhbnNmb3JtIG9iamVjdHMuXG4gKlxuICogQW4gaW5pdGlhbCBzdGF0ZSBpcyBzZXQgd2l0aCB0aGUgY29uc3RydWN0b3Igb3Igc2V0KHN0YXJ0U3RhdGUpLiBBXG4gKiAgICBjb3JyZXNwb25kaW5nIGVuZCBzdGF0ZSBhbmQgdHJhbnNpdGlvbiBhcmUgc2V0IHdpdGggc2V0KGVuZFN0YXRlLFxuICogICAgdHJhbnNpdGlvbikuIFN1YnNlcXVlbnQgY2FsbHMgdG8gc2V0KGVuZFN0YXRlLCB0cmFuc2l0aW9uKSBiZWdpbiBhdFxuICogICAgdGhlIGxhc3Qgc3RhdGUuIENhbGxzIHRvIGdldCh0aW1lc3RhbXApIHByb3ZpZGUgdGhlIGludGVycG9sYXRlZCBzdGF0ZVxuICogICAgYWxvbmcgdGhlIHdheS5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlcmUgaXMgbm8gZXZlbnQgbG9vcCBoZXJlIC0gY2FsbHMgdG8gZ2V0KCkgYXJlIHRoZSBvbmx5IHdheVxuICogICAgdG8gZmluZCBzdGF0ZSBwcm9qZWN0ZWQgdG8gdGhlIGN1cnJlbnQgKG9yIHByb3ZpZGVkKSB0aW1lIGFuZCBhcmVcbiAqICAgIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGNhbGxiYWNrcy4gVXN1YWxseSB0aGlzIGtpbmQgb2Ygb2JqZWN0IHdvdWxkXG4gKiAgICBiZSBwYXJ0IG9mIHRoZSByZW5kZXIoKSBwYXRoIG9mIGEgdmlzaWJsZSBjb21wb25lbnQuXG4gKlxuICogQGNsYXNzIFRyYW5zaXRpb25hYmxlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfEFycmF5Lk51bWJlcnxPYmplY3QuPG51bWJlcnxzdHJpbmcsIG51bWJlcj59IHN0YXJ0XG4gKiAgICBiZWdpbm5pbmcgc3RhdGVcbiAqL1xuZnVuY3Rpb24gVHJhbnNpdGlvbmFibGUoc3RhcnQpIHtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBbXTtcblxuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBudWxsO1xuXG4gICAgdGhpcy5zZXQoc3RhcnQpO1xufVxuXG52YXIgdHJhbnNpdGlvbk1ldGhvZHMgPSB7fTtcblxuVHJhbnNpdGlvbmFibGUucmVnaXN0ZXJNZXRob2QgPSBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZChuYW1lLCBlbmdpbmVDbGFzcykge1xuICAgIGlmICghKG5hbWUgaW4gdHJhbnNpdGlvbk1ldGhvZHMpKSB7XG4gICAgICAgIHRyYW5zaXRpb25NZXRob2RzW25hbWVdID0gZW5naW5lQ2xhc3M7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbn07XG5cblRyYW5zaXRpb25hYmxlLnVucmVnaXN0ZXJNZXRob2QgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyTWV0aG9kKG5hbWUpIHtcbiAgICBpZiAobmFtZSBpbiB0cmFuc2l0aW9uTWV0aG9kcykge1xuICAgICAgICBkZWxldGUgdHJhbnNpdGlvbk1ldGhvZHNbbmFtZV07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbn07XG5cbmZ1bmN0aW9uIF9sb2FkTmV4dCgpIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hY3Rpb25RdWV1ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLmdldCgpKTsgLy8gbm8gdXBkYXRlIHJlcXVpcmVkXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gdGhpcy5hY3Rpb25RdWV1ZS5zaGlmdCgpO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdGhpcy5jYWxsYmFja1F1ZXVlLnNoaWZ0KCk7XG5cbiAgICB2YXIgbWV0aG9kID0gbnVsbDtcbiAgICB2YXIgZW5kVmFsdWUgPSB0aGlzLmN1cnJlbnRBY3Rpb25bMF07XG4gICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLmN1cnJlbnRBY3Rpb25bMV07XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBPYmplY3QgJiYgdHJhbnNpdGlvbi5tZXRob2QpIHtcbiAgICAgICAgbWV0aG9kID0gdHJhbnNpdGlvbi5tZXRob2Q7XG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykgbWV0aG9kID0gdHJhbnNpdGlvbk1ldGhvZHNbbWV0aG9kXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1ldGhvZCA9IFR3ZWVuVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY3VycmVudE1ldGhvZCAhPT0gbWV0aG9kKSB7XG4gICAgICAgIGlmICghKGVuZFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBtZXRob2QuU1VQUE9SVFNfTVVMVElQTEUgPT09IHRydWUgfHwgZW5kVmFsdWUubGVuZ3RoIDw9IG1ldGhvZC5TVVBQT1JUU19NVUxUSVBMRSkge1xuICAgICAgICAgICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBuZXcgbWV0aG9kKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG5ldyBNdWx0aXBsZVRyYW5zaXRpb24obWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbWV0aG9kO1xuICAgIH1cblxuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnJlc2V0KHRoaXMuc3RhdGUsIHRoaXMudmVsb2NpdHkpO1xuICAgIGlmICh0aGlzLnZlbG9jaXR5ICE9PSB1bmRlZmluZWQpIHRyYW5zaXRpb24udmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnNldChlbmRWYWx1ZSwgdHJhbnNpdGlvbiwgX2xvYWROZXh0LmJpbmQodGhpcykpO1xufVxuXG4vKipcbiAqIEFkZCB0cmFuc2l0aW9uIHRvIGVuZCBzdGF0ZSB0byB0aGUgcXVldWUgb2YgcGVuZGluZyB0cmFuc2l0aW9ucy4gU3BlY2lhbFxuICogICAgVXNlOiBjYWxsaW5nIHdpdGhvdXQgYSB0cmFuc2l0aW9uIHJlc2V0cyB0aGUgb2JqZWN0IHRvIHRoYXQgc3RhdGUgd2l0aFxuICogICAgbm8gcGVuZGluZyBhY3Rpb25zXG4gKlxuICogQG1ldGhvZCBzZXRcbiAqXG4gKiBAcGFyYW0ge251bWJlcnxGYW1vdXNNYXRyaXh8QXJyYXkuTnVtYmVyfE9iamVjdC48bnVtYmVyLCBudW1iZXI+fSBlbmRTdGF0ZVxuICogICAgZW5kIHN0YXRlIHRvIHdoaWNoIHdlIGludGVycG9sYXRlXG4gKiBAcGFyYW0ge3RyYW5zaXRpb249fSB0cmFuc2l0aW9uIG9iamVjdCBvZiB0eXBlIHtkdXJhdGlvbjogbnVtYmVyLCBjdXJ2ZTpcbiAqICAgIGZbMCwxXSAtPiBbMCwxXSBvciBuYW1lfS4gSWYgdHJhbnNpdGlvbiBpcyBvbWl0dGVkLCBjaGFuZ2Ugd2lsbCBiZVxuICogICAgaW5zdGFudGFuZW91cy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKT19IGNhbGxiYWNrIFplcm8tYXJndW1lbnQgZnVuY3Rpb24gdG8gY2FsbCBvbiBvYnNlcnZlZFxuICogICAgY29tcGxldGlvbiAodD0xKVxuICovXG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghdHJhbnNpdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KGVuZFN0YXRlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgYWN0aW9uID0gW2VuZFN0YXRlLCB0cmFuc2l0aW9uXTtcbiAgICB0aGlzLmFjdGlvblF1ZXVlLnB1c2goYWN0aW9uKTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUucHVzaChjYWxsYmFjayk7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRBY3Rpb24pIF9sb2FkTmV4dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYW5jZWwgYWxsIHRyYW5zaXRpb25zIGFuZCByZXNldCB0byBhIHN0YWJsZSBzdGF0ZVxuICpcbiAqIEBtZXRob2QgcmVzZXRcbiAqXG4gKiBAcGFyYW0ge251bWJlcnxBcnJheS5OdW1iZXJ8T2JqZWN0LjxudW1iZXIsIG51bWJlcj59IHN0YXJ0U3RhdGVcbiAqICAgIHN0YWJsZSBzdGF0ZSB0byBzZXQgdG9cbiAqL1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRTdGF0ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBudWxsO1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXRlID0gc3RhcnRTdGF0ZTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gc3RhcnRWZWxvY2l0eTtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBbXTtcbn07XG5cbi8qKlxuICogQWRkIGRlbGF5IGFjdGlvbiB0byB0aGUgcGVuZGluZyBhY3Rpb24gcXVldWUgcXVldWUuXG4gKlxuICogQG1ldGhvZCBkZWxheVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBkZWxheSB0aW1lIChtcylcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFplcm8tYXJndW1lbnQgZnVuY3Rpb24gdG8gY2FsbCBvbiBvYnNlcnZlZFxuICogICAgY29tcGxldGlvbiAodD0xKVxuICovXG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiBkZWxheShkdXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpLCB7ZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICBjdXJ2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfX0sXG4gICAgICAgIGNhbGxiYWNrXG4gICAgKTtcbn07XG5cbi8qKlxuICogR2V0IGludGVycG9sYXRlZCBzdGF0ZSBvZiBjdXJyZW50IGFjdGlvbiBhdCBwcm92aWRlZCB0aW1lLiBJZiB0aGUgbGFzdFxuICogICAgYWN0aW9uIGhhcyBjb21wbGV0ZWQsIGludm9rZSBpdHMgY2FsbGJhY2suXG4gKlxuICogQG1ldGhvZCBnZXRcbiAqXG4gKiBAcGFyYW0ge251bWJlcj19IHRpbWVzdGFtcCBFdmFsdWF0ZSB0aGUgY3VydmUgYXQgYSBub3JtYWxpemVkIHZlcnNpb24gb2YgdGhpc1xuICogICAgdGltZS4gSWYgb21pdHRlZCwgdXNlIGN1cnJlbnQgdGltZS4gKFVuaXggZXBvY2ggdGltZSlcbiAqIEByZXR1cm4ge251bWJlcnxPYmplY3QuPG51bWJlcnxzdHJpbmcsIG51bWJlcj59IGJlZ2lubmluZyBzdGF0ZVxuICogICAgaW50ZXJwb2xhdGVkIHRvIHRoaXMgcG9pbnQgaW4gdGltZS5cbiAqL1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCh0aW1lc3RhbXApIHtcbiAgICBpZiAodGhpcy5fZW5naW5lSW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldFZlbG9jaXR5KVxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldFZlbG9jaXR5KCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXQodGltZXN0YW1wKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuXG4vKipcbiAqIElzIHRoZXJlIGF0IGxlYXN0IG9uZSBhY3Rpb24gcGVuZGluZyBjb21wbGV0aW9uP1xuICpcbiAqIEBtZXRob2QgaXNBY3RpdmVcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmN1cnJlbnRBY3Rpb247XG59O1xuXG4vKipcbiAqIEhhbHQgdHJhbnNpdGlvbiBhdCBjdXJyZW50IHN0YXRlIGFuZCBlcmFzZSBhbGwgcGVuZGluZyBhY3Rpb25zLlxuICpcbiAqIEBtZXRob2QgaGFsdFxuICovXG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb25hYmxlOyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogT3duZXI6IGRhdmlkQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJy4vVHJhbnNpdGlvbmFibGUnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuLi9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvVXRpbGl0eScpO1xuXG4vKipcbiAqIEEgY2xhc3MgZm9yIHRyYW5zaXRpb25pbmcgdGhlIHN0YXRlIG9mIGEgVHJhbnNmb3JtIGJ5IHRyYW5zaXRpb25pbmdcbiAqIGl0cyB0cmFuc2xhdGUsIHNjYWxlLCBza2V3IGFuZCByb3RhdGUgY29tcG9uZW50cyBpbmRlcGVuZGVudGx5LlxuICpcbiAqIEBjbGFzcyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIFt0cmFuc2Zvcm09VHJhbnNmb3JtLmlkZW50aXR5XSB7VHJhbnNmb3JtfSBUaGUgaW5pdGlhbCB0cmFuc2Zvcm0gc3RhdGVcbiAqL1xuZnVuY3Rpb24gVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgdGhpcy5fZmluYWwgPSBUcmFuc2Zvcm0uaWRlbnRpdHkuc2xpY2UoKTtcbiAgICB0aGlzLnRyYW5zbGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZShbMCwgMCwgMF0pO1xuICAgIHRoaXMucm90YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFswLCAwLCAwXSk7XG4gICAgdGhpcy5za2V3ID0gbmV3IFRyYW5zaXRpb25hYmxlKFswLCAwLCAwXSk7XG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUcmFuc2l0aW9uYWJsZShbMSwgMSwgMV0pO1xuXG4gICAgaWYgKHRyYW5zZm9ybSkgdGhpcy5zZXQodHJhbnNmb3JtKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkKCkge1xuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMudHJhbnNsYXRlLmdldCgpLFxuICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlLmdldCgpLFxuICAgICAgICBza2V3OiB0aGlzLnNrZXcuZ2V0KCksXG4gICAgICAgIHNjYWxlOiB0aGlzLnNjYWxlLmdldCgpXG4gICAgfSk7XG59XG5cbi8qKlxuICogQW4gb3B0aW1pemVkIHdheSBvZiBzZXR0aW5nIG9ubHkgdGhlIHRyYW5zbGF0aW9uIGNvbXBvbmVudCBvZiBhIFRyYW5zZm9ybVxuICpcbiAqIEBtZXRob2Qgc2V0VHJhbnNsYXRlXG4gKiBAY2hhaW5hYmxlXG4gKlxuICogQHBhcmFtIHRyYW5zbGF0ZSB7QXJyYXl9ICAgICBOZXcgdHJhbnNsYXRpb24gc3RhdGVcbiAqIEBwYXJhbSBbdHJhbnNpdGlvbl0ge09iamVjdH0gVHJhbnNpdGlvbiBkZWZpbml0aW9uXG4gKiBAcGFyYW0gW2NhbGxiYWNrXSB7RnVuY3Rpb259IENhbGxiYWNrXG4gKiBAcmV0dXJuIHtUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybX1cbiAqL1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0KHRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHRoaXMuX2ZpbmFsID0gdGhpcy5fZmluYWwuc2xpY2UoKTtcbiAgICB0aGlzLl9maW5hbFsxMl0gPSB0cmFuc2xhdGVbMF07XG4gICAgdGhpcy5fZmluYWxbMTNdID0gdHJhbnNsYXRlWzFdO1xuICAgIGlmICh0cmFuc2xhdGVbMl0gIT09IHVuZGVmaW5lZCkgdGhpcy5fZmluYWxbMTRdID0gdHJhbnNsYXRlWzJdO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBbiBvcHRpbWl6ZWQgd2F5IG9mIHNldHRpbmcgb25seSB0aGUgc2NhbGUgY29tcG9uZW50IG9mIGEgVHJhbnNmb3JtXG4gKlxuICogQG1ldGhvZCBzZXRTY2FsZVxuICogQGNoYWluYWJsZVxuICpcbiAqIEBwYXJhbSBzY2FsZSB7QXJyYXl9ICAgICAgICAgTmV3IHNjYWxlIHN0YXRlXG4gKiBAcGFyYW0gW3RyYW5zaXRpb25dIHtPYmplY3R9IFRyYW5zaXRpb24gZGVmaW5pdGlvblxuICogQHBhcmFtIFtjYWxsYmFja10ge0Z1bmN0aW9ufSBDYWxsYmFja1xuICogQHJldHVybiB7VHJhbnNpdGlvbmFibGVUcmFuc2Zvcm19XG4gKi9cblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRTY2FsZSA9IGZ1bmN0aW9uIHNldFNjYWxlKHNjYWxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuc2NhbGUuc2V0KHNjYWxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgdGhpcy5fZmluYWwgPSB0aGlzLl9maW5hbC5zbGljZSgpO1xuICAgIHRoaXMuX2ZpbmFsWzBdID0gc2NhbGVbMF07XG4gICAgdGhpcy5fZmluYWxbNV0gPSBzY2FsZVsxXTtcbiAgICBpZiAoc2NhbGVbMl0gIT09IHVuZGVmaW5lZCkgdGhpcy5fZmluYWxbMTBdID0gc2NhbGVbMl07XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFuIG9wdGltaXplZCB3YXkgb2Ygc2V0dGluZyBvbmx5IHRoZSByb3RhdGlvbmFsIGNvbXBvbmVudCBvZiBhIFRyYW5zZm9ybVxuICpcbiAqIEBtZXRob2Qgc2V0Um90YXRlXG4gKiBAY2hhaW5hYmxlXG4gKlxuICogQHBhcmFtIGV1bGVyQW5nbGVzIHtBcnJheX0gICBFdWxlciBhbmdsZXMgZm9yIG5ldyByb3RhdGlvbiBzdGF0ZVxuICogQHBhcmFtIFt0cmFuc2l0aW9uXSB7T2JqZWN0fSBUcmFuc2l0aW9uIGRlZmluaXRpb25cbiAqIEBwYXJhbSBbY2FsbGJhY2tdIHtGdW5jdGlvbn0gQ2FsbGJhY2tcbiAqIEByZXR1cm4ge1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtfVxuICovXG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0Um90YXRlID0gZnVuY3Rpb24gc2V0Um90YXRlKGV1bGVyQW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMucm90YXRlLnNldChldWxlckFuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fZmluYWwgPSBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMudHJhbnNsYXRlLmdldCgpLFxuICAgICAgICByb3RhdGU6IGV1bGVyQW5nbGVzLFxuICAgICAgICBzY2FsZTogdGhpcy5zY2FsZS5nZXQoKSxcbiAgICAgICAgc2tldzogdGhpcy5za2V3LmdldCgpXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFuIG9wdGltaXplZCB3YXkgb2Ygc2V0dGluZyBvbmx5IHRoZSBza2V3IGNvbXBvbmVudCBvZiBhIFRyYW5zZm9ybVxuICpcbiAqIEBtZXRob2Qgc2V0U2tld1xuICogQGNoYWluYWJsZVxuICpcbiAqIEBwYXJhbSBza2V3QW5nbGVzIHtBcnJheX0gICAgTmV3IHNrZXcgc3RhdGVcbiAqIEBwYXJhbSBbdHJhbnNpdGlvbl0ge09iamVjdH0gVHJhbnNpdGlvbiBkZWZpbml0aW9uXG4gKiBAcGFyYW0gW2NhbGxiYWNrXSB7RnVuY3Rpb259IENhbGxiYWNrXG4gKiBAcmV0dXJuIHtUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybX1cbiAqL1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFNrZXcgPSBmdW5jdGlvbiBzZXRTa2V3KHNrZXdBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5za2V3LnNldChza2V3QW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgdGhpcy5fZmluYWwgPSBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMudHJhbnNsYXRlLmdldCgpLFxuICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlLmdldCgpLFxuICAgICAgICBzY2FsZTogdGhpcy5zY2FsZS5nZXQoKSxcbiAgICAgICAgc2tldzogc2tld0FuZ2xlc1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXR0ZXIgZm9yIGEgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0gd2l0aCBvcHRpb25hbCBwYXJhbWV0ZXJzIHRvIHRyYW5zaXRpb25cbiAqIGJldHdlZW4gVHJhbnNmb3Jtc1xuICpcbiAqIEBtZXRob2Qgc2V0XG4gKiBAY2hhaW5hYmxlXG4gKlxuICogQHBhcmFtIHRyYW5zZm9ybSB7QXJyYXl9ICAgICBOZXcgdHJhbnNmb3JtIHN0YXRlXG4gKiBAcGFyYW0gW3RyYW5zaXRpb25dIHtPYmplY3R9IFRyYW5zaXRpb24gZGVmaW5pdGlvblxuICogQHBhcmFtIFtjYWxsYmFja10ge0Z1bmN0aW9ufSBDYWxsYmFja1xuICogQHJldHVybiB7VHJhbnNpdGlvbmFibGVUcmFuc2Zvcm19XG4gKi9cblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsID0gdHJhbnNmb3JtO1xuICAgIHZhciBjb21wb25lbnRzID0gVHJhbnNmb3JtLmludGVycHJldCh0cmFuc2Zvcm0pO1xuXG4gICAgdmFyIF9jYWxsYmFjayA9IGNhbGxiYWNrID8gVXRpbGl0eS5hZnRlcig0LCBjYWxsYmFjaykgOiBudWxsO1xuICAgIHRoaXMudHJhbnNsYXRlLnNldChjb21wb25lbnRzLnRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXQoY29tcG9uZW50cy5yb3RhdGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5za2V3LnNldChjb21wb25lbnRzLnNrZXcsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5zY2FsZS5zZXQoY29tcG9uZW50cy5zY2FsZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZGVmYXVsdCB0cmFuc2l0aW9uIHRvIHVzZSBmb3IgdHJhbnNpdGlvbmluZyBiZXR3ZW4gVHJhbnNmb3JtIHN0YXRlc1xuICpcbiAqIEBtZXRob2Qgc2V0RGVmYXVsdFRyYW5zaXRpb25cbiAqXG4gKiBAcGFyYW0gdHJhbnNpdGlvbiB7T2JqZWN0fSBUcmFuc2l0aW9uIGRlZmluaXRpb25cbiAqL1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldERlZmF1bHRUcmFuc2l0aW9uID0gZnVuY3Rpb24gc2V0RGVmYXVsdFRyYW5zaXRpb24odHJhbnNpdGlvbikge1xuICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG4gICAgdGhpcy5yb3RhdGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnNrZXcuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnNjYWxlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG59O1xuXG4vKipcbiAqIEdldHRlci4gUmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgVHJhbnNmb3JtXG4gKlxuICogQG1ldGhvZCBnZXRcbiAqXG4gKiBAcmV0dXJuIHtUcmFuc2Zvcm19XG4gKi9cblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmUoKSkge1xuICAgICAgICByZXR1cm4gX2J1aWxkLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIHRoaXMuX2ZpbmFsO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGRlc3RpbmF0aW9uIHN0YXRlIG9mIHRoZSBUcmFuc2Zvcm1cbiAqXG4gKiBAbWV0aG9kIGdldEZpbmFsXG4gKlxuICogQHJldHVybiBUcmFuc2Zvcm0ge1RyYW5zZm9ybX1cbiAqL1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmdldEZpbmFsID0gZnVuY3Rpb24gZ2V0RmluYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmFsO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdGhlIFRyYW5zaXRpb25hbFRyYW5zZm9ybSBpcyBjdXJyZW50bHkgdHJhbnNpdGlvbmluZ1xuICpcbiAqIEBtZXRob2QgaXNBY3RpdmVcbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaXNBY3RpdmUoKSB8fCB0aGlzLnJvdGF0ZS5pc0FjdGl2ZSgpIHx8IHRoaXMuc2NhbGUuaXNBY3RpdmUoKSB8fCB0aGlzLnNrZXcuaXNBY3RpdmUoKTtcbn07XG5cbi8qKlxuICogSGFsdHMgdGhlIHRyYW5zaXRpb25cbiAqXG4gKiBAbWV0aG9kIGhhbHRcbiAqL1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMuX2ZpbmFsID0gdGhpcy5nZXQoKTtcbiAgICB0aGlzLnRyYW5zbGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5yb3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuc2tldy5oYWx0KCk7XG4gICAgdGhpcy5zY2FsZS5oYWx0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtOyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogT3duZXI6IGRhdmlkQGZhbW8udXNcbiAqIEBsaWNlbnNlIE1QTCAyLjBcbiAqIEBjb3B5cmlnaHQgRmFtb3VzIEluZHVzdHJpZXMsIEluYy4gMjAxNFxuICovXG5cblxuXG5cbi8qKlxuICpcbiAqIEEgc3RhdGUgbWFpbnRhaW5lciBmb3IgYSBzbW9vdGggdHJhbnNpdGlvbiBiZXR3ZWVuXG4gKiAgICBudW1lcmljYWxseS1zcGVjaWZpZWQgc3RhdGVzLiAgRXhhbXBsZSBudW1lcmljIHN0YXRlcyBpbmNsdWRlIGZsb2F0cyBvclxuICogICAgVHJhbnNmb3JubSBvYmplY3RzLlxuICpcbiAqICAgIEFuIGluaXRpYWwgc3RhdGUgaXMgc2V0IHdpdGggdGhlIGNvbnN0cnVjdG9yIG9yIHNldChzdGFydFZhbHVlKS4gQVxuICogICAgY29ycmVzcG9uZGluZyBlbmQgc3RhdGUgYW5kIHRyYW5zaXRpb24gYXJlIHNldCB3aXRoIHNldChlbmRWYWx1ZSxcbiAqICAgIHRyYW5zaXRpb24pLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHNldChlbmRWYWx1ZSwgdHJhbnNpdGlvbikgYmVnaW4gYXRcbiAqICAgIHRoZSBsYXN0IHN0YXRlLiBDYWxscyB0byBnZXQodGltZXN0YW1wKSBwcm92aWRlIHRoZSBfaW50ZXJwb2xhdGVkIHN0YXRlXG4gKiAgICBhbG9uZyB0aGUgd2F5LlxuICpcbiAqICAgTm90ZSB0aGF0IHRoZXJlIGlzIG5vIGV2ZW50IGxvb3AgaGVyZSAtIGNhbGxzIHRvIGdldCgpIGFyZSB0aGUgb25seSB3YXlcbiAqICAgIHRvIGZpbmQgb3V0IHN0YXRlIHByb2plY3RlZCB0byB0aGUgY3VycmVudCAob3IgcHJvdmlkZWQpIHRpbWUgYW5kIGFyZVxuICogICAgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgY2FsbGJhY2tzLiBVc3VhbGx5IHRoaXMga2luZCBvZiBvYmplY3Qgd291bGRcbiAqICAgIGJlIHBhcnQgb2YgdGhlIHJlbmRlcigpIHBhdGggb2YgYSB2aXNpYmxlIGNvbXBvbmVudC5cbiAqXG4gKiBAY2xhc3MgVHdlZW5UcmFuc2l0aW9uXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUT0RPXG4gKiAgICBiZWdpbm5pbmcgc3RhdGVcbiAqL1xuZnVuY3Rpb24gVHdlZW5UcmFuc2l0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKSB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSAwO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWUgPSAwO1xuICAgIHRoaXMuX2VuZFZhbHVlID0gMDtcbiAgICB0aGlzLl9jdXJ2ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBUcmFuc2l0aW9uIGN1cnZlcyBtYXBwaW5nIGluZGVwZW5kZW50IHZhcmlhYmxlIHQgZnJvbSBkb21haW4gWzAsMV0gdG8gYVxuICogICAgcmFuZ2Ugd2l0aGluIFswLDFdLiBJbmNsdWRlcyBmdW5jdGlvbnMgJ2xpbmVhcicsICdlYXNlSW4nLCAnZWFzZU91dCcsXG4gKiAgICAnZWFzZUluT3V0JywgJ2Vhc2VPdXRCb3VuY2UnLCAnc3ByaW5nJy5cbiAqXG4gKiBAcHJvcGVydHkge29iamVjdH0gQ3VydmVcbiAqIEBmaW5hbFxuICovXG5Ud2VlblRyYW5zaXRpb24uQ3VydmVzID0ge1xuICAgIGxpbmVhcjogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9LFxuICAgIGVhc2VJbjogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdCp0O1xuICAgIH0sXG4gICAgZWFzZU91dDogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdCooMi10KTtcbiAgICB9LFxuICAgIGVhc2VJbk91dDogZnVuY3Rpb24odCkge1xuICAgICAgICBpZiAodCA8PSAwLjUpIHJldHVybiAyKnQqdDtcbiAgICAgICAgZWxzZSByZXR1cm4gLTIqdCp0ICsgNCp0IC0gMTtcbiAgICB9LFxuICAgIGVhc2VPdXRCb3VuY2U6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQqKDMgLSAyKnQpO1xuICAgIH0sXG4gICAgc3ByaW5nOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiAoMSAtIHQpICogTWF0aC5zaW4oNiAqIE1hdGguUEkgKiB0KSArIHQ7XG4gICAgfVxufTtcblxuVHdlZW5UcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gdHJ1ZTtcblR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY3VydmU6IFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyLFxuICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgc3BlZWQ6IDAgLyogY29uc2lkZXJlZCBvbmx5IGlmIHBvc2l0aXZlICovXG59O1xuXG52YXIgcmVnaXN0ZXJlZEN1cnZlcyA9IHt9O1xuXG4vKipcbiAqIEFkZCBcInVuaXRcIiBjdXJ2ZSB0byBpbnRlcm5hbCBkaWN0aW9uYXJ5IG9mIHJlZ2lzdGVyZWQgY3VydmVzLlxuICpcbiAqIEBtZXRob2QgcmVnaXN0ZXJDdXJ2ZVxuICpcbiAqIEBzdGF0aWNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY3VydmVOYW1lIGRpY3Rpb25hcnkga2V5XG4gKiBAcGFyYW0ge3VuaXRDdXJ2ZX0gY3VydmUgZnVuY3Rpb24gb2Ygb25lIG51bWVyaWMgdmFyaWFibGUgbWFwcGluZyBbMCwxXVxuICogICAgdG8gcmFuZ2UgaW5zaWRlIFswLDFdXG4gKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZSBpZiBrZXkgaXMgdGFrZW4sIGVsc2UgdHJ1ZVxuICovXG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lLCBjdXJ2ZSkge1xuICAgIGlmICghcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSA9IGN1cnZlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSBvYmplY3Qgd2l0aCBrZXkgXCJjdXJ2ZU5hbWVcIiBmcm9tIGludGVybmFsIGRpY3Rpb25hcnkgb2YgcmVnaXN0ZXJlZFxuICogICAgY3VydmVzLlxuICpcbiAqIEBtZXRob2QgdW5yZWdpc3RlckN1cnZlXG4gKlxuICogQHN0YXRpY1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjdXJ2ZU5hbWUgZGljdGlvbmFyeSBrZXlcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlIGlmIGtleSBoYXMgbm8gZGljdGlvbmFyeSB2YWx1ZVxuICovXG5Ud2VlblRyYW5zaXRpb24udW5yZWdpc3RlckN1cnZlID0gZnVuY3Rpb24gdW5yZWdpc3RlckN1cnZlKGN1cnZlTmFtZSkge1xuICAgIGlmIChyZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV0pIHtcbiAgICAgICAgZGVsZXRlIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSBmdW5jdGlvbiB3aXRoIGtleSBcImN1cnZlTmFtZVwiIGZyb20gaW50ZXJuYWwgZGljdGlvbmFyeSBvZlxuICogICAgcmVnaXN0ZXJlZCBjdXJ2ZXMuIERlZmF1bHQgY3VydmVzIGFyZSBkZWZpbmVkIGluIHRoZVxuICogICAgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcyBhcnJheSwgd2hlcmUgdGhlIHZhbHVlcyByZXByZXNlbnRcbiAqICAgIHVuaXRDdXJ2ZSBmdW5jdGlvbnMuXG4gKlxuICogQG1ldGhvZCBnZXRDdXJ2ZVxuICpcbiAqIEBzdGF0aWNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY3VydmVOYW1lIGRpY3Rpb25hcnkga2V5XG4gKiBAcmV0dXJuIHt1bml0Q3VydmV9IGN1cnZlIGZ1bmN0aW9uIG9mIG9uZSBudW1lcmljIHZhcmlhYmxlIG1hcHBpbmcgWzAsMV1cbiAqICAgIHRvIHJhbmdlIGluc2lkZSBbMCwxXVxuICovXG5Ud2VlblRyYW5zaXRpb24uZ2V0Q3VydmUgPSBmdW5jdGlvbiBnZXRDdXJ2ZShjdXJ2ZU5hbWUpIHtcbiAgICB2YXIgY3VydmUgPSByZWdpc3RlcmVkQ3VydmVzW2N1cnZlTmFtZV07XG4gICAgaWYgKGN1cnZlICE9PSB1bmRlZmluZWQpIHJldHVybiBjdXJ2ZTtcbiAgICBlbHNlIHRocm93IG5ldyBFcnJvcignY3VydmUgbm90IHJlZ2lzdGVyZWQnKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgYWxsIGF2YWlsYWJsZSBjdXJ2ZXMuXG4gKlxuICogQG1ldGhvZCBnZXRDdXJ2ZXNcbiAqXG4gKiBAc3RhdGljXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBjdXJ2ZSBmdW5jdGlvbnMgb2Ygb25lIG51bWVyaWMgdmFyaWFibGUgbWFwcGluZyBbMCwxXVxuICogICAgdG8gcmFuZ2UgaW5zaWRlIFswLDFdXG4gKi9cblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZXMgPSBmdW5jdGlvbiBnZXRDdXJ2ZXMoKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRDdXJ2ZXM7XG59O1xuXG4gLy8gSW50ZXJwb2xhdGU6IElmIGEgbGluZWFyIGZ1bmN0aW9uIGYoMCkgPSBhLCBmKDEpID0gYiwgdGhlbiByZXR1cm4gZih0KVxuZnVuY3Rpb24gX2ludGVycG9sYXRlKGEsIGIsIHQpIHtcbiAgICByZXR1cm4gKCgxIC0gdCkgKiBhKSArICh0ICogYik7XG59XG5cbmZ1bmN0aW9uIF9jbG9uZShvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkgcmV0dXJuIG9iai5zbGljZSgwKTtcbiAgICAgICAgZWxzZSByZXR1cm4gT2JqZWN0LmNyZWF0ZShvYmopO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBvYmo7XG59XG5cbi8vIEZpbGwgaW4gbWlzc2luZyBwcm9wZXJ0aWVzIGluIFwidHJhbnNpdGlvblwiIHdpdGggdGhvc2UgaW4gZGVmYXVsdFRyYW5zaXRpb24sIGFuZFxuLy8gICBjb252ZXJ0IGludGVybmFsIG5hbWVkIGN1cnZlIHRvIGZ1bmN0aW9uIG9iamVjdCwgcmV0dXJuaW5nIGFzIG5ld1xuLy8gICBvYmplY3QuXG5mdW5jdGlvbiBfbm9ybWFsaXplKHRyYW5zaXRpb24sIGRlZmF1bHRUcmFuc2l0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtjdXJ2ZTogZGVmYXVsdFRyYW5zaXRpb24uY3VydmV9O1xuICAgIGlmIChkZWZhdWx0VHJhbnNpdGlvbi5kdXJhdGlvbikgcmVzdWx0LmR1cmF0aW9uID0gZGVmYXVsdFRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgaWYgKGRlZmF1bHRUcmFuc2l0aW9uLnNwZWVkKSByZXN1bHQuc3BlZWQgPSBkZWZhdWx0VHJhbnNpdGlvbi5zcGVlZDtcbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSByZXN1bHQuZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5jdXJ2ZSkgcmVzdWx0LmN1cnZlID0gdHJhbnNpdGlvbi5jdXJ2ZTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb24uc3BlZWQpIHJlc3VsdC5zcGVlZCA9IHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0LmN1cnZlID09PSAnc3RyaW5nJykgcmVzdWx0LmN1cnZlID0gVHdlZW5UcmFuc2l0aW9uLmdldEN1cnZlKHJlc3VsdC5jdXJ2ZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBTZXQgaW50ZXJuYWwgb3B0aW9ucywgb3ZlcnJpZGluZyBhbnkgZGVmYXVsdCBvcHRpb25zLlxuICpcbiAqIEBtZXRob2Qgc2V0T3B0aW9uc1xuICpcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmN1cnZlXSBmdW5jdGlvbiBtYXBwaW5nIFswLDFdIHRvIFswLDFdIG9yIGlkZW50aWZpZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbl0gZHVyYXRpb24gaW4gbXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zcGVlZF0gc3BlZWQgaW4gcGl4ZWxzIHBlciBtc1xuICovXG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5jdXJ2ZSAhPT0gdW5kZWZpbmVkKSB0aGlzLm9wdGlvbnMuY3VydmUgPSBvcHRpb25zLmN1cnZlO1xuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHRoaXMub3B0aW9ucy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgaWYgKG9wdGlvbnMuc3BlZWQgIT09IHVuZGVmaW5lZCkgdGhpcy5vcHRpb25zLnNwZWVkID0gb3B0aW9ucy5zcGVlZDtcbn07XG5cbi8qKlxuICogQWRkIHRyYW5zaXRpb24gdG8gZW5kIHN0YXRlIHRvIHRoZSBxdWV1ZSBvZiBwZW5kaW5nIHRyYW5zaXRpb25zLiBTcGVjaWFsXG4gKiAgICBVc2U6IGNhbGxpbmcgd2l0aG91dCBhIHRyYW5zaXRpb24gcmVzZXRzIHRoZSBvYmplY3QgdG8gdGhhdCBzdGF0ZSB3aXRoXG4gKiAgICBubyBwZW5kaW5nIGFjdGlvbnNcbiAqXG4gKiBAbWV0aG9kIHNldFxuICpcbiAqXG4gKiBAcGFyYW0ge251bWJlcnxGYW1vdXNNYXRyaXh8QXJyYXkuTnVtYmVyfE9iamVjdC48bnVtYmVyLCBudW1iZXI+fSBlbmRWYWx1ZVxuICogICAgZW5kIHN0YXRlIHRvIHdoaWNoIHdlIF9pbnRlcnBvbGF0ZVxuICogQHBhcmFtIHt0cmFuc2l0aW9uPX0gdHJhbnNpdGlvbiBvYmplY3Qgb2YgdHlwZSB7ZHVyYXRpb246IG51bWJlciwgY3VydmU6XG4gKiAgICBmWzAsMV0gLT4gWzAsMV0gb3IgbmFtZX0uIElmIHRyYW5zaXRpb24gaXMgb21pdHRlZCwgY2hhbmdlIHdpbGwgYmVcbiAqICAgIGluc3RhbnRhbmVvdXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCk9fSBjYWxsYmFjayBaZXJvLWFyZ3VtZW50IGZ1bmN0aW9uIHRvIGNhbGwgb24gb2JzZXJ2ZWRcbiAqICAgIGNvbXBsZXRpb24gKHQ9MSlcbiAqL1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kVmFsdWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zdGFydFZhbHVlID0gX2Nsb25lKHRoaXMuZ2V0KCkpO1xuICAgIHRyYW5zaXRpb24gPSBfbm9ybWFsaXplKHRyYW5zaXRpb24sIHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKHRyYW5zaXRpb24uc3BlZWQpIHtcbiAgICAgICAgdmFyIHN0YXJ0VmFsdWUgPSB0aGlzLl9zdGFydFZhbHVlO1xuICAgICAgICBpZiAoc3RhcnRWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhcmlhbmNlID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc3RhcnRWYWx1ZSkgdmFyaWFuY2UgKz0gKGVuZFZhbHVlW2ldIC0gc3RhcnRWYWx1ZVtpXSkgKiAoZW5kVmFsdWVbaV0gLSBzdGFydFZhbHVlW2ldKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZHVyYXRpb24gPSBNYXRoLnNxcnQodmFyaWFuY2UpIC8gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZHVyYXRpb24gPSBNYXRoLmFicyhlbmRWYWx1ZSAtIHN0YXJ0VmFsdWUpIC8gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5fZW5kVmFsdWUgPSBfY2xvbmUoZW5kVmFsdWUpO1xuICAgIHRoaXMuX3N0YXJ0VmVsb2NpdHkgPSBfY2xvbmUodHJhbnNpdGlvbi52ZWxvY2l0eSk7XG4gICAgdGhpcy5fZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgIHRoaXMuX2N1cnZlID0gdHJhbnNpdGlvbi5jdXJ2ZTtcbiAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG59O1xuXG4vKipcbiAqIENhbmNlbCBhbGwgdHJhbnNpdGlvbnMgYW5kIHJlc2V0IHRvIGEgc3RhYmxlIHN0YXRlXG4gKlxuICogQG1ldGhvZCByZXNldFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfEFycmF5Lk51bWJlcnxPYmplY3QuPG51bWJlciwgbnVtYmVyPn0gc3RhcnRWYWx1ZVxuICogICAgc3RhcnRpbmcgc3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFZlbG9jaXR5XG4gKiAgICBzdGFydGluZyB2ZWxvY2l0eVxuICovXG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRWYWx1ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBfY2xvbmUoc3RhcnRWYWx1ZSk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IF9jbG9uZShzdGFydFZlbG9jaXR5KTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLl9zdGFydFZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW50IHZlbG9jaXR5XG4gKlxuICogQG1ldGhvZCBnZXRWZWxvY2l0eVxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHZlbG9jaXR5XG4gKi9cblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy52ZWxvY2l0eTtcbn07XG5cbi8qKlxuICogR2V0IGludGVycG9sYXRlZCBzdGF0ZSBvZiBjdXJyZW50IGFjdGlvbiBhdCBwcm92aWRlZCB0aW1lLiBJZiB0aGUgbGFzdFxuICogICAgYWN0aW9uIGhhcyBjb21wbGV0ZWQsIGludm9rZSBpdHMgY2FsbGJhY2suXG4gKlxuICogQG1ldGhvZCBnZXRcbiAqXG4gKlxuICogQHBhcmFtIHtudW1iZXI9fSB0aW1lc3RhbXAgRXZhbHVhdGUgdGhlIGN1cnZlIGF0IGEgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoaXNcbiAqICAgIHRpbWUuIElmIG9taXR0ZWQsIHVzZSBjdXJyZW50IHRpbWUuIChVbml4IGVwb2NoIHRpbWUpXG4gKiBAcmV0dXJuIHtudW1iZXJ8T2JqZWN0LjxudW1iZXJ8c3RyaW5nLCBudW1iZXI+fSBiZWdpbm5pbmcgc3RhdGVcbiAqICAgIF9pbnRlcnBvbGF0ZWQgdG8gdGhpcyBwb2ludCBpbiB0aW1lLlxuICovXG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCh0aW1lc3RhbXApIHtcbiAgICB0aGlzLnVwZGF0ZSh0aW1lc3RhbXApO1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcblxuZnVuY3Rpb24gX2NhbGN1bGF0ZVZlbG9jaXR5KGN1cnJlbnQsIHN0YXJ0LCBjdXJ2ZSwgZHVyYXRpb24sIHQpIHtcbiAgICB2YXIgdmVsb2NpdHk7XG4gICAgdmFyIGVwcyA9IDFlLTc7XG4gICAgdmFyIHNwZWVkID0gKGN1cnZlKHQpIC0gY3VydmUodCAtIGVwcykpIC8gZXBzO1xuICAgIGlmIChjdXJyZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmVsb2NpdHkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudFtpXSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgdmVsb2NpdHlbaV0gPSBzcGVlZCAqIChjdXJyZW50W2ldIC0gc3RhcnRbaV0pIC8gZHVyYXRpb247XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmVsb2NpdHlbaV0gPSAwO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgZWxzZSB2ZWxvY2l0eSA9IHNwZWVkICogKGN1cnJlbnQgLSBzdGFydCkgLyBkdXJhdGlvbjtcbiAgICByZXR1cm4gdmVsb2NpdHk7XG59XG5cbmZ1bmN0aW9uIF9jYWxjdWxhdGVTdGF0ZShzdGFydCwgZW5kLCB0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmIChzdGFydCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHN0YXRlID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnRbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gX2ludGVycG9sYXRlKHN0YXJ0W2ldLCBlbmRbaV0sIHQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gc3RhcnRbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBzdGF0ZSA9IF9pbnRlcnBvbGF0ZShzdGFydCwgZW5kLCB0KTtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbi8qKlxuICogVXBkYXRlIGludGVybmFsIHN0YXRlIHRvIHRoZSBwcm92aWRlZCB0aW1lc3RhbXAuIFRoaXMgbWF5IGludm9rZSB0aGUgbGFzdFxuICogICAgY2FsbGJhY2sgYW5kIGJlZ2luIGEgbmV3IGFjdGlvbi5cbiAqXG4gKiBAbWV0aG9kIHVwZGF0ZVxuICpcbiAqXG4gKiBAcGFyYW0ge251bWJlcj19IHRpbWVzdGFtcCBFdmFsdWF0ZSB0aGUgY3VydmUgYXQgYSBub3JtYWxpemVkIHZlcnNpb24gb2YgdGhpc1xuICogICAgdGltZS4gSWYgb21pdHRlZCwgdXNlIGN1cnJlbnQgdGltZS4gKFVuaXggZXBvY2ggdGltZSlcbiAqL1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUodGltZXN0YW1wKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aW1lc3RhbXApIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgaWYgKHRoaXMuX3VwZGF0ZVRpbWUgPj0gdGltZXN0YW1wKSByZXR1cm47XG4gICAgdGhpcy5fdXBkYXRlVGltZSA9IHRpbWVzdGFtcDtcblxuICAgIHZhciB0aW1lU2luY2VTdGFydCA9IHRpbWVzdGFtcCAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICBpZiAodGltZVNpbmNlU3RhcnQgPj0gdGhpcy5fZHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gX2NhbGN1bGF0ZVZlbG9jaXR5KHRoaXMuc3RhdGUsIHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2N1cnZlLCB0aGlzLl9kdXJhdGlvbiwgMSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aW1lU2luY2VTdGFydCA8IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX3N0YXJ0VmFsdWU7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLl9zdGFydFZlbG9jaXR5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHQgPSB0aW1lU2luY2VTdGFydCAvIHRoaXMuX2R1cmF0aW9uO1xuICAgICAgICB0aGlzLnN0YXRlID0gX2NhbGN1bGF0ZVN0YXRlKHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2VuZFZhbHVlLCB0aGlzLl9jdXJ2ZSh0KSk7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBfY2FsY3VsYXRlVmVsb2NpdHkodGhpcy5zdGF0ZSwgdGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fY3VydmUsIHRoaXMuX2R1cmF0aW9uLCB0KTtcbiAgICB9XG59O1xuXG4vKipcbiAqIElzIHRoZXJlIGF0IGxlYXN0IG9uZSBhY3Rpb24gcGVuZGluZyBjb21wbGV0aW9uP1xuICpcbiAqIEBtZXRob2QgaXNBY3RpdmVcbiAqXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG59O1xuXG4vKipcbiAqIEhhbHQgdHJhbnNpdGlvbiBhdCBjdXJyZW50IHN0YXRlIGFuZCBlcmFzZSBhbGwgcGVuZGluZyBhY3Rpb25zLlxuICpcbiAqIEBtZXRob2QgaGFsdFxuICpcbiAqL1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnJlc2V0KHRoaXMuZ2V0KCkpO1xufTtcblxuLy8gUmVnaXN0ZXIgYWxsIHRoZSBkZWZhdWx0IGN1cnZlc1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2xpbmVhcicsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlSW4nLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VJbik7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZU91dCcsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZU91dCk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZUluT3V0JywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlSW5PdXQpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VPdXRCb3VuY2UnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VPdXRCb3VuY2UpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ3NwcmluZycsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuc3ByaW5nKTtcblxuVHdlZW5UcmFuc2l0aW9uLmN1c3RvbUN1cnZlID0gZnVuY3Rpb24gY3VzdG9tQ3VydmUodjEsIHYyKSB7XG4gICAgdjEgPSB2MSB8fCAwOyB2MiA9IHYyIHx8IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHYxKnQgKyAoLTIqdjEgLSB2MiArIDMpKnQqdCArICh2MSArIHYyIC0gMikqdCp0KnQ7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHdlZW5UcmFuc2l0aW9uOyIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG4gKlxuICogT3duZXI6IG1hcmtAZmFtby51c1xuICogQGxpY2Vuc2UgTVBMIDIuMFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XG4gKi9cblxuXG5cbi8qKlxuICogVGhpcyBuYW1lc3BhY2UgaG9sZHMgc3RhbmRhbG9uZSBmdW5jdGlvbmFsaXR5LlxuICogIEN1cnJlbnRseSBpbmNsdWRlcyBuYW1lIG1hcHBpbmcgZm9yIHRyYW5zaXRpb24gY3VydmVzLFxuICogIG5hbWUgbWFwcGluZyBmb3Igb3JpZ2luIHBhaXJzLCBhbmQgdGhlIGFmdGVyKCkgZnVuY3Rpb24uXG4gKlxuICogQGNsYXNzIFV0aWxpdHlcbiAqIEBzdGF0aWNcbiAqL1xudmFyIFV0aWxpdHkgPSB7fTtcblxuLyoqXG4gKiBUYWJsZSBvZiBkaXJlY3Rpb24gYXJyYXkgcG9zaXRpb25zXG4gKlxuICogQHByb3BlcnR5IHtvYmplY3R9IERpcmVjdGlvblxuICogQGZpbmFsXG4gKi9cblV0aWxpdHkuRGlyZWN0aW9uID0ge1xuICAgIFg6IDAsXG4gICAgWTogMSxcbiAgICBaOiAyXG59O1xuXG4vKipcbiAqIFJldHVybiB3cmFwcGVyIGFyb3VuZCBjYWxsYmFjayBmdW5jdGlvbi4gT25jZSB0aGUgd3JhcHBlciBpcyBjYWxsZWQgTlxuICogICB0aW1lcywgaW52b2tlIHRoZSBjYWxsYmFjayBmdW5jdGlvbi4gQXJndW1lbnRzIGFuZCBzY29wZSBwcmVzZXJ2ZWQuXG4gKlxuICogQG1ldGhvZCBhZnRlclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudCBudW1iZXIgb2YgY2FsbHMgYmVmb3JlIGNhbGxiYWNrIGZ1bmN0aW9uIGludm9rZWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHdyYXBwZWQgY2FsbGJhY2sgZnVuY3Rpb25cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gd3JhcHBlZCBjYWxsYmFjayB3aXRoIGNvdW5kb3duIGZlYXR1cmVcbiAqL1xuVXRpbGl0eS5hZnRlciA9IGZ1bmN0aW9uIGFmdGVyKGNvdW50LCBjYWxsYmFjaykge1xuICAgIHZhciBjb3VudGVyID0gY291bnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb3VudGVyLS07XG4gICAgICAgIGlmIChjb3VudGVyID09PSAwKSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuXG4vKipcbiAqIExvYWQgYSBVUkwgYW5kIHJldHVybiBpdHMgY29udGVudHMgaW4gYSBjYWxsYmFja1xuICpcbiAqIEBtZXRob2QgbG9hZFVSTFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIG9mIG9iamVjdFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgdG8gZGlzcGF0Y2ggd2l0aCBjb250ZW50XG4gKi9cblV0aWxpdHkubG9hZFVSTCA9IGZ1bmN0aW9uIGxvYWRVUkwodXJsLCBjYWxsYmFjaykge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gb25yZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgeGhyLnNlbmQoKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgZnJvbSBhIHN0cmluZyBvZiBIVE1MXG4gKlxuICogQG1ldGhvZCBjcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUxcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbCBIVE1MIHRvIGNvbnZlcnQgdG8gRG9jdW1lbnRGcmFnbWVudFxuICpcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9IERvY3VtZW50RnJhZ21lbnQgcmVwcmVzZW50aW5nIGlucHV0IEhUTUxcbiAqL1xuVXRpbGl0eS5jcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwgPSBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwoaHRtbCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSByZXN1bHQuYXBwZW5kQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsaXR5OyIsIid1c2Ugc3RyaWN0JztcblxuLy8gbG9hZCBjc3NcbnJlcXVpcmUoJy4vc3R5bGVzJyk7XG5cbi8vIExvYWQgcG9seWZpbGxzXG5yZXF1aXJlKCdmYW1vdXMtcG9seWZpbGxzJyk7XG5cbi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbnZhciBFbmdpbmUgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FbmdpbmUnKTtcbnZhciBNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL01vZGlmaWVyJyk7XG52YXIgU3RhdGVNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9tb2RpZmllcnMvU3RhdGVNb2RpZmllcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9TdXJmYWNlJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBTbmFwVHJhbnNpdGlvbiA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9TbmFwVHJhbnNpdGlvbicpO1xuXG4vLyBjcmVhdGUgdGhlIG1haW4gY29udGV4dFxudmFyIGNvbnRleHQgPSBFbmdpbmUuY3JlYXRlQ29udGV4dCgpO1xuXG4vLyBzZXQgdXAgb3VyIHNuYXAgdHJhbnNpdGlvblxuVHJhbnNpdGlvbmFibGUucmVnaXN0ZXJNZXRob2QoJ3NuYXAnLCBTbmFwVHJhbnNpdGlvbik7XG5cbnZhciBkYXRhID0gW1xuICAgIHtuYW1lOiAndG9wIGxlZnQnLCBwb3NpdGlvbjogWzAsIDBdfSxcbiAgICB7bmFtZTogJ3RvcCBtaWRkbGUnLCBwb3NpdGlvbjogWzAuNSwgMF19LFxuICAgIHtuYW1lOiAndG9wIHJpZ2h0JywgcG9zaXRpb246IFsxLCAwXX0sXG4gICAge25hbWU6ICdjZW50ZXIgbGVmdCcsIHBvc2l0aW9uOiBbMCwgMC41XX0sXG4gICAge25hbWU6ICdjZW50ZXIgbWlkZGxlJywgcG9zaXRpb246IFswLjUsIDAuNV19LFxuICAgIHtuYW1lOiAnY2VudGVyIHJpZ2h0JywgcG9zaXRpb246IFsxLCAwLjVdfSxcbiAgICB7bmFtZTogJ2JvdHRvbSBsZWZ0JywgcG9zaXRpb246IFswLCAxXX0sXG4gICAge25hbWU6ICdib3R0b20gY2VudGVyJywgcG9zaXRpb246IFswLjUsIDFdfSxcbiAgICB7bmFtZTogJ2JvdHRvbSByaWdodCcsIHBvc2l0aW9uOiBbMSwgMV19LFxuXVxuXG5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgIHZhciBzdXJmYWNlID0gbmV3IFN1cmZhY2Uoe1xuICAgICAgICBjb250ZW50OiBpdGVtLm5hbWUsXG4gICAgICAgIGNsYXNzZXM6IFtcInJlZC1iZ1wiXSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JlZCcsXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIG1vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgc2l6ZTogWzEsIDFdLFxuICAgICAgICBhbGlnbjogWzAuNSwgMC41XSxcbiAgICAgICAgb3JpZ2luOiBpdGVtLnBvc2l0aW9uLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgIH0pO1xuXG4gICAgdmFyIHRyYW5zaXRpb24gPSB7XG4gICAgICAgIG1ldGhvZDogXCJzbmFwXCIsXG4gICAgICAgIHBlcmlvZDogNTAwLFxuICAgICAgICBkYW1waW5nUmF0aW86IC42LFxuICAgICAgICB2ZWxvY2l0eTogMFxuICAgIH1cblxuICAgIGNvbnRleHQuYWRkKG1vZGlmaWVyKS5hZGQoc3VyZmFjZSk7XG5cbiAgICB2YXIgb3BhY2l0eVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDApO1xuICAgIG1vZGlmaWVyLm9wYWNpdHlGcm9tKG9wYWNpdHlTdGF0ZSk7XG4gICAgb3BhY2l0eVN0YXRlLnNldCgxLCB0cmFuc2l0aW9uKVxuXG4gICAgdmFyIHNpemVTdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZShbMC41LCAwLjVdKTtcbiAgICBtb2RpZmllci5zaXplRnJvbShzaXplU3RhdGUpO1xuICAgIHNpemVTdGF0ZS5zZXQoWzIwMCwyMDBdLCB0cmFuc2l0aW9uKVxuXG4gICAgdmFyIGFsaWduU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoWzAsIDBdKTtcbiAgICBtb2RpZmllci5hbGlnbkZyb20oYWxpZ25TdGF0ZSk7XG4gICAgYWxpZ25TdGF0ZS5zZXQoaXRlbS5wb3NpdGlvbiwgdHJhbnNpdGlvbilcblxufSlcblxuIiwidmFyIGNzcyA9IFwiaHRtbCB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4uYmFja2ZhY2VWaXNpYmlsaXR5IHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblwiOyAocmVxdWlyZShcIi9Vc2Vycy9kYW5lbWFjYXVsYXkvU2l0ZXMvYnJvd3NlcmlmeS1zZWVkL25vZGVfbW9kdWxlcy9jc3NpZnlcIikpKGNzcyk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsInZhciBjc3MgPSBcIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXFxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cXG4gKlxcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcXG4gKiBAbGljZW5zZSBNUEwgMi4wXFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XFxuICovXFxuXFxuXFxuaHRtbCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBwYWRkaW5nOiAwcHg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuXFxuYm9keSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIHBhZGRpbmc6IDBweDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgLXdlYmtpdC1wZXJzcGVjdGl2ZTogMDtcXG4gICAgcGVyc3BlY3RpdmU6IG5vbmU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5mYW1vdXMtY29udGFpbmVyLCAuZmFtb3VzLWdyb3VwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDBweDtcXG4gICAgbGVmdDogMHB4O1xcbiAgICBib3R0b206IDBweDtcXG4gICAgcmlnaHQ6IDBweDtcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmZhbW91cy1ncm91cCB7XFxuICAgIHdpZHRoOiAwcHg7XFxuICAgIGhlaWdodDogMHB4O1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxufVxcblxcbi5mYW1vdXMtc3VyZmFjZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogZmxhdDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDsgLyogcGVyZm9ybWFuY2UgKi9cXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcbn1cXG5cXG4uZmFtb3VzLWNvbnRhaW5lci1ncm91cCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXCI7IChyZXF1aXJlKFwiL1VzZXJzL2RhbmVtYWNhdWxheS9TaXRlcy9icm93c2VyaWZ5LXNlZWQvbm9kZV9tb2R1bGVzL2Nzc2lmeVwiKSkoY3NzKTsgbW9kdWxlLmV4cG9ydHMgPSBjc3M7IiwiLy8gbG9hZCBjc3NcbnJlcXVpcmUoJy4vZmFtb3VzLmNzcycpO1xucmVxdWlyZSgnLi9hcHAuY3NzJyk7XG4iXX0=
