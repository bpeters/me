/**
 * @jsx React.DOM
 */
/**
 *  Canvas displays the wide img for the page.
 */
var React = require('react');
var UserCanvas = require('./UserCanvas.jsx');

var Canvas = React.createClass({
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
                { this.props.user ? <UserCanvas userProgress={this.props.userProgress} /> : null }
            </div>
        )
    }
});

module.exports = Canvas;
