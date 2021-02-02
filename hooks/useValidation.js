import React, { useState, useEffect } from 'react';

const useValidation = (initialState, validate, fn) => {
    
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrors = errors && Object.keys(errors).length === 0;
            if (noErrors) fn();
            setSubmitForm(false);
        }
    }, [errors]);

    // fnc onChange
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    //fnc del submit
    const handleSubmit = e => {
        e.preventDefault();
        const errorsValidation = validate(values);
        setErrors(errorsValidation);
        setSubmitForm(true);
    }

    const handleBlur = () => {
        const errorsValidation = validate(values);
        setErrors(errorsValidation);
    }

    return {
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
    };
}
 
export default useValidation;