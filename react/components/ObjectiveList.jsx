/**
 * @jsx React.DOM
 */
/**
 *  Objective List displays objectives detail
 */
var React = require('react');

var ObjectiveList = React.createClass({
      render: function() {
        var city;
        if (this.props.by != 'city') {
          city = true;
        }
        var list = this.props.list.map(function(objective) {
          return (
            <tr key={objective.id}>
              <td><a href={'/objective/' + objective.objective_id}>{objective.objective}</a></td>
              { city ? <td><a href={'/location/city/' + objective.city_id}>{objective.city}</a></td> : null }
              <td>{objective.objective_journal_cnt}</td>
              <td>{objective.objective_mission_cnt}</td>
              <td>0</td>
              <td>0</td>
            </tr>
          );
        });
        return (
          <table className='table'>
            <thead>
              <tr>
                <th><span>Objective</span></th>
                { city ? <th><span>City</span></th> : null }
                <th><span>Journals</span></th>
                <th><span>Missions</span></th>
                <th><span className='glyphicon glyphicon-ok'></span></th>
                <th><span className='glyphicon glyphicon-heart'></span></th>
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </table>
        )
    }
});

module.exports = ObjectiveList;
