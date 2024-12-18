import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";

function Send() {
  const [params, setParams] = useSearchParams();
  const [amount, setAmount] = useState();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const id = params.get("id");
  const fullname = params.get("name");
  return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white p-7 flex flex-col">
          {sent ? (
            <>
              <Heading text={"Money Sent!"} />
              <Button
                label={"Go Back"}
                onClick={() => navigate("/dashboard")}
              />
            </>
          ) : (
            <>
              <Heading text={"Send Money"} />
              <div className="flex items-center py-3">
                <div className="rounded-full bg-green-400 p-5 ml-3">
                  <p className="text-lg absolute translate-x-[-50%] translate-y-[-50%]">
                    {fullname[0].toUpperCase()}
                  </p>
                </div>
                <p className="text-xl font-medium pl-3">{fullname}</p>
              </div>
              <InputBox
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                label={"Amount (in Rs.)"}
                placeholder={"Enter amount"}
              />
              <button
                onClick={async () => {
                  try {
                    await axios.post(
                      "http://localhost:3000/api/v1/account/transfer",
                      {
                        to: id,
                        amount: amount,
                      },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    setSent(true);
                  } catch (err) {
                    setError(true);
                    setTimeout(() => {
                      setError(false);
                    }, 2000);
                  }
                }}
                className="bg-green-500 border-none rounded-lg w-full text-white py-2 my-5 hover:bg-slate-800"
              >
                Initiate Transfer
              </button>
              {error ? <p>Error sending money</p> : <></>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Send;
