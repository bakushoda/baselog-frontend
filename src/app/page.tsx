'use client';

import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <Main>
      <Container>
        <Title>Welcome to Baselog</Title>
        <Description>
          Baselog is a comprehensive platform for managing baseball game statistics. Login to get started!
        </Description>

        <ButtonContainer>
          <StyledLink href="/login">Login</StyledLink>
          <StyledLink href="/games" color="green">View Games</StyledLink>
          <StyledLink href="/teams" color="purple">View Teams</StyledLink>
        </ButtonContainer>
      </Container>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f3f4f6;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledLink = styled(Link)<{ color?: string }>`
  display: block;
  padding: 0.75rem 1rem;
  background-color: ${({ color }) => (color === 'green' ? '#10b981' : color === 'purple' ? '#8b5cf6' : '#3b82f6')};
  color: white;
  font-weight: 600;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ color }) => (color === 'green' ? '#059669' : color === 'purple' ? '#7c3aed' : '#2563eb')};
  }
`;
