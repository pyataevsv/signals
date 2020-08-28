import React, { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { LoginButton } from './Buttons'
import * as Yup from 'yup'
import * as actionCreators from '../reducers/actionCreators'
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import Text from './SFText'

function Signup({ navigation, signUpRequest, isLoginFetching, resetLoginError }) {

    const [showFetchError, setShowFetchError] = useState(false)

    const SignupSchema = Yup.object().shape({
        fname: Yup.string()
            .min(6, '6 simbols min')
            .required('Required'),
        pass: Yup.string()
            .min(6, '6 simbols min')
            .required('Required'),
        email: Yup.string()
            .email('Input correct email')
            .required('Required'),
        lname: Yup.string()
            .min(6, '6 simbols min')
            .required('Required'),
        pass: Yup.string()
            .min(6, '6 simbols min')
            .required('Required'),
        passconfirm: Yup.string()
            .required('Required')
            .test('passwords-match', 'Passwords don\'t match', function (value) { return this.parent.pass === value })
    })


    return (
        <Formik
            initialValues={{
                fname: '',
                lname: '',
                email: '',
                pass: '',
                passconfirm: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {

                const obj = {
                    fname: values.fname,
                    lname: values.lname,
                    email: values.email,
                    password: values.pass,
                    password2: values.passconfirm
                }

                signUpRequest(obj)
            }}
        >
            {props => {
                return (
                    <View style={styles.textContaier}>
                        <KeyboardAvoidingView>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 25, marginBottom: 20, color: '#7820fc', fontWeight: '600' }}>Create account</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 15, marginBottom: 20, color: 'grey', textAlign: 'center' }}>Let's us know what your email and password</Text>
                            </View>
                            <View>
                                {/* <Text style={{ marginBottom: 3, fontSize: 18 }}>First name:</Text> */}
                                <TextInput
                                    style={(props.touched.fname && props.errors.fname) ? Object.assign({}, styles.textinput, { borderColor: 'red' }) : styles.textinput}
                                    onChangeText={props.handleChange('fname')}
                                    label="First name"
                                    onBlur={props.handleBlur('fname')}
                                    value={props.values.fname}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    error={(props.touched.fname && props.errors.fname) ? true : false}
                                    underlineColorAndroid='transparent'
                                />
                                {(props.touched.fname && props.errors.fname) ? <Text style={styles.errorText}>{props.errors.fname}</Text> : null}
                            </View>
                            <View>
                                {/* <Text style={{ marginBottom: 3, fontSize: 18 }}>Last name:</Text> */}
                                <TextInput
                                    style={(props.touched.lname && props.errors.lname) ? Object.assign({}, styles.textinput, { borderColor: 'red' }) : styles.textinput}
                                    onChangeText={props.handleChange('lname')}
                                    label="Last name"
                                    onBlur={props.handleBlur('lname')}
                                    autoCapitalize={'none'}
                                    value={props.values.lname}
                                    autoCorrect={false}
                                    error={(props.touched.lname && props.errors.lname) ? true : false}
                                />
                                {(props.touched.lname && props.errors.lname) ? <Text style={styles.errorText}>{props.errors.lname}</Text> : null}
                            </View>
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
                                {/* <Text style={{ marginBottom: 3, fontSize: 18 }}>Password:</Text> */}
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
                            <View>
                                {/* <Text style={{ marginBottom: 3, fontSize: 18 }}>Password confirm:</Text> */}
                                <TextInput
                                    style={(props.touched.passconfirm && props.errors.passconfirm) ? Object.assign({}, styles.textinput, { borderColor: 'red' }) : styles.textinput}
                                    onChangeText={props.handleChange('passconfirm')}
                                    onBlur={props.handleBlur('passconfirm')}
                                    label="Password confirmed"
                                    value={props.values.passconfirm}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    error={(props.touched.passconfirm && props.errors.passconfirm) ? true : false}
                                />
                                {(props.touched.passconfirm && props.errors.passconfirm) ? <Text style={styles.errorText}>{props.errors.passconfirm}</Text> : null}
                            </View>
                            <Text>{props.loginError}</Text>

                        </KeyboardAvoidingView>
                        <View style={{ marginVertical: 10 }}>
                            <LoginButton fetchin={isLoginFetching} title='Sign up' type='submit' onPress={() => {
                                props.submitForm()
                                setShowFetchError(true)
                                resetLoginError()
                            }} />
                        </View>
                        <View>
                            {(props.loginError && showFetchError) ? <Text style={styles.errorText}>{loginError}</Text> : null}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <View>
                                <Text>Have an account?</Text>
                            </View>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Loginscreen' }],
                                    });

                                    // navigation.navigate('Signupscreen')
                                }}>
                                <Text style={{ color: 'blue' }}>Log in.</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )
            }}

        </Formik >
    );
}


Signup = connect(
    (state) => {
        return {
            loginError: state.loginState.loginError,
            isLoginFetching: state.loginState.isLoginFetching
        }
    },
    (dispatch) => {
        return {
            signUpRequest: (arg) => dispatch(actionCreators.signUpRequest(arg)),
            resetLoginError: () => dispatch(actionCreators.setLoginError(''))
        }
    }
)(Signup)




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

export default Signup