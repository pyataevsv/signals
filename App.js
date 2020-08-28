import React, { Component } from 'react'
import Root from './app/components/Root'
import { Provider, connect } from 'react-redux'
import { store } from './app/config/store'
import AsyncStorage from '@react-native-community/async-storage';
import * as actionCreators from './app/reducers/actionCreators'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstEnter: null
    }
  }


  componentDidMount = async () => {
    const firstEnter = await AsyncStorage.getItem('first_enter')
    const loginData = await AsyncStorage.getItem('login_storage')

    if (loginData) store.dispatch(actionCreators.setLoginData(JSON.parse(loginData)))


    if (firstEnter === null) {
      this.setState({ firstEnter: true })

      await AsyncStorage.setItem('first_enter', 'yes')
    } else {

      // await AsyncStorage.removeItem('first_enter')
      this.setState({ firstEnter: false })
    }
  }

  render() {

    return (
      <Provider store={store}>
        {(this.state.firstEnter === null) ? null : <Root firstEnter={this.state.firstEnter} />}
      </Provider>
    )

  }
}
