/**
 * @jsx React.DOM
 */
/**
 *  Canvas displays the wide img for the page.
 */
var React = require('react');
var CanvasStats = require('./CanvasStats.jsx');
var ProgressStats = require('./ProgressStats.jsx');

var Canvas = React.createClass({
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
        var img = this.props.img;
        var canvasClass;
        var style = {
          backgroundColor: '#f4f4f4'
        };
        if (img.display === 'Login' || img.display === 'Signup') {
          canvasClass = 'canvas-login';
        } else if (img.half) {
            canvasClass = 'canvas-half col-md-6 col-sm-6';
        } else {
          canvasClass = 'canvas';
        }
        return (
            <div style={style} alt={img.display} className={canvasClass}>
                <div className="canvas-profile row">
                    <div className="col-md-12">
                        <div className="avatar"></div>
                        <div className="user-info">
                            <h3>brennen</h3>
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

module.exports = Canvas;
