import React from 'react';

import './sign-in-and-sign-up.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

const SignInAndSignUpPage = () => {
    return (
        <div className="sign-in-sign-up">
            <SignIn></SignIn>
        </div>
    );
}

export default SignInAndSignUpPage;