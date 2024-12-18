import axios from "axios";
import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white p-7 flex flex-col">
          <Heading text={"Sign Up"} />
          <Subheading text={"Enter your information to create and account"} />
          <InputBox
            onChange={(e) => setFirstname(e.target.value)}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={(e) => setLastname(e.target.value)}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            placeholder={"JohnDoe@gmail.com"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"123456"}
          />
          <Button
            onClick={async () => {
              let res = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  firstName: firstname,
                  lastName: lastname,
                  username: email,
                  password: password,
                }
              );
              localStorage.setItem("token", res.data.token);
              navigate("/dashboard");
              console.log("reached");
            }}
            label={"Sign Up"}
          />
          <BottomWarning
            text={"Already have an account?"}
            link={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
