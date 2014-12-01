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
var SignupPage = require('./components/SignupPage.jsx');
var LocationPage = require('./components/LocationPage.jsx');
var ObjectivePage = require('./components/ObjectivePage.jsx');
var JournalPage = require('./components/JournalPage.jsx');
var MissionPage = require('./components/MissionPage.jsx');
var AuthorPage = require('./components/AuthorPage.jsx');
var props = document.getElementById("props").innerHTML;
props = JSON.parse(props);

var page;

if (props.page === 'ListPage') {
  page = <ListPage params={props.params} user={props.user} />;
} else if (props.page === 'LoginPage') {
  page = <LoginPage params={props.params} user={props.user} messages={props.messages} />;
} else if (props.page === 'SignupPage') {
  page = <SignupPage params={props.params} user={props.user} messages={props.messages} />;
} else if (props.page === 'LocationPage') {
  page = <LocationPage params={props.params} user={props.user} location={props.location} type={props.type} stats={props.stats}/>;
} else if (props.page === 'ObjectivePage') {
  page = <ObjectivePage params={props.params} user={props.user} objective={props.objective} stats={props.stats}/>;
} else if (props.page === 'JournalPage') {
  page = <JournalPage params={props.params} user={props.user} journal={props.journal} />;
} else if (props.page === 'MissionPage') {
  page = <MissionPage params={props.params} user={props.user} mission={props.mission} />;
} else if (props.page === 'AuthorPage') {
  page = <AuthorPage params={props.params} user={props.user} author={props.author} />;
}


if (typeof window !== 'undefined') {
    window.onload = function() {
        React.renderComponent(App(props), document);
        React.renderComponent(page, document.getElementById('body'));
    };
}
