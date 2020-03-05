import React, { Component } from 'react';

import { checkAuth, loadData } from '../data/spreadsheet';
import FlippingCards from './FlippingCards';
import config from '../config'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      hasContent: false,
      authenticated: false
    }

    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
  }

  componentDidMount() {
    checkAuth().then(this.handleAuth.bind(this));
  }

  /**
   * Check user authenification status and set app state accordingly
   */
  handleAuth() {
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
    let signedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
    console.log("handleAuth", signedIn)
    this.updateSigninStatus(signedIn);
  }

  updateSigninStatus(signedIn) {
    if (signedIn) {
      this.setState({
        authenticated: true
      });
      loadData().then(this.onLoad, this.onError);
    } else {
      this.setState({
        authenticated: false,
        loading: false
      })
    }
  }

  onLoad(data, error) {
    this.setState({
      rows: data,
      hasContent: true,
      loading: false
    });
  }

  onError(error) {
    this.setState({
      error: error,
      hasContent: false,
      loading: false
    });
  }

  render() {
    return (
      <div className="app">
        <div className="banner">
          <div className="left"></div>
          <div className="right"></div>
        </div>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <div className="loader" />
      );
    }

    if (!this.state.authenticated) {
      return (
        <button onClick={this.authenticate.bind(this)} className="btn">Connect with Google</button>
      );
    }
    
    if (this.state.hasContent) {
      var pairs = new Array(config.gridSize).fill(1);
      var rows = pairs.map((row, index) => {
        return (<FlippingCards key={'flip-' + index} />)
      });

      return (<div className="cards">
        {rows}
      </div>
      );
    }

    if (this.state.error) {
      return (
        <h1> {this.state.error} </h1>
      );
    }
  }

  /**
   * Request Google authentification
   */
  authenticate(e) {
    e.preventDefault();
    console.log("authenticate")
    window.gapi.auth2.getAuthInstance().signIn();
    // checkAuth(false).then(this.handleAuth.bind(this));
  }
}

export default App;
