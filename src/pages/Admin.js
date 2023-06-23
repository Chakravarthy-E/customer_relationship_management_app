import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Modal,Button } from "react-bootstrap";
import { fetchTicket,ticketUpdation } from "../api/ticket";
import Cards from "../components/Cards";
import Sidebar from "../components/Sidebar";
import { getAllUser,updateUserData } from "../api/user";

const columns = [
  { title: " ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter" },
  { title: "ASSIGNEE", field: "assignee" },
  { title: "PRIORITY", field: "ticketPriority" },
  {
    title: "STATUS",
    field: "status",
    lookup: {
      "OPEN": "OPEN",
      "IN_PROGRESS": "IN_PROGRESS",
      "CLOSED": "CLOSED",
      "BLOCKED": "BLOCKED",
    },
  },
];

const userColumns = [
  { title: " ID", field: "userId" },
  { title: "NAME", field: "name" },
  { title: "EMAIL", field: "email" },
  { title: "ROLE", field: "userTypes" },
  {
    title: "STATUS",
    field: "userStatus",
    lookup: {
      "APPROVED": "APPROVED",
      "REJECTED": "REJECTED",
      "PENDING": "PENDING",
    },
  },
];

const Admin = () => {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [userList, setUserList] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [ticketUpdationModal, setTicketUpdationModal] = useState(false);
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  
  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);
  const closeTicketUpdationModal = () => setTicketUpdationModal(false);
  const [userModal, setUserModal] = useState(false);

  const [message, setMessage] = useState("");
  const showUserModal = () => setUserModal(true);
  const closeUserModal = () => {
    setUserModal(false);
    setUserDetail({});
  };

  useEffect(() => {
    fetchUsers("");
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then((response) => {
        setTicketDetails(response.data);
        updateTicketCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const fetchUsers = (userId) => {
    getAllUser(userId)
      .then(function (response) {
        if (response.status === 200) {
          if (userId) {
            setUserDetail(response.data[0]);
            showUserModal();
          } else setUserList(response.data);
        }
      })
      .catch(function (error) {
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


  const editTicket = (ticketDetail) => {
    const ticket = {
      assignee: ticketDetail.assignee,
      description: ticketDetail.description,
      title: ticketDetail.title,
      id: ticketDetail.id,
      reporter: ticketDetail.reporter,
      status: ticketDetail.status,
      ticketPriority: ticketDetail.ticketPriority,
    };
    setTicketUpdationModal(true);
    setSelectedCurrTicket(ticket);
  };


  const onTicketUpdate = (e) => {
    if (e.target.name === "ticketPriority")
      selectedCurrTicket.ticketPriority = e.target.value;
    else if (e.target.name === "status")
      selectedCurrTicket.status = e.target.value;
    else if (e.target.name === "assignee")
      selectedCurrTicket.assignee = e.target.value;
    else if (e.target.name === "description")
      selectedCurrTicket.description = e.target.value;

    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));
  };

  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then(function (response) {
        // closing the modal
        setTicketUpdationModal(false);
        // fetching the tickets again to update the table and the widgets
        fetchTickets();
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  const updateUserDetail = () => {
    const data = {
      userType: userDetail.userTypes,

      userStatus: userDetail.userStatus,
      userName: userDetail.name,
    };
    updateUserData(userDetail.userId, data)
      .then(function (response) {
        if (response.status === 200) {
          setMessage(response.message);
          let idx = userList.findIndex(
            (obj) => obj.userId === userDetail.userId
          );
          userList[idx] = userDetail;
          closeUserModal();
          setMessage("User detail updated successfully");
        }
      })
      .catch(function (error) {
        if (error.status === 400) setMessage(error.message);
        else console.log(error);
      });
  };

  const changeUserDetail = (e) => {
    if (e.target.name === "status") userDetail.userStatus = e.target.value;
    else if (e.target.name === "name") userDetail.name = e.target.value;
    else if (e.target.name === "type") userDetail.userTypes = e.target.value;
    setUserDetail(userDetail);
    setUserModal(e.target.value);
  };

  console.log("***", ticketStatusCount);
  return (
    <div className="bg-light vh-100">
      {/**Sidebar */}
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
        <Cards 
         color="primary"
         title="OPEN"
         icon="envelope-open"
         ticketCount={ticketStatusCount.open}
         pathColor="blue"
        />
        <Cards
        color="warning"
        title="PROGRESS"
        icon="hourglass-split"
        ticketCount={ticketStatusCount.progress}
        pathColor="brown"
        />

        <Cards 
        color="success"
        title="CLOSED"
        icon="check2-circle"
        ticketCount={ticketStatusCount.closed}
        pathColor="darkgreen" 
        />
        <Cards 
        color="secondary"
        title="BLOCKED"
        icon="slash-circle"
        ticketCount={ticketStatusCount.blocked}
        pathColor="black"
        
        />
        {/**w end */}
      </div>
      {/**Tables */}
      <div className="container">
        <MaterialTable
        onRowClick={(event, rowData) => editTicket(rowData)}
          title="Ticket Details"
          columns={columns}
          data={ticketDetails}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#4890FD",
              color: "white",
              fontSize: "13px",
            },
            rowStyle: {
              backgroundColor: "#fff",
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
        <hr className="m-5" />
        <MaterialTable
          onRowClick={(event, rowData) => fetchUsers(rowData.userId)}
          title="User Details"
          data={userList}
          columns={userColumns}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#87BEA5",
              color: "white",
            },
            rowStyle: {
              fontSize:"12px"
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
        {ticketUpdationModal ? (
          <Modal
            show={ticketUpdationModal}
            onHide={closeTicketUpdationModal}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* submit the details and we will call the api  */}
              <form onSubmit={updateTicket}>
              <div className="p-1">
                <h5 className="card-subtitle mb-2 text-primary">
                  ID: {selectedCurrTicket.id}
                </h5>
              </div>
            
              <div className="input-group mb-2">
                <label className="label input-group-text label-md">Title</label>
                <input
                  type="text"
                  disabled
                  value={selectedCurrTicket.title}
                  className="form-control"
                />
              </div>
            
              <div className="input-group mb-2">
                <label className="label input-group-text label-md">Reporter</label>
                <input
                  type="text"
                  disabled
                  value={selectedCurrTicket.reporter}
                  className="form-control"
                />
              </div>
            
              <div className="input-group mb-2">
                <label className="label input-group-text label-md">Assignee</label>
                <select className="form-select" name="assignee">
                  <option>Utkarshini</option>
                </select>
              </div>
            
              <div className="input-group mb-2">
                <label className="label input-group-text label-md">Priority</label>
                <input
                  type="number"
                  value={selectedCurrTicket.ticketPriority}
                  className="form-control"
                  name="ticketPriority"
                  onChange={onTicketUpdate}
                />
              </div>
            
              <div className="input-group mb-2">
                <label className="label input-group-text label-md">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={selectedCurrTicket.status}
                  onChange={onTicketUpdate}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
              </div>
            
              <div className="input-group mb-2">
                <label className="label input-group-text label-md">Description</label>
                <textarea
                  type="text"
                  value={selectedCurrTicket.description}
                  onChange={onTicketUpdate}
                  className="md-textarea form-control"
                  rows="3"
                  name="description"
                />
              </div>
            
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="m-1" onClick={closeTicketUpdationModal}>
                  Cancel
                </Button>
                <Button variant="primary" className="m-1" type="submit">
                  Update
                </Button>
              </div>
            </form> 
            </Modal.Body>
          </Modal>
        ) : null}

        {userModal ? (
          <Modal
            show={userModal}
            onHide={closeUserModal}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={updateUserDetail}>
            <div className="p-1">
              <h5 className="card-subtitle mb-2 text-success lead">
                User ID: {userDetail.userId}
              </h5>
              <hr />
          
              <div className="input-group mb-3">
                <label className="label input-group-text label-md">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userDetail.name}
                  disabled
                />
              </div>
          
              <div className="input-group mb-3">
                <label className="label input-group-text label-md">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userDetail.email}
                  onChange={changeUserDetail}
                  disabled
                />
              </div>
          
              <div className="input-group mb-3">
                <label className="label input-group-text label-md">Type</label>
                <select className="form-select" name="type" value={userDetail.userTypes} disabled>
                  <option value="ADMIN">ADMIN</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ENGINEER">ENGINEER</option>
                </select>
              </div>
          
              <div className="input-group mb-3">
                <label className="label input-group-text label-md">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={userDetail.userStatus}
                  onChange={changeUserDetail}
                >
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>
            </div>
          
            <div className="input-group justify-content-center">
              <div className="m-1">
                <Button variant="secondary" onClick={() => closeUserModal()}>
                  Close
                </Button>
              </div>
              <div className="m-1">
                <Button variant="success" onClick={() => updateUserDetail()}>
                  Update
                </Button>
              </div>
            </div>
          </form>
          
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        ) : (
          ""
        )}

      </div>
    </div>
  );
};

export default Admin;
