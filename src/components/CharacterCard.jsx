import './CharacterCard.css';

function CharacterCard({ character, selected, onToggle }) {
  return (
    <div className={`character-card ${selected ? 'selected' : ''}`} onClick={onToggle}>
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="character-info">
        <h4>{character.name}</h4>
        <p className="team">{character.team}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
