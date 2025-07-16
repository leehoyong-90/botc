import { useMemo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './SheetView.css';

function SheetView({ selected, title, setTitle, author, setAuthor }) {
  const groups = useMemo(() => {
    const order = ['townsfolk', 'outsider', 'minion', 'demon', 'traveler'];
    const grouped = {};
    order.forEach((t) => (grouped[t] = []));
    selected.forEach((c) => {
      if (!grouped[c.team]) grouped[c.team] = [];
      grouped[c.team].push(c);
    });
    return order.map((t) => ({ team: t, chars: grouped[t] }));
  }, [selected]);

  const exportJson = () => {
    const data = JSON.stringify({ title, author, characters: selected }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = async () => {
    const element = document.getElementById('sheet-content');
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('script.pdf');
  };

  return (
    <div className="sheet-view">
      <div className="sheet-controls">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={exportJson}>Export JSON</button>
        <button onClick={exportPdf}>Export PDF</button>
      </div>
      <div id="sheet-content" className="sheet-table">
        {groups.map(
          (g) =>
            g.chars.length > 0 && (
              <div key={g.team} className="team-section">
                <h3 className="team-label">{g.team}</h3>
                <table>
                  <tbody>
                    {g.chars.map((c) => (
                      <tr key={c.id}>
                        <td className="icon-cell">
                          <img src={c.image} alt={c.name} />
                        </td>
                        <td className="name-cell">{c.name}</td>
                        <td className="ability-cell">{c.ability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default SheetView;
