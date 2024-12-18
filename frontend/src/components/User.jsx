import { useNavigate } from "react-router-dom";
import Button from "./Button";

function User({ firstname, lastname, id }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center hover:bg-slate-100">
      <div className="flex items-center">
        <div className="rounded-full bg-slate-300 p-5 ml-3">
          <p className="text-lg absolute translate-x-[-50%] translate-y-[-50%]">
            {firstname[0]}
          </p>
        </div>

        <p className="text-lg pl-3">{`${firstname} ${lastname}`}</p>
      </div>
      <div className=" w-40 pr-5">
        <Button
          onClick={() => {
            navigate(`/send?id=${id}&name=${firstname}+${lastname}`);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
export default User;
