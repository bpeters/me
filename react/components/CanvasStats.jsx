/**
 * @jsx React.DOM
 */
/**
 *  Canvas Stats shows stats related to the page it represents.
 */
var React = require('react');
var DonutChart = require('./DonutChart.jsx');

var CanvasStats = React.createClass({
    getInitialState: function() {
        return {
            precentage: this.props.progress.precentage,
            complete: this.props.progress.complete,
            total: this.props.progress.total
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            precentage: nextProps.progress.precentage,
            complete: nextProps.progress.complete,
            total: nextProps.progress.total
        });
    },
    render: function() {
        var data = [
            {
                value: this.state.complete,
                color:"rgba(0,0,0,0.5)",
                highlight: "rgba(0,0,0,.8)",
                label: "Completed"
            },
            {
                value: this.state.total - this.state.complete,
                color: "rgba(255,255,255,0.8)",
                highlight: "rgba(255,255,255,1)",
                label: "Remaining"
            }
        ];
        return (
            <div className="canvas-stats row">
                <div className="col-md-12">
                    <DonutChart data={data} chartId={this.props.chartId} />
                    <div className="user-info">
                        <h3>{this.props.title}</h3>
                        <h4>Total : {this.state.precentage}<sup>%</sup></h4>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = CanvasStats;
