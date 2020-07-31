import React from 'react';
import { Button, TextInput, View, StyleSheet, Text } from 'react-native';
import { Formik, useFormik } from 'formik';


const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    //...

    return errors;
};

export const Signinform = props => {

    return (
        <Formik
            initialValues={{ email: '' }}
            onSubmit={values => console.log(values)}
            validate={validate}
        >
            {({ handleChange, handleBlur, handleSubmit, validateForm, values, errors }) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={{ backgroundColor: 'white' }}
                    />
                    {<Text>{errors.email}</Text>}

                    <Button onPress={() => { validateForm(); console.log(errors.email) }} title="Submit" />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    textinput: {
        backgroundColor: 'white',
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10
    },
    error: {
        color: 'red'
    }
})