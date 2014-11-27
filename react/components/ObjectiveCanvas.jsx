/**
 * @jsx React.DOM
 */
/**
 *  Objective Canvas displays the objective buttons, stats and charts.
 */
var React = require('react');
var CanvasActions = require('./CanvasActions.jsx');

var ObjectiveCanvas = React.createClass({
    render: function() {
        return (
            <div>
                <div className="block"></div>
                { this.props.user ? <CanvasActions objective={this.props.objective} user={this.props.user} userObjective={this.props.userObjective} /> : null }
            </div>
        )
    }
});

module.exports = ObjectiveCanvas;
