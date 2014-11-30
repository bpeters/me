/**
 * @jsx React.DOM
 */
/**
 *  Canvas displays the wide img for the page.
 */
var React = require('react');
var UserCanvas = require('./UserCanvas.jsx');
var ObjectiveCanvas = require('./ObjectiveCanvas.jsx');

var Canvas = React.createClass({
      getInitialState: function() {
        return {
          img: this.props.img
        };
      },
      componentWillReceiveProps: function(nextProps) {
        this.setState({
          img: nextProps.img
        });
      },
    render: function() {
        var canvasClass;
        var style;
        if (this.state.img.url) {
            style = {
              backgroundImage: 'url(' + this.state.img.url + ')'
            };
        } else {
            style = {
              backgroundColor: '#f4f4f4'
            };
        }
        if (this.state.img.display === 'Login' || this.state.img.display === 'Signup') {
          canvasClass = 'canvas-login';
        } else if (this.state.img.half) {
            canvasClass = 'canvas-half col-md-6 col-sm-6';
        } else {
          canvasClass = 'canvas';
        }
        return (
            <div style={style} alt={this.state.img.display} className={canvasClass}>
                { this.props.author ? <UserCanvas userProgress={this.props.userProgress} /> : null }
                { this.props.objective ? <ObjectiveCanvas objective={this.props.objective} user={this.props.user} userObjective={this.props.userObjective} /> : null }
            </div>
        )
    }
});

module.exports = Canvas;
