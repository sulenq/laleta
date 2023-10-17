import { IconButton, Icon } from "@chakra-ui/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function BackButton(props: any) {
  const navigate = useNavigate();

  return (
    <IconButton
      id="backBtn"
      onClick={() => {
        // window.history.replaceState(null, "", props.backPath);
        if (props.backPath) {
          navigate(props.backPath);
        } else {
          window.history.back();
        }
      }}
      className="btn sm-clicky"
      aria-label="backBtn"
      borderRadius={"full"}
      h={"40px !important"}
      icon={
        <Icon
          as={ArrowLeft}
          fontSize={props.fontSize || 20}
          {...props?.color}
        />
      }
      variant={"ghost"}
    />
  );
}
