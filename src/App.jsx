import { useMemo, useState } from 'react';
import editions from './data/editions';
import CharacterCard from './components/CharacterCard.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import ScriptPanel from './components/ScriptPanel.jsx';
import './App.css';
import './components/CharacterCard.css';
import './components/FilterPanel.css';
import './components/ScriptPanel.css';

function App() {
  const teams = ['townsfolk', 'outsider', 'minion', 'demon', 'traveler'];
  const [editionFilter, setEditionFilter] = useState(() =>
    Object.fromEntries(editions.map((ed) => [ed.id, true]))
  );
  const [teamFilter, setTeamFilter] = useState(() =>
    Object.fromEntries(teams.map((t) => [t, true]))
  );
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);

  const allCharacters = useMemo(
    () =>
      editions.flatMap((ed) =>
        editionFilter[ed.id]
          ? ed.characters.map((c) => ({ ...c, edition: ed.id }))
          : []
      ),
    [editionFilter]
  );

  const filtered = allCharacters.filter(
    (c) => teamFilter[c.team] && c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (char) => {
    setSelected((prev) =>
      prev.find((c) => c.id === char.id)
        ? prev.filter((c) => c.id !== char.id)
        : [...prev, char]
    );
  };

  const remove = (id) => setSelected((prev) => prev.filter((c) => c.id !== id));
  const clear = () => setSelected([]);
  const randomize = () => {
    const pool = filtered;
    const count = Math.min(15, pool.length);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setSelected(shuffled.slice(0, count));
  };
  const sortSelected = () => {
    const order = { townsfolk: 0, outsider: 1, minion: 2, demon: 3, traveler: 4 };
    setSelected((prev) => [...prev].sort((a, b) => order[a.team] - order[b.team]));
  };

  return (
    <div className="App">
      <h1>Blood on the Clocktower Script Builder</h1>
      <div className="main-layout">
        <aside className="filter-sidebar">
          <FilterPanel
            editions={editions}
            editionFilter={editionFilter}
            setEditionFilter={setEditionFilter}
            teams={teams}
            teamFilter={teamFilter}
            setTeamFilter={setTeamFilter}
            search={search}
            setSearch={setSearch}
          />
        </aside>
        <div className="character-panel">
          <div className="character-grid">
            {filtered.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                selected={selected.some((c) => c.id === char.id)}
                onToggle={() => toggleSelect(char)}
              />
            ))}
          </div>
        </div>
      </div>
      <ScriptPanel
        selected={selected}
        onRemove={remove}
        onClear={clear}
        onRandom={randomize}
        onSort={sortSelected}
      />
    </div>
  );
}

export default App;
