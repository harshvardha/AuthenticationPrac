import { useState, useContext } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
    const { authenticate } = useContext(AuthContext);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const signupHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            authenticate(token);
        } catch (error) {
            Alert.alert('Authentication failed', 'Could not create user, please check your input and try again later.');
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating User..." />
    }

    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;