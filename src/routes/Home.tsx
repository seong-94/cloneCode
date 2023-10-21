import { useNavigate } from "react-router-dom";
import PostTweetForm from "../components/post-tweet-form";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <PostTweetForm />
    </>
  );
}
