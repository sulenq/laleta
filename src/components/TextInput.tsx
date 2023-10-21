import React from "react";
import { Box, Icon, IconButton, Input } from "@chakra-ui/react";
import { X } from "@phosphor-icons/react";

export default function TextInput(props: any) {
  return (
    <Box position={"relative"}>
      <Input
        ref={props?.myRef}
        placeholder={props?.placeholder}
        onChange={(e) => {
          props?.formik.setFieldValue(props?.name, e.target.value);
        }}
        value={props?.formik.values[props?.name]}
        pr={"30px !important"}
      />
      {props?.formik.values[props?.name] && (
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
            props?.formik.setFieldValue(props?.name, "");
          }}
        />
      )}
    </Box>
  );
}
