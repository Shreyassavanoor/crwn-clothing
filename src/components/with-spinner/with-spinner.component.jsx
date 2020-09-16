import React from 'react';
import Spinner from '../spinner/spinner.component';
const WithSpinner = WrappedComponent => {
    const SpinnerWrapper = ({ isLoading, ...otherProps }) => {
        return isLoading ? (<Spinner></Spinner>) : (<WrappedComponent {...otherProps}></WrappedComponent>);
    };
    return SpinnerWrapper;
}

export default WithSpinner;