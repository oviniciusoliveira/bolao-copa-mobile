import { Heading, HStack, Text, useTheme, useToast, VStack } from "native-base";
import { Header } from "../components/Header";

import { CheckCircle, Warning, WarningOctagon } from "phosphor-react-native";
import { useState } from "react";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function CreatePoll() {
  const [pollTitle, setPollTitle] = useState("");
  const [isPollCreateLoading, setIsPollCreateLoading] = useState(false);
  const toast = useToast();
  const { colors } = useTheme();

  async function handlePollCreate() {
    if (!pollTitle.trim()) {
      return toast.show({
        title: (
          <HStack space="2">
            <Warning color={colors.gray[900]} />
            <Text color="gray.900">Informe um nome para o bolão</Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "yellow.500",
      });
    }

    try {
      setIsPollCreateLoading(true);

      await api.post("/pools", {
        title: pollTitle,
      });

      toast.show({
        title: (
          <HStack space="2">
            <CheckCircle color={colors.gray[900]} />
            <Text color="gray.900">Seu bolão foi criado!</Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "green.400",
      });

      setPollTitle("");
    } catch (error) {
      toast.show({
        title: (
          <HStack space="2">
            <WarningOctagon color="white" />
            <Text color="white">
              Não foi possível criar seu bolão. Tente novamente!
            </Text>
          </HStack>
        ),
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsPollCreateLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          color="white"
          fontFamily="heading"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          placeholder="Qual nome do seu bolão?"
          value={pollTitle}
          onChangeText={(text) => setPollTitle(text)}
        />

        <Button
          mt={2}
          onPress={handlePollCreate}
          isLoading={isPollCreateLoading}
        >
          CRIAR MEU BOLÃO
        </Button>

        <Text
          color="gray.200"
          fontSize="sm"
          textAlign="center"
          maxW={280}
          mt={4}
        >
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
