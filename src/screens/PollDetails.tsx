import { useFocusEffect, useRoute } from "@react-navigation/native";
import { HStack, Text, useToast, VStack } from "native-base";
import { WarningOctagon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Share } from "react-native";
import { PollDetailsParams } from "../@types/navigation";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { Poll } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { api } from "../services/api";

export function PollDetails() {
  const [poll, setPoll] = useState<Poll>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tabSelected, setTabSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as PollDetailsParams;

  async function getPoll() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);
      setPoll(response.data);
    } catch (error) {
      toast.show({
        title: (
          <HStack space="2">
            <WarningOctagon color="white" />
            <Text color="white">
              Não foi possível carregar os detalhes deste bolão.
            </Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poll.code,
    });
  }

  useFocusEffect(
    useCallback(() => {
      getPoll();
    }, [id])
  );

  if (isLoading) return <Loading />;

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poll ? poll.title : ""}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      <VStack px={5} flex={1}>
        <PollHeader data={poll} />
        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
          <Option
            title="Seus palpites"
            isSelected={tabSelected === "guesses"}
            onPress={() => setTabSelected("guesses")}
          />
          <Option
            title="Ranking do grupo"
            isSelected={tabSelected === "ranking"}
            onPress={() => setTabSelected("ranking")}
          />
        </HStack>
        <Guesses poolId={poll.id} />
      </VStack>
    </VStack>
  );
}
