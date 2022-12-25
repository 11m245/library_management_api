import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function DeleteUser() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [user, setUser] = useState({});

    const checkResponse = (response) => {
        if ((response.status <= 299) && (response.status > 199)) {
            return response;
        } else {
            throw (` ${response.status} ${response.statusText}`)
        }
    }

    const getUser = () => {
        fetch(`https://63899fdd4eccb986e895a955.mockapi.io/users/${id}`, { method: "GET" })
            .then(response => checkResponse(response))
            .then(response => response.json()).then(data => { setUser(data) })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUser();
    }, [])


    const formValidationSchema = yup.object({
        userId: yup.string().required("User Id is mandatory "),
        name: yup.string().required(),
        mobile: yup.string().required(),
        email: yup.string().required()
    })

    const formik = useFormik({
        initialValues: user,
        onSubmit: (values) => { deleteUser() },
        validationSchema: formValidationSchema,
        enableReinitialize: true
    });


    function deleteUser() {


        const checkResponse = (response) => {
            if (response.status === 200) {
                return response;
            } else {
                throw (` ${response.status} ${response.statusText}`)
            }
        }

        const delUser = () => {
            fetch(`https://63899fdd4eccb986e895a955.mockapi.io/users/${id}`,
                { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) })
                .then(response => checkResponse(response)).then(data => navigate("/librarian/users")).catch(err => console.log(err));
        }

        delUser(user);

    }



    return (<>
        <h2>edit user page {id}</h2>

        <form onSubmit={formik.handleSubmit} className="row form-container">
            <h4 className="form-title text-center">Edit User Form</h4>

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
            <span style={{ color: "red" }}>{formik.touched.author && formik.errors.author ? formik.errors.author : null}</span>
            <br />
            <input type="email" className={(formik.touched.email && formik.errors.email) ? "mt-2 form-control is-invalid" : "mt-2 form-control is-valid"} name="email" placeholder="Count" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
            <span style={{ color: "red" }}>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
            <br />

            <div className="d-flex justify-content-center mt-2">
                <button type="submit" className="btn btn-danger">Delete user</button>
            </div>
        </form>
    </>)
}

export { DeleteUser }