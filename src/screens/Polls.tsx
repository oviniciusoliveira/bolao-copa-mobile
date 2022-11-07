import { Octicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Divider,
  FlatList,
  HStack,
  Icon,
  Text,
  useToast,
  VStack,
} from "native-base";
import { WarningOctagon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Button } from "../components/Button";
import { EmptyPollList } from "../components/EmptyPollList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Poll, PollCard } from "../components/PollCard";
import { api } from "../services/api";

export function Polls() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isPollsLoading, setIsPollsLoading] = useState(true);
  const { navigate } = useNavigation();
  const toast = useToast();

  async function getPolls() {
    try {
      setIsPollsLoading(true);
      const response = await api.get("/pools");
      setPolls(response.data.pools);
    } catch (error) {
      toast.show({
        title: (
          <HStack space="2">
            <WarningOctagon color="white" />
            <Text color="white">
              Não foi possível carregar seus bolões. Tente novamente!
            </Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsPollsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPolls();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack px={5} pt={6}>
        <Button
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate("findPoll")}
        >
          BUSCAR BOLÃO POR CÓDIGO
        </Button>
        <Divider my={4} bgColor="gray.600" />
      </VStack>

      {isPollsLoading ? (
        <Loading />
      ) : (
        <FlatList
          px={5}
          showsVerticalScrollIndicator={false}
          data={polls}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() =>
                navigate("pollDetails", {
                  id: item.id,
                })
              }
            />
          )}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPollList />}
        />
      )}
    </VStack>
  );
}
