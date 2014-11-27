var Reflux = require('reflux');
var ObjectiveActions = require('../actions/ObjectiveActions');
var $ = require('jquery');

var ObjectiveStore = Reflux.createStore({
    init: function() {
        this._results = {};
        this._display = '';
        this.listenTo(ObjectiveActions.load, this.load);
        this.listenTo(ObjectiveActions.complete, this.complete);
    },
    load: function(display, by, id) {
        this._display = display;
        if (display === 'Journals') {
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
            display: ObjectiveStore._display,
            list: list
        };
        this._results = results;
        ObjectiveStore.trigger(this._results);
    },
    onLoadError: function() {
        this._results = {};
        ObjectiveStore.trigger(this._results);
    },
    complete: function(id, username) {
        $.post("/api/1/completeObjective/" + id + "/" + username);
    },
    getDefaultData: function() {
        return this._results;
    }
});

module.exports = ObjectiveStore;
