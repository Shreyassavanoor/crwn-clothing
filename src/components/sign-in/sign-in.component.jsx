import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputValueChange = () => {

    }

    return (
        <div className="sign-in">
            <h2>I already have an account </h2>
            <span>Sign In with your email and password</span>
            <form>
                <FormInput name="email" value={email} type="email"
                    required handleChange={handleInputValueChange} label="Email">
                </FormInput>
                <FormInput name="password" value={password} type="password"
                    required handleChange={handleInputValueChange} label="Password">
                </FormInput>
    
                <CustomButton type="submit" >
                    Sign in
                </CustomButton>
            </form>
        </div>
    );
}

export default SignIn;