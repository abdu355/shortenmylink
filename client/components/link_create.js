//show form to create a new link
import React from 'react';

class LinkCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();
    //console.log('submit', this.refs.link.value);

    //call meteor method from Links
    Meteor.call('links.insert', this.refs.link.value, error => {
      if (error) {
        this.setState({ error: 'Enter a valid URL' });
      } else {
        this.setState({ error: '' });
        this.refs.link.value = '';
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label> Link to shorten </label>
          <div className="text-danger"> {this.state.error} </div>
          <input ref="link" className="form-control" />
        </div>

        <button className="btn btn-primary">Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;
