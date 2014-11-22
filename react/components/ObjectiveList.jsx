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
        var city;
        if (this.props.by != 'city') {
          city = true;
        }
        var list = this.state.list.map(function(objective, i) {
          return (
            <tr key={i}>
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
          <div className='col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10 main'>
            <div className='table-responsive'>
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
            </div>
          </div>
        )
    }
});

module.exports = ObjectiveList;
