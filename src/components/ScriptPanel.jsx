function ScriptPanel({ selected, onRemove, onClear, onRandom, onSort }) {
  const json = JSON.stringify(selected, null, 2);
  const copy = () => navigator.clipboard.writeText(json);
  const download = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="script-panel">
      <h3>Selected Characters ({selected.length})</h3>
      <div className="selected-list">
        {selected.map((c) => (
          <span key={c.id} className="selected-item" onClick={() => onRemove(c.id)}>
            {c.name}
          </span>
        ))}
      </div>
      <div className="script-buttons">
        <button onClick={onRandom}>Randomize</button>
        <button onClick={onSort}>Sort</button>
        <button onClick={onClear}>Clear</button>
      </div>
      <pre className="json-preview">{json}</pre>
      <button onClick={copy}>Copy JSON</button>
      <button onClick={download}>Download JSON</button>
    </div>
  );
}

export default ScriptPanel;
