import React from 'react'
import { Button, TextInput, View, StyleSheet, Text } from 'react-native'
import { Formik, useFormik, Field } from 'formik'
import Btn from './Btn'
import * as Yup from 'yup'



export const Signup = props => {



    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
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
                email: '',
                pass: '',
                passconfirm: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => { console.log(values) }}
        >
            {props => {


                return (
                    <View style={styles.textContaier}>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 25, marginBottom: 20, color: '#7820fc', fontWeight: '800' }}>Create account</Text>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 15, marginBottom: 20, color: 'grey', textAlign: 'center' }}>Let's us know what your email and password</Text>
                        </View>
                        <View>
                            <Text style={{ marginBottom: 3, fontSize: 18 }}>E-mail:</Text>
                            <TextInput
                                style={(props.touched.email && props.errors.email) ? Object.assign({}, styles.textinput, { borderColor: 'red' }) : styles.textinput}
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                placeholder={'email@google.com'}
                                value={props.values.email}
                                autoCorrect={false}

                            />
                            {(props.touched.email && props.errors.email) ? <Text style={styles.errorText}>{props.errors.email}</Text> : null}
                        </View>
                        <View>
                            <Text style={{ marginBottom: 3, fontSize: 18 }}>Password:</Text>
                            <TextInput
                                style={(props.touched.pass && props.errors.pass) ? Object.assign({}, styles.textinput, { borderColor: 'red' }) : styles.textinput}
                                onChangeText={props.handleChange('pass')}
                                onBlur={props.handleBlur('pass')}
                                value={props.values.pass}
                                autoCorrect={false}
                            />
                            {(props.touched.pass && props.errors.pass) ? <Text style={styles.errorText}>{props.errors.pass}</Text> : null}
                        </View>
                        <View>
                            <Text style={{ marginBottom: 3, fontSize: 18 }}>Password confirm:</Text>
                            <TextInput
                                style={(props.touched.passconfirm && props.errors.passconfirm) ? Object.assign({}, styles.textinput, { borderColor: 'red' }) : styles.textinput}
                                onChangeText={props.handleChange('passconfirm')}
                                onBlur={props.handleBlur('passconfirm')}
                                value={props.values.passconfirm}
                                autoCorrect={false}
                            />
                            {(props.touched.passconfirm && props.errors.passconfirm) ? <Text style={styles.errorText}>{props.errors.passconfirm}</Text> : null}
                        </View>

                        <Btn title='Sign up' onPress={props.submitForm} />
                    </View>
                )
            }
            }

        </Formik>
    );
}

const styles = StyleSheet.create({
    textContaier: {
        paddingHorizontal: 40,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    textinput: {
        backgroundColor: 'white',
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
        borderRadius: 5,

        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'black'
    },
    error: {
        color: 'red'
    },
    errorText: {
        color: 'red',
        position: 'relative',
        bottom: 8
    }
})