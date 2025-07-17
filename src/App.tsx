import { useState, useMemo } from 'react';
import { characters, editions, teams, teamDisplayNames, type Character } from './data/characters';
import FilterPanel from './components/FilterPanel';
import CharacterCard from './components/CharacterCard';
import ScriptPanel from './components/ScriptPanel';
import SheetView from './components/SheetView';
import { ScrollArea } from './components/ui/scroll-area';

export default function App() {
  // Filter states
  const [editionFilter, setEditionFilter] = useState<Record<string, boolean>>({});
  const [teamFilter, setTeamFilter] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');

  // Selection state
  const [selected, setSelected] = useState<Character[]>([]);

  // Sheet metadata
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Filter characters based on current filters
  const filteredCharacters = useMemo(() => {
    // Check if any filters are active
    const hasEditionFilter = Object.values(editionFilter).some(Boolean);
    const hasTeamFilter = Object.values(teamFilter).some(Boolean);
    const hasSearchFilter = search.trim().length > 0;
    
    // If no filters are active, show no characters
    if (!hasEditionFilter && !hasTeamFilter && !hasSearchFilter) {
      return [];
    }

    return characters.filter((character) => {
      // Edition filter - if any editions are selected, character must match one of them
      if (hasEditionFilter && !editionFilter[character.edition]) {
        return false;
      }

      // Team filter - if any teams are selected, character must match one of them
      if (hasTeamFilter && !teamFilter[character.team]) {
        return false;
      }

      // Search filter - if search term exists, character name must contain it
      if (hasSearchFilter && !character.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [editionFilter, teamFilter, search]);

  // Filter handlers
  const handleEditionChange = (editionId: string) => {
    setEditionFilter(prev => ({
      ...prev,
      [editionId]: !prev[editionId]
    }));
  };

  const handleTeamChange = (team: string) => {
    setTeamFilter(prev => ({
      ...prev,
      [team]: !prev[team]
    }));
  };

  // Character selection handlers
  const handleCharacterToggle = (character: Character) => {
    setSelected(prev => {
      const isSelected = prev.some(c => c.id === character.id);
      if (isSelected) {
        return prev.filter(c => c.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

  const handleRemoveCharacter = (characterId: string) => {
    setSelected(prev => prev.filter(c => c.id !== characterId));
  };

  const handleRandomize = () => {
    if (selected.length === 0) return;
    const shuffled = [...selected].sort(() => Math.random() - 0.5);
    setSelected(shuffled);
  };

  const handleSort = () => {
    if (selected.length === 0) return;
    const sorted = [...selected].sort((a, b) => {
      const teamOrder = { townsfolk: 0, outsider: 1, minion: 2, demon: 3, traveler: 4 };
      const teamDiff = teamOrder[a.team] - teamOrder[b.team];
      if (teamDiff !== 0) return teamDiff;
      return a.name.localeCompare(b.name);
    });
    setSelected(sorted);
  };

  const handleClear = () => {
    setSelected([]);
  };

  // Check if any filters are active for display message
  const hasActiveFilters = Object.values(editionFilter).some(Boolean) || 
                          Object.values(teamFilter).some(Boolean) || 
                          search.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Side Panel */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h1>Blood on the Clocktower 스크립트 빌더</h1>
          </div>
          
          <div className="p-4">
            <FilterPanel
              editionFilter={editionFilter}
              teamFilter={teamFilter}
              search={search}
              onEditionChange={handleEditionChange}
              onTeamChange={handleTeamChange}
              onSearchChange={setSearch}
            />
          </div>

          <div className="flex-1 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {filteredCharacters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    selected={selected.some(c => c.id === character.id)}
                    onToggle={() => handleCharacterToggle(character)}
                  />
                ))}
                {!hasActiveFilters && (
                  <p className="text-muted-foreground text-center py-8">
                    에디션, 진영을 선택하거나 캐릭터 이름을 검색해주세요.
                  </p>
                )}
                {hasActiveFilters && filteredCharacters.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    선택한 조건에 맞는 캐릭터가 없습니다.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="p-4 border-t border-border">
            <ScriptPanel
              selected={selected}
              onRemove={handleRemoveCharacter}
              onRandomize={handleRandomize}
              onSort={handleSort}
              onClear={handleClear}
            />
          </div>
        </div>

        {/* Sheet Panel */}
        <div className="flex-1">
          <ScrollArea className="h-full">
            <SheetView
              selected={selected}
              title={title}
              author={author}
              onTitleChange={setTitle}
              onAuthorChange={setAuthor}
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}