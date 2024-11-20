'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '@lib/api';
import type { Game } from 'types/types';
import { use } from 'react';
import Link from 'next/link';

export default function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: gameId } = use(params);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await api.get<Game>(
          `/games/${gameId}`
        );
        setGame(response.data);
      } catch (error) {
        console.error(
          'Error fetching game details:',
          error
        );
      }
    };

    fetchGame();
  }, [gameId]);

  if (!game)
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
      );

  return (
    <Container>
      <Title>試合結果詳細</Title>
      <DetailTable>
        <tbody>
          <tr>
            <Td>Date</Td>
            <Td>
              {new Date(game.date).toLocaleDateString()}
            </Td>
          </tr>
          <tr>
            <Td>Home Team</Td>
            <Td>{game.home_team}</Td>
          </tr>
          <tr>
            <Td>Away Team</Td>
            <Td>{game.away_team}</Td>
          </tr>
        </tbody>
      </DetailTable>

      <Scoreboard>
        <thead>
          <tr>
            <th>Inning</th>
            {[...Array(9)].map((_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
            <th>R</th>
            <th>H</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>Away</Td>
            {[...Array(9)].map((_, i) => (
              <Td key={i}>
                {game[`away_inning_${i + 1}` as keyof Game]}
              </Td>
            ))}
            <Td>{game.away_total_score}</Td>
            <Td>{game.away_total_hits}</Td>
            <Td>{game.away_total_errors}</Td>
          </tr>
          <tr>
            <Td>Home</Td>
            {[...Array(9)].map((_, i) => (
              <Td key={i}>
                {game[`home_inning_${i + 1}` as keyof Game]}
              </Td>
            ))}
            <Td>{game.home_total_score}</Td>
            <Td>{game.home_total_hits}</Td>
            <Td>{game.home_total_errors}</Td>
          </tr>
        </tbody>
      </Scoreboard>
      <ButtonContainer>
        <BackLink href="/games">一覧へ戻る</BackLink>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const DetailTable = styled.table`
  width: 100%;
  margin-bottom: 2rem;
  border-collapse: collapse;
`;

const Td = styled.td`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  color: #374151;
  font-weight: bold;
`;

const Scoreboard = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4b5563;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;