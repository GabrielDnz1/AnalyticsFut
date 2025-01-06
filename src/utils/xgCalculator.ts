import { Shot } from '../types';

interface Position {
  x: number;
  y: number;
}

const isPenaltySpot = (position: Position): boolean => {
  const penaltyX = 50;
  const penaltyY = 36;
  const tolerance = 2;

  return (
    Math.abs(position.x - penaltyX) <= tolerance &&
    Math.abs(position.y - penaltyY) <= tolerance
  );
};

const isInsideBox = (position: Position): boolean => {
  return position.x >= 23 && position.x <= 78 && position.y <= 48;
};

const calculateDistanceFromCenter = (position: Position): number => {
  const goalCenterX = 50;
  const goalCenterY = 15;
  return Math.sqrt(
    Math.pow(position.x - goalCenterX, 2) +
    Math.pow(position.y - goalCenterY, 2)
  );
};

const calculateAngle = (position: Position): number => {
  const goalPostLeft = { x: 42, y: 0 };
  const goalPostRight = { x: 58, y: 0 };

  // Calcular os ângulos com base nos dois postes do gol
  const angleLeft = Math.atan2(position.y, position.x - goalPostLeft.x);
  const angleRight = Math.atan2(position.y, position.x - goalPostRight.x);

  // Ajuste para calcular o ângulo total com mais precisão
  const totalAngle = Math.abs(angleLeft - angleRight);

  // Normalizar o ângulo entre 0 e 1 (ângulo mais central significa maior probabilidade de gol)
  const normalizedAngle = Math.min(1, (Math.PI - totalAngle) / Math.PI);

  return normalizedAngle;
};

export const calculateXG = (
  position: Position,
  shotData: Omit<Shot, 'position' | 'xG'>
): number => {
  // Ajuste especial para pênaltis
  if (isPenaltySpot(position) && shotData.shotType === 'Pênalti' && shotData.lookedBefore === true) {
    return 0.75; // Para uma cobrança de pênalti em condições ideais
  }

  let baseXG = 0.05;

  // Fator de Distância   
  const distance = calculateDistanceFromCenter(position);
  // Aumentando a penalização para distâncias maiores
  baseXG *= Math.max(0, 2 - (distance / 50)); // A distância agora penaliza mais fortemente

  // Fator de Ângulo (mais forte)
  const angle = calculateAngle(position);
  baseXG *= angle; // Impacto direto do ângulo na probabilidade de gol

  // Bônus para chutes dentro da área
  if (isInsideBox(position)) {
    baseXG *= 1.3; // Aumento do xG para tiros dentro da área
  }

  // Ajuste de acordo com o tipo de chute
  if (shotData.shotType === 'Com assistência') {
    baseXG *= 1.2; // Aumento para set-pieces (ex: pênaltis ou faltas)
  }
  if (shotData.shotType === 'Individual') {
    baseXG *= 1.2054; // Aumento para set-pieces (ex: pênaltis ou faltas)
  }
  if (shotData.shotType === 'Bola Parada') {
    baseXG *= 1.4854; // Aumento para set-pieces (ex: pênaltis ou faltas)
  }

  // Ajuste para a técnica do chute
  switch (shotData.technique) {
    case 'Cabeça':
      baseXG *= 1; // Cabeçada tem xG menor
      break;
    case 'Pé':
      baseXG *= 1.5; // Chute com o pé é mais comum, então mantém o valor base
      break;
  }

  // Ajuste para pressão e visão do jogador
  if (shotData.pressure) baseXG *= 0.7; // Pressão defensiva reduz a probabilidade de gol
  if (shotData.lookedBefore) baseXG *= 1.5; // Se o jogador já olhou antes, aumenta a chance

  // Limitando o xG para que não ultrapasse 1 nem seja menor que 0
  return Math.max(0, Math.min(1, baseXG));
};


export function calculateXGoT(destination: { x: number; y: number }, shotData: Omit<Shot, 'xGoT'>): number {
  // Centro do gol
  const center = { x: 50, y: 35 };

  // Calcula a distância euclidiana ao centro do gol
  const distance = Math.sqrt(
    Math.pow(destination.x - center.x, 2) + Math.pow(destination.y - center.y, 2)
  );

  // Define um valor de máximo para a distância, após o qual xGoT será 1
  const maxDistance = 100; // Ajuste conforme necessário

  // Aumenta um pouco a pontuação, diminuindo a penalização da distância
  const xGoT = Math.max(0, Math.min(1, (distance / maxDistance) * 0.9)); // Diminui a penalização da distância para um xGoT maior

  return xGoT * 2.5;
}