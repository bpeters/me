/**
 * @jsx React.DOM
 */
/**
 *  For rendering the app on client side.
 */
var React = require('react');
var App = require('./App.jsx');
var props = document.getElementById("props").innerHTML;
props = JSON.parse(props);

if (typeof window !== 'undefined') {
    window.onload = function() {
        React.renderComponent(App(props), document);
    };
}
