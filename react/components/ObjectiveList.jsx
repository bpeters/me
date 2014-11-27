/**
 * @jsx React.DOM
 */
/**
 *  Objective List displays objectives detail
 */
var React = require('react');

var ObjectiveList = React.createClass({
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
        var list = this.state.list.map(function(objective, i) {
          return (
            <tr key={i}>
              <td><a href={'/objective/' + objective.objective_id}>{objective.objective}</a></td>
              { !author ? <td><a href={'/location/city/' + objective.city_id}>{objective.city}</a></td> : null }
              { !author ? <td><a href={'/location/State/' + objective.state_id}>{objective.state}</a></td> : null }
              { !author ? <td>{objective.objective_journal_cnt}</td> : null }
              { !author ? <td>{objective.objective_mission_cnt}</td> : null }
              { !author ?  <td>{objective.objective_complete_cnt}</td> : null }
              { !author ?  <td>0</td> : null }
            </tr>
          );
        });
        return (
          <div className='col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th><span>Objective</span></th>
                    { !author ? <th><span>City</span></th> : null }
                    { !author ? <th><span>State</span></th> : null }
                    { !author ? <th><span>Journals</span></th> : null }
                    { !author ? <th><span>Missions</span></th> : null }
                    { !author ? <th><span className='glyphicon glyphicon-ok'></span></th> : null }
                    { !author ? <th><span className='glyphicon glyphicon-heart'></span></th> : null }
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

module.exports = ObjectiveList;
