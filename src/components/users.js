
import { Outlet, useNavigate } from "react-router-dom";



function Users() {

    const navigate = useNavigate()


    return (<>
        <h1 className="text-center">Users page</h1>
        <button onClick={() => navigate("add-user")} type="button" className="btn btn-success"> + Add User</button>
        <div className="users-content-container">
            <Outlet />
        </div>

    </>)
}


export { Users }