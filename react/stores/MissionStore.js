var Reflux = require('reflux');
var MissionActions = require('../actions/MissionActions');
var $ = require('jquery');

var MissionStore = Reflux.createStore({
    init: function() {
        this._results = {};
        this._display = '';
        this.listenTo(MissionActions.load, this.load);
    },
    load: function(display, by, id) {
        this._display = display;
        if (display === 'Objectives') {
            $.getJSON( "/api/1/getMissionObjectives/" + by + "/" + id)
            .done(this.onLoad)
            .fail(this.onLoadError);
        } else if (display === 'Journals') {
            $.getJSON( "/api/1/getMissionJournals/" + by + "/" + id)
            .done(this.onLoad)
            .fail(this.onLoadError);
        }
    },
    onLoad: function(list) {
        var results = {
            display: MissionStore._display,
            list: list
        };
        this._results = results;
        MissionStore.trigger(this._results);
    },
    onLoadError: function() {
        this._results = {};
        MissionStore.trigger(this._results);
    },
    getDefaultData: function() {
        return this._results;
    }
});

module.exports = MissionStore;
