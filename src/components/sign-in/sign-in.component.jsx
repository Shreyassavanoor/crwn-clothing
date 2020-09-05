import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const initalState = {
    email : '',
    password: ''
}

const SignIn = () => {
    
    const [signInData, setSignInData ] = useState(initalState);
    const {email, password} = signInData;

    const handleInputValueChange = (event) => {
        const { name, value} = event.target;
        setSignInData({
            ...signInData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email ,password);
            setSignInData(initalState);
        } catch (error) {
            console.log('error signing in', error.message);
        }
    }

    return (
        <div className="sign-in">
            <h2>I already have an account </h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" value={email} type="email"
                    required handleChange={handleInputValueChange} label="Email">
                </FormInput>
                <FormInput name="password" value={password} type="password"
                    required handleChange={handleInputValueChange} label="Password">
                </FormInput>
                <div className="buttons">
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>

            </form>
        </div>
    );
}

export default SignIn;