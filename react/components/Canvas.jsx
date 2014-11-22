/**
 * @jsx React.DOM
 */
/**
 *  Canvas displays the wide img for the page.
 */
var React = require('react');

var Canvas = React.createClass({
    render: function() {
        var img = this.props.img;
        var canvasClass;
        var style = {
          backgroundImage: 'url(' + img.url + ')'
        };
        if (img.display === 'Login' || img.display === 'Signup') {
          canvasClass = 'canvas-login';
        } else {
          canvasClass = 'canvas';
        }
        return (
            <div style={style} alt={img.display} className={canvasClass}></div>
        )
    }
});

module.exports = Canvas;
