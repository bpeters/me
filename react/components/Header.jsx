/**
 * @jsx React.DOM
 */
/**
 *  Header displays navigation for all pages.
 */
var React = require('react');

var Header = React.createClass({
    getDefaultProps: function() {
        return {
            nav: {
                display: '',
                url: ''
            }
        };
    },
    propagateLeftClick: function() {
      this.props.onClick('left');
    },
    propagateRightClick: function() {
      this.props.onClick('right');
    },
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
                <i className='sidebar-right-btn fa fa-globe' onClick={this.propagateRightClick}></i>
                <span className='header-text'><a href={nav.url}>{nav.display}</a></span>
              </div>
            </div>
        )
    }
});

module.exports = Header;
