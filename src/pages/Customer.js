import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchTicket, ticketCreation, ticketUpdation } from "../api/ticket";
import Cards from "../components/Cards";
import Sidebar from "../components/Sidebar";

const columns = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "ASSIGNEE", field: "assignee" },
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

const Customer = () => {
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [ticketDetails, setTicketDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  // open the edit ticket modal
  const [ticketUpdationModal, setTicketUpdationModal] = useState(false);
  // updated data stored in a state
  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);

  const navigate = useNavigate();
  const logoutFn = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      fetchTickets();
    })();
  },[]);

  const fetchTickets = () => {
    fetchTicket()
      .then((response) => {
        setTicketDetails(response.data);
        updateTicketCount(response.data);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  //create ticket
  const createTicket = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      ticketPriority: e.target.ticketPriority.value,
      description: e.target.description.value,
    };
    ticketCreation(data)
      .then((res) => {
        setMessage("Ticket Created Successfully !");
        setCreateTicketModal(false);
        fetchTickets();
      })
      .catch((error) => {
        if (error.res.status === 400) {
          setMessage(error.res.data.message);
        } else if (error.res.status === 401) {
          logoutFn();
        } else {
          console.log(error);
        }
      });
  };

  //edit ticket
  const editTicket = (ticketDetail) => {
    const ticket = {
      id: ticketDetail.id,
      title: ticketDetail.title,
      description: ticketDetail.description,
      assignee: ticketDetail.assignee,
      reporter: ticketDetail.reporter,
      ticketPriority: ticketDetail.ticketPriority,
      status: ticketDetail.status,
    };

    setSelectedCurrTicket(ticket);
    setTicketUpdationModal(true);
  };

  //grab new data // ticket update
  const onTicketUpdate = (e) => {
    if (e.target.name === "description") {
      selectedCurrTicket.description = e.target.value;
    } else if (e.target.name === "ticketPriority") {
      selectedCurrTicket.ticketPriority = e.target.value;
    } else if (e.target.name === "status") {
      selectedCurrTicket.status = e.target.value;
    }
    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));
    console.log(selectedCurrTicket);
  };

  // update ticket = // fetch put api
  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then((response) => {
        console.log("Ticket updated Successfully");
        setTicketUpdationModal(false);
        fetchTickets();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTicketCount = (tickets) => {
    const data = {
      open: 0,
      closed: 0,
      progress: 0,
      blocked: 0,
    };
    tickets.forEach((x) => {
      if (x.status === "OPEN") {
        data.open += 1;
      } else if (x.status === "CLOSED") {
        data.closed += 1;
      } else if (x.status === "IN_PROGRESS") {
        data.progress += 1;
      } else if (x.status === "BLOCKED") {
        data.blocked += 1;
      }
    });
    setTicketStatusCount(Object.assign({}, data));
  };

  return (
    <div className="" style={{ backgroundColor: "#000814" }}>
      <Sidebar />
      <div className="container p-5">
        <h3 className="text-center" style={{ color: "#5A96E3" }}>
          Welcome {localStorage.getItem("name")}
        </h3>
        <p className="text-center text-light">
          {" "}
          Take a quick look at your user stats below..
        </p>
        {/**Cards */}
        <div className="row ps-5 mb-5">
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
            ticketCount={ticketStatusCount.progress}
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
        {/**Table */}
        <div className="ms-5">
          <MaterialTable
            columns={columns}
            data={ticketDetails}
            onRowClick={(event, rowData) => editTicket(rowData)}
            title="TICKETS RAISED BY YOU"
            options={{
              filtering: true,
              headerStyle: {
                backgroundColor: "#5A96E3",
                color: "",
                fontSize: "13px",
              },
              rowStyle: {
                backgroundColor: "",
                fontSize: "12px",
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
          <hr />
          <p className="lead text-primary text-center">{message}</p>
          <h4 className="text-center text-light my-4"> Facing any issues? Raise a ticket!</h4>
          <button
            className="btn btn-lg btn-primary form-control"
            onClick={() => setCreateTicketModal(true)}
          >
            Raise Ticket
          </button>
          {/**Creating Modal */}
          {createTicketModal ? (
            <Modal
              show={createTicketModal}
              backdrop="static"
              centered
              onHide={() => setCreateTicketModal(false)}
            >
              <Modal.Header closeButton>Create a new Ticket</Modal.Header>
              <Modal.Body>
                <form onSubmit={createTicket}>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      TITLE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      required
                    />
                  </div>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      PRIORITY
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="ticketPriority"
                      required
                    />
                  </div>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      DESCRIPTION
                    </label>
                    <textarea
                      type="text"
                      className=" md-textarea form-control"
                      rows="3"
                      name="description"
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      className="m-1"
                      onClick={() => setCreateTicketModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="m-1" type="submit" variant="primary">
                      Create
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          ) : null}

          {ticketUpdationModal ? (
            <Modal
              show={ticketUpdationModal}
              backdrop="static"
              centered
              onHide={() => setTicketUpdationModal(false)}
            >
              <Modal.Header closeButton>Update the Ticket</Modal.Header>
              <Modal.Body>
                <form onSubmit={updateTicket}>
                  <h5 className="card-subtitle lead text-primary">
                    ID : {selectedCurrTicket.id}
                  </h5>

                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      TITLE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={selectedCurrTicket.title}
                      disabled
                    />
                  </div>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Assignee
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="assignee"
                      value={selectedCurrTicket.assignee}
                      disabled
                    />
                  </div>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Priority
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="ticketPriority"
                      value={selectedCurrTicket.ticketPriority}
                      onChange={onTicketUpdate}
                    />
                  </div>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      DESCRIPTION
                    </label>
                    <textarea
                      type="text"
                      className=" md-textarea form-control"
                      rows="3"
                      name="description"
                      value={selectedCurrTicket.description}
                      onChange={onTicketUpdate}
                    />
                  </div>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      STATUS
                    </label>
                    <select
                      name="status"
                      className="form-select"
                      value={selectedCurrTicket.status}
                      onChange={onTicketUpdate}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      className="m-1"
                      onClick={() => setTicketUpdationModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="m-1" type="submit" variant="primary">
                      Update
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Customer;
