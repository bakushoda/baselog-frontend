'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '@lib/api';
import type { Game } from 'types/types';
import Link from 'next/link';

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get<Game[]>('/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <Container>
      <Title>試合結果一覧</Title>
      <Link href="/addgame">
        <GameAddButton>試合を追加</GameAddButton>
      </Link>
      <Table>
        <thead>
          <TableRowHeader>
            <Th>Date</Th>
            <Th>Home</Th>
            <Th>Away</Th>
            <Th>Score</Th>
          </TableRowHeader>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <TableRow key={index}>
              <Td>
                {new Date(game.date).toLocaleDateString()}
              </Td>
              <Td>{game.home_team}</Td>
              <Td>{game.away_team}</Td>
              <Td>
                {game.home_total_score} -{' '}
                {game.away_total_score}
              </Td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
`;

const GameAddButton = styled.div`
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 1.5rem auto;
  padding: 0.75rem 1rem;
  background-color: #2563eb;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    background-color: #1e3a8a;
    transform: translateY(0);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRowHeader = styled.tr`
  background-color: #e5e7eb;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }
  &:hover {
    background-color: #eee;
  }
`;

const Th = styled.th`
  padding: 1rem;
  border-bottom: 2px solid #d1d5db;
  text-align: left;
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #d1d5db;
  text-align: left;
  color: #1f2937;
  font-size: 1rem;
`;
