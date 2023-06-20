import React from "react";
import MaterialTable, { Column } from "@material-table/core";

const columns = [
  { title: "FirstName", field: "name" },
  { title: "LastName", field: "surname" },
  { title: "DOB", field: "birthYear", type: "numeric" },
  {
    title: "Address",
    field: "birthCity",
    lookup: { 63: "Puttaparthy", 45: "Veeranjaneya Palli" },
  },
];
const data = [
  { name: "Chakravarthy", surname: "E", birthYear: 1999, birthCity: 63 },
  { name: "Praneeth", surname: "E", birthYear: 1997, birthCity: 45 },
];

const Admin = () => {
  return (
    <div className="bg-light vh-100 p-5">
      <MaterialTable title="USERS" columns={columns} data={data} />
    </div>
  );
};

export default Admin;
