/**
 * @jsx React.DOM
 */
/**
 *  Filters displays filter criteria for the right sidebar.
 */
var React = require('react');

var Filters = React.createClass({
      getInitialState: function() {
        return {
            display: this.props.filters.display,
            current: this.props.filters.current,
            action: this.props.filters.action
        };
      },
      handleClick: function(i) {
        this.setState({
          current: this.state.display[i].name
        })
        this.state.action(this.state.display[i].name, this.props.by, this.props.id);
      },
      render: function() {
        var self = this;
        var display = this.state.display.map(function(item, i) {
          var currentClass;
          if (item.name === self.state.current) {
            currentClass = 'display-current';
          }
          return (
            <li key={i}>
              <a onClick={self.handleClick.bind(null, i)} className={currentClass}>
                <i className={'sidebar-btn fa' + item.class}></i>
                <span className='header-text'>
                  {item.name}
                </span>
              </a>
            </li>
          );
        });
        return (
          <ul className='display-list'>
            <li className='sidebar-title'>
              <span>Display</span>
              {display}
            </li>
          </ul>
        )
    }
});

module.exports = Filters;
