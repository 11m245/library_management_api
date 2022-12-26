import { useEffect, useState, useNavigate } from "react";
import { useParams } from "react-router-dom"


function BorrowHistory() {

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
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {user ? (user.borrowHistory.filter((hbook) => hbook.isReturned === false).map((hbook, i) => <Book key={hbook.borrowedOn} index={i} hbook={hbook} />)) : null}
            </tbody>
        </table>;

    </>)
}


function Book({ hbook, index }) {

    const [book, setBook] = useState(null);
    const [user, setUser] = useState(null);


    function returnBook(isbn, id_user, userId) {
        // console.log("return hbook is", hbook);

        const updateInBooksData = () => {
            const bookId = isbn.slice(5);
            // console.log(id);

            const checkResponse = (response) => {
                if ((response.status <= 299) && (response.status > 199)) {
                    return response;
                } else {
                    throw (` ${response.status} ${response.statusText}`)
                }
            }

            const getBook = async () => {
                fetch(`https://63899fdd4eccb986e895a955.mockapi.io/books/${bookId}`, { method: "GET" })
                    .then(response => checkResponse(response))
                    .then(response => response.json()).then(data => updateCurrentBook(data))
                    .catch(error => console.log(error))

                function updateCurrentBook(data) {
                    // console.log("received in update", data);

                    const updatedBorrowedHistory = data.borrowedHistory.map(history1 => checkHistory(history1));

                    function checkHistory(history1) {

                        if (history1.userId === userId) {
                            return { ...history1, isReturned: true, returnedOn: Date.now() };
                        } else {
                            return history1;
                        }
                    }

                    const updatedBook = { ...data, borrowedHistory: updatedBorrowedHistory };


                    const putBook = async () => {
                        fetch(`https://63899fdd4eccb986e895a955.mockapi.io/books/${bookId}`,
                            { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedBook) })
                            .then(response => checkResponse(response))
                            .catch(err => console.log(err));
                    }

                    putBook();
                }
            }

            getBook();

            // console.log("gotData", book)






        }


        const updateInUserHistory = () => {
            const checkResponse = (response) => {
                if ((response.status <= 299) && (response.status > 199)) {
                    return response;
                } else {
                    throw (` ${response.status} ${response.statusText}`)
                }
            }

            const getUser = async () => {
                fetch(`https://63899fdd4eccb986e895a955.mockapi.io/users/${id_user}`, { method: "GET" })
                    .then(response => checkResponse(response))
                    .then(response => response.json()).then(data => updateCurrentUser(data))
                    .catch(error => console.log(error))

                function updateCurrentUser(data) {
                    // console.log("user received in update", data);

                    const updatedBorrowHistory = data.borrowHistory.map(history1 => checkHistory(history1));

                    function checkHistory(history1) {

                        if (history1.isbn === isbn) {
                            return { ...history1, isReturned: true, returnedOn: Date.now() };
                        } else {
                            return history1;
                        }
                    }

                    const updatedUser = { ...data, borrowHistory: updatedBorrowHistory };


                    const putUser = async () => {
                        fetch(`https://63899fdd4eccb986e895a955.mockapi.io/users/${id_user}`,
                            { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedUser) })
                            .then(response => checkResponse(response))
                            .catch(err => console.log(err));
                    }

                    putUser();
                }
            }






            getUser();
        }

        updateInBooksData();
        updateInUserHistory();
    }

    return (<>
        <tr className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>{hbook.isbn}</td>
            <td>{hbook.name}</td>
            <td>{hbook.author}</td>
            <td>{new Date(hbook.borrowedOn).toLocaleString()}</td>

            <td>
                <button onClick={() => returnBook(hbook.isbn, 1014, "Kaleb.Franeck")} type="button" className="btn btn-info m-1 btn-sm">Return</button>
            </td>

        </tr>
    </>);

}

export { BorrowHistory }