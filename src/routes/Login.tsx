import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubBtn from "../components/GithubBtn";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: red;
`;
const Switcher = styled.span`
  margin-top: 20px;
  a {
    text-decoration: none;
  }
`;
type FormData = {
  email: string;
  password: string;
  error: string;
};

// 입력 필드 정보를 배열로 선언
const fields = [
  { type: "email", name: "email", placeholder: "이메일", label: "Email" },
  { type: "password", name: "password", placeholder: "비밀번호", label: "Password" },
];

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    error: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setFormData({ ...formData, [name]: value, error: "" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || formData.email === "" || formData.password === "") return;
    try {
      setIsLoading(true);
      setFormData({ ...formData, error: "" });
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFormData({ ...formData, error: "" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log into ✖</Title>
      <Form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <Input
              onChange={onChange}
              type={field.type}
              value={formData[field.name as keyof FormData]}
              name={field.name}
              placeholder={field.placeholder}
              required
            />
          </div>
        ))}
        <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
      </Form>
      {formData.error !== "" ? <Error>{formData.error}</Error> : ""}
      <Switcher>
        아이디가 없으면
        <Link to="/register"> 아이디 생성하기</Link>
      </Switcher>
      <GithubBtn />
    </Wrapper>
  );
}
