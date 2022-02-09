const apiUsers = 'http://localhost:3000/api/auth/users/';

const GetHeaders = (token, option) => {

  if (option === 'multipart') {
    return ({
      'Authorization': `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    });
  }

  return { 'Authorization': `Bearer ${token}` };
};



export { apiUsers, GetHeaders };