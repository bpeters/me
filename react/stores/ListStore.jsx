/**
 * @jsx React.DOM
 */
 /**
 *  For storing list data.
 */
var Reflux = require('reflux');

var ListStore = Reflux.createStore({

    init: function() {
        this.list = [];
    },

    loadList: function(url) {
        return [{"name":"Dallas","id":2,"objectives":2,"journals":0,"missions":1},{"name":"Austin","id":1,"objectives":6,"journals":1,"missions":1}];
    },

    getList: function() {
        return this.loadList("/api/1/getList/city");
    },

});

module.exports = ListStore;
