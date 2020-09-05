import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [signUpData, setSignUpData] = useState(initialState);
    const { displayName, email, password, confirmPassword } = signUpData;

    const handleOnChange = (event) => {
        const { name , value } = event.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('Passwords not matching');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            setSignUpData(initialState);
        } catch (error){
            console.log('error signing up', error.message);
        }
    }

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign Up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput type="text" name="displayName" value={displayName} label="Display name" onChange={handleOnChange} required></FormInput>
                <FormInput type="email" name="email" value={email} label="Email" onChange={handleOnChange} required></FormInput>
                <FormInput type="password" name="password" value={password} label="Password" onChange={handleOnChange} required></FormInput>
                <FormInput type="password" name="confirmPassword" value={confirmPassword} label="Confirm Password" onChange={handleOnChange} required></FormInput>
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default SignUp;