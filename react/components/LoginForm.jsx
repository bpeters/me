/**
 * @jsx React.DOM
 */
/**
 *  Login Form displays the login form details.
 */
var React = require('react');

var LoginForm = React.createClass({
      render: function() {
        var messages = this.props.messages.map(function(message, i) {
          return (
            <div key={i} className="alert alert-danger" role="alert">{message}</div>
          );
        });
        return (
            <div className='row'>
              <div className='col-sm-offset-4 col-md-offset-4 col-md-4 col-sm-4 clear-form'>
                {messages}
                <form action="/login" method="post" role="form">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" placeholder="john@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" placeholder="********" />
                  </div>
                  <button type="submit" className="btn btn-success">Log In</button>
                </form>
              </div>
            </div>
        )
    }
});

module.exports = LoginForm;
