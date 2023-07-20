import { Button } from '@tremor/react';
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

function BackLink({ url }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(url)
  }

  return (
    <Button
      icon={ArrowCircleLeftIcon}
      variant="light"
      size="xs"
      className="back-link "
      onClick={() => handleClick()}
    >
      Retour
    </Button>
  )
}

export default BackLink
