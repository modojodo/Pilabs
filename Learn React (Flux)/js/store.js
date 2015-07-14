/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Store
 */

var AppDispatcher = require('./dispatcher');
var EventEmitter = require('events').EventEmitter;


var Constants = require('./constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _DATA = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */

function postData(urlToPost) {
    $.ajax({
        url: 'http://datastore.asadmemon.com/thumbnails/' + (new Date().getTime()),
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({url: urlToPost}),
        success: function (res) {
            console.log(res);
        }
    });
}

function create(url) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    postData(url);

    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _DATA[id] = {
        id: id,
        url: url
    };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    _DATA[id] = assign({}, _DATA[id], updates);
}


/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
    delete _DATA[id];
}


var Store = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function () {
        return _DATA;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

$.get("http://datastore.asadmemon.com/thumbnails/", function (data) {

    for (var d in data) {
        //temp.push(data[d].url);
        //console.log(temp);
        _DATA[d] = {
            id: d,
            url: data[d].url
        };
        Store.emitChange();
    }

});

// Register callback to handle all updates
AppDispatcher.register(function (action) {
    var text;
    console.log("dispatch rx", action);
    switch (action.actionType) {
        case Constants.URL_NEW:
            //console.log("createe");
            url = action.data.url;
            if (url !== '') {
                create(url);
                Store.emitChange();
            }
            break;

        case Constants.DATA_DESTROY:
            destroy(action.id);
            Store.emitChange();
            break;


        default:
        // no op
    }
});

module.exports = Store;