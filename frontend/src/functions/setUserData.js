export function setUserData(userData, setData) {
    userData = [
        { label: 'Name', value: userData.name },
        { label: 'Address', value: userData.address },
        { label: 'Date of Joining', value: userData.dateOfJoining },
        { label: 'Id Number', value: userData.idNumber },
        { label: 'Who Registered', value: userData.whoRegistered && userData.whoRegistered.ledgerUser }
    ];
    userData = userData.filter(item => item.value);
    setData(userData);
}
