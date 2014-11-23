/**
 * @jsx React.DOM
 */
/**
 *  SidebarRight displays navigation and filters for page specific things.
 */
var React = require('react');
var Filters = require('./Filters.jsx');

var SidebarRight = React.createClass({
      getDefaultProps: function() {
        return {
          filters: 0
        };
      },
      getInitialState: function() {
        return {
          filters: this.props.filters
        };
      },
      componentWillReceiveProps: function(nextProps) {
        this.setState({
          filters: nextProps.filters
        });
      },
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
              <li key={i}>
                <a href={location.url}>
                  <i className='sidebar-btn fa fa-globe'></i>
                  <span className='header-text'>{location.display}</span>
                </a>
              </li>
          );
        });
        var filters = this.props.filters;
        return (
          <div className='sidebar-right sidebar'>
            <ul>
              <li className='sidebar-title'>
                <span>List</span>
              </li>
              {list}
            </ul>
            { filters ? <Filters filters={this.state.filters} by={this.props.by} id={this.props.id} /> : null }
          </div>
        )
    }
});

module.exports = SidebarRight;
