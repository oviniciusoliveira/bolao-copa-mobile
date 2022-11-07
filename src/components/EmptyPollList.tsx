import { useNavigation } from "@react-navigation/native";
import { Pressable, Row, Text } from "native-base";

export function EmptyPollList() {
  const { navigate } = useNavigation();

  return (
    <Row flexWrap="wrap" justifyContent="center" maxWidth={280} mx="auto">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de nenhum bolão, que tal
      </Text>

      <Pressable onPress={() => navigate("findPoll")}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          buscar um por código
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        ou
      </Text>

      <Pressable onPress={() => navigate("createPoll")}>
        <Text textDecorationLine="underline" color="yellow.500">
          criar um novo
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  );
}
