/**
 * @jsx React.DOM
 */
/**
 *  Objective Canvas displays the objective buttons, stats and charts.
 */
var React = require('react');
var ObjectiveActions = require('../actions/ObjectiveActions');

var CanvasActions = React.createClass({
    getInitialState: function() {
        return {
          showJournalEntry: false,
          userObjective: this.props.userObjective
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            userObjective: nextProps.userObjective
        });
    },
    completeObjective: function() {
      ObjectiveActions.complete(this.props.objective.objective_id, this.props.user.username);
      this.setState({
        userObjective: true
      });
    },
    notCompleteObjective: function() {
      ObjectiveActions.notComplete(this.props.objective.objective_id, this.props.user.username);
      this.setState({
        userObjective: false
      });
    },
    showJournal: function() {
      
    },
    render: function() {
        return (
          <div className="row canvas-actions">
              <div className="col-md-12">
                { !this.state.userObjective ? <button onClick={this.completeObjective} type="submit" className="btn btn-success">Complete Objective</button> : null } 
                { this.state.userObjective ? <button onClick={this.showJournal} type="submit" className="btn btn-success">Write Journal Entry</button> : null }
                <button type="submit" className="btn btn-default">Add to Mission</button>
                { this.state.userObjective ? <button onClick={this.notCompleteObjective} type="submit" className="btn btn-danger">Did Not Complete</button> : null }
              </div>
          </div>
        )
    }
});

module.exports = CanvasActions;
