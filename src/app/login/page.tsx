'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import api from '@lib/api';
import { useRouter } from 'next/navigation';
import type { LoginResponse } from 'types/types';

//To do: ログインしているかどうかの判定を行う

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await api.post<LoginResponse>(
        '/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('token', response.data.token);
      router.push('/games');
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('ログインに失敗しました。');
    }
  };

  return (
    <LoginContainer>
      <Title>ログイン</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <ErrorText>{errorMessage}</ErrorText>
        )}
        <Button type="submit">ログイン</Button>
      </Form>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
`;
