/**
 * @jsx React.DOM
 */
/**
 *  SidebarRight displays navigation and filters for page specific things.
 */
var React = require('react');

var SidebarRight = React.createClass({
      render: function() {
        var locations = [
          {
            display: 'All Cities',
            url: '/list/cities'
          },
          {
            display: 'All States',
            url: '/list/states'
          }
        ];
        if (this.props.by == 'cities') {
          locations.shift();
        } else if (this.props.by == 'states') {
          locations.pop();
        }
        var list = locations.map(function(location, i) {
          return (
              <li>
                <a href={location.url}>
                  <i className='sidebar-btn fa fa-globe'></i>
                  <span className='header-text'>{location.display}</span>
                </a>
              </li>
          );
        });
        return (
          <div className='sidebar-right sidebar'>
            <ul>
              <li className='sidebar-title'>
                <span>List</span>
              </li>
              {list}
            </ul>
          </div>
        )
    }
});

module.exports = SidebarRight;
