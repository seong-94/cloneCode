import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Form = styled.form``;
const Input = styled.input``;
type Props = {};

export default function Login({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="text"
          value={name}
          name="name"
          placeholder="이름"
          required
        />
        <Input
          onChange={onChange}
          type="email"
          value={email}
          name="email"
          placeholder="이메일"
          required
        />
        <Input
          onChange={onChange}
          type="password"
          value={password}
          name="password"
          placeholder="비밀번호"
          required
        />
        <Input type="submit" value="Create Account" />
      </Form>
    </Wrapper>
  );
}
