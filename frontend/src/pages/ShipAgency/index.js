import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Flex, Box, Card, Heading, Text, Form,Field,Button, Loader, Select, Input } from 'rimble-ui'
   

import qs from 'qs';
import axios from 'axios';

import api from '../../service/api';
import UserData from '../../components/UserData';
import { setUserData } from '../../functions/setUserData';
import { Tab, Nav } from 'react-bootstrap';
import Fi from '../Fi';
const ShipAgency = () => {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const [clientData, setClientData] = useState([]);
    const [approvedFiList, setApprovedFiList] = useState([]);
    const [fiIdApprove, setFiIdApprove] = useState('');
    const [approvedMsg, setApprovedMsg] = useState('');
    const [isLoadingApprove, setIsLoadingApprove] = useState(false);
    const [fiIdRemove, setFiIdRemove] = useState('');
    const [removedMsg, setRemovedMsg] = useState('');
    const [isLoadingRemove, setIsLoadingRemove] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');
    const [selectedOptionShip, setSelectedOptionShip] = useState('');
      const [selectedOption, setSelectedOption] = useState('');
        const [selectedOptionShipExit, setSelectedOptionShipExit] = useState('');


      // This is Request Entry
      const handleRequestEntry = (event) => {
        event.preventDefault();
        console.log('Selected Option:', selectedOption);
        };


      const handleOptionChangePort = (event) => {
        setSelectedOption(event.target.value);
      };
      const handleOptionChangeShipEntry = (event) => {
        setSelectedOptionShip(event.target.value);
      };
    
      const handleOptionChangeRequestExit = (event) => {
          setSelectedOptionShipExit(event.target.value);
        };
        const handleRequestExist = (event) => {
            event.preventDefault();
            console.log('Selected Option:', selectedOptionShipExit);
            };

        
        const handleOptionChangeRequest = (event) => {
          setSelectedOption(event.target.value);
        };
     
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Perform form submission logic here
        console.log('Selected Option:', selectedOption);
      
    
        // Reset form fields
        setSelectedOption('');
      
      };


// this is for tab
    const handleTabSelect = (selectedTab) => {
      setActiveTab(selectedTab);
    };
    // This is Ship create Tab 
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        type: '',
        size: '',
        cargo: '',
        destination: '',
        status: '',
        berthId: '',
        customsCleared: false,
        unloading: false,
      });
    
      const handleInputChangeShip = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    



    // This Is old 
    function handleChooseFiApprove(e) {
        setFiIdApprove(e.target.value.toUpperCase());
    };

    function handleChooseFiRemove(e) {
        setFiIdRemove(e.target.value.toUpperCase());
    };

    useEffect(() => {
        try {
            axios.all([
                api.get('/client/getClientData'),
                api.get('/client/getApprovedFis')
            ])
                .then(axios.spread(
                    (clientData, approvedFis) => {
                        if (clientData.status === 200 && approvedFis.status === 200) {
                            clientData = clientData.data.clientData;
                            approvedFis = approvedFis.data.approvedFis;
                            setUserData(clientData, setClientData);
                            setApprovedFiList(approvedFis);
                        } else {
                            console.log('Oopps... something wrong, status code ' + clientData.status);
                            return function cleanup() { }
                        }
                    }))
                .catch((err) => {
                    console.log('Oopps... something wrong');
                    console.log(err);
                    return function cleanup() { }
                });
        } catch (error) {
            console.log('Oopps... something wrong');
            console.log(error);
            return function cleanup() { }
        }
    }, []);

    useEffect(() => {
        if (isLoadingApprove) {
            try {
                api
                    .post('/client/approve', qs.stringify({ fiId: fiIdApprove }))
                    .then(res => {
                        if (res.status === 200) {
                            setApprovedMsg(res.data.message);
                            const timer = setTimeout(() => {
                                setApprovedMsg('');
                            }, 5000);
                            setApprovedFiList((approvedFiList) => Array.from(new Set([...approvedFiList, fiIdApprove])));
                            return () => clearTimeout(timer);
                        } else {
                            console.log('Oopps... something wrong, status code ' + res.status);
                            return function cleanup() { }
                        }
                    })
                    .catch((err) => {
                        console.log('Oopps... something wrong1');
                        console.log(err);
                        return function cleanup() { }
                    })
                    .finally(() => {
                        setIsLoadingApprove(false);
                        setFiIdApprove('');
                    });
            } catch (error) {
                console.log('Oopps... something wrong2');
                console.log(error);
                setIsLoadingApprove(false);
                return function cleanup() { }
            }
        }
    }, [isLoadingApprove, fiIdRemove]);

    useEffect(() => {
        if (isLoadingRemove) {
            try {
                api
                    .post('/client/remove', qs.stringify({ fiId: fiIdRemove }))
                    .then(res => {
                        if (res.status === 200) {
                            setRemovedMsg(res.data.message);
                            const timer = setTimeout(() => {
                                setRemovedMsg('');
                            }, 5000);
                            setApprovedFiList((approvedFiList) => approvedFiList.filter(item => item !== fiIdRemove));
                            return () => clearTimeout(timer);
                        } else if (res.status === 202) {
                            setRemovedMsg(res.data.message);
                            const timer = setTimeout(() => {
                                setRemovedMsg('');
                            }, 5000);
                            return () => clearTimeout(timer);
                        } else {
                            console.log('Oopps... something wrong, status code ' + res.status);
                            return function cleanup() { }
                        }
                    })
                    .catch((err) => {
                        console.log('Oopps... something wrong1');
                        console.log(err);
                        return function cleanup() { }
                    })
                    .finally(() => {
                        setIsLoadingRemove(false);
                        setFiIdRemove('');
                    });
            } catch (error) {
                console.log('Oopps... something wrong2');
                console.log(error);
                setIsLoadingRemove(false);
                return function cleanup() { }
            }
        }
    }, [isLoadingRemove, fiIdRemove]);

    const handleSubmitApprove = e => {
        e.preventDefault();

        if (approvedFiList.includes(fiIdApprove)) {
            setApprovedMsg(`${fiIdApprove} already approved`);
            setTimeout(() => {
                setApprovedMsg('');
            }, 5000);
            setFiIdApprove('');
        } else {
            setIsLoadingApprove(true);
            setApprovedMsg('');
        }
    };

    const handleSubmitRemove = e => {
        e.preventDefault();

        if (!approvedFiList.includes(fiIdRemove)) {
            setRemovedMsg(`${fiIdRemove} is not approved`);
            setTimeout(() => {
                setRemovedMsg('');
            }, 5000);
            setFiIdRemove('');
        } else {
            setIsLoadingRemove(true);
            setRemovedMsg('');
        }
    };

    function handleClickLogout() {
        removeCookie('userJWT');
        removeCookie('ledgerId');
        removeCookie('whoRegistered');
        removeCookie('orgCredentials');
    navigate('/login');
    }

    return (
        <Flex minWidth={380}>
            <Box mx={'auto'} width={[1, 10 / 12]}>
                <Flex px={2} mx={'auto'} justifyContent='space-between'>
                    <Box my={'auto'}>
                        <Heading as={'h1'} color='primary'>PCS</Heading>
                    </Box>
                    <Box my={'auto'}>
                        <Button onClick={handleClickLogout}>Logout</Button>
                    </Box>
                </Flex>
                <Card>
                    <Heading as={'h2'}>Ship Agency Data</Heading>
                    <UserData userData={clientData} />
                </Card>

                <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="tab1">Manage Port</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab2">SHIPMENT CREATION</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab3">Request Entry</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="tab4">Request Exist</Nav.Link>
            </Nav.Item>
        </Nav>  
      <Tab.Content>
        <Tab.Pane eventKey="tab1">
                <Card mt={20}>
                    <Flex my={1}>
                        <Box ml={10} my={1}>
                            {approvedFiList.length > 0 ?
                                <Heading as={'h3'} my={'auto'}>You are approved by following Port Authority:</Heading>
                                :
                                <Heading as={'h3'} my={'auto'}>You have not approved by any Port Authority</Heading>
                            }
                        </Box>
                        <Box ml={10} my={1}>
                            {approvedFiList.join(', ')}
                        </Box>
                    </Flex>
                </Card>
                <Card mt={20}>
                    <Heading as={'h2'}>Join Port Authority(get approved)</Heading>
                    <Form onSubmit={handleSubmitApprove}>
                        <Flex mx={-3}>
                            <Box width={1} px={3}>
                                <Field label="Port Authority ID" width={1}>
                                    <Form.Input
                                        type="text"
                                        required
                                        onChange={handleChooseFiApprove}
                                        value={fiIdApprove}
                                        width={1}
                                    />
                                </Field>
                            </Box>
                        </Flex>
                        <Flex mx={-3} alignItems={'center'}>
                            <Box px={3}>
                                <Button type="submit" disabled={isLoadingApprove}>
                                    {isLoadingApprove ? <Loader color="white" /> : <p>Get Approved</p>}
                                </Button>
                            </Box>
                            {approvedMsg &&
                                <Box px={3}>
                                    <Text>{approvedMsg}</Text>
                                </Box>
                            }
                        </Flex>
                    </Form>
                </Card>
                <Card mt={20}>
                    <Heading as={'h2'}>Remove Port Authority approval</Heading>
                    <Form onSubmit={handleSubmitRemove}>
                        <Flex mx={-3}>
                            <Box width={1} px={3}>
                                <Field label="Port Authority ID" width={1}>
                                    <Form.Input
                                        type="text"
                                        required
                                        onChange={handleChooseFiRemove}
                                        value={fiIdRemove}
                                        width={1}
                                    />
                                </Field>
                            </Box>
                        </Flex>
                        <Flex mx={-3} alignItems={'center'}>
                            <Box px={3}>
                                <Button type="submit" disabled={isLoadingRemove}>
                                    {isLoadingRemove ? <Loader color="white" /> : <p>Remove</p>}
                                </Button>
                            </Box>
                            {removedMsg &&
                                <Box px={3}>
                                    <Text>{removedMsg}</Text>
                                </Box>
                            }
                        </Flex>
                    </Form>
                </Card>
                </Tab.Pane>
        <Tab.Pane eventKey="tab2">
        <Form onSubmit={handleSubmit}>
    <Flex flexWrap="wrap">
        <Field label=" SHIP ID" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="id" value={formData.id} onChange={handleInputChangeShip} required />
      </Field>
      <Field label="Name" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="name" value={formData.name} onChange={handleInputChangeShip} required />
      </Field>
      <Field label="Type" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="type" value={formData.type} onChange={handleInputChangeShip} required/>
      </Field>
      <Field label="Size" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="size" value={formData.size} onChange={handleInputChangeShip} required/>
      </Field>
      <Field label="Cargo" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="cargo" value={formData.cargo} onChange={handleInputChangeShip} required/>
      </Field>
      <Field label="Destination" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="destination" value={formData.destination} onChange={handleInputChangeShip}required/>
      </Field>
    
      </Flex>
      <Flex justifyContent="flex-end" mt={3}>
        <Button type="submit">Submit</Button>
      </Flex>
    </Form>
        </Tab.Pane >
        <Tab.Pane eventKey="tab3">
        <Form onSubmit={handleRequestEntry}>
        <Field label="Port" width={1}>
        <Select value={selectedOption} onChange={handleOptionChangePort} required>
          <option value="">Select an option</option>
          <option value="option1">Port 1</option>
          <option value="option2"> Port 2</option>
          <option value="option3">Port 3</option>
        </Select>
      </Field>
      <Field label="Ship" width={1}>
        <Select value={selectedOption} onChange={handleOptionChangeShipEntry} required>
            <option value="">Select an option</option>
            <option value="option1">Ship 1</option>
            <option value="option2">Ship 2</option>
            <option value="option3">Ship 3</option>
        </Select>
        </Field>
        
      <Flex justifyContent="centre" mt={3}>
        <Button type="submit">Request</Button>
      </Flex>
            </Form>
        </Tab.Pane>
        <Tab.Pane eventKey="tab4">
        <Form onSubmit={handleRequestExist}>
        <Field label="Ship" width={1}>
        <Select value={selectedOption} onChange={handleOptionChangeRequestExit} required>
            <option value="">Select an option</option>
            <option value="option1">Ship 1</option>
            <option value="option2">Ship 2</option>
            <option value="option3">Ship 3</option>
        </Select>
        </Field>
         <Flex justifyContent="centre" mt={4}>
        <Button type="submit">Request</Button>
      </Flex>
        </Form>
        </Tab.Pane>


      </Tab.Content>
    </Tab.Container>
            </Box>
        </Flex>
    );
}

export default ShipAgency;