import { useState } from 'react';

const getNationalities = (users) => {
  const nationalities = users.map(user => user.nationality);

  return [...new Set(nationalities)]
    .sort((a, b) => a.localeCompare(b));
}

export const UserList = ({ users }) => {
  const [isAscSort, setSort] = useState(null);
  const [selectedNationality, selectNationality] = useState(getNationalities(users)[0]);

  const getUsers = () => {
    if (isAscSort !== null) {
      return users
        .filter(user => user.nationality === selectedNationality)
        .sort((a, b) => isAscSort === true ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName))
        .map(user => <div key={user.id}>{user.firstName} {user.lastName} ({user.age})</div>)
    }

    return users
      .filter(user => user.nationality === selectedNationality)
      .map(user => <div key={user.id}>{user.firstName} {user.lastName} ({user.age})</div>)
  }

  return (
    <div>
      <select value={selectedNationality} onChange={(e) => selectNationality(e.target.value)}>
        {getNationalities(users).map(nationality => <option key={nationality} value={nationality}>{nationality}</option>)}
      </select>
      <div>
        {getUsers()}
      </div>
      <button onClick={() => setSort(!isAscSort)}>Sort</button>
    </div>
  )
}