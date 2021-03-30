import { Switch, Route } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCreate } from './pages/UserCreate';
import { UserList } from './pages/UserList';
import './App.css';

const getUsers = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    
    return data.users;
  } catch (err) {
    console.log(err);
  }
}

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(users => setUsers(users));
  }, []);

  const onUserAdd = (user) => {
    setUsers([...users, user]);
  }

  if (!users.length) {
    return null;
  }

  return (
    <div className="container">
      <Switch>
        <Route exact path={['/home', '/']} render={(props) => <UserList {...props} users={users || []} />} />
        <Route exact path="/new" render={(props) => <UserCreate {...props} onUserAdd={onUserAdd} />} />
      </Switch>
    </div>
  );
}

export default App;
