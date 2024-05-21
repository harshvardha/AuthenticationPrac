import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
    const { authenticate } = useContext(AuthContext);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const signinHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authenticate(token);
        } catch (error) {
            Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials or try again later!');
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />
    }

    return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default LoginScreen;