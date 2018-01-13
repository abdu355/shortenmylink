import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';

class LinkList extends React.Component {
  renderRows() {
    console.log(this.props.links);
    return this.props.links.map(link => {
      const { url, clicks, token } = link;
      const shortLink = `http://localhost:3000/${token}`;

      return (
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={shortLink} target="_blank">
              {shortLink}
            </a>
          </td>
          <td>{clicks}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th> Link</th>
            <th> Shortened Link</th>
            <th> Clicks</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}

//to subscribe to data and allow react components to update first install these packs:
//npm i --save react-addons-pure-render-mixin
//meteor add react-meteor-data
export default createContainer(() => {
  Meteor.subscribe('links');
  return { links: Links.find({}).fetch() };
}, LinkList);
