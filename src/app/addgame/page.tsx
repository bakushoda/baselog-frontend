'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import api from '@lib/api';
import { useRouter } from 'next/navigation';
import type { GameData } from 'types/types';

export default function AddGamePage() {
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
  
  const handleSave = async () => {
    try {
      const data: GameData = {
        date,
        home_team: homeTeam,
        away_team: awayTeam,
        home_total_score: homeTotalScore,
        away_total_score: awayTotalScore,
        home_total_hits: homeTotalHits,
        away_total_hits: awayTotalHits,
        home_total_errors: homeTotalErrors,
        away_total_errors: awayTotalErrors,
      };
  
      innings.forEach((inning, index) => {
        data[`home_inning_${index + 1}`] = inning.home;
        data[`away_inning_${index + 1}`] = inning.away;
      });
      
      await api.post('/games', data);
      router.push('/games');
    } catch (error) {
      console.error('Error has occured:', error);
    }
  };

  const calculateTotalscores = () => {
    setHomeTotalScore(
      innings.reduce((sum, inning) => sum + inning.home, 0)
    );
    setAwayTotalScore(
      innings.reduce((sum, inning) => sum + inning.away, 0)
    );
  };

  return (
    <Container>
      <Title>試合情報の追加</Title>
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
          Away Team:
          <Input
            type="text"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
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
              {innings.map((inning, index) => (
                <Td key={index}>
                  <InningInput
                    type="number"
                    value={inning.away}
                    onChange={(e) =>
                      setInnings((prev) => {
                        const updatedInnings = [...prev];
                        updatedInnings[index].away =
                          Math.max(
                            0,
                            Number(e.target.value)
                          );
                        calculateTotalscores();
                        return updatedInnings;
                      })
                    }
                  />
                </Td>
              ))}
              <Td>{awayTotalScore}</Td>
              <Td>
                <InningInput
                  type="number"
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
                  value={awayTotalErrors}
                  onChange={(e) =>
                    setAwayTotalErrors(
                      Math.max(0, Number(e.target.value))
                    )
                  }
                />
              </Td>
            </tr>
            <tr>
              <Td>Home</Td>
              {innings.map((inning, index) => (
                <Td key={index}>
                  <InningInput
                    type="number"
                    value={inning.home}
                    onChange={(e) =>
                      setInnings((prev) => {
                        const updatedInnings = [...prev];
                        updatedInnings[index].home =
                          Math.max(
                            0,
                            Number(e.target.value)
                          );
                        calculateTotalscores();
                        return updatedInnings;
                      })
                    }
                  />
                </Td>
              ))}
              <Td>{homeTotalScore}</Td>
              <Td>
                <InningInput
                  type="number"
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
                  value={homeTotalErrors}
                  onChange={(e) =>
                    setHomeTotalErrors(
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
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  font-weight: bold;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
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
  width: 50px;
  padding: 0.25rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 30%;
  padding: 1rem;
  margin: 1.5rem auto 0;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #1f2937;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b5563;
  }
`;
