import { getName } from "country-list";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { Button, HStack, Text, useTheme, useToast, VStack } from "native-base";
import {
  Check,
  CheckCircle,
  Warning,
  WarningOctagon,
  X,
} from "phosphor-react-native";
import { useState } from "react";
import { api } from "../services/api";

import { Team } from "./Team";

type Guess = {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
};

export type GameSchema = {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | Guess;
};

type GameProps = {
  pollId: string;
  data: GameSchema;
  onGuessConfirm: () => void;
};

export function Game({ data, pollId, onGuessConfirm }: GameProps) {
  const { colors, sizes } = useTheme();
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");
  const [isGuessConfirmLoading, setIsGuessConfirmLoading] = useState(false);

  const toast = useToast();

  const gameDateFormatted = dayjs(data.date)
    .locale(ptBR)
    .format("DD [de] MMMM [de] YYYY [às] HH:00[h]");

  async function createGuess() {
    if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
      return toast.show({
        title: (
          <HStack space="2">
            <Warning color={colors.gray[900]} />
            <Text color="gray.900">
              Informe o placar do jogo para fazer um palpite
            </Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "yellow.500",
      });
    }

    try {
      setIsGuessConfirmLoading(true);
      await api.post(`/pools/${pollId}/games/${data.id}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: (
          <HStack space="2">
            <CheckCircle color={colors.gray[900]} />
            <Text color="gray.900">Palpite criado, boa sorte!</Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "green.400",
      });
    } catch (error) {
      toast.show({
        title: (
          <HStack space="2">
            <WarningOctagon color="white" />
            <Text color="white">Não foi possível enviar o palpite</Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsGuessConfirmLoading(false);
    }
  }

  async function handleGuessConfirm() {
    await createGuess();
    onGuessConfirm();
  }

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs.{" "}
        {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {gameDateFormatted}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
        />
      </HStack>

      {!data.guess && (
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          onPress={handleGuessConfirm}
          isLoading={isGuessConfirmLoading}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}
    </VStack>
  );
}
