import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Button,
} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import { fetchTicket, ticketUpdation } from "../api/ticket";

const colums = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "REPORTER", field: "reporter" },
  { title: "DESCRIPTION", field: "description" },
  { title: "PRIORITY", field: "ticketPriority" },
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
  const [ticketUpdationModal, setTicketUpdationModal] = useState(false);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);
  const closeTicketUpdationModal = () => setTicketUpdationModal(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      fetchTickets();
    })();
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then(function (response) {
        setTicketDetails(response.data);
        updateTicketCount(response.data);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const updateTicketCount = (tickets) => {
    const data = {
      open: 0,
      pending: 0,
      closed: 0,
      blocked: 0,
    };

    tickets.forEach((ticket) => {
      if (ticket.status === "OPEN") {
        data.open =+ 1;
      } else if (ticket.status === "IN_PROGRESS") {
        data.pending =+ 1;
      } else if (ticket.status === "CLOSED") {
        data.closed =+ 1;
      } else if (ticket.status === "BLOCKED") {
        data.blocked =+ 1;
      }
      console.log(ticket);
    });
    setTicketStatusCount(Object.assign({}, data));
  };

  const editTicket = (ticketDetail) => {
    console.log(ticketDetail);
    const ticket = {
      id: ticketDetail.id,
      title: ticketDetail.title,
      description: ticketDetail.description,
      ticketPriority: ticketDetail.ticketPriority,
      reporter: ticketDetail.reporter,
      assignee: ticketDetail.assignee,
      status: ticketDetail.status,
    };
    setSelectedCurrTicket(ticket);
    setTicketUpdationModal(true);
  };

  const onTicketUpdate = (e) => {
    if (e.target.name === "priority") {
      selectedCurrTicket.priority = e.target.value;
    } else if (e.target.name === "description") {
      selectedCurrTicket.description = e.target.value;
    } else if (e.target.name === "status") {
      selectedCurrTicket.status = e.target.value;
    }
    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));
  };
  console.log(selectedCurrTicket);

  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then(function (res) {
        toast.success("Ticket updated Successfully");
        fetchTickets();
        closeTicketUpdationModal();
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div style={{ backgroundColor: "#000814" }}>
      <Sidebar />
      <div className="container p-5">
        <h3 className="text-center" style={{ color: "#1a936f" }}>
          Welcome {localStorage.getItem("name")} !
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
            ticketCount={ticketStatusCount.open}
            pathColor="black"
          />
          <Cards
            color=""
            title="PROGRESS"
            icon="hourglass-split"
            ticketCount={ticketStatusCount.pending}
            pathColor="black"
          />

          <Cards
            color=""
            title="CLOSED"
            icon="check2-circle"
            ticketCount={ticketStatusCount.closed}
            pathColor="black"
          />
          <Cards
            color=""
            title="BLOCKED"
            icon="slash-circle"
            ticketCount={ticketStatusCount.blocked}
            pathColor="black"
          />
        </div>
        <hr />
        <ToastContainer position="top-center" />
        <div className="ms-5">
          <MaterialTable
            onRowClick={(event, rowData) => editTicket(rowData)}
            columns={colums}
            title="TICKETS ASSIGNED TO YOU"
            data={ticketDetails}
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
                fontSize: "13px",
                color: "#fff",
              },
              rowStyle: {
                fontSize: "12px",
                backgroundColor: "#fff",
              },
            }}
          />
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
              <form onSubmit={updateTicket}>
                <div className="p-1">
                  <h5 className="text-success">ID:{selectedCurrTicket.id}</h5>
                </div>
                <div className="input-group m-1">
                  <label className="lable label-md input-group-text">
                    TITLE
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={selectedCurrTicket.title}
                  />
                </div>
                <div className="input-group m-1">
                  <label className="lable label-md input-group-text">
                    REPORTED
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={selectedCurrTicket.reporter}
                  />
                </div>
                <div className="input-group m-1">
                  <label className="lable label-md input-group-text">
                    STATUS
                  </label>
                  <select
                    className="form-select"
                    value={selectedCurrTicket.status}
                    onChange={onTicketUpdate}
                    name="status"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="BLOCKED">BLOCKED</option>
                  </select>
                </div>
                <div className="input-group m-1">
                  <label className="lable label-md input-group-text">
                    DESCRIPTION
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedCurrTicket.description}
                    onChange={onTicketUpdate}
                    name="description"
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="m-1"
                    onClick={() => closeTicketUpdationModal}
                  >
                    Cancel
                  </Button>
                  <Button variant="success" className="m-1" type="submit">
                    Update
                  </Button>
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
