import { useEffect, useState, useNavigate } from "react";
import { useParams } from "react-router-dom"


function BorrowHistory() {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    // const [borrowHistory, setBorrowHistory] = useState(null);

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
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {user ? (user.borrowHistory.filter((book) => book.isReturned === false).map((book, i) => <Book key={book.id} index={i} book={book} />)) : null}
            </tbody>
        </table>;

    </>)
}


function Book({ book, index }) {

    function returnBook() {

        const updateInLibraryData = () => {



        }


        const updateInUserHistory = () => {


        }

        updateInLibraryData();
        updateInUserHistory();
    }

    return (<>
        <tr key={index} className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>{book.isbn}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{new Date(book.borrowedOn).toLocaleString()}</td>

            <td>
                <button onClick={() => returnBook()} type="button" className="btn btn-info m-1 btn-sm">Return</button>
            </td>

        </tr>
    </>);

}

export { BorrowHistory }