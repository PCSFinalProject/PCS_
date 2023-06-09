import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Flex, Box, Card, Heading, Text, Form, Field, Button, Loader ,Table, } from 'rimble-ui';

import qs from 'qs';
import axios from 'axios';
import mockData from '../../data/initialShipAgencyData.json'
import api from '../../service/api';
import UserData from '../../components/UserData';
import { setUserData } from '../../functions/setUserData';
import { Tab, Nav } from 'react-bootstrap';
const CustomOfficer = () => {

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
    const [activeTab, setActiveTab] = useState(0);
    const [importClearenceData, setImportClearenceData] = useState([]);
    const [exportClearenceData, setExportClearenceData] = useState([]);
    

    const handleCustomSubmitImportClearenceAccept = async(rowData) => {
        await axios.post(`http://localhost:5000/customOfficer/approveImport`, {
           ...rowData,
            portId:clientData[4].value,
         
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    })

    };
    const handleCustomSubmitImportClearenceReject = async(rowData) => {
        await axios.post(`http://localhost:5000/customOfficer/rejectImport`, {
              ...rowData,
            portId:clientData[4].value,
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    };
    const handleCustomSubmitExportClearenceAccept = async(rowData) => {
        await axios.post(`http://localhost:5000/customOfficer/approveExport`, {
              ...rowData,
                portId:clientData[4].value,
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    };
    const handleCustomSubmitExportClearenceReject = async(rowData) => {
        await axios.post(`http://localhost:5000/customOfficer/rejectExport`, {
                ...rowData,
              
                portId:clientData[4].value,
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    };

    function handleChooseFiApprove(e) {
        setFiIdApprove(e.target.value.toUpperCase());
    };

   

// Import Clearence Tab
    const [data,setData] = useState(mockData);
    function handleChooseFiRemove(e) {
        setFiIdRemove(e.target.value.toUpperCase());
    };

    // this is for tab
    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
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
        const fetchData = async () => {
          try {
            // Make the appropriate API request based on the activeTab value
            let response=null;
           if (activeTab === 'tab2') {
               response = await axios.get(`http://localhost:5000/customOfficer/ImportClearance/${clientData[4].value}/IMPORT`);
              setImportClearenceData(mockData)
            //   response1 = await api.get('http://localhost:5000/fi/getAllPorts');
            } else if (activeTab === 'tab3') {
              response = await axios.get(`http://localhost:5000/customOfficer/ExportClearance/${clientData[4].value}/EXPORT`);
            }
    
            // Process the response data
            if (response && response.status === 200) {
              const responseData = response.data;
              // Update the necessary state variables with the response data
              // ...
              if(activeTab === 'tab2'){
                setImportClearenceData(responseData);
                
                
                }else if(activeTab === 'tab3'){
                    setExportClearenceData(responseData);
                }
            } else {
              console.log('Oopps... something went wrong, status code ' + response?.status);
            }
          } catch (error) {
            console.log('Oopps... something went wrong');
            console.log(error);
          }
        };
        if(activeTab === 'tab2' || activeTab === 'tab3')
        fetchData();
      }, [activeTab,cookies,fiIdApprove]);




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
                        <Button variant="warning" onClick={handleClickLogout}>Logout</Button>
                    </Box>
                </Flex>
                <Card>
                    <Heading as={'h2'}>Custom Agengy Data</Heading>
                    <UserData userData={clientData} />
                </Card>

<Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="tab1">Manage Port</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab2">Import Clearence</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab3">Export Clearence</Nav.Link>
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
                                <Button variant="danger" type="submit" disabled={isLoadingRemove}>
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
        <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Cargo</th>
          <th>Destination</th>
            <th>country</th>
          <th>Action</th>
          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
        {importClearenceData.map((rowData) => (
          <tr key={rowData.id}>
            <td>{rowData.id}</td>
            <td>{rowData.name}</td>
            <td>{rowData.cargo}</td>
            <td>{rowData.destination}</td>
            <td>{rowData.country}</td>
            <td>
            <Button variant="success" onClick={() => handleCustomSubmitImportClearenceAccept(rowData)}>Accept</Button>
            </td>
            <td>
            <Button variant="danger" onClick={() => handleCustomSubmitImportClearenceReject(rowData)}>Reject</Button>

            </td>
          </tr>
        ))}
      </tbody>
    </Table>
        </Tab.Pane >
        <Tab.Pane eventKey="tab3">
        <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Cargo</th>
          <th>Destination</th>
            <th>country</th>
          <th>Accept</th>
          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
        {exportClearenceData.map((rowData) => (
          <tr key={rowData.id}>
            <td>{rowData.id}</td>
            <td>{rowData.name}</td>
            <td>{rowData.cargo}</td>
            <td>{rowData.destination}</td>
            <td>{rowData.country}</td>
            <td>
            <Button variant="success" onClick={() => handleCustomSubmitExportClearenceAccept(rowData)}>Accept</Button>
            </td>
            <td>
            <Button variant ="danger" onClick={() => handleCustomSubmitExportClearenceReject(rowData)}>Reject</Button>

            </td>
          </tr>
        ))}
      </tbody>
    </Table>
        </Tab.Pane>
       


      </Tab.Content>
    </Tab.Container>
            </Box>
        </Flex>
    );
}

export default CustomOfficer;