/**
 * @jsx React.DOM
 */
 /**
 *  For storing list data.
 */
var Reflux = require('reflux');
var request = require('superagent');

var ListStore = Reflux.createStore({

    init: function() {
        this.list = [];
    },

    loadList: function(url) {
        request.get('/api/1/getList/city').end(function(res) {
            return res.body;
        });
    },

    getList: function() {
        return this.loadList("/api/1/getList/city");
    },

});

module.exports = ListStore;
