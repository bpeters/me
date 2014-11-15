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
        var style = {
          backgroundImage: 'url(' + img.url + ')'
        };
        return (
            <div style={style} alt={img.display} className='canvas'></div>
        )
    }
});

module.exports = Canvas;
