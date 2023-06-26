import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";

const colums = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "REPORTER", field: "reporter" },
  { title: "DESCRIPTION", field: "description" },
  { title: "PRIORITY", field: "titketPriority" },
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

const Engineer = () => {
  const [ticketUpdationModal, setTicketUpdationModal] = useState();

  return (
    <div style={{ backgroundColor: "#000814" }}>
      <Sidebar />
      <div className="container p-5">
        <h3 className="text-center" style={{ color: "#1a936f" }}>
          Welcome {localStorage.getItem("name")}
        </h3>
        <p className="text-light text-center">
          Take a quick look at your Engineer stats below..
        </p>
        {/*Cards */}
        <div className="row ps-5 mb-4">
          <Cards
            color=""
            title="OPEN"
            icon="envelope-open"
            ticketCount="3"
            pathColor="black"
          />
          <Cards
            color=""
            title="PROGRESS"
            icon="hourglass-split"
            ticketCount="6"
            pathColor="black"
          />

          <Cards
            color=""
            title="CLOSED"
            icon="check2-circle"
            ticketCount="7"
            pathColor="black"
          />
          <Cards
            color=""
            title="BLOCKED"
            icon="slash-circle"
            ticketCount="1"
            pathColor="black"
          />
        </div>
        <hr />
        <div className="ms-5">
        <MaterialTable
        columns={colums}
        title="TICKET ASSIGNED TO YOU"
        options={{
          filtering: true,
          exportMenu: [
            {
              label: "Export Pdf",
              exportFunc: (cols, data) =>
                ExportPdf(cols, data, "Ticket Records"),
            },
            {
              label: "Export Csv",
              exportFunc: (cols, data) =>
                ExportCsv(cols, data, "Ticket Records"),
            },
          ],
          headerStyle: {
            backgroundColor: "#1a936f",
          },
        }}
      />
      <button
        className="btn text-center btn-success m-1"
        onClick={() => setTicketUpdationModal(true)}
      >
        Edit Ticket
      </button>
        </div>
     
        {ticketUpdationModal ? (
          <Modal
            show={ticketUpdationModal}
            onHide={() => setTicketUpdationModal(false)}
            backdrop="static"
            centered
          >
            <ModalHeader closeButton>
              <ModalTitle>Update Ticket</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <form>
                <div className="p-1">
                  <h5 className="text-success">ID:</h5>
                </div>
                <div className="input-group m-1">
                  <label className="lable label-md input-group-text">TITLE</label>
                  <input type="text" disabled className="form-control" />
                </div>
                <div className="input-group m-1">
                  <label className="lable label-md input-group-text">REPORTED</label>
                  <input type="text" disabled className="form-control" />
                </div>
              </form>
            </ModalBody>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Engineer;
