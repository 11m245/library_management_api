
import { createContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";



export const searchCtx = createContext();

function Books({ setSearchValue }) {

    // const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();


    return (<>
        <h1 className="text-center">books page</h1>
        <div style={{ width: "50%", height: "60px" }} className="d-flex justify-content-center gap-3 mx-auto">
            <button onClick={() => navigate("add-book")} type="button" className="btn btn-success"> + AddBook</button>
            <input onChange={(e) => setSearchValue(e.target.value)} className="form-control form-control-lg" type="text" placeholder="search by book name" aria-label=".search book" />
        </div>

        <div className="books-content-container">
            {/* <searchCtx.Provider value={searchValue}> */}
            <Outlet />
            {/* </searchCtx.Provider> */}
        </div>

    </>)
}


export { Books }