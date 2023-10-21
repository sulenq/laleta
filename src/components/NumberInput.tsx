import { Box, Icon, IconButton, Input } from "@chakra-ui/react";
import { X } from "@phosphor-icons/react";
import React from "react";
import useFormatNumber from "../utils/useFormatNumber";
import useReverseFormatNumber from "../utils/useReverseFormatNumber";

type Props = {
  formik: any;
  name: string;
  placeholder: string;
};

export default function NumberInput({ formik, name, placeholder }: Props) {
  const fn = useFormatNumber;
  const rfn = useReverseFormatNumber;

  return (
    <Box position={"relative"}>
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          formik.setFieldValue(name, rfn(e.target.value));
        }}
        value={fn(formik.values[name])}
        pr={"30px !important"}
      />
      {formik.values[name] && (
        <IconButton
          aria-label="clear input"
          icon={<Icon as={X} fontSize={[15, null, 17]} />}
          size={"xs"}
          variant={"unstyled"}
          position={"absolute"}
          right={1}
          top={"11px"}
          zIndex={3}
          onClick={() => {
            formik.setFieldValue(name, "");
          }}
        />
      )}
    </Box>
  );
}
