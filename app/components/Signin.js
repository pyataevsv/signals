import React, { useState } from 'react'
import { Button, View, StyleSheet, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { Formik, useFormik, Field } from 'formik'
import { LoginButton } from './Buttons'
import { TextInput } from 'react-native-paper'
import * as Yup from 'yup'
import * as actionCreators from '../reducers/actionCreators'
import { connect } from 'react-redux'
import Text from './SFText'

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
                            <Text style={{ fontSize: 25, marginBottom: 20, color: '#7820fc', fontWeight: '600' }}>Log in</Text>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 15, marginBottom: 20, color: 'grey', textAlign: 'center' }}>Let's us know what your email and password</Text>
                        </View>
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
                            <LoginButton fetching={isLoginFetching} title='Log in' onPress={() => {
                                props.submitForm()
                                setShowFetchError(true)
                                resetLoginError()
                            }} />
                        </View>
                        <View>
                            {(loginError && showFetchError) ? <Text style={styles.errorText}>{loginError}</Text> : null}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <View>
                                <Text>Don't have an account?</Text>
                            </View>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Signupscreen' }],
                                    });

                                    // navigation.navigate('Signupscreen')
                                }}>
                                <Text style={{ color: 'blue' }}>Sign up.</Text>
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

