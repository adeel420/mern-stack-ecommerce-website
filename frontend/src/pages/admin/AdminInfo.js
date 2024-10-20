import React, {useState, useEffect} from 'react'

function AdminInfo() {
    const [loginName, setLoginName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

  const token = localStorage.getItem('token');
  
  const fetchName = async () => {
    try {
      const url = "http://localhost:8080/user/name";
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      setLoginName(result.name); 
      setEmail(result.email)
      setPhone(result.phone)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchName();
  }, []);
  return (
    <div className='adminInfo-cont'>
      <h2>Admin Details</h2>
      <ul>
        <h5>Name:<span>{loginName}</span></h5>
        <h5>Email:<span>{email}</span></h5>
        <h5>Phone-No:<span>{phone}</span></h5>
      </ul>
    </div>
  )
}

export default AdminInfo
