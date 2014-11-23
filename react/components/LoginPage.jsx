/**
 * @jsx React.DOM
 */
/**
 *  Login Page displays login information
 */
var React = require('react');
var Header = require('./Header.jsx');
var Canvas = require('./Canvas.jsx');
var SidebarRight = require('./SidebarRight.jsx');
var LoginForm = require('./LoginForm.jsx');

var LoginPage = React.createClass({
    getInitialState: function() {
        return {
            nav: [{
                display: 'Log In',
                url: '/login'
            }],
            img : {
                display: 'Login',
                url: '/images/login.jpg'
            },
            by: '',
            messages: this.props.messages,
            sidebarRight: false
        };
    },
    showSidebar: function(sidebar) {
        if (sidebar === 'right') {
            this.setState({
                sidebarRight: !this.state.sidebarRight
            });
        }
    },
    render: function() {
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} onClick={this.showSidebar}/>
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} />
                    <LoginForm messages={this.state.messages} />
                </div>
            </div>
        )
    }
});

module.exports = LoginPage;
