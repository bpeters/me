/**
 * @jsx React.DOM
 */
/**
 *  Mission List displays missions detail
 */
var React = require('react');

var MissionList = React.createClass({
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
        var list = this.props.list.map(function(mission, i) {
          return (
            <tr key={i}>
              <td><a href={'/mission/' + mission.mission_id}>{mission.mission}</a></td>
              { !author ? <td><a href={'/author/' + mission.author}>{mission.author}</a></td> : null }
              { !author ? <td><a href={'/objective/' + mission.objective_id}>{mission.objective}</a></td> : null }
              { !author ? <td><a href={'/location/city/' + mission.city_id}>{mission.city}</a></td> : null }
              { !author ? <td><a href={'/location/state/' + mission.state_id}>{mission.state}</a></td> : null }
              { !author ? <td>{mission.objective_journal_cnt}</td> : null }
              { !author ? <td>{mission.objective_mission_cnt}</td> : null }
            </tr>
          );
        });
        return (
          <div className='col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <th><span>Mission</span></th>
                  { !author ? <th><span>Author</span></th> : null }
                  { !author ? <th><span>Objective</span></th> : null }
                  { !author ? <th><span>City</span></th> : null }
                  { !author ? <th><span>State</span></th> : null }
                  { !author ? <th><span>Journals</span></th> : null }
                  { !author ? <th><span>Missions</span></th> : null }
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

module.exports = MissionList;
