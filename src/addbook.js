import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function AddBook() {

    const navigate = useNavigate();

    const formValidationSchema = yup.object({
        isbn: yup.string().required("isbn of book is mandatory "),
        name: yup.string().required(),
        author: yup.string().required(),
        maxCount: yup.number().required(),
        description: yup.string()
    })

    const formik = useFormik({
        initialValues: { isbn: "", name: "", author: "", maxCount: "", description: "" },
        onSubmit: (values) => { addBook(values) },
        validationSchema: formValidationSchema
    });



    const addBook = (values) => {

        const getBookIds = (isbn, maxCount) => {
            const bookIds = [];
            for (let i = 0; i < maxCount; i++) {
                bookIds.push(`${isbn}_${i + 1}`)
            }
            return bookIds;
        }

        const newBook = {
            "isbn": values.isbn, "name": values.name,
            "author": values.author,
            "description": "default decription is this, so please edit asap",
            "maxCount": 0,
            "bookIds": getBookIds(values.isbn, values.maxCount),
            "availableCount": values.maxCount,
            "borrowedCount": 0,
            "borrowHistory": [{
                "bookId": "", "userId": "", "name": "",
                "mobile": "", "borrowedOn": "date1",
                "isReturned": false, "returnedOn": "date2"
            }]
        };

        // console.log(newBook);

        const checkResponse = (response) => {
            if (response.status === 201) {
                return response;
            } else {
                throw (` ${response.status} ${response.statusText}`)
            }
        }

        const postBook = () => {
            fetch("https://63899fdd4eccb986e895a955.mockapi.io/books",
                { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newBook) })
                .then(response => checkResponse(response)).then(data => navigate("/librarian/books")).catch(err => console.log(err));
        }

        postBook(newBook);

    }


    return (<>
        {/* <h1>add book form page</h1> */}

        <form onSubmit={formik.handleSubmit} className="row form-container">
            <h4 className="form-title text-center">Add Book Form</h4>

            <input
                type="text"
                className={(formik.touched.isbn && formik.errors.isbn) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"}
                name="isbn"
                placeholder="Enter Book's ISBN"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isbn}
            />
            <span style={{ color: "red" }}>{(formik.touched.isbn && formik.errors.isbn) ? formik.errors.isbn : null}</span>
            <br />
            <input type="text" name="name" className={(formik.touched.name && formik.errors.name) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"} placeholder="Enter Book Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
            <span style={{ color: "red" }}>{formik.touched.name && formik.errors.name ? formik.errors.name : null}</span>
            <br />
            <input type="text" className={(formik.touched.author && formik.errors.author) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"} name="author" placeholder="Author" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.author} />
            <span style={{ color: "red" }}>{formik.touched.author && formik.errors.author ? formik.errors.author : null}</span>
            <br />
            <input type="number" className={(formik.touched.maxCount && formik.errors.maxCount) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"} name="maxCount" placeholder="Count" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maxCount} />
            <span style={{ color: "red" }}>{formik.touched.maxCount && formik.errors.maxCount ? formik.errors.maxCount : null}</span>
            <br />

            <textarea rows="3" cols="3" type="text" className={(formik.touched.description && formik.errors.description) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"} name="description" placeholder="Enter book's description" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} ></textarea>
            <span style={{ color: "red" }}>{formik.touched.description && formik.errors.description ? formik.errors.description : null}</span>
            <br />
            <div className="d-flex justify-content-center mt-2">
                <button type="submit" className="btn btn-primary">Add Book</button>
            </div>
        </form>



    </>)
}

export { AddBook }