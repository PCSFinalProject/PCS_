import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import { Flex, Box, Card, Heading, Form, Field, Radio, Button, Loader } from 'rimble-ui'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import "./Login.css"
import qs from 'qs';


import api from '../../service/api';


const Login = () => {
   

 


    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const [validated, setValidated] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("client");
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index) => {
      setActiveTab(index);
    };

    function handleLogin(e) {
        setLogin(e.target.value);
    };

    function handlePassword(e) {
        setPassword(e.target.value);
    };

    function handleRadio(e) {
        setUserType(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
  
        setIsLoading(true);
     };

    const validateForm = useCallback(
        () => {
            if (
                login.length > 0 &&
                password.length > 5 &&
                userType.length > 0 &&
                !isLoading
            ) {
                setValidated(true);
                setSubmitDisabled(false);
            } else {
                setValidated(false);
                setSubmitDisabled(true);
            }
        },
        [login, password, userType, isLoading]
    );

    useEffect(() => {
        validateForm();
    }, [validateForm]);

    useEffect(() => {
        if (validated && isLoading) {
            try {
                api
                    .post(`/${userType}/login`, qs.stringify({ login, password, userType }))
                    .then(res => {
                        if (res.status === 200) {

                            removeCookie('userJWT');
                            removeCookie('ledgerId');
                            removeCookie('whoRegistered');
                            removeCookie('orgCredentials');

                            setCookie('userJWT', res.data.userJWT);
                            res.data.ledgerId && setCookie('ledgerId', res.data.ledgerId);
                            res.data.whoRegistered && setCookie('whoRegistered', res.data.whoRegistered);
                            res.data.orgCredentials && setCookie('orgCredentials', res.data.orgCredentials);
                            navigate(`/${userType}`);

                        } else {
                            console.log('Oopps... something wrong, status code ' + res.status);
                            return function cleanup() { }
                        }
                    })
                    .catch((err) => {
                        console.log('Oopps... something wrong');
                        console.log(err);
                        return function cleanup() { }
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } catch (error) {
                console.log('Oopps... something wrong');
                console.log(error);
                setIsLoading(false);
                return function cleanup() { }
            }
        }
    }, [login, password, userType, validated, isLoading, navigate, setCookie]);



    
      return (
        <div class="login_main">
            <div class ="Login_page" >
        <Form onSubmit={handleSubmit} >
          <h2 className="text-center">PCS</h2>
          <Form.Group controlId="input1">
            <Form.Label> UserName</Form.Label>
            <Form.Control type="text" placeholder="Enter UserName" value={login} onChange={handleLogin} />
          </Form.Group>
          <Form.Group controlId="input2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Enter Password" value={password} onChange={handlePassword} />
          </Form.Group>
          <Form.Group controlId="dropdown">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" value={userType} onChange={handleRadio}>
              <option value="">Select an option</option>
              <option value={"customOfficer"}>Custom Officer</option>
              <option value={"fi"}>Port Autority</option>
              <option value={"shipAgency"}>Ship Agency</option>
              <option value= {"trafficDept"}>Marine Department</option>
              <option value= {"cargoHandling"}>Ship Owner</option>
            </Form.Control>
          </Form.Group>
          
      <Button variant="primary"  type="submit"  disabled={submitDisabled} className ="mt-2 login_submit">
      {isLoading ? 'Loading…' : 'Submit'}
      </Button> 
        </Form>
        <p>
        Don't have an account?{' '}
        <Link to="/register">Create User</Link>
      </p>
        </div>
        </div>
      );
    }
    

    
    
 





export default Login;
