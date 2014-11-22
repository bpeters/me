/**
 * @jsx React.DOM
 */
/**
 *  Journal List displays journals detail
 */
var React = require('react');

var JournalList = React.createClass({
      render: function() {
        var city;
        if (this.props.by != 'city') {
          city = true;
        }
        var list = this.props.list.map(function(journal) {
          return (
            <tr key={journal.id}>
              <td><a href={'/journal/' + journal.journal_id}>{journal.journal}</a></td>
              <td><a href={'/objective/' + journal.objective_id}>{journal.objective}</a></td>
              <td><a href={'/author/' + journal.author}>{journal.author}</a></td>
              { city ? <td><a href={'/location/city/' + journal.city_id}>{journal.city}</a></td> : null }
            </tr>
          );
        });
        return (
          <table className='table'>
            <thead>
              <tr>
                <th><span>Journal</span></th>
                <th><span>Objective</span></th>
                <th><span>Author</span></th>
                { city ? <th><span>City</span></th> : null }
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </table>
        )
    }
});

module.exports = JournalList;
