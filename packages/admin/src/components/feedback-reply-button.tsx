import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const ReplyButton = (props: { email: string | null }) => {
  if (!props.email) {
    return null;
  }

  const isEmailValid = props.email.match(/.+@.+\..+/);

  if (!isEmailValid) {
    return null;
  }

  return (
    <Button size="sm" asChild>
      <Link to={`mailto:${props.email}`}>Reply</Link>
    </Button>
  );
};
