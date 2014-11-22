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
            nav: [{
                display: '',
                url: ''
            }]
        };
    },
    propagateLeftClick: function() {
      this.props.onClick('left');
    },
    propagateRightClick: function() {
      this.props.onClick('right');
    },
    render: function() {
        var nav = this.props.nav.map(function(navItem, i) {
          return (
            <div key={i}>
                <span className='header-text'>/</span>
                <span className='header-text'><a href={navItem.url}>{ navItem.display }</a></span>
            </div>
          );
        });
        var avatar;
        if (this.props.user) {
          avatar = true;
        }
        return (
            <div className='row header'>
              <div className='user'>
                { avatar ? <i className="sidebar-left-btn fa fa-user" onClick={this.propagateLeftClick}></i> : <i className="fa fa-user"></i> }
                { avatar ? <span className='header-text'>{ this.props.user.username }</span> : null }
                { !avatar ? <span className='header-text'><a href='/login'>Log In</a></span> : null }
                { !avatar ? <span className='header-text'><a href='/signup'>Sign Up</a></span> : null }
              </div>
              <div className='globe'>
                <i className='sidebar-right-btn fa fa-globe' onClick={this.propagateRightClick}></i>
                {nav}
              </div>
            </div>
        )
    }
});

module.exports = Header;
