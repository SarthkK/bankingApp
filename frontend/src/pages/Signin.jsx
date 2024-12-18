import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

function Signin() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white p-7 flex flex-col">
          <Heading text={"Sign In"} />
          <Subheading text={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"JohnDoe@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <Button label={"Sign In"} />
          <BottomWarning
            text={"Don't have an account?"}
            link={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
export default Signin;
