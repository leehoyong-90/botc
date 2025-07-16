function ScriptPanel({ selected, remove, clear, randomize, sortSelected }) {

  return (
    <div className="script-panel">
      <div className="selection">
        <h3>Selected Characters ({selected.length})</h3>
        <div className="selected-list">
          {selected.map((c) => (
            <span
              key={c.id}
              className="selected-item"
              onClick={() => remove(c.id)}
            >
              {c.name}
            </span>
          ))}
        </div>
        <div className="script-buttons">
          <button onClick={randomize}>Randomize</button>
          <button onClick={sortSelected}>Sort</button>
          <button onClick={clear}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default ScriptPanel;
