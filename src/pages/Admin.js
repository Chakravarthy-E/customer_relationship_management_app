import React from "react";
import MaterialTable from "@material-table/core";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const columns = [
  { title: " ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter" },
  { title: "ASSIGNEE", field: "assignee" },
  { title: "PRIORITY", field: "priority" },
  {
    title: "STATUS",
    field: "status",
    lookup: {
      OPEN: "OPEN",
      IN_PROGRESS: "IN_PROGRESS",
      CLOSED: "CLOSED",
      BLOCKED: "BLOCKED",
    },
  },
];

const userColumns = [
  { title: " ID", field: "id" },
  { title: "NAME", field: "name" },
  { title: "EMAIL", field: "email" },
  { title: "ROLE", field: "userTypes" },
  { title: "STATUS", field: "status" },
];

const Admin = () => {
  return (
    <div className="bg-light vh-100">
      <Sidebar />
      {/**Welcome text */}
      <div className="container p-3">
        <h3 className="text-center text-primary">Welcome, Admin!</h3>
        <p className="text-muted text-center">
          Take a quick look at your admin stats below..
        </p>
      </div>
      {/** Cards */}
      <Cards />
      {/**Tables */}
      <div className="container p-5">
        <MaterialTable
          title="Ticket Details"
          columns={columns}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#4890FD",
              color: "white",
            },
            rowStyle: {
              backgroundColor: "#eee",
            },
            exportMenu: [
              {
                label: "Export Pdf",
                exportFunc: (cols, data) =>
                  ExportPdf(cols, data, "TicketRecords"),
              },
              {
                label: "Export Csv",
                exportFunc: (cols, data) =>
                  ExportCsv(cols, data, "TicketRecords"),
              },
            ],
          }}
        />
        <hr className="m-5" />
        <MaterialTable
          title="User Details"
          columns={userColumns}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#4890FD",
              color: "white",
            },
            rowStyle: {
              backgroundColor: "#eee",
            },
            exportMenu: [
              {
                label: "Export Pdf",
                exportFunc: (cols, data) =>
                  ExportPdf(cols, data, "userRecords"),
              },
              {
                label: "Export Csv",
                exportFunc: (cols, data) =>
                  ExportCsv(cols, data, "userRecords"),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Admin;
