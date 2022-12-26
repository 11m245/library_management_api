import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

function UsersList() {

    const [usersList, setUsersList] = useState([]);

    const checkResponse = (response) => {
        if ((response.status <= 299) && (response.status > 199)) {
            return response;
        } else {
            throw (` ${response.status} ${response.statusText}`)
        }
    }

    const getUsers = () => {
        fetch("https://63899fdd4eccb986e895a955.mockapi.io/users", { method: "GET" })
            .then(response => checkResponse(response))
            .then(response => response.json()).then(data => { setUsersList(data) })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUsers();
    }, [])

    const tableJsx = <table className="table table-striped-columns table-hover ">
        <thead>
            <tr>
                <th scope="col">S.No.</th>
                <th scope="col">user ID</th>
                <th scope="col">Name</th>
                <th scope="col">mobile</th>
                <th scope="col">email</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {usersList.map((user, i) => <User key={user.id} index={i} user={user} />)}
        </tbody>
    </table>;

    return (<>

        {usersList.length === 0 ? "Loading..." : tableJsx}
    </>);
}
function User({ user, index }) {

    const navigate = useNavigate();

    return (<>
        <tr key={index} className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>{user.userId}</td>
            <td>{user.name}</td>
            <td>{user.mobile}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={() => navigate(`edit-user/${user.id}`)} type="button" className="btn btn-info m-1 btn-sm">Edit</button>
                <button onClick={() => navigate(`delete-user/${user.id}`)} type="button" className="btn btn-danger m-1 btn-sm">Delete</button>
            </td>
        </tr>
    </>);

}


export { UsersList }
