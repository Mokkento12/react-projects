import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);

        alert("Error");
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="App">
      <Users
        onChangeSearchValue={onChangeSearchValue}
        searchValue={searchValue}
        items={users}
        isLoading={isLoading}
      />
      {/* <Success /> */}
    </div>
  );
}

export default App;
