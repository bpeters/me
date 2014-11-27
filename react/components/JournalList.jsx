/**
 * @jsx React.DOM
 */
/**
 *  Journal List displays journals detail
 */
var React = require('react');

var JournalList = React.createClass({
      getDefaultProps: function() {
        return {
          list: []
        };
      },
      getInitialState: function() {
        return {
          list: this.props.list
        };
      },
      componentWillReceiveProps: function(nextProps) {
        this.setState({
          list: nextProps.list
        });
      },
      render: function() {
        if (this.props.by === 'author') {
          var author = true;
        }
        var list = this.props.list.map(function(journal, i) {
          return (
            <tr key={i}>
              <td><a href={'/journal/' + journal.journal_id}>{journal.journal}</a></td>
              { !author ? <td><a href={'/objective/' + journal.objective_id}>{journal.objective}</a></td> : null }
              { !author  ? <td><a href={'/author/' + journal.author}>{journal.author}</a></td> : null }
              { !author  ? <td><a href={'/location/city/' + journal.city_id}>{journal.city}</a></td> : null }
              { !author  ? <td><a href={'/location/state/' + journal.state_id}>{journal.state}</a></td> : null }
            </tr>
          );
        });
        return (
          <div className='col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th><span>Journal</span></th>
                    { !author  ? <th><span>Objective</span></th> : null }
                    { !author  ? <th><span>Author</span></th> : null }
                    { !author  ? <th><span>City</span></th> : null }
                    { !author  ? <th><span>State</span></th> : null }
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
