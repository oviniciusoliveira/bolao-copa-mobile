import { Heading, HStack, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Participant, Participants } from "./Participants";

export type Poll = {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    id: string;
    name: string;
  };
  participants: Participant[];
  _count: {
    participants: number;
  };
};

type PollCardProps = {
  data: Poll;
} & TouchableOpacityProps;

export function PollCard({ data, ...rest }: PollCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        w="full"
        h={20}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="yellow.500"
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={4}
      >
        <VStack>
          <Heading color="white" fontSize="md" fontFamily="heading">
            {data.title}
          </Heading>

          <Text color="gray.200" fontSize="xs">
            Criado por {data.owner.name}
          </Text>
        </VStack>

        <Participants
          count={data._count.participants}
          participants={data.participants}
        />
      </HStack>
    </TouchableOpacity>
  );
}