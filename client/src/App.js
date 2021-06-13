import "./App.css";
import { useState } from "react";
import Axios from "axios"; 



function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [semester, setSemester] = useState("");

  const [userlist, setUserList] = useState([]);

  const [newpass,setnewpass] = useState("");


  const [nameerr,setNameErr] = useState("");
  const [passerr,setpassErr] = useState("");
  const [emailerr,setemailErr] = useState("");


  //fucntion for inserting data into database
  const addUser = () => {
    var letters = /^[A-Za-z]+$/;
    var em = /^\S+@+\S+$/i;
    if (name.length <= 25 && name.match(letters) && password.length > 12 && email.match(em)){
        Axios.post("http://localhost:3002/insert", {
          name: name,
          password: password,
          email: email,
          gender: gender,
          semester: semester,
      }).then(() => {
        console.log("success");
      });

  }else{
    if (name.length == 0 || name.length > 25){
       setNameErr("Please Enter your Name OR Your Limit is exceeded")
    }else if(password.length < 12){
        setpassErr("Password limit doesnot meet");
    }else{
      if (!email.match(em)){
        setemailErr("EMail is not valid")
      }
    }


  }

    
  };

  //function for getting
  const getUser = () => {
    Axios.get("http://localhost:3002/get_user").then((response) => {
      setUserList(response.data);
    });
  };
 // function for updating
  const updateuser = (id) => {
    Axios.put("http://localhost:3002/update",{
      password:newpass,
      id:id
    }).then((response) => {
      setUserList(userlist.map((val) => {
        return val.user_id === id ? {id:val.id,name:val.name,password:newpass,email:val.email,gender:val.gender,semester:val.semester} : val
      }))
    })
  }

// function for deleting

  const deleteuser = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
      setUserList(
        userlist.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  

  return (
    <div className="App">
      <div className="information">
        <h1>Registration Form</h1>
        <label>Name:</label>
        <input type="text" onChange={(event) => { setName(event.target.value);}}/>
        <p style={{color:'red'}} >{nameerr}</p>
        <label>Password:</label>
        <input type="text" onChange={(event) => { setPassword(event.target.value);}}/>
        <p style={{color:'red'}} >{passerr}</p>
        <label>Email:</label>
        <input type="text" onChange={(event) => { setEmail(event.target.value);}}/>
        <p style={{color:'red'}} >{emailerr}</p>
        <label>Male:</label>
        <input type="radio" name="gender" value="Male" onChange={(event) => {setGender(event.target.value);}} />
        <label>Female:</label>
        <input type="radio" name="gender" value="Female" onChange={(event) => {setGender(event.target.value);}} />
        <label>Semester:</label>

        <select id="Semesters"  onChange={(event) => { setSemester(event.target.value);}} >
              <option value="semester1">Semester 1</option>
              <option value="semester2">Semester 2</option>
              <option value="semester3">Semester 3</option>
              <option value="semester4">Semester 4</option>
              <option value="semester5">Semester 5</option>
              <option value="semester6">Semester 6</option>
              <option value="semester7">Semester 7</option>
              <option value="semester8">Semester 8</option>
        </select>

        <button onClick={addUser}>Register</button>
      </div>



      <div className="employees">
        <button onClick={getUser}>Show Users</button>

        {userlist.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>ID : {val.user_id}</h3> 
                <h3>Name: {val.name}</h3>
                <h3>Password: {val.password}</h3>
                <h3>Email: {val.email}</h3>
                <h3>Gender: {val.gender}</h3>
                <h3>Semester: {val.semester}</h3>
              </div>
              
              <div>
                <input type='text' name='password' placeholder="Enter your new password" onChange={(event) => {setnewpass(event.target.value)}} ></input>
                <button onClick={() => updateuser(val.user_id)}>Update</button>

                <button onClick={() => deleteuser(val.user_id)}>Delete</button>
              </div>
              
                
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App