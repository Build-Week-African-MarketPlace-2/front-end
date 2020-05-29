import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, NavLink, useHistory } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import { axiosWithAuth } from "./components/axiosWithAuth";
import axios from "axios";
import ProductList from "./components/productList";
import Panel from "./components/panel/panel";
import { ProductContext } from "./contexts/products";
import * as yup from 'yup';
import SignUp from './components/Form';
import Login from './components/Login';
import Card from './components/UserCard';
import BusinessLogin from './components/BusinessLogin';
import BusinessSignUp from './components/BusinessSignUp';


const url= 'https://african-market-place.herokuapp.com/api/users'

const initialFormValues = {
  name:'',
  email: '',
  username:'',
  password: '',
  termsOfService: false
}

const initialFormErrors = {
  name:'',
  email:'',
  username:'',
  password:'',
  termsOfService:''
}

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must have at least 2 characters')
    .required('Name is required!'),
  
  email: yup
    .string()
    .min(2, 'Email must have at least 7 characters')
    .required('Email is required!'),

  username: yup
    .string()
    .min(6, 'Username must have at least 6 characters')
    .required('Username is required!'),

  password: yup
    .string()
    .min(2, 'Password must have at least 5 characters')
    .required('Password is required!'),

  

    })

const initialFormDisabled = true;


function App() {

  const [user, setUser] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formDisabled, setFormDisabled] = useState(initialFormDisabled)


  const getUser = () => {
    axios.get(url)
    .then(function(res) {
      console.log(res);
      setUser([...user, res.data])
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  useEffect(() =>{
    getUser()
    }, [])

    let history = useHistory();

  const postUser = aUser => { 
    console.log("this is aUser", aUser)
    axios.post("https://african-market-place.herokuapp.com/api/auth/login", aUser)
      .then(res => {
        window.localStorage.setItem("token",JSON.stringify(res.data));
        window.localStorage.setItem("user", JSON.stringify(res.data));
        history.push('/products');
        setUser([res.data, ...user])
         
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setFormValues(initialFormValues)
    })
  } 

  useEffect(() =>{
  postUser()
  }, [])


  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => { 
        setFormDisabled(!valid)
      })
  }, [formValues])


  const onSubmit = evt => {
    evt.preventDefault()

    console.log('Your form was successfully submitted!')

  const newUser = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
    username: formValues.username,
    password: formValues.password,
    termsOfService: Object.keys(formValues.termsOfService)
        .filter(termsOfService => formValues.termsOfService[termsOfService] ===true)
  }

  postUser(newUser)
  setFormValues(initialFormValues)
  setUser([...user, newUser])

  const userObjToString = JSON.stringify(newUser)
  console.log(userObjToString)

  const toJSONuser= JSON.parse(userObjToString);
  }
  
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
        ...formErrors,
        [name]: '',
        })
      })
      .catch(err => {
        setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
        })
      })
      setFormValues({
        ...formValues,
        [name]:value
      })
    }


    const onCheckBoxChange = evt => {
      const checked = evt.target.checked
      console.log(checked);
      setFormValues({
        ...formValues,
        termsOfService: checked
      })
    }


    let [listings, sListings] = useState([]);

    let GetListings = function()
    {
      axiosWithAuth().get("/").then((response)=>
      {
        sListings(response.data);
      }).catch((error)=>
      {
        console.log(error);
      })
    }
  
    let DeleteItem = function(id)
    {
      axiosWithAuth().delete(`//${id}`).then((response)=>
      {
        sListings(listings.filter((e)=>{return e.id !== id}));
      }).catch((error)=>
      {
        console.log(error);
      })
    }
  
    let UpdateItem = function(data)
    {
      axiosWithAuth().put(`//${data.id}`, data).then((response)=>
      {
        sListings(listings.map((e)=>{return e.id === data.id ? data : e;}))
      }).catch((error)=>
      {
        console.log(error);
      })
    }




    return (
      <div>
      
        <h1>African Marketplace</h1>

        <ul>
         
        <li>
        <NavLink to='/signup'>Sign Up</NavLink>
        </li>
        <li>
        <NavLink to='/login'>Log In</NavLink>
        </li>
        <li>
        <NavLink to='/businesslogin'> Business Log In</NavLink>
        </li>
        <li>
        <NavLink to='businesssignup'>Business Sign Up</NavLink>
        </li>
        </ul>

        <Switch>

        <Route path="/signup">
          <SignUp
            values = {formValues}
            onInputChange = {onInputChange}
            onCheckBoxChange = {onCheckBoxChange}
            onSubmit = {onSubmit}
            disabled = {formDisabled}
            errors ={formErrors}
          />
        </Route>


      <Route path='/login'>
        <Login 
          values = {formValues}
          onInputChange = {onInputChange}
          onCheckBoxChange = {onCheckBoxChange}
          onSubmit = {onSubmit}
          disabled = {formDisabled}
          errors ={formErrors}
        />
      </Route>

      <Route path='/businesslogin'>
        <BusinessLogin 
          values = {formValues}
          onInputChange = {onInputChange}
          onCheckBoxChange = {onCheckBoxChange}
          onSubmit = {onSubmit}
          disabled = {formDisabled}
          errors ={formErrors}
        />
      </Route>

      <Route path='/businesssignup' component={Login}>
        <BusinessSignUp 
          values = {formValues}
          onInputChange = {onInputChange}
          onCheckboxChange = {onCheckBoxChange}
          onSubmit = {onSubmit}
          disabled = {formDisabled}
          errors ={formErrors}
        />
      </Route>


      </Switch>
      <ProductContext.Provider value={{listings:listings, getListings:GetListings, deleteItem:DeleteItem, updateItem:UpdateItem}}>
        <Switch>
          <PrivateRoute path="/products/:id?" component={ProductList} type="1" />
          <PrivateRoute path="/panel" component={Panel} type="2" />
        </Switch>
      </ProductContext.Provider>
      
    {/* {
        user.map((aUser) => {
          return (
            <Card key={aUser.id} details={aUser} />
          )
        })
      } */}
   
      </div>
  );
}

export default App;



