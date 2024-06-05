import '../App.css';
// import '../Form.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Registration = () =>{

  const navigate = useNavigate();
  
    const [passwordType, setPasswordType] = useState("password");
    const [type, setType] = useState("");


    const validationSchema = Yup.object().shape({
      // registerUsername: Yup.string().required('Fullname is required'),
        registerUsername: Yup.string()
          .required('Username is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
        //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
          ,
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
      });

      const loginValidationSchema = Yup.object().shape({
        // registerUsername: Yup.string().required('Fullname is required'),
          loginEmail: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
          loginPassword: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        });

    const {
      register,
      handleSubmit,
      getValues,
      reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onChange" });

  const {
    register : login,
    handleSubmit : handleLoginSubmit,
    getValues : loginGetValues,
    formState: { errors : loginErrors, isValid : loginIsValid },
} = useForm({ resolver: yupResolver(loginValidationSchema), mode: "onChange" });

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleChangeType = () =>{
    { type == '' ? setType('signin') : setType('') }
  };

  const onSubmit = () => {

    const payload = {
      username: getValues("registerUsername"),
      email:getValues("email"),
      password:getValues("password"),
      confirmPassword:getValues("confirmPassword"),
    };
    localStorage.setItem("Payload",  JSON.stringify(payload));
    reset()
  }

  const loginSubmit = ()  =>{
    const loginPayload = {
      loginEmail:loginGetValues('loginEmail'),
      loginPassword: loginGetValues('loginPassword')
    }

    const obj = JSON.parse(localStorage.getItem('Payload')!);
    
    const userData =  obj.email;
    console.log(userData,'userData')
    {userData === loginPayload.loginEmail ? 
      navigate('/list')
      :
      console.log("not match");
    }
  
  }


    return(
      <>
        <div className="body">
        <div className="main-container">
        <div className="regcontainer">
        </div>
        <div className="form-page">
          <button className="sound-btn" id="soundBtn">
            <i className="fa-solid fa-bullhorn"></i>
          </button>
          <div className="register-form active">
           
            { type == 'signin' ?
              <>
              <h3>Login</h3>
              <form onSubmit={handleLoginSubmit(loginSubmit)} >
                <input 
                  type="email" 
                  id="loginEmail" 
                  placeholder="Email" 
                  {...login("loginEmail")}
                />
                <div className="form-group">
                  <input 
                    type="password" 
                    id="loginPassword" 
                    placeholder="Password" 
                    {...login("loginPassword")}
                  />
                  <span>
                  <button type="button" id="eye-icon">
                    <i id="eyeOpen" className="fa-solid fa-eye"></i>
                    <i
                      id="eyeClose"
                      className="fa-solid fa-eye-slash active"
                    ></i></button>
                  </span>
                </div>
                <div className="remember-me">
                  <input type="checkbox" className="checkbox" id="checkbox" />
                  <p>Remember Me</p>
                </div>
               
                <button
                  type="submit"
                  id="loginSubmit"
                  className="btn2 btn-login"
                >
                  Login
                </button>
              </form>
              </>
              : 
              <>
              <form onSubmit={handleSubmit(onSubmit)}>
              <h3>Sign Up</h3>
                <input
                  id="registerUsername"
                  type="text"
                  placeholder="Username"
                  {...register("registerUsername")}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                <div className="form-group">
                  <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                </div>
                  <span>
                    <button type="button" id="eye-icon-2">
                      <i id="secondeyeOpen" className="fa-solid fa-eye"></i>
                      <i
                        id="secondeyeClose"
                        className="fa-solid fa-eye-slash active"
                      ></i>
                    </button>
                  </span>
                
                <div className="form-group">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}

                  />
                    <i
                      onClick={togglePassword}
                      className={
                      passwordType == "password"
                      ? "fas fa-eye-slash"
                      : "fas fa-eye"
                      }
                      >
                    </i>
                    <span className="fas fa-key text-900 d-flex align-items-center fs--1 form-icon"></span>
                </div>
              
                <button  className="btn2 btn-register" type="submit">
                  Sign Up
                </button>
              </form>
              </>
            }

            <p className="minitext"  style={{color: "#fff"}}>
              { type == 'signin' ?
                <> Need an account ?
                <input type="button" value="SignUp" className='btn btn-success' style={{"marginRight": "7px"}} onClick={handleChangeType} />
                </>
                :
                <>You already have an account ?
                <input type="button" value="SignIn" className='btn btn-success' style={{"marginRight": "7px"}} onClick={handleChangeType} />
                </>
              }
            </p>
          </div>
        </div>
        </div>
        </div>
      </>
    )

}

export default Registration

