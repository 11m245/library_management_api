import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



function ViewBook() {

    const { id } = useParams();

    const [book, setBook] = useState({});
    const [user, setUser] = useState({});

    const checkResponse = (response) => {
        if ((response.status <= 299) && (response.status > 199)) {
            return response;
        } else {
            throw (` ${response.status} ${response.statusText}`)
        }
    }

    const getBook = () => {
        fetch(`https://63899fdd4eccb986e895a955.mockapi.io/books/${id}`, { method: "GET" })
            .then(response => checkResponse(response))
            .then(response => response.json()).then(data => { setBook(data) })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getBook();
    }, [])

    const borrowBook = (id) => {

        const borrowBook1 = { ...book, borrowedCount: book.borrowedCount + 1, availableCount: book.availableCount - 1, borrowedHistory: [...book.borrowedHistory, { userId: "Kaleb.Franeck", name: "Josephine Yost", mobile: "248-804-1000", isReturned: false, borrowedOn: Date.now(), returnedOn: "" }] };
        // console.log("borrow book is", borrowBook1);
        const checkResponse = (response) => {
            if (response.status === 200) {
                return response;
            } else {
                throw (` ${response.status} ${response.statusText}`)
            }
        }

        const putBook = () => {
            fetch(`https://63899fdd4eccb986e895a955.mockapi.io/books/${id}`,
                { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(borrowBook1) })
                .then(response => checkResponse(response))
                .catch(err => console.log(err));
        }

        putBook(borrowBook1);



        const getUser = () => {
            const id = 1014;
            fetch(`https://63899fdd4eccb986e895a955.mockapi.io/users/${id}`,
                { method: "GET" })
                .then(response => checkResponse(response)).then(response => response.json())
                .then(data => { setUser(data); return data }).then(data => updateUser(id, data))
                .catch(err => console.log(err));
        }

        const updateUser = (id, data) => {

            // console.log("borrow user", data);

            const borrowedUser = { ...data, borrowHistory: [...data.borrowHistory, { isbn: book.isbn, name: book.name, author: book.author, borrowedOn: Date.now(), isReturned: false, returnedOn: "" }] }
            // console.log("borrowed user", borrowedUser);
            putBorrowedUser(id, borrowedUser);
        }

        getUser();

        function putBorrowedUser(id, borrowedUser) {


            const checkResponse = (response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    throw (` ${response.status} ${response.statusText}`)
                }
            }
            fetch(`https://63899fdd4eccb986e895a955.mockapi.io/users/${id}`,
                { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(borrowedUser) })
                .then(response => checkResponse(response)).then(response => response.json())
                .catch(err => console.log(err));

        }

    }



    return (<>



        {book ? <div style={{ maxWidth: "500px" }} className="card mx-auto mt-3 text-bg-success">
            <h5 className="card-header text-center ">Title : {book.name}</h5>
            <div className="card-body">
                <h5 className="card-title text-end">by {book.author}</h5>
                <p className="card-text">{book.description}</p>
                <button onClick={() => borrowBook(book.id)} className="d-block w-25 btn btn-primary border-white mx-auto">Borrow</button>
            </div>
        </div> : "Loading.."}

    </>)

}

export { ViewBook }