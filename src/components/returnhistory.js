import { useEffect, useState, useNavigate } from "react";
import { useParams } from "react-router-dom"


function ReturnHistory() {

    const { id } = useParams();
    const [user, setUser] = useState(null);


    useEffect(() => {

        const checkResponse = (response) => {
            if ((response.status <= 299) && (response.status > 199)) {
                return response;
            } else {
                throw (` ${response.status} ${response.statusText}`)
            }
        }
        const getUser = () => {
            fetch(`https://63899fdd4eccb986e895a955.mockapi.io/users/${id}`,
                { method: "GET" })
                .then(response => checkResponse(response)).then(response => response.json())
                .then(data => setUser(data))
                .catch(err => console.log(err));
        }

        getUser();


    }, [])





    return (<>

        <h5>hi, user {id}</h5>

        <table className="table table-striped-columns table-hover ">
            <thead>
                <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Borrowed On</th>
                    <th scope="col">Returned On</th>
                </tr>
            </thead>
            <tbody>
                {user ? (user.borrowHistory.filter((hbook) => hbook.isReturned === true).reverse().map((hbook, i) => <Book key={hbook.borrowedOn} index={i} hbook={hbook} />)) : null}
            </tbody>
        </table>;

    </>)
}


function Book({ hbook, index }) {

    return (<>
        <tr className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>{hbook.isbn}</td>
            <td>{hbook.name}</td>
            <td>{hbook.author}</td>
            <td>{new Date(hbook.borrowedOn).toLocaleString()}</td>
            <td>{new Date(hbook.returnedOn).toLocaleString()}</td>


        </tr>
    </>);

}

export { ReturnHistory }