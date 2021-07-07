import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const Forms = ({ values, errors, touched, status}) => {

        const [user, setUser]=useState([]);

        useEffect(() =>{
            status && setUser (user => [...user, status]);
        }, [status]);


    return(
        <div >
            <Form className="forms">
                <label  htmlFor='name'>Name </label>
                <Field id='name' type='text' name='name' placeholder='Enter Name...'/>
                    {touched.name && errors.name &&(<p>{errors.name}</p>)}
<br/>
                <label  htmlFor='email'>Email </label>
                <Field id='email' type='text' name='email' placeholder='Enter Email...'/>
<br/>
                <label className='passL' htmlFor='password'>Password</label>
                <Field className= 'passF' id='password' type='password' name='password' placeholder='Enter a password...'/>
                    {touched.password && errors.password &&(<p>{errors.password}</p>)}
<br/>
                <label htmlFor='tos'> Terms of Service</label>
                <Field  id='tos' type='checkbox' name='tos' checked={values.tos}/>
                
                
<br/>
                <button type='submit'>Submit</button>

                </Form>

                    {user.map(users =>{
                        return(
                            <div className='card' key={users.id}>
                                <h1>Name: {users.name}</h1>
                                <p>Email: {users.email}</p>
                            </div>
                        )
                    })}
        </div>
    );
};



const FormikForm = withFormik({
    mapPropsToValues(props){
        return{
            name: props.name || '',
            email: props.email ||'',
            password: props.password || '',
            tos: props.tos || false,      
         };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Yo Who Are You?'),
        password: Yup.string().required('Password is Mandatory'),
    }),

    handleSubmit(values, {setStatus, resetForm}){
        axios
        .post('https://reqres.in/api/users/', values)
        .then(data =>{
            console.log('Great Success', data)
            setStatus(data.data);
            resetForm();
        })
        .catch(err => console.log('Bad Failure', err.response))
    }
})(Forms);

export default FormikForm