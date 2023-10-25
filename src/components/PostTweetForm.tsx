import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { Props, Form, TextArea, FileButton, FileInput, SubmitButton } from "./post-tweet-form";

export default function PostTweetForm({}: Props) {
  const [file, setFile] = useState("");
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e?.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setIsLoading(true);
      await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea onChange={onChange} value={tweet} placeholder="what is Happening" />
      <FileButton htmlFor="file">{file ? "사진업로드완료" : "사진업로드"}</FileButton>
      <FileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
      <SubmitButton type="submit" value={isLoading ? "Posting" : "Post Tweet"} />
    </Form>
  );
}
