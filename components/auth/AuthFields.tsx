import { ScrollView, Text, TextInput, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Typography, Forms } from '../../styles/index.js';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!text.match(pattern)) {
            showMessage({
                message:"Ogiltig e-postadress",
                description: "E-post måste uppfylla typ: aaa@aa.aa",
                type: "warning"
            })
        }
    }

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,}$/;
        if (!text.match(pattern)) {
            showMessage({
                message:"Ogiltig lössenord",
                description: "Lösenordet måste innehålla minst 4 tecken, 1 siffra, 1 stor och 1 liten bokstav.",
                type: "warning"
            })
        }
    }
    
    return (
    <ScrollView style={Forms.formView}>
        <Text style={Typography.header2}>{title}</Text>

        <Text style={Typography.label}>E-post</Text>
        <TextInput style={Forms.input}
            onChangeText={(content:string) => {
                validateEmail(content);
                setAuth({...auth, email: content})
            }}
            value={auth?.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
        />

        <Text style={Typography.label}>Lössenord</Text>
        <TextInput style={Forms.input}
            onChangeText={(content:string) => {
                validatePassword(content);
                setAuth({...auth, password: content})
            }}
            value={auth?.password}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
        />

        <Button
            color='#00FF00'
            title={title}
            onPress={() => {
                submit();
            }}
        />

        <Text></Text>

        {title == "Logga in" &&
            <Button
                title="Registrera istället"
                onPress={() => {
                    navigation.navigate("Register")
                }}
            />
        }


    </ScrollView>
    )
};