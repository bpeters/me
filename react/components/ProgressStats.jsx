/**
 * @jsx React.DOM
 */
/**
 *  Progress Stats shows stats related to an array similar information.
 */
var React = require('react');
var _ = require('lodash');
var BarChart = require('./BarChart.jsx');

var ProgressStats = React.createClass({
    getDefaultProps: function() {
        return {
            progress: []
        };
    },
    getInitialState: function() {
        return {
            progress: this.props.progress
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            progress: nextProps.progress
        });
    },
    render: function() {
        var type = this.props.type;
        var lables = _.pluck(this.state.progress, type);
        var completed = _.pluck(this.state.progress, 'objective_complete_cnt');
        var remaining = _.pluck(this.state.progress, 'remaining');
        var data = {
            labels: lables,
            datasets: [
                {
                    label: "Completed",
                    fillColor: "rgba(0,0,0,0.5)",
                    highlightFill: "rgba(0,0,0,.8)",
                    data: completed
                },
                {
                    label: "Remaining",
                    fillColor: "rgba(255,255,255,0.8)",
                    highlightFill: "rgba(255,255,255,1)",
                    data: remaining
                }
            ]
        };
        var list = this.state.progress.map(function(item, i) {
          return (
            <h4 key={i}>
                {item[type]} : {item.precentage}<sup>%</sup>
            </h4>
          );
        });
        return (
            <div className="canvas-stats row">
                <div className="col-md-12">
                    <BarChart data={data} chartId={this.props.chartId} />
                    <div className="user-info">
                        <h3>{this.props.title}</h3>
                        {list}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ProgressStats;
