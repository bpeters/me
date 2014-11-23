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
