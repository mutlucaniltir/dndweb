import { BsFillBoxSeamFill } from 'react-icons/bs';

const Inventory = () => {
  const pet = {
    name: 'Sütlaç',
    type: 'cat',
  };

  const items = [
    { id: 1, name: 'Rusty Key' },
    { id: 2, name: 'Half-eaten Taco' },
  ];

  return (
    <div className="card h-100">
      <div className="card-header d-flex align-items-center">
        <BsFillBoxSeamFill className="me-2" />
        <h5 className="mb-0">Inventory</h5>
      </div>
      <div className="card-body">
        <h6>Pet</h6>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item" style={{ backgroundColor: 'transparent' }}>
            {pet.name} ({pet.type})
          </li>
        </ul>
        <h6>Items</h6>
        <ul className="list-group">
          {items.length > 0 ? (
            items.map(item => (
              <li key={item.id} className="list-group-item" style={{ backgroundColor: 'transparent' }}>
                {item.name}
              </li>
            ))
          ) : (
            <li className="list-group-item" style={{ backgroundColor: 'transparent' }}>
              <em>No items yet...</em>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Inventory;
