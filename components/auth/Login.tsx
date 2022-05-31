// auth/Login.tsx
import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation, setIsLoggedIn }) {
    console.log("----| Login |----");
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            if(result.type === "success") {
                setIsLoggedIn(true);
            }
            showMessage(result);
        } else {
            showMessage({
                message: "E-post eller lössenord fattas",
                description: "Var vänligen att skriva in både e-post och lössenord",
                type: "warning"
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    )
}