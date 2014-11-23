/**
 * @jsx React.DOM
 */
/**
 *  Bar Chart renders a bar chart using Chart.js
 */
var React = require('react');
var $ = require('jquery');

var BarChart = React.createClass({
    getInitialState: function() {
        return {
            data: this.props.data,
            chartId: this.props.chartId
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            data: nextProps.data,
            chartId: nextProps.chartId
        });
        this.buildChart(nextProps.data, nextProps.chartId);
    },
    buildChart: function(data, chartId) {
        $("#div-" + chartId).html("");
        $("#div-" + chartId).append("<canvas id=" + this.state.chartId + "></canvas>");
        var ctx = $("#" + chartId).get(0).getContext("2d");
        var barChart = new Chart(ctx).Bar(data, {
            animation: false,
            barShowStroke : false,
            scaleShowGridLines : false
        });
    },
    render: function() {
        return (
            <div id={'div-' + this.state.chartId} className={this.state.chartId} >
            </div>
        )
    }
});

module.exports = BarChart;
