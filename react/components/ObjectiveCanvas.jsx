/**
 * @jsx React.DOM
 */
/**
 *  Objective Canvas displays the objective buttons, stats and charts.
 */
var React = require('react');
var ObjectiveActions = require('../actions/ObjectiveActions');

var ObjectiveCanvas = React.createClass({
    completeObjective: function() {
      console.log(this.props.objective.objective_id);
      ObjectiveActions.complete(this.props.objective.objective_id, 'test');
    },
    render: function() {
        return (
            <div>
                <div className="block"></div>
                <div className="row canvas-actions">
                    <div className="col-md-12">
                      <button onClick={this.completeObjective} type="submit" className="btn btn-success">Complete Objective</button>
                      <button type="submit" className="btn btn-default">Add to Mission</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ObjectiveCanvas;
