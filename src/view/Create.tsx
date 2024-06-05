import { useEffect, useState } from 'react';
import Header from './Header';
import { userData } from '../utils/interface';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUser } from '../redux/slicers/crudSlice';
import { Link } from 'react-router-dom';

const Create = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const url = window.location.pathname;    
    const id = url.split('/')[2];
    const allUser = useSelector((state: any) => state.users.registeredUsers)    
    const [userData, setUserData] = useState<userData>({ fullName: '', mobileNumber: '', emailAddress: '', address: '' })

    const handleClick = () => {
        dispatch(setUser(userData))
        navigate('/')
    }

    useEffect(() => {
        if (id !== undefined) {
            const returnCurrent = allUser.find((data: any) => data.id == id)
            setUserData({ id: returnCurrent.id, fullName: returnCurrent.fullName, mobileNumber: returnCurrent.mobileNumber, emailAddress: returnCurrent.emailAddress, address: returnCurrent.address })
        }
    }, [])

    return (<>
        <Header />
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <label className="form-label">Full name</label>
                            <input type="text" className="form-control" value={userData.fullName} onChange={(e: any) => { setUserData({ ...userData, fullName: e.target.value }) }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mobile number</label>
                            <input type="number" className="form-control" minLength={10} maxLength={10} value={userData.mobileNumber} onChange={(e: any) => { setUserData({ ...userData, mobileNumber: e.target.value }) }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-control" value={userData.emailAddress} onChange={(e: any) => { setUserData({ ...userData, emailAddress: e.target.value }) }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea className="form-control" value={userData.address} rows={3} onChange={(e: any) => { setUserData({ ...userData, address: e.target.value }) }} />
                        </div>
                        <div className="mb-3">
                            <input type="button" value="Save" className='btn btn-success' style={{"marginRight": "7px"}} onClick={handleClick} />
                            <Link to='/list' className='btn btn-danger'>Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Create