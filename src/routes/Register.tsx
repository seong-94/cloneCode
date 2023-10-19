import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

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
  name: string;
  email: string;
  password: string;
  error: string;
};

// 입력 필드 정보를 배열로 선언
const fields = [
  { type: "text", name: "name", placeholder: "이름", label: "Name" },
  { type: "email", name: "email", placeholder: "이메일", label: "Email" },
  { type: "password", name: "password", placeholder: "비밀번호", label: "Password" },
];

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, error: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setIsLoading(true);
      setFormData({ ...formData, error: "" });
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credentials.user, {
        displayName: name,
      });

      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFormData({ ...formData, error: e.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join ✖</Title>
      <Form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <Input
              type={field.type}
              value={formData[field.name as keyof FormData]}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
      </Form>
      {formData.error && <Error>{formData.error}</Error>}
      <Switcher>
        <Link to="/login">아이디가 있으면</Link> 로그인 하기
      </Switcher>
    </Wrapper>
  );
}
