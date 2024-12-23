import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer.fullName); // store - is main store, customer is a one of slices, fullName is variable in the slice
  console.log(customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
