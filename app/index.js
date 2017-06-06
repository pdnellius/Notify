import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, AppState, Button, Switch } from 'react-native';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';


// Progress: Was trying to schedule a notification for the top of the upcoming
// hour. To be used for a office fitness app that synchronizes exercise.



const generateWaitCode = () => {
	console.log('button pressed');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 100
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  picker: {
  	width: 100,
  },
  waitNumber: {
  	fontSize: 40,
  	textAlign: 'center',
  	fontWeight: 'bold'
  },
  generateButton: {
  	borderWidth: 1,
  	borderStyle: 'solid',
  	borderColor: 'black'
  }
});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.handleAppStateChange = this.handleAppStateChange.bind(this);
		this.state = {
			seconds: 5,
			isSubscribed: false,
      people: {
        count: 0
      }
		};
	}

	componentDidMount() {
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	handleAppStateChange(appState) {
		if (appState === 'background') {
			// TODO: Schedule bg notification for top of hour
			PushNotification.localNotificationSchedule({
			  message: "My Notification Message", // (required)
			  date: new Date(Date.now() + (this.state.seconds * 1000))
			});
			console.log('app is in background', this.state.seconds);
		}
	}

  handleSubscription(handledValue) {
    if (handledValue == true) {
      PushNotification.localNotificationSchedule({
        message: "My Notification Message", // (required)
        date: new Date(Date.now() + (this.state.seconds * 1000))
      });
    }
    this.setState({isSubscribed: handledValue});
  }


	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Turn on notifications below:</Text>
				<Switch
        value={this.state.isSubscribed}
        onValueChange={(value) => this.handleSubscription(value)}
        ></Switch>
				<Text style={styles.welcome}>Current exercise is:</Text>

				<PushController />
			</View>
		);
	}
}
