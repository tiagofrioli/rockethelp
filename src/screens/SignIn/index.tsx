import { Heading, VStack, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import Logo from "../../assets/logo_primary.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  function handleSignIn() {
    if (!name || !password) {
      return Alert.alert("Entrar", "Informe email");
    }
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(name, password)
      .catch((error) => {
        console.log("error", error);
        setLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválido");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "E-mail ou senha inválido");
        }
        if (error.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "E-mail ou senha inválido");
        }

        return Alert.alert("Entrar", "Não foi possivel acessar");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setName}
      />
      <Input
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        isLoading={loading}
        title="Entrar"
        w="full"
        mt={8}
        onPress={handleSignIn}
      />
    </VStack>
  );
}
