/**
 * @jsx React.DOM
 */
/**
 *  User Canvas displays the user stats and charts.
 */
var React = require('react');
var CanvasStats = require('./CanvasStats.jsx');
var ProgressStats = require('./ProgressStats.jsx');

var UserCanvas = React.createClass({
      getInitialState: function() {
        return {
          progress: this.props.userProgress.progress,
          stateProgress: this.props.userProgress.states,
          cityProgress: this.props.userProgress.cities
        };
      },
      componentWillReceiveProps: function(nextProps) {
        this.setState({
          progress: nextProps.userProgress.progress,
          stateProgress: nextProps.userProgress.states,
          cityProgress: nextProps.userProgress.cities
        });
      },
    render: function() {
        return (
            <div>
                <div className="canvas-profile row">
                    <div className="col-md-12">
                        <div className="avatar"></div>
                        <div className="user-info">
                            <h3>{this.props.userProgress.username}</h3>
                            <div className="info-block"></div>
                            <div className="info-block2"></div>
                        </div>
                    </div>
                </div>
                <CanvasStats progress={this.state.progress} title={'Mission Everything'} chartId={'user-progress'} />
                <ProgressStats progress={this.state.stateProgress} type={'state'} title={'State Progress'} chartId={'state-progress'}/>
                <ProgressStats progress={this.state.cityProgress} type={'city'} title={'City Progress'} chartId={'city-progress'}/>
            </div>
        )
    }
});

module.exports = UserCanvas;
