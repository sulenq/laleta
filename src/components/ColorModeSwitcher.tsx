import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  Icon,
} from "@chakra-ui/react";
import { MoonStars, SunHorizon } from "@phosphor-icons/react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (
  props: any
) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonStars, SunHorizon);

  return (
    <IconButton
      {...props}
      size="md"
      fontSize="lg"
      variant="ghost"
      className="btn sm-clicky"
      color="current"
      onClick={toggleColorMode}
      icon={
        <Icon
          as={SwitchIcon}
          fontSize={props?.fontSize || 18}
          weight={props.fontWeight}
        />
      }
      aria-label={`Switch to ${text} mode`}
    />
  );
};
