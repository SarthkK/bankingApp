import { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";

function Users() {
  const [userlist, setUserlist] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((res) => {
        setUserlist(res.data.user);
      });
  }, [filter]);
  return (
    <div className="mt-3">
      <p className="font-bold text-lg">Users</p>
      <input
        className="border rounded-lg p-2 w-full mt-3"
        placeholder="Search users..."
        type="text"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <div>
        {userlist.map((user) => {
          return (
            <User
              firstname={user.firstName}
              lastname={user.lastName}
              key={user._id}
              id={user._id}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Users;
