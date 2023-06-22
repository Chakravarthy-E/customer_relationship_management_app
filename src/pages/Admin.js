import React, { useEffect,useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {CircularProgressbar,buildStyles} from "react-circular-progressbar"
import { fetchTicket } from "../api/ticket";
import Cards from "../components/Cards";
import Sidebar from "../components/Sidebar";

const columns = [
  { title: " ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter" },
  { title: "ASSIGNEE", field: "assignee" },
  { title: "PRIORITY", field: "ticketPriority"},
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
const [ticketDetails,setTicketDetails] = useState([])
const [ticketStatusCount, setTicketStatusCount] = useState({

});

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then( (response) => {
          setTicketDetails(response.data)
          updateTicketCount(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTicketCount =(tickets) => {
    const data ={
      open:0,
      closed:0,
      progress:0,
      blocked:0
    }

      tickets.forEach(x => {
        if(x.status === "OPEN"){
          data.open += 1;
        }
        else if(x.status === "CLOSED"){
          data.closed += 1
        }
        else if(x.status === "IN_PROGRESS"){
          data.progress += 1
        }
        else if(x.status === "BLOCKED"){
          data.blocked += 1
        }
      })

      setTicketStatusCount(Object.assign({},data))

  }

    console.log("***",ticketStatusCount)
  return (
    <div className="bg-light vh-100">
      <Sidebar />
      {/**Welcome text */}
      <div className="container p-3">
        <h3 className="text-center text-primary">
          Welcome, {localStorage.getItem("name")}
        </h3>
        <p className="text-muted text-center">
          Take a quick look at your admin stats below..
        </p>
      </div>
      {/** Cards */}
      <div className="row ms-5 ps-5 mb-3">
      {/** 1 */}
      <div className="col-xs-12 col-lg-3 col-md-6">
        <div
          className="card shadow bg-primary bg-opacity-75 text-center"
          style={{ width: "15rem" }}
        >
          <h5 className="card-subtitl fw-bolder my-2 text-light">
            <i className="bi bi-envelope-open text-white mx-2">Open</i>
          </h5>
          <hr />
          <div className="row mb-1 d-flex align-items-center">
            <div className="col text-light mx-4 fw-bolder display-6">
              {ticketStatusCount.open}
            </div>
            <div className="col">
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar
                  value={ticketStatusCount.open}
                  styles={buildStyles({ pathColor: "darkblue" })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/** 2 */}
      <div className="col-xs-12 col-lg-3 col-md-6">
        <div
          className="card shadow bg-warning bg-opacity-75 text-center"
          style={{ width: "15rem" }}
        >
          <h5 className="card-subtitle fw-bolder my-2 text-light">
            <i className="bi bi-hourglass-split text-white mx-2">Progress</i>
          </h5>
          <hr />
          <div className="row mb-1  d-flex align-items-center">
            <div className="col text-white mx-4 fw-bolder display-6">
            {ticketStatusCount.progress}
            </div>
            <div className="col">
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar
                  value={ticketStatusCount.progress}
                  styles={buildStyles({ pathColor: "brown" })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/** 3 */}
  
      <div className="col-xs-12 col-lg-3 col-md-6">
        <div
          className="card shadow bg-success bg-opacity-75 text-center"
          style={{ width: "15rem" }}
        >
          <h5 className="card-subtitle fw-bolder my-2 text-light">
            <i className="bi bi-check-circle-fill text-white mx-2">Closed</i>
          </h5>
          <hr />
          <div className="row mb-1  d-flex align-items-center">
            <div className="col text-white mx-4 fw-bolder display-6">
            {ticketStatusCount.closed}
            </div>
            <div className="col">
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar
                  value={ticketStatusCount.closed}
                  styles={buildStyles({ pathColor: "darkgreen" })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/** 4 */}
      <div className="col-xs-12 col-lg-3 col-md-6">
        <div
          className="card shadow bg-secondary bg-opacity-75 text-center"
          style={{ width: "15rem" }}
        >
          <h5 className="card-subtitle fw-bolder my-2 text-light">
            <i className="bi bi-slash-circle text-white mx-2">Blocked</i>
          </h5>
          <hr />
          <div className="row mb-1  d-flex align-items-center">
            <div className="col text-white mx-4 fw-bolder display-6">
            {ticketStatusCount.blocked}
            </div>
            <div className="col">
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar
                  value={ticketStatusCount.blocked}
                  styles={buildStyles({ pathColor: "black" })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/**w end */}
    </div>
      {/**Tables */}
      <div className="container">
        <MaterialTable
          title="Ticket Details"
          columns={columns}
          data={ticketDetails}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#4890FD",
              color: "white",
              fontSize:"13px"
            },
            rowStyle: {
              backgroundColor: "#eee",
              fontSize:"12px"
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
