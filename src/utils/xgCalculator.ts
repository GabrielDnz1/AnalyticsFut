import { Shot } from '../types';

interface Position {
  x: number;
  y: number;
}

// Check if shot is from penalty spot
const isPenaltySpot = (position: Position): boolean => {
  const penaltyX = 50;
  const penaltyY = 36;
  const tolerance = 3;

  return (
    Math.abs(position.x - penaltyX) <= tolerance &&
    Math.abs(position.y - penaltyY) <= tolerance
  );
};

// Check if shot is inside the box
const isInsideBox = (position: Position): boolean => {
  return position.x >= 15 && 
         position.x <= 70 && 
         position.y <= 33;
};

// Calculate distance from goal center
const calculateDistanceFromCenter = (position: Position): number => {
  const goalCenterX = 50;
  const goalCenterY = 0;
  return Math.sqrt(
    Math.pow(position.x - goalCenterX, 2) + 
    Math.pow(position.y - goalCenterY, 2)
  );
};

// Calculate angle to goal
const calculateAngle = (position: Position): number => {
  const goalPostLeft = { x: 15, y: 0 };
  const goalPostRight = { x: 85, y: 0 };
  
  // Calculate angles to both posts
  const angleLeft = Math.atan2(position.y, position.x - goalPostLeft.x);
  const angleRight = Math.atan2(position.y, position.x - goalPostRight.x);
  
  // Return the shooting angle in radians
  return Math.abs(angleLeft - angleRight);
};

export const calculateXG = (
  position: Position,
  shotData: Omit<Shot, 'position' | 'xG'>
): number => {
  // Penalty spot shot
  if (isPenaltySpot(position) && shotData.shotType === 'Bola Parada') {
    return 0.75; // xG fixo para pênalti
  }

  let baseXG = 0.7;

  // Distance factor
  const distance = calculateDistanceFromCenter(position);
  baseXG *= Math.max(0, 1 - (distance / 100));

  // Angle factor
  const angle = calculateAngle(position);
  baseXG *= Math.min(1, (Math.PI - angle) / Math.PI);

  // Inside box bonus
  if (isInsideBox(position)) {
    baseXG *= 1.3;
  }

  // Shot type adjustments
  if (shotData.shotType === 'Bola Parada') {
    baseXG *= 1.2; // Aumento para set-piece (ex: pênalti, falta)
  }

  // Technique adjustments
  switch (shotData.technique) {
    case 'Cabeceio':
      baseXG *= 0.7; // Cabeçada tem xG menor
      break;
    case 'Voleio':
      baseXG *= 0.8; // Volley tem xG menor do que chute com o pé
      break;
    case 'Chute com o Pé':
      baseXG *= 1; // Chute com o pé mantém o valor base
      break;
  }

  // Pressure and vision adjustments
  if (shotData.pressure) baseXG *= 0.8; // Reduz xG se houver pressão
  if (shotData.lookedBefore) baseXG *= 1.15; // Aumenta xG se o jogador olhou antes

  return Math.max(0, Math.min(1, baseXG)); // Garante que xG esteja entre 0 e 1
};

export function calculateXGoT(destination: { x: number; y: number }, shotData: Omit<Shot, 'xGoT'>): number {
  // Exemplo: distância ao centro do gol como um fator para xGoT
  const center = { x: 50, y: 50 }; // Centro do gol
  const distance = Math.sqrt(
    Math.pow(destination.x - center.x, 2) + Math.pow(destination.y - center.y, 2)
  );

  // Quanto mais perto do centro, maior o xGoT
  return Math.max(0, 1 - distance / 100); // Exemplo de escala simples
}
