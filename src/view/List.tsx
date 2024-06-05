import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userData } from '../utils/interface';
import { deleteUser } from '../redux/slicers/crudSlice';
import Header from './Header';
import { useDispatch } from 'react-redux';

const List = () => {
    const dispatch = useDispatch()
    const registeredUsers = useSelector((state: any) => state.users.registeredUsers)
    const [allUsers, setAllUsers] = useState<any>([])

    useEffect(() => {
        setAllUsers(registeredUsers)
    }, [registeredUsers])

    const handleDelete = (userId: any) => {
        dispatch(deleteUser(userId))
    }

    return (<>
        <Header />
        <div className="container">
            <div className="row mt-5 text-center">
                <div className='col-lg-12'>
                    <div className='d-flex justify-content-between'>
                        <Link to='/getPassengers' className='btn btn-primary'>Get Passenger (API handling)</Link>
                        <Link to='/create' className='btn btn-primary'>Register</Link>
                    <Link to='/' className='btn btn-primary'>LogOut</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">


                    <table className="table table-bordered table-striped mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full name</th>
                                <th>Mobile number</th>
                                <th>Email Address</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((data: userData, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.id}</td>
                                        <td>{data.fullName}</td>
                                        <td>{data.mobileNumber}</td>
                                        <td>{data.emailAddress}</td>
                                        <td>{data.address}</td>
                                        <td>
                                            <Link to={`/edit/${data.id}`} className='btn btn-warning' style={{ "marginRight": "4px" }}>Edit</Link>
                                            <button type='button' className='btn btn-danger m-auto' onClick={() => handleDelete(data.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}

export default List