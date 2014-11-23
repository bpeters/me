var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');
var $ = require('jquery');

var UserStore = Reflux.createStore({
    init: function() {
        this._user = {};
        this.listenTo(UserActions.load, this.load);
    },
    load: function(username) {
        $.getJSON( "/api/1/getUserProgress/" + username)
        .done(this.onLoad)
        .fail(this.onLoadError);
    },
    onLoad: function(user) {
        UserStore.trigger(user);
    },
    onLoadError: function() {
        this._user = {};
        UserStore.trigger(this._user);
    },
    getDefaultData: function() {
        return this._user;
    }
});

module.exports = UserStore;
