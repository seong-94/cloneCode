import styled from "styled-components";

type Props = {};

const Form = styled.div``;
const TextArea = styled.textarea``;
const FileButton = styled.label``;
const FileInput = styled.input``;
const SubmitButton = styled.input``;

export default function PostTweetForm({}: Props) {
  return (
    <Form>
      <TextArea placeholder="what is Happening" />
      <FileButton htmlFor="file">사진 업로드 </FileButton>
      <FileInput id="file" accept="image/*" />
      사진 업로드
      <SubmitButton />
    </Form>
  );
}
