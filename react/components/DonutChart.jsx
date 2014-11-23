/**
 * @jsx React.DOM
 */
/**
 *  Donut Chart renders a donut chart using Chart.js
 */
var React = require('react');
var $ = require('jquery');

var DonutChart = React.createClass({
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
        $("#div-" + chartId).append("<canvas id=" + this.state.chartId + " width='160px' height='160px'></canvas>");
        var ctx = $("#" + chartId).get(0).getContext("2d");
        var donutChart = new Chart(ctx).Doughnut(data, {
            segmentShowStroke : false,
            animateRotate : false,
        });
    },
    render: function() {
        return (
            <div id={'div-' + this.state.chartId} className={this.state.chartId}>
            </div>
        )
    }
});

module.exports = DonutChart;
