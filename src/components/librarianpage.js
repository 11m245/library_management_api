import { Link, Outlet, useNavigate } from "react-router-dom";

function LibrarianPage() {
    const navigate = useNavigate();

    const navItems = [{ name: "Dashboard", path: "" },
    { name: "Books", path: "books" }, { name: "Users", path: "users" }]



    return (<>
        <div className="container">
            <div className="header pt-3 " style={{ backgroundColor: "lightblue", borderEndStartRadius: "18px", borderEndEndRadius: "18px" }}>

                <div className="nav d-flex justify-content-between align-items-center p-1" >
                    <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
                        {navItems.map((menu, i) => <li style={{ fontSize: 20, fontWeight: "bold" }} key={i} ><Link to={menu.path}> {menu.name} </Link></li>)}
                    </ul>
                    <button className="logout-btn" style={{ position: "relative", bottom: "5px", right: "10px" }} onClick={() => navigate("/")} type="button" class="btn btn-sm btn-primary">Logout</button>
                </div>

            </div>
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    </>)
}

export { LibrarianPage }