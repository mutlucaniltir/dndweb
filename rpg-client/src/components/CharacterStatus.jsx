import { BsPersonSquare } from 'react-icons/bs';

const CharacterStatus = () => {
  const character = {
    name: 'Mutlucan',
    health: 100,
    maxHealth: 100,
    stamina: 50,
    maxStamina: 50,
    mana: 20,
    maxMana: 20,
  };

  const StatBar = ({ value, maxValue, color, label }) => (
    <div>
      <small>{label}</small>
      <div className="progress" style={{ height: '20px', backgroundColor: '#495057' }}>
        <div
          className={`progress-bar bg-${color}`}
          role="progressbar"
          style={{ width: `${(value / maxValue) * 100}%` }}
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={maxValue}
        >
          {value} / {maxValue}
        </div>
      </div>
    </div>
  );

  return (
    <div className="card h-100">
      <div className="card-header d-flex align-items-center">
        <BsPersonSquare className="me-2" />
        <h5 className="mb-0">Character: {character.name}</h5>
      </div>
      <div className="card-body d-flex flex-column gap-3">
        <StatBar value={character.health} maxValue={character.maxHealth} color="danger" label="Health" />
        <StatBar value={character.stamina} maxValue={character.maxStamina} color="success" label="Stamina" />
        <StatBar value={character.mana} maxValue={character.maxMana} color="info" label="Mana" />
        {/* We can add more stats or status effects here later */}
      </div>
    </div>
  );
};

export default CharacterStatus;
