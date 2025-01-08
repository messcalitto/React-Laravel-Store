import React, { useState, useContext } from 'react'
import { login } from '../components/AxiosFunctions'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import ReactLoading from 'react-loading';

const Login = () => {
    
    const navigate = useNavigate();
    const { dataContext, setDataContext } = useContext(DataContext);

    const [values, setValues] = useState({
        username: '',
        password: '',
        error: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: values.username,
            password: values.password
        }
        
        setLoading(true);

        login(user).then(res => {
            // console.log(res);
            setLoading(false);

            if (res.username) {
                setDataContext({...dataContext, username:res.username});
                navigate(`/`)
            } else {
                setValues({ ...values, error: res.errors.message });
            }
        }).catch(err => {
            setLoading(false);
            setValues({ ...values, error: 'Connection error' });
        });
    }


    const onChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value, error: '' });
    }

    return (
        <div className="container">
            <div className="w-100">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">
                            Please sign in
                        </h1>
                        <div className='error-msg'>{values.error}</div>
                        <div className="form-group">
                            <label htmlFor="email">Username</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                name="username"
                                placeholder="Enter username"
                                value={values.username}
                                onChange={onChange('username')}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                required
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={onChange('password')}
                            />
                        </div>
                        {loading ? <ReactLoading type="spin" color="#00f" height={50} width={50} /> : 
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary btn-block"
                        >
                            Sign in
                        </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default Login
