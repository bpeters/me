/**
 * @jsx React.DOM
 */
/**
 *  Header displays navigation for all pages.
 */
var React = require('react');

var Header = React.createClass({
    render: function() {
        var nav = this.props.nav;
        return (
            <div className='row header'>
              <div className='user'>
                <i className="fa fa-user"></i>
                <span className='header-text'><a href='/login'>Log In</a></span>
                <span className='header-text'><a href='/signup'>Sign Up</a></span>
              </div>
              <div className='globe'>
                <i className='sidebar-right-btn fa fa-globe'></i>
                <span className='header-text'><a href={nav.url}>{nav.display}</a></span>
              </div>
            </div>
        )
    }
});

module.exports = Header;
