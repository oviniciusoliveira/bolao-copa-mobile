import { Heading, HStack, Text, useTheme, useToast, VStack } from "native-base";
import { Header } from "../components/Header";

import { useNavigation } from "@react-navigation/native";
import { CheckCircle, Warning, WarningOctagon } from "phosphor-react-native";
import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function FindPoll() {
  const [isJoinPollLoading, setIsJoinPollLoading] = useState(false);
  const [code, setCode] = useState("");
  const { colors } = useTheme();
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPoll() {
    try {
      setIsJoinPollLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: (
            <HStack space="2">
              <Warning color={colors.gray[900]} />
              <Text color="gray.900">Informe o código do bolão</Text>
            </HStack>
          ),
          placement: "top",
          bgColor: "yellow.500",
        });
      }

      const codeUppercase = code.toUpperCase();

      await api.post("/pools/join", { code: codeUppercase });

      toast.show({
        title: (
          <HStack space="2">
            <CheckCircle color={colors.gray[900]} />
            <Text color="gray.900">Você entrou em um novo bolão!</Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "green.400",
      });

      navigate("polls");
    } catch (error) {
      setIsJoinPollLoading(false);

      if (error.response?.data?.status === 404) {
        toast.show({
          title: (
            <HStack space="2">
              <Warning color={colors.gray[900]} />
              <Text color="gray.900">
                Bolão não encontrado. Verifique o código!
              </Text>
            </HStack>
          ),
          placement: "top",
          bgColor: "yellow.500",
        });
      } else if (error.response?.data?.status === 409) {
        toast.show({
          title: (
            <HStack space="2">
              <Warning color={colors.gray[900]} />
              <Text color="gray.900">
                Você já está participando deste bolão.
              </Text>
            </HStack>
          ),
          placement: "top",
          bgColor: "yellow.500",
        });
      } else {
        toast.show({
          title: (
            <HStack space="2">
              <WarningOctagon color="white" />
              <Text color="white">
                Não foi possível encontrar este bolão. Tente novamente!
              </Text>
            </HStack>
          ),
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          color="white"
          fontFamily="heading"
          fontSize="xl"
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mt={8}
          placeholder="Qual o código do bolão?"
          value={code}
          autoCapitalize="characters"
          onChangeText={(text) => setCode(text)}
        />

        <Button
          mt={2}
          isLoading={isJoinPollLoading}
          onPress={() => handleJoinPoll()}
        >
          BUSCAR BOLÃO
        </Button>
      </VStack>
    </VStack>
  );
}
