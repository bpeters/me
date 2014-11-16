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
var props = document.getElementById("props").innerHTML;
props = JSON.parse(props);

if (typeof window !== 'undefined') {
    window.onload = function() {
        React.renderComponent(App(props), document);
        React.renderComponent(<ListPage />, document.getElementById('body'));
    };
}
