/**
 * @jsx React.DOM
 */
/**
 *  Mission List displays missions detail
 */
var React = require('react');

var MissionList = React.createClass({
      render: function() {
        var state;
        if (this.props.by === 'state') {
          state = true;
        }
        var list = this.props.list.map(function(mission, i) {
          return (
            <tr key={i}>
              <td><a href={'/mission/' + mission.mission_id}>{mission.mission}</a></td>
              <td><a href={'/author/' + mission.author}>{mission.author}</a></td>
              { state ? <td><a href={'/objective/' + mission.objective_id}>{mission.objective}</a></td> : null }
              { state ? <td><a href={'/location/city/' + mission.city_id}>{mission.city}</a></td> : null }
              <td>{mission.missionobjective_journal_cnt}</td>
            </tr>
          );
        });
        return (
          <div className='col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10 main'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <th><span>Mission</span></th>
                  <th><span>Author</span></th>
                  { state ? <th><span>Objective</span></th> : null }
                  { state ? <th><span>City</span></th> : null }
                  <th><span>Journals</span></th>
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
