import { HStack, Text, useTheme, useToast } from "native-base";
import { Warning, WarningOctagon } from "phosphor-react-native";

type ToastProps = {
  title: string;
};

export function SuccessToast({ title }: ToastProps) {
  const toast = useToast();
}

export function WarningToast({ title }: ToastProps) {
  const toast = useToast();
  const { colors } = useTheme();

  return toast.show({
    title: (
      <HStack space="2">
        <Warning color={colors.gray[900]} />
        <Text color="gray.900">{title}</Text>
      </HStack>
    ),
    placement: "top",
    bgColor: "yellow.500",
  });
}

export function ErrorToast({ title }: ToastProps) {
  const toast = useToast();

  return toast.show({
    title: (
      <HStack space="2">
        <WarningOctagon color="white" />
        <Text color="white">{title}</Text>
      </HStack>
    ),
    placement: "top",
    bgColor: "red.500",
  });
}
