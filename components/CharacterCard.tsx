import { Character, teamDisplayNames } from '../data/characters';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CharacterCardProps {
  character: Character;
  selected: boolean;
  onToggle: () => void;
}

const teamColors = {
  townsfolk: 'border-blue-500',
  outsider: 'border-yellow-500',
  minion: 'border-red-500',
  demon: 'border-purple-500',
  traveler: 'border-green-500'
};

const teamBgColors = {
  townsfolk: 'bg-blue-50',
  outsider: 'bg-yellow-50',
  minion: 'bg-red-50',
  demon: 'bg-purple-50',
  traveler: 'bg-green-50'
};

export default function CharacterCard({ character, selected, onToggle }: CharacterCardProps) {
  return (
    <div
      className={`bg-card rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
        selected ? `border-2 ${teamColors[character.team]} shadow-lg` : 'border border-border'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <ImageWithFallback
            src={character.image}
            alt={character.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${teamBgColors[character.team]} border-2 border-white`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="truncate">{character.name}</h4>
          <p className="text-sm text-muted-foreground">{teamDisplayNames[character.team]}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs text-muted-foreground line-clamp-2">{character.ability}</p>
      </div>
    </div>
  );
}