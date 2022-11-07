import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type ButtonProps = {
  children: string;
  type?: "PRIMARY" | "SECONDARY";
} & IButtonProps;

export function Button({ type = "PRIMARY", children, ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.400" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: type === "SECONDARY" ? "white" : "gray.900" },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === "SECONDARY" ? "white" : "gray.900"}
      >
        {children}
      </Text>
    </ButtonNativeBase>
  );
}
