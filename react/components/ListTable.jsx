/**
 * @jsx React.DOM
 */
/**
 *  List Table displays a list in a table.
 */
var React = require('react');
var List = require('./List.jsx');

var ListTable = React.createClass({
    render: function() {
      var by = this.props.by
      var header = by.charAt(0).toUpperCase() + by.slice(1);
      var list = this.props.list;
        return (
          <div className='col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10 main'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>
                      <span>{header}</span>
                    </th>
                    <th>
                      <span>Objectives</span>
                    </th>
                    <th>
                      <span>Journals</span>
                    </th>
                    <th>
                      <span>Missions</span>
                    </th>
                  </tr>
                </thead>
                <List list={list} by={by} />
              </table>
            </div>
          </div>
        )
    }
});

module.exports = ListTable;
