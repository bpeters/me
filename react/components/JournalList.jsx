/**
 * @jsx React.DOM
 */
/**
 *  Journal List displays journals detail
 */
var React = require('react');

var JournalList = React.createClass({
      render: function() {
        var state, mission;
        if (this.props.by === 'state' || this.props.by === 'mission') {
          state = true;
        }
        if (this.props.by === 'mission') {
          mission = true;
        }
        var list = this.props.list.map(function(journal, i) {
          return (
            <tr key={i}>
              <td><a href={'/journal/' + journal.journal_id}>{journal.journal}</a></td>
              { state ? <td><a href={'/objective/' + journal.objective_id}>{journal.objective}</a></td> : null }
              <td><a href={'/author/' + journal.author}>{journal.author}</a></td>
              { state ? <td><a href={'/location/city/' + journal.city_id}>{journal.city}</a></td> : null }
              { mission ? <td><a href={'/location/state/' + journal.state_id}>{journal.state}</a></td> : null }
            </tr>
          );
        });
        return (
          <div className='col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10 main'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th><span>Journal</span></th>
                    { state ? <th><span>Objective</span></th> : null }
                    <th><span>Author</span></th>
                    { state ? <th><span>City</span></th> : null }
                    { mission ? <th><span>State</span></th> : null }
                  </tr>
                </thead>
                <tbody>
                  {list}
                </tbody>
              </table>
            </div>
          </div>
        )
    }
});

module.exports = JournalList;
