import { editions, teams, teamDisplayNames } from '../data/characters';

interface FilterPanelProps {
  editionFilter: Record<string, boolean>;
  teamFilter: Record<string, boolean>;
  search: string;
  onEditionChange: (editionId: string) => void;
  onTeamChange: (team: string) => void;
  onSearchChange: (search: string) => void;
}

export default function FilterPanel({
  editionFilter,
  teamFilter,
  search,
  onEditionChange,
  onTeamChange,
  onSearchChange
}: FilterPanelProps) {
  return (
    <div className="bg-card rounded-lg p-4 space-y-4 mb-4">
      <div className="space-y-3">
        <h3>에디션</h3>
        <div className="space-y-2">
          {editions.map((edition) => (
            <label key={edition.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editionFilter[edition.id] || false}
                onChange={() => onEditionChange(edition.id)}
                className="rounded border-border"
              />
              <span className="text-sm">{edition.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3>진영</h3>
        <div className="space-y-2">
          {teams.map((team) => (
            <label key={team} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={teamFilter[team] || false}
                onChange={() => onTeamChange(team)}
                className="rounded border-border"
              />
              <span className="text-sm">{teamDisplayNames[team]}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3>검색</h3>
        <input
          type="text"
          placeholder="캐릭터 검색..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}