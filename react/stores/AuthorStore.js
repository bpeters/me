var Reflux = require('reflux');
var AuthorActions = require('../actions/AuthorActions');
var $ = require('jquery');

var AuthorStore = Reflux.createStore({
    init: function() {
        this._results = {};
        this._display = '';
        this.listenTo(AuthorActions.load, this.load);
    },
    load: function(display, username) {
        this._display = display;
        if (display === 'Objectives') {
            $.getJSON( "/api/1/getUserObjectives/" + username)
            .done(this.onLoad)
            .fail(this.onLoadError);
        } else if (display === 'Journals') {
            $.getJSON( "/api/1/getJournal/author/" + username)
            .done(this.onLoad)
            .fail(this.onLoadError);
        } else if (display === 'Missions') {
            $.getJSON( "/api/1/getMission/author/" + username)
            .done(this.onLoad)
            .fail(this.onLoadError);
        }
    },
    onLoad: function(list) {
        var results = {
            display: AuthorStore._display,
            list: list
        };
        this._results = results;
        AuthorStore.trigger(this._results);
    },
    onLoadError: function() {
        this._results = {};
        AuthorStore.trigger(this._results);
    },
    getDefaultData: function() {
        return this._results;
    }
});

module.exports = AuthorStore;
