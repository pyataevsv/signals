import React, { useState } from 'react'
import { Button, View, StyleSheet, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { Formik, useFormik, Field } from 'formik'
import { LoginButton } from './Buttons'
import { TextInput } from 'react-native-paper'
import * as Yup from 'yup'
import * as actionCreators from '../reducers/actionCreators'
import { connect } from 'react-redux'
import Text from './SFText'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin'

export function Signin({ navigation, logInRequest, loginError, isLoginFetching, resetLoginError }) {

    const [showFetchError, setShowFetchError] = useState(false)

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        pass: Yup.string()
            .min(6, '6 simbols min')
            .required('Required'),
    })


    GoogleSignin.configure({
        webClientId: '818625970032-fnnq7isghkv5tvk815m00vq1et11a5oq.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    })

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

        } catch (error) {
            console.error(error);
        }
    };


    const signIn = async () => {
        try {
            if (await GoogleSignin.isSignedIn()) {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
            }

            await GoogleSignin.hasPlayServices()
            // await GoogleSignin.revokeAccess()
            const { user: { email, familyName, givenName, id } } = await GoogleSignin.signIn()

            const obj = {
                email,
                password: id,
            }

            logInRequest(obj)
            setShowFetchError(true)
            resetLoginError()

        } catch (error) {

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }

    };


    return (
        <Formik
            initialValues={{
                email: '',
                pass: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                const obj = {
                    email: values.email,
                    password: values.pass,
                }
                logInRequest(obj)
            }}>

            {props => {

                return (
                    <View style={styles.textContaier}>
                        <View style={{ alignItems: 'center', }}>
                            <Text heavy style={{ fontSize: 25, marginBottom: 20, color: 'rgb(50,50,90)', fontWeight: '600' }}>LOG IN</Text>
                        </View>
                        {/* <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 15, marginBottom: 20, color: 'grey', textAlign: 'center' }}>Let's us know what your email and password</Text>
                        </View> */}
                        <KeyboardAvoidingView>

                            <View>
                                <TextInput
                                    style={(props.touched.email && props.errors.email) ? Object.assign({}, styles.textinput, { borderColor: 'red' }) : styles.textinput}
                                    onChangeText={props.handleChange('email')}
                                    onBlur={props.handleBlur('email')}
                                    placeholder={'email@google.com'}
                                    label="E-mail"
                                    value={props.values.email}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    error={(props.touched.email && props.errors.email) ? true : false}
                                />
                                {(props.touched.email && props.errors.email) ? <Text style={styles.errorText}>{props.errors.email}</Text> : null}
                            </View>
                            <View>
                                <TextInput
                                    style={(props.touched.pass && props.errors.pass) ? Object.assign({}, styles.textinput, { borderColor: 'red' }) : styles.textinput}
                                    onChangeText={props.handleChange('pass')}
                                    onBlur={props.handleBlur('pass')}
                                    label="Password"
                                    value={props.values.pass}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    error={(props.touched.pass && props.errors.pass) ? true : false}
                                />
                                {(props.touched.pass && props.errors.pass) ? <Text style={styles.errorText}>{props.errors.pass}</Text> : null}
                            </View>
                        </KeyboardAvoidingView>
                        <View style={{ marginTop: 30 }}>
                            <LoginButton round fetching={isLoginFetching} title='Log in' onPress={() => {
                                props.submitForm()
                                setShowFetchError(true)
                                resetLoginError()
                            }} />
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            {Platform.OS === 'ios' ? null :
                                <LoginButton round google fetching={isLoginFetching} title='Log in with Google' type='submit'
                                    onPress={signIn}
                                />}
                        </View>
                        <View>
                            {(loginError && showFetchError) ? <Text style={styles.errorText}>{loginError}</Text> : null}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            {/* <View>
                                <Text>Don't have an account?</Text>
                            </View> */}
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={() => {
                                    navigation.reset({
                                        index: 1,
                                        routes: [{ name: 'Setscreen' }, { name: 'Signupscreen' }],
                                    });

                                    // navigation.navigate('Signupscreen')
                                }}>
                                <Text bold style={{ color: '#3283fc', fontSize: 20 }}>SIGN UP</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )
            }
            }

        </Formik>
    );
}

Signin = connect(
    (state) => {
        return {
            loginError: state.loginState.loginError,
            isLoginFetching: state.loginState.isLoginFetching
        }
    },
    (dispatch) => {
        return {
            logInRequest: (e) => dispatch(actionCreators.logInRequest(e)),
            resetLoginError: () => dispatch(actionCreators.setLoginError(''))
        }
    }
)(Signin)


const styles = StyleSheet.create({
    textContaier: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    textinput: {
        height: 60,
        justifyContent: "center",
        paddingVertical: 2,
        backgroundColor: 'transparent',
        fontSize: 20,
        marginTop: 0,
    },
    // error: {
    //     color: 'red'
    // },
    errorText: {
        color: 'red',
        position: 'absolute',
        bottom: -16,
        right: 0

    }
})

