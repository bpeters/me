/**
 * @jsx React.DOM
 */
/**
 *  Objective Canvas displays the objective buttons, stats and charts.
 */
var React = require('react');
var CanvasActions = require('./CanvasActions.jsx');

var ObjectiveCanvas = React.createClass({
    getInitialState: function() {
      return {
        completed: this.props.stats.completed,
        journals: this.props.stats.journals,
        missions: this.props.stats.missions,
        userObjective: this.props.userObjective
      };
    },
    handleClick: function(child) {
      if (child.completed) {
        this.setState({
          completed: this.state.completed + 1,
          userObjective: true
        });
      } else {
         this.setState({
          completed: this.state.completed - 1,
          userObjective: false
        });
      }
    },
    render: function() {
        return (
            <div>
                <div className="block row">
                  <div className="objective-stats col-md-3 col-sm-3">
                    <h3>Completed: {this.state.completed}</h3>
                    <h3>Journals: {this.state.journals}</h3>
                    <h3>Missions: {this.state.missions}</h3>
                  </div>
                </div>
                { this.props.user ? <CanvasActions onClick={this.handleClick} objective={this.props.objective} user={this.props.user} userObjective={this.state.userObjective} /> : null }
            </div>
        )
    }
});

module.exports = ObjectiveCanvas;
