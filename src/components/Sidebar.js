import { CSidebar, CSidebarNav, CNavItem, CNavTitle } from "@coreui/react";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate = useNavigate()
  function logout() {
    localStorage.clear()
    navigate("/")
      
  }

  return (
    <CSidebar unfoldable className="vh-100 bg-secondary">
      <CSidebarNav>
        <CNavItem className="bg-dark d-flex ">
          <i className="bi bi-bar-chart-fill text-white mx-3 my-2"></i>
          <h5 className="text-white fw-bolder mx-3 my-2">CRM Plus</h5>
        </CNavItem>
        <CNavTitle className="text-light fw-normal">CHAKRI</CNavTitle>
        <div onClick={logout} style={{cursor:"pointer"}}>
          <CNavItem className="bg-dark d-flex ">
            <i class="bi bi-box-arrow-left text-white mx-3 my-2"></i>
            <div className="text-light mx-3 my-2">Log out</div>
          </CNavItem>
        </div>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
