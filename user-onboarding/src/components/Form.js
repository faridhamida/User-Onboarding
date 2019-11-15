import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const OnBoard = ({ values, errors, touched, status, }) => {
    const [users, setUsers] = useState([]);
    const changeHandler = e => {
        setUsers({ ...users, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div>
            <Form>
                <Field type="text" name="name" placeholder="Name" onChange={changeHandler} />
                    
                <Field type="email" name="email" placeholder="Email" />
                    {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}

                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="errors">{errors.password}</p>
                )}

                <label>
                    Terms Of Service
                <Field type="checkbox" name="termsOfService" checked={values.termsOfService} />
                </label>

                <button>Submit!</button>
            </Form>

            {users.map(user => (
                <ul key="{user.id}">
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                    <li>Checkbox: {user.termsOfService}</li>
                </ul>
            ))}
        </div>
    );

};

const FormikOnBoard = withFormik({
    mapsPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || false
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required()
    }),
    handleSubmit(values, { setStatus }){
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log(err.response));
    }

})(OnBoard);

export default FormikOnBoard;