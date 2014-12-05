/**
 * @jsx React.DOM
 */

var React = require('react');
var CanvasStats = require('./CanvasStats.jsx');

var LocationCanvas = React.createClass({
    render: function() {
        return (
            <div>
                <div className="block row">
                  <div className="objective-stats col-md-2 col-sm-2">
                    <h3>Completed: {this.props.stats.completed}</h3>
                    <h3>Objectives: {this.props.stats.objectives}</h3>
                    <h3>Journals: {this.props.stats.journals}</h3>
                    <h3>Missions: {this.props.stats.missions}</h3>
                  </div>
                </div>
                { this.props.user ? <CanvasStats progress={this.props.stats.progress} title={'Objective Progress'} chartId={'user-progress'} /> : null }
            </div>
        )
    }
});

module.exports = LocationCanvas;
