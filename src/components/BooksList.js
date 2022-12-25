import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export function BooksList({ searchValue, user }) {

    // const searchValue = useContext(searchCtx);
    // console.log(searchValue);
    const [booksList, setBooksList] = useState([]);
    const [booksData, setBooksData] = useState([]);


    const checkResponse = (response) => {
        if ((response.status <= 299) && (response.status > 199)) {
            return response;
        } else {
            throw (` ${response.status} ${response.statusText}`)
        }
    }

    const getBooks = () => {
        fetch("https://63899fdd4eccb986e895a955.mockapi.io/books", { method: "GET" })
            .then(response => checkResponse(response))
            .then(response => response.json()).then((data) => {
                setBooksData(data)
            })
            .catch(error => console.log(error))
    }



    useEffect(() => {
        getBooks();
    }, [])

    useEffect(() => {
        if (!searchValue) {
            setBooksList(booksData);
        } else {

            const filteredArray = booksData.filter((book) => book.name.includes(searchValue));
            setBooksList(filteredArray)
        }
    }, [searchValue, booksData])

    const tableJsx = <table className="table table-striped-columns table-hover ">
        <thead>
            <tr>
                <th scope="col">S.No.</th>
                <th scope="col">ISBN</th>
                <th scope="col">Book Name</th>
                <th scope="col">Author</th>
                <th scope="col">count</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {booksList.map((book, i) => <Book user={user} index={i} book={book} />)}
        </tbody>
    </table>;

    return (<>

        {booksList.length === 0 ? "Loading..." : tableJsx}
    </>);
}
function Book({ book, index, user }) {

    const navigate = useNavigate();

    return (<>
        <tr key={index} className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>{book.isbn}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.availableCount}</td>
            {user === "librarian" ? <td>
                <button onClick={() => navigate(`edit-book/${book.id}`)} type="button" className="btn btn-info m-1 btn-sm">Edit</button>
                <button onClick={() => navigate(`delete-book/${book.id}`)} type="button" className="btn btn-danger m-1 btn-sm">Delete</button>
            </td> :
                <td>
                    <button onClick={() => navigate(`view-book/${book.id}`)} type="button" className="btn btn-info m-1 btn-sm">Borrow</button>
                </td>
            }
        </tr>
    </>);

}
