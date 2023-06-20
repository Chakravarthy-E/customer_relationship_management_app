import { CSidebar, CSidebarNav, CNavItem, CNavTitle } from "@coreui/react";

const Sidebar = () => {

  function logout() {
    localStorage.clear()
    window.location.href = "/";
  }

  return (
    <CSidebar unfoldable className="vh-100 bg-black">
      <CSidebarNav>
        <CNavItem className="bg-dark d-flex ">
          <i className="bi bi-bar-chart-fill text-white mx-3 my-2"></i>
          <h5 className="text-white fw-bolder mx-3 my-2">Home</h5>
        </CNavItem>
        <CNavTitle className="text-light fw-normal">CRM Plus</CNavTitle>
        <div onClick={logout} style={{cursor:"pointer"}}>
          <CNavItem className="bg-dark d-flex ">
            <i class="bi bi-box-arrow-left text-white mx-3 my-2"></i>
            <div className="text-white  mx-3 my-2">Log out</div>
          </CNavItem>
        </div>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
