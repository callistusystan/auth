import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCYaz4vjO5AkRoSQ6eJlY14rxZ4fkFyKqw',
        authDomain: 'auth-2082f.firebaseapp.com',
        databaseURL: 'https://auth-2082f.firebaseio.com',
        storageBucket: 'auth-2082f.appspot.com',
        messagingSenderId: '1076652445629'
      });
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner size='large' />
          </CardSection>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
