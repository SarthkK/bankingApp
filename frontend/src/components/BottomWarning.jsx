import { Link } from "react-router-dom";

function BottomWarning({ text, link, to }) {
  return (
    <div className="flex text-sm justify-center">
      <p className=" inline-block">{text}</p>
      <Link to={to} className=" inline-block underline pl-1">
        {link}
      </Link>
    </div>
  );
}
export default BottomWarning;
