function FilterPanel({ editions, editionFilter, setEditionFilter, teams, teamFilter, setTeamFilter, search, setSearch }) {
  const handleEditionChange = (id) => {
    setEditionFilter({ ...editionFilter, [id]: !editionFilter[id] });
  };

  const handleTeamChange = (team) => {
    setTeamFilter({ ...teamFilter, [team]: !teamFilter[team] });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <h3>Edition</h3>
        {editions.map((ed) => (
          <label key={ed.id}>
            <input type="checkbox" checked={editionFilter[ed.id]} onChange={() => handleEditionChange(ed.id)} />
            {ed.name}
          </label>
        ))}
      </div>
      <div className="filter-group">
        <h3>Team</h3>
        {teams.map((team) => (
          <label key={team}>
            <input type="checkbox" checked={teamFilter[team]} onChange={() => handleTeamChange(team)} />
            {team}
          </label>
        ))}
      </div>
      <div className="filter-group">
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
    </div>
  );
}

export default FilterPanel;
