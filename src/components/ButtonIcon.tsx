import { useTheme } from "native-base";
import { IconProps } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonIconProps = {
  icon: React.FC<IconProps>;
} & TouchableOpacityProps;

export function ButtonIcon({ icon: Icon, ...rest }: ButtonIconProps) {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity {...rest}>
      <Icon color={colors.gray[300]} size={sizes[6]} />
    </TouchableOpacity>
  );
}
