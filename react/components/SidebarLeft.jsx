/**
 * @jsx React.DOM
 */
/**
 *  SidebarLeft displays navigation and user specific things.
 */
var React = require('react');

var SidebarRight = React.createClass({
      render: function() {
        return (
          <div className='sidebar-left sidebar'>
            <ul>
              <li className='sidebar-title'>
                <span>Profile</span>
              </li>
              <li>
                <a href={'/author/' + this.props.user.username + '/stats'}>
                  <i className='sidebar-btn fa fa-bar-chart'></i>
                  <span className='header-text'>Stats</span>
                </a>
              </li>
              <li>
                <a href={'/author/' + this.props.user.username + '/journals'}>
                  <i className='sidebar-btn fa fa-book'></i>
                  <span className='header-text'>Journals</span>
                </a>
              </li>
              <li>
                <a href={'/author/' + this.props.user.username + '/missions'}>
                  <i className='sidebar-btn fa fa-rocket'></i>
                  <span className='header-text'>Missions</span>
                </a>
              </li>
            </ul>
            <ul>
              <li className='sidebar-title'>
                <span>Account</span>
              </li>
              <li>
                <a href='/account'>
                  <i className='sidebar-btn fa fa-cog'></i>
                  <span className='header-text'>Settings</span>
                </a>
              </li>
              <li>
                <a href='/logout'>
                  <i className='sidebar-btn fa fa-sign-out'></i>
                  <span className='header-text'>Log Out</span>
                </a>
              </li>
            </ul>
          </div>
        )
    }
});

module.exports = SidebarRight;
