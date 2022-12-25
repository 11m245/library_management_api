import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function EditBook() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [book, setBook] = useState({});

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


    const formValidationSchema = yup.object({
        isbn: yup.string().required("isbn of book is mandatory "),
        name: yup.string().required(),
        author: yup.string().required(),
        maxCount: yup.number().required(),
        description: yup.string()
    })

    const formik = useFormik({
        initialValues: book,
        onSubmit: (values) => { updateBook(values) },
        validationSchema: formValidationSchema,
        enableReinitialize: true
    });

    // console.log("book is", formik.values)
    function updateBook(book) {


        const checkResponse = (response) => {
            if (response.status === 200) {
                return response;
            } else {
                throw (` ${response.status} ${response.statusText}`)
            }
        }

        const putBook = () => {
            fetch(`https://63899fdd4eccb986e895a955.mockapi.io/books/${id}`,
                { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(book) })
                .then(response => checkResponse(response)).then(data => navigate("/librarian/books")).catch(err => console.log(err));
        }

        putBook(book);

    }



    return (<>
        <h2>edit page {id}</h2>

        <form onSubmit={formik.handleSubmit} className="row form-container">
            <h4 className="form-title text-center">Edit Book Form</h4>

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
                <button type="submit" className="btn btn-warning">Update</button>
            </div>
        </form>
    </>)
}

export { EditBook }