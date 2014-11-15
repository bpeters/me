/**
 * @jsx React.DOM
 */
 /**
 *  For storing list data.
 */
var Reflux = require('reflux');
var $ = require('jquery');

var ListStore = Reflux.createStore({

    init: function() {
        this.list = this.loadList("/api/1/getList/city");
    },

    loadList: function(url) {
        $.getJSON(url, function(results) {
          console.log(results);
        });
        return [{"name":"Dallas","id":2,"objectives":2,"journals":0,"missions":1},{"name":"Austin","id":1,"objectives":6,"journals":1,"missions":1}];
    },

    getList: function() {
        return this.list;
    },

});

module.exports = ListStore;
