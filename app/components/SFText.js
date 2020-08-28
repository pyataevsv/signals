import React, { Component } from 'react'
import { Text as DefaultText, View } from 'react-native'
import * as Font from 'expo-font'
import { useFonts } from 'expo-font'
import { connect } from 'react-redux'
import * as actionCreators from '../reducers/actionCreators'

let customFonts = {
    'sf-pro': require('../assets/fonts/SF-Pro.ttf'),
    'sf-bold': require('../assets/fonts/SF-Bold.otf'),
    'sf-heavy': require('../assets/fonts/SF-Heavy.otf'),
    'sf-semibold': require('../assets/fonts/SF-Semibold.otf'),
    'sf-light': require('../assets/fonts/SF-Light.otf')
};

export class Text extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false,
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts)
        // this.props.fontLoad('done')
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        let fontFamily
        // let fontFamily = (this.props.style && Number(this.props.style.fontWeight) >= 700) ? 'sf-bold' : 'sf-pro'
        this.props.heavy ? fontFamily = 'sf-heavy' : 'sf-pro'
        this.props.semibold ? fontFamily = 'sf-semibold' : 'sf-pro'
        this.props.light ? fontFamily = 'sf-light' : 'sf-pro'
        this.props.bold ? fontFamily = 'sf-bold' : 'sf-pro'

        return this.state.fontsLoaded ?
            (<DefaultText style={[this.props.style, { fontFamily }]}>{this.props.children}</DefaultText>)
            :
            // <DefaultText style={[this.props.style]}>{this.props.children}</DefaultText>
            null
    }
}

Text = connect(
    null,
    (dispatch) => {
        return {
            fontLoad: (status) => dispatch(actionCreators.fontLoad(status))
        }
    }
)(Text)


export default Text
