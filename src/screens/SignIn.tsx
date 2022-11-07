import { Fontisto } from "@expo/vector-icons/";
import { Center, Icon, Text } from "native-base";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, user, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        type="SECONDARY"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: {
            color: "white",
          },
        }}
      >
        ENTRAR COM GOOGLE
      </Button>
      <Text color="gray.200" textAlign="center" maxW={280} mt={4}>
        Não utilizamos nenhuma informação além do seu e-mail para criação de sua
        conta.
      </Text>
    </Center>
  );
}
