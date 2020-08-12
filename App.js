import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Root from './app/components/Root'
import { Provider, connect } from 'react-redux'
import { store } from './app/config/store'


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}
