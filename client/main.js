import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import LinkCreate from './components/link_create';
import LinkList from './components/link_list';
//import meteor methods for use with client
import { Links } from '../imports/collections/links';

const App = () => {
  return (
    <div className="container">
      <Header />
      <LinkCreate />
      <LinkList />
    </div>
  );
};

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
