/**
 * @jsx React.DOM
 */
/**
 *  List displays the list items in the table body.
 */
var React = require('react');

var List = React.createClass({
      render: function() {
        var by = this.props.by;
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
          <tbody>
            {listItem}
          </tbody>
        )
    }
});

module.exports = List;
