var Reflux = require('reflux');
var ListActions = require('../actions/ListActions');
var $ = require('jquery');

var ListStore = Reflux.createStore({
    init: function() {
        this._list = [];
        this.listenTo(ListActions.load, this.loadList);
    },
    loadList: function(by) {
        if (by === 'cities') {
            $.getJSON( "/api/1/getList/city")
            .done(this.onLoad)
            .fail(this.onLoadError);
        } else if (by === 'states') {
            $.getJSON( "/api/1/getList/state")
            .done(this.onLoad)
            .fail(this.onLoadError);
        }
    },
    onLoad: function(list) {
        this._list = list;
        ListStore.trigger(this._list);
    },
    onLoadError: function() {
        this._list = [];
        ListStore.trigger(this._list);
    },
    getDefaultData: function() {
        return this._list;
    }
});

module.exports = ListStore;
