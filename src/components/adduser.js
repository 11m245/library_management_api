import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function AddUser() {

    const navigate = useNavigate();


    const [user, setUser] = useState({});


    const formValidationSchema = yup.object({
        userId: yup.string().required("User Id is mandatory ").min(4),
        name: yup.string().required().min(4),
        mobile: yup.string().required().min(6),
        email: yup.string().required().min(10)
    })

    const formik = useFormik({
        initialValues: user,
        onSubmit: (values) => { addUser(values) },
        validationSchema: formValidationSchema,
        enableReinitialize: true
    });


    function addUser(user) {


        const checkResponse = (response) => {
            if (response.status === 201) {
                return response;
            } else {
                throw (` ${response.status} ${response.statusText}`)
            }
        }

        const postUser = () => {
            fetch(`https://63899fdd4eccb986e895a955.mockapi.io/users`,
                { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) })
                .then(response => checkResponse(response)).then(data => navigate("/librarian/users")).catch(err => console.log(err));
        }

        postUser(user);

    }



    return (<>
        <h2>Add user page </h2>

        <form onSubmit={formik.handleSubmit} className="row form-container">
            <h4 className="form-title text-center">Add User Form</h4>

            <input
                type="text"
                className={(formik.touched.isbn && formik.errors.isbn) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"}
                name="userId"
                placeholder="Enter User ID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userId}
            />
            <span style={{ color: "red" }}>{(formik.touched.userId && formik.errors.userId) ? formik.errors.userId : null}</span>
            <br />
            <input type="text" name="name" className={(formik.touched.name && formik.errors.name) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"} placeholder="Enter Book Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
            <span style={{ color: "red" }}>{formik.touched.name && formik.errors.name ? formik.errors.name : null}</span>
            <br />
            <input type="text" className={(formik.touched.mobile && formik.errors.mobile) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"} name="mobile" placeholder="mobile" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
            <span style={{ color: "red" }}>{formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : null}</span>
            <br />
            <input type="email" className={(formik.touched.email && formik.errors.email) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"} name="email" placeholder="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
            <span style={{ color: "red" }}>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
            <br />

            <div className="d-flex justify-content-center mt-2">
                <button type="submit" className="btn btn-success">Add user</button>
            </div>
        </form>
    </>)
}

export { AddUser }