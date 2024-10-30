'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '@lib/api';
import { useRouter } from 'next/navigation';
import type { Game } from 'types/types';
import { use } from 'react';

export default function EditGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: gameId } = use(params);

  const [date, setDate] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [homeTotalScore, setHomeTotalScore] = useState(0);
  const [awayTotalScore, setAwayTotalScore] = useState(0);
  const [homeTotalHits, setHomeTotalHits] = useState(0);
  const [awayTotalHits, setAwayTotalHits] = useState(0);
  const [homeTotalErrors, setHomeTotalErrors] = useState(0);
  const [awayTotalErrors, setAwayTotalErrors] = useState(0);
  const [innings, setInnings] = useState(
    Array.from({ length: 9 }, () => ({ home: 0, away: 0 }))
  );

  const router = useRouter();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await api.get<Game>(
          `/games/${gameId}`
        );
        const gameData = response.data;
        setDate(gameData.date);
        setHomeTeam(gameData.home_team);
        setAwayTeam(gameData.away_team);
        setHomeTotalScore(gameData.home_total_score);
        setAwayTotalScore(gameData.away_total_score);
        setHomeTotalHits(gameData.home_total_hits);
        setAwayTotalHits(gameData.away_total_hits);
        setHomeTotalErrors(gameData.home_total_errors);
        setAwayTotalErrors(gameData.away_total_errors);
        setInnings(
          Array.from({ length: 9 }, (_, index) => ({
            home: gameData[
              `home_inning_${index + 1}` as keyof Game
            ] as number,
            away: gameData[
              `away_inning_${index + 1}` as keyof Game
            ] as number,
          }))
        );
      } catch (error) {
        console.error(
          'Error fetching game details:',
          error
        );
      }
    };

    fetchGame();
  }, [gameId]);

  useEffect(() => {
    const calculateTotalScores = () => {
      const homeScore = innings.reduce((sum, inning) => sum + inning.home, 0);
      const awayScore = innings.reduce((sum, inning) => sum + inning.away, 0);
      setHomeTotalScore(homeScore);
      setAwayTotalScore(awayScore);
    };

    calculateTotalScores();
  }, [innings]);

  const handleInputChange = (
    index: number,
    field: 'home' | 'away',
    value: string
  ) => {
    const newValue = Math.max(0, Number(value));
    setInnings((prev) => {
      const updatedInnings = [...prev];
      updatedInnings[index][field] = newValue;
      return updatedInnings;
    });
  };

  const handleSave = async () => {
    try {
      const data = {
        date,
        home_team: homeTeam,
        away_team: awayTeam,
        home_total_score: homeTotalScore,
        away_total_score: awayTotalScore,
        home_total_hits: homeTotalHits,
        away_total_hits: awayTotalHits,
        home_total_errors: homeTotalErrors,
        away_total_errors: awayTotalErrors,
        ...Object.fromEntries(
          innings.flatMap((inning, index) => [
            [`home_inning_${index + 1}`, inning.home],
            [`away_inning_${index + 1}`, inning.away],
          ])
        ),
      };
      await api.put(`/games/${gameId}`, data);
      router.push('/games');
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  return (
    <Container>
      <Title>試合結果編集</Title>
      <Form>
        <Label>
          Date:
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Label>
        <Label>
          Home Team:
          <Input
            type="text"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
          />
        </Label>
        <Label>
          Away Team:
          <Input
            type="text"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
          />
        </Label>

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
              <Td>Home</Td>
              {innings.map((inning, index) => (
                <Td key={index}>
                  <InningInput
                    type="number"
                    min="0"
                    value={inning.home}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        'home',
                        e.target.value
                      )
                    }
                  />
                </Td>
              ))}
              <Td>{homeTotalScore}</Td>
              <Td>
                <InningInput
                  type="number"
                  min="0"
                  value={homeTotalHits}
                  onChange={(e) =>
                    setHomeTotalHits(
                      Math.max(0, Number(e.target.value))
                    )
                  }
                />
              </Td>
              <Td>
                <InningInput
                  type="number"
                  min="0"
                  value={homeTotalErrors}
                  onChange={(e) =>
                    setHomeTotalErrors(
                      Math.max(0, Number(e.target.value))
                    )
                  }
                />
              </Td>
            </tr>
            <tr>
              <Td>Away</Td>
              {innings.map((inning, index) => (
                <Td key={index}>
                  <InningInput
                    type="number"
                    min="0"
                    value={inning.away}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        'away',
                        e.target.value
                      )
                    }
                  />
                </Td>
              ))}
              <Td>{awayTotalScore}</Td>
              <Td>
                <InningInput
                  type="number"
                  min="0"
                  value={awayTotalHits}
                  onChange={(e) =>
                    setAwayTotalHits(
                      Math.max(0, Number(e.target.value))
                    )
                  }
                />
              </Td>
              <Td>
                <InningInput
                  type="number"
                  min="0"
                  value={awayTotalErrors}
                  onChange={(e) =>
                    setAwayTotalErrors(
                      Math.max(0, Number(e.target.value))
                    )
                  }
                />
              </Td>
            </tr>
          </tbody>
        </Scoreboard>

        <Button onClick={handleSave}>保存</Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Scoreboard = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  text-align: center;
`;

const Td = styled.td`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  color: #374151;
  font-weight: bold;
`;

const InningInput = styled.input`
  width: 3rem;
  padding: 0.25rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 30%;
  margin: 1.5rem auto 0;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #2563eb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    background-color: #1e3a8a;
  }
`;
