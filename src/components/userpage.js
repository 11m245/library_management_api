import { Link, Outlet, useNavigate } from "react-router-dom";


function UserPage() {
    const navigate = useNavigate();
    const id = "1014";
    const navItems = [
        { name: "Dashboard", path: "" },
        { name: "Books", path: "books" },
        { name: "Borrow History", path: `borrow-history/${id}` },
        { name: "Returned History", path: `return-history/${id}` }]

    return (<>


        <div className="container">
            <div className="header pt-3 " style={{ backgroundColor: "lightblue", borderEndStartRadius: "18px", borderEndEndRadius: "18px" }}>

                <div className="nav d-flex justify-content-between align-items-center p-1" >
                    <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
                        {navItems.map((menu, i) => <li style={{ fontSize: 20, fontWeight: "bold" }} key={i} ><Link to={menu.path}> {menu.name} </Link></li>)}
                    </ul>
                    <button style={{ position: "relative", bottom: "5px", right: "10px" }} onClick={() => navigate("/")} type="button" className="btn btn-sm btn-primary logout-btn">Logout</button>
                </div>

            </div>
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    </>)
}

export { UserPage }