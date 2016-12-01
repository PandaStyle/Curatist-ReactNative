/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

// Import the reducer and create a store
import { reducer } from './postsRedux'

// Add the thunk middleware to our store
const store = createStore(reducer, applyMiddleware(thunk))

// Import the App container component
import App from './App'

export default class Curatist extends Component {
    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Timcsi' },
            { key: '2', title: 'Panda' },
        ],
    };

    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderHeader = (props) => {
        return <TabBarTop {...props} />;
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <Provider store={store}><App /></Provider>;
            case '2':
                return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
            default:
                return null;
        }
    };


    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  }
});

AppRegistry.registerComponent('Curatist', () => Curatist);
