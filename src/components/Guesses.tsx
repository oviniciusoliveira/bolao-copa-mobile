import { FlatList, HStack, Text, useToast } from "native-base";
import { WarningOctagon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../services/api";

import { Game, GameSchema } from "../components/Game";
import { Loading } from "./Loading";

type GuessesProps = {
  poolId: string;
};

export function Guesses({ poolId }: GuessesProps) {
  const [isGamesLoading, setIsGamesLoading] = useState(true);
  const [games, setGames] = useState<GameSchema[]>([]);
  const toast = useToast();

  async function getGames() {
    try {
      setIsGamesLoading(true);
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    } catch (error) {
      toast.show({
        title: (
          <HStack space="2">
            <WarningOctagon color="white" />
            <Text color="white">Não foi possível carregar os jogos</Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsGamesLoading(false);
    }
  }

  async function handleGuessConfirm() {
    await getGames();
  }

  useEffect(() => {
    getGames();
  }, [poolId]);

  return isGamesLoading ? (
    <Loading />
  ) : (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          onGuessConfirm={() => handleGuessConfirm()}
          pollId={poolId}
        />
      )}
    />
  );
}
