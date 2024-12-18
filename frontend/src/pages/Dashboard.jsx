import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
function Dashboard() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setValue(res.data.balance.toFixed(2));
      });
  }, []);
  return (
    <div className="min-h-screen">
      <Appbar />
      <div className="mx-12 mt-8">
        <Balance value={value} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
