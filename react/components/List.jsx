/**
 * @jsx React.DOM
 */
/**
 *  List displays the list items in the table body.
 */
var React = require('react');

var List = React.createClass({
      render: function() {
        var by;
        if (this.props.by == 'cities') {
          by = 'city';
        } else if (this.props.by == 'states') {
          by = 'state';
        }
        var listItem = this.props.list.map(function(listitem) {
          return (
            <tr key={listitem.id}>
              <td><a href={'/location/' + by + '/' + listitem.id}>{listitem.name}</a></td>
              <td>{listitem.objectives}</td>
              <td>{listitem.journals}</td>
              <td>{listitem.missions}</td>
            </tr>
          );
        });
        return (
          <table className='table'>
            <thead>
              <tr>
                <th>
                  <span>{this.props.header}</span>
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
            <tbody>
              {listItem}
            </tbody>
          </table>
        )
    }
});

module.exports = List;
