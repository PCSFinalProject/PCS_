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
        const [shipListEntry, setShipListEntry] = useState([]);
        const [shipListExit, setShipListExit] = useState([]);
        const [portId, setPortId] = useState('');
        const [portList, setPortList] = useState([]);

        const [formData, setFormData] = useState({
            id: '',
            name: '',
            type: '',
            capacity: 0,
            cargo: '',
            destination: '',
            status: '',
            berthId: '',
            customsCleared: false,
            unloading: false,
            country: '',
            portId: '',
          });
          const handleInputChangeShip = (event) => {
            const { name, value } = event.target;
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: value,
            }));
            console.log(formData,"forData");
          };

      // This is Request Entry
      const handleRequestEntry = async (event) => {
        
          console.log('Selected Option:', selectedOption);
            await axios.post('http://localhost:5000/shipAgency/request/entry', qs.stringify({
                shipId: selectedOptionShip,
                shipAgencyId: cookies.ledgerId,
                portId: selectedOption,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then((response) => {
                console.log(response);
                if (response.data.message) {
                    setApprovedMsg(response.data.message);
                }
            }).catch((error) => {
                console.log(error);
            });


        event.preventDefault();
        };


      const handleOptionChangePort = (event) => {
        setSelectedOption(event.target.value);
      };
      const handleOptionChangeShipEntry = (event) => {
        setSelectedOptionShip(event.target.value);
        console.log(event.target.value);
      };
    
      const handleOptionChangeRequestExit = async(event) => {
        console.log(event.target.value);
        setSelectedOptionShipExit(event.target.value);
     

         
        };
        const handleRequestExist = async(event) => {
            console.log('Selected Option:', selectedOptionShipExit);
        
            await api.post('/shipAgency/request/exit', qs.stringify({
                shipId: selectedOptionShipExit,
          }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                setApprovedMsg(response.data.message);
            } else {
                setApprovedMsg('Error');
            }
        }).catch((error) => {
            console.log(error);
            setApprovedMsg('Error');
        });
        event.preventDefault();
            };

        
        const handleOptionChangeRequest = (event) => {
          setSelectedOption(event.target.value);
        };
     
    
      const handleSubmit = async () => {
   
        console.log("formData",formData);
        formData.shipAgencyId = cookies.ledgerId;
        // Perform form submission logic here
        console.log('Selected Option:', selectedOption);
         api.post('/shipAgency/create/ship', qs.stringify({
            ...formData})).then((response) => {
            console.log(response);
            if (response.data) {
                console.log();
            } else {
               
                console.log();
            }
        }).catch((error) => {
            console.log(error);
        });
        // event.preventDefault();

      
    
        // // Reset form fields
        // setSelectedOption('');
      
      };


// this is for tab
    const handleTabSelect = (selectedTab) => {
      setActiveTab(selectedTab);
    };
    // This is Ship create Tab 
  
    



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
                            console.log(clientData,"clientData");
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
        const fetchData = async () => {
          try {
            // Make the appropriate API request based on the activeTab value
            let response=null,response1=null;
            if (activeTab === 'tab1') {
          
            } else if (activeTab === 'tab2') {
             
            } else if (activeTab === 'tab3') {
              response = await axios.get(`http://localhost:5000/shipAgency/entry/requests/${cookies.ledgerId}`);
            //   response1 = await api.get('http://localhost:5000/fi/getAllPorts');
            } else if (activeTab === 'tab4') {
              response = await axios.get(`http://localhost:5000/shipAgency/exit/requests/${cookies.ledgerId}`);
            }
    
            // Process the response data
            if (response && response.status === 200) {
              const responseData = response.data;
              // Update the necessary state variables with the response data
              // ...
              if(activeTab === 'tab3'){
                setShipListEntry(responseData);
                if(response1 && response1.status === 200){
                    const responseData1 = response1.data;
                    setPortList(responseData1);
                }
                }else if(activeTab === 'tab4'){
                    setShipListExit(responseData);
                }
            } else {
              console.log('Oopps... something went wrong, status code ' + response?.status);
            }
          } catch (error) {
            console.log('Oopps... something went wrong');
            console.log(error);
          }
        };
    
        fetchData();
      }, [activeTab]);



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

                <Tab.Container activeKey={activeTab} defaultActiveKey={activeTab} onSelect={handleTabSelect}>
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
       
    <Flex flexWrap="wrap">
      <Field label="Name" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="name" value={formData.name} onChange={handleInputChangeShip} required />
      </Field>
        <Field label=" COUNTRY" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="country" value={formData.country} onChange={handleInputChangeShip} required />
      </Field>
      <Field label="Type" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="type" value={formData.type} onChange={handleInputChangeShip} required/>
      </Field>
      <Field label="capacity" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="capacity" value={formData.capacity} type ="number" onChange={handleInputChangeShip} required/>
      </Field>
      <Field label="captain" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="captain" value={formData.size} onChange={handleInputChangeShip} required/>
      </Field>
      <Field label="Cargo" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="cargo" value={formData.cargo} onChange={handleInputChangeShip} required/>
      </Field>
      <Field label="Destination" width={[1, 1/2]} pr={[0, 2]}>
        <Input name="destination" value={formData.destination} onChange={handleInputChangeShip}required/>
      </Field>
    
      </Flex>
      <Flex justifyContent="flex-end" mt={3}>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </Flex>
   
        </Tab.Pane >
        <Tab.Pane eventKey="tab3">
      
        <Field label="Port" width={1}>
        <Select value={selectedOption} onChange={handleOptionChangePort} required>
          <option value="">Select an option</option>
          {approvedFiList.map((fi) => (
            <option value={fi}>{fi}</option>
            ))}
        </Select>
      </Field>
      <Field label="Ship" width={1}>
        <Select value={selectedOptionShip} onChange={handleOptionChangeShipEntry} required>
            <option value="">Select an option</option>
            {shipListEntry.map((ship) => (
                <option value={ship.shipId}>{ship.name}</option>
            ))}
         
        </Select>
        </Field>
        
      <Flex justifyContent="centre" mt={3}>
        <Button type="submit" onClick={handleRequestEntry}>Request</Button>
      </Flex>
         
        </Tab.Pane>
        <Tab.Pane eventKey="tab4">
 
        <Field label="Ship" width={1}>
        <Select value={selectedOptionShipExit} onChange={handleOptionChangeRequestExit} required>
            <option value="">Select an option</option>
            {shipListExit.map((ship) => (
                <option value={ship.shipId}>{ship.name}</option>
            ))}
        </Select>
        </Field>
         <Flex justifyContent="centre" mt={4}>
        <Button type="submit" onClick={handleRequestExist}>Request</Button>
      </Flex>

        </Tab.Pane>


      </Tab.Content>
    </Tab.Container>
            </Box>
        </Flex>
    );
}

export default ShipAgency;