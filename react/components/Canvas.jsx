/**
 * @jsx React.DOM
 */
/**
 *  Canvas displays the wide img for the page.
 */
var React = require('react');
var CanvasStats = require('./CanvasStats.jsx');

var Canvas = React.createClass({
    render: function() {
        var img = this.props.img;
        var canvasClass;
        var style = {
          backgroundImage: 'url(' + img.url + ')'
        };
        if (img.display === 'Login' || img.display === 'Signup') {
          canvasClass = 'canvas-login';
        } else if (img.half) {
            canvasClass = 'canvas-half col-md-6 col-sm-6';
        } else {
          canvasClass = 'canvas';
        }
        var stats = this.props.stats.map(function(stat, i) {
          return (
            <CanvasStats key={i} stat={stat} />
          );
        });
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
                {stats}
            </div>
        )
    }
});

module.exports = Canvas;
