import './Loader.css';

function Loader() {
  return (
    <div className="sk-cube-grid" data-testid="loader">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className={`sk-cube sk-cube${i + 1}`} />
      ))}
    </div>
  );
}

export default Loader;
