function Balance({ value }) {
  return (
    <div className="flex">
      <p className="font-bold">Your Balance</p>
      <p className="font-medium pl-5">Rs. {value}</p>
    </div>
  );
}
export default Balance;
