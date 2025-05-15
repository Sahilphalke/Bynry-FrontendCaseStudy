import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProfileForm from "./Components/ProfileForm";
import ProfileList from "./Components/ProfileList";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const addUser = (user) => {
    if (editingUser !== null) {
      const updatedUsers = users.map((u, index) =>
        index === editingUser ? user : u
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } else {
      setUsers([...users, user]);
    }
    navigate("/list");
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const editUser = (index) => {
    setEditingUser(index);
    navigate("/");
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProfileForm
              addUser={addUser}
              editingUser={editingUser !== null ? users[editingUser] : null}
            />
          }
        />
        <Route
          path="/list"
          element={
            <ProfileList
              users={users}
              deleteUser={deleteUser}
              editUser={editUser}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
