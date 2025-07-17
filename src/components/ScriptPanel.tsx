import { Character, teamDisplayNames } from '../data/characters';
import { Button } from './ui/button';

interface ScriptPanelProps {
  selected: Character[];
  onRemove: (characterId: string) => void;
  onRandomize: () => void;
  onSort: () => void;
  onClear: () => void;
}

export default function ScriptPanel({
  selected,
  onRemove,
  onRandomize,
  onSort,
  onClear
}: ScriptPanelProps) {
  return (
    <div className="bg-card rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3>선택된 캐릭터 ({selected.length})</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRandomize}
            disabled={selected.length === 0}
          >
            무작위
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onSort}
            disabled={selected.length === 0}
          >
            정렬
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            disabled={selected.length === 0}
          >
            지우기
          </Button>
        </div>
      </div>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {selected.length === 0 ? (
          <p className="text-muted-foreground text-sm">선택된 캐릭터가 없습니다</p>
        ) : (
          selected.map((character) => (
            <div
              key={character.id}
              className="flex items-center justify-between p-2 bg-muted rounded hover:bg-accent cursor-pointer"
              onClick={() => onRemove(character.id)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm">{character.name}</span>
                <span className="text-xs text-muted-foreground">({teamDisplayNames[character.team]})</span>
              </div>
              <span className="text-xs text-muted-foreground">×</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}