/**
 * @jsx React.DOM
 */
/**
 *  For rendering the app on client side.
 */
var React = require('react');
var $ = require('jquery');
var App = require('./App.jsx');
var ListPage = require('./components/ListPage.jsx');
var LoginPage = require('./components/LoginPage.jsx');
var props = document.getElementById("props").innerHTML;
props = JSON.parse(props);

var page;

if (props.page === 'ListPage') {
  page = <ListPage params={props.params} user={props.user} />;
} else if (props.page === 'LoginPage') {
  page = <LoginPage params={props.params} user={props.user} messages={props.messages} />;
}

if (typeof window !== 'undefined') {
    window.onload = function() {
        React.renderComponent(App(props), document);
        React.renderComponent(page, document.getElementById('body'));
    };
}
