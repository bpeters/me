/**
 * @jsx React.DOM
 */
/**
 *  List Table displays a list in a table.
 */
var React = require('react');
var List = require('./List.jsx');
var ObjectiveList = require('./ObjectiveList.jsx');
var JournalList = require('./JournalList.jsx');
var MissionList = require('./MissionList.jsx');

var Table = React.createClass({
    getDefaultProps: function() {
      return {
        results: [],
        display: 'List',
        by: ''
      };
    },
    getInitialState: function() {
      return {
        results: this.props.results,
        display: this.props.display,
        by: this.props.by
      };
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({
        results: nextProps.results,
        display: nextProps.display,
        by: nextProps.by
      });
    },
    render: function() {
      console.log(this.state.results);
      var list;
      if (this.state.display === 'List') {
        var header = this.state.by.charAt(0).toUpperCase() + this.state.by.slice(1);
        list = <List list={this.state.results} by={this.state.by} header={header} />;
      } else if (this.state.display === 'Objectives') {
        list = <ObjectiveList list={this.state.results} by={this.state.by} />;
      } else if (this.state.display === 'Journals') {
        list = <JournalList list={this.state.results} by={this.state.by} />;
      } else if (this.state.display === 'Missions') {
        list = <MissionList list={this.state.results} by={this.state.by} />;
      }
      return (
        <div className='col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10 main'>
          <div className='table-responsive'>
            {list}
          </div>
        </div>
      )
    }
});

module.exports = Table;
