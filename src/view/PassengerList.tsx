import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPassenger } from "../redux/slicers/passengerSlice"
import { Link } from 'react-router-dom';
import Header from './Header';

const PassengerList = () => {
    const dispatch = useDispatch()
    const [pageNo, setPageNo] = useState<number>(1)
    const pageSize = 10
    const passenger = useSelector((state: any) => state.passenger.passengerData)
    console.log(passenger,'pass')

    useEffect(() => {
        dispatch(getPassenger({ page: pageNo, size: pageSize }))
    }, [pageNo])

    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    const handlePrev = () => {
        setPageNo(pageNo - 1)
    }

    return (<>
        <Header />
        <div className='container mt-5'>
            <div className="row mb-3">
                <div className="col-lg-12 d-flex justify-content-end">
                    <Link to='/create' className='btn btn-secondary'>Back to user register</Link>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-12 table'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th style={{ "border": "1px solid black" }}>Passenger name</th>
                                <th style={{ "border": "1px solid black" }}>Trips</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                passenger.map((data: any, index: any) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td style={{ "border": "1px solid black" }}>{data.name}</td>
                                                <td style={{ "border": "1px solid black" }}>{data.trips}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-primary' onClick={handlePrev}>Prev</button><button className='btn btn-primary' onClick={handleNext}>Next</button>
            </div>
        </div>
    </>)
}

export default PassengerList