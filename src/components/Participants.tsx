import { Avatar, Center, HStack, Text } from "native-base";

export type Participant = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

type ParticipantsProps = {
  participants: Participant[];
  count: number;
};

export function Participants({ participants, count }: ParticipantsProps) {
  const hiddenParticipantsCount: number | null = count > 4 ? count - 4 : null;

  return (
    <HStack>
      {participants &&
        participants.map((participant) => (
          <Avatar
            key={participant.id}
            source={{
              uri: participant.user.avatarUrl,
            }}
            w={8}
            h={8}
            rounded="full"
            borderWidth={2}
            borderColor="gray.800"
          >
            {participant.user.name?.charAt(0).toUpperCase()}
          </Avatar>
        ))}

      {hiddenParticipantsCount && (
        <Center
          w={8}
          h={8}
          marginLeft={-3}
          bgColor="gray.700"
          rounded="full"
          borderWidth={1}
          borderColor="gray.800"
        >
          <Text color="gray.100" fontSize="xs" fontFamily="medium">
            {`+${hiddenParticipantsCount}`}
          </Text>
        </Center>
      )}
    </HStack>
  );
}
