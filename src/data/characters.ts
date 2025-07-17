import editions from './editions.js';

export interface Character {
  id: string;
  name: string;
  ability: string;
  edition: string;
  team: 'townsfolk' | 'outsider' | 'minion' | 'demon' | 'traveler';
  image: string;
  [key: string]: unknown;
}

interface Edition {
  id: string;
  name: string;
  background: string;
  characters: Character[];
}

export const editionsList: Edition[] = editions as Edition[];

export const characters: Character[] = editionsList.flatMap((e) => e.characters);

export const teams = ['townsfolk', 'outsider', 'minion', 'demon', 'traveler'] as const;

export const teamDisplayNames: Record<(typeof teams)[number], string> = {
  townsfolk: '마을 주민',
  outsider: '외부인',
  minion: '하수인',
  demon: '악마',
  traveler: '여행자',
};

export { editionsList as editions };
