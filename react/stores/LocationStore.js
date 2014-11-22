var Reflux = require('reflux');
var LocationActions = require('../actions/LocationActions');
var $ = require('jquery');

var LocationStore = Reflux.createStore({
    init: function() {
        this._results = {};
        this._display = '';
        this.listenTo(LocationActions.load, this.load);
    },
    load: function(display, by, id) {
        this._display = display;
        if (display === 'Objectives') {
            $.getJSON( "/api/1/getObjective/" + by + "/" + id)
            .done(this.onLoad)
            .fail(this.onLoadError);
        } else if (display === 'Journals') {
            $.getJSON( "/api/1/getJournal/" + by + "/" + id)
            .done(this.onLoad)
            .fail(this.onLoadError);
        } else if (display === 'Missions') {
            $.getJSON( "/api/1/getMissionObjectives/" + by + "/" + id)
            .done(this.onLoad)
            .fail(this.onLoadError);
        }
    },
    onLoad: function(list) {
        var results = {
            display: LocationStore._display,
            list: list
        };
        this._results = results;
        LocationStore.trigger(this._results);
    },
    onLoadError: function() {
        this._results = {};
        LocationStore.trigger(this._results);
    },
    getDefaultData: function() {
        return this._results;
    }
});

module.exports = LocationStore;
