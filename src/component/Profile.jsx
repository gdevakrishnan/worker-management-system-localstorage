import React, { Fragment, useEffect, useState } from 'react';
import Loader from './Loader'

function Profile() {
    const initialState = {
        status: false,
        indexNo: 0,
        name: "",
        role: "",
        age: "",
        workingHours: "",
        salary: ""
    };

    const [state, setState] = useState([]);
    const [editData, setEditData] = useState(initialState);
    const [filterName, setFilterName] = useState("");

    const getData = () => {
        const data = JSON.parse(localStorage.getItem("myapp"));
        setState(data || []);
    };

    const handleClearAll = () => {
        localStorage.removeItem("myapp");
        setState([]);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const lsdata = JSON.parse(localStorage.getItem("myapp"));
        lsdata[editData.indexNo] = {
            name: editData.name,
            role: editData.role,
            age: editData.age,
            workingHours: editData.workingHours,
            salary: editData.salary
        };
        localStorage.setItem("myapp", JSON.stringify(lsdata));
        setEditData(initialState);
        setState(lsdata);
        alert("Updated Successfully");
    };

    const handleEditChange = (e) => {
        const { id, value } = e.target;
        setEditData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleFilter = (e) => {
        e.preventDefault();
        setState(state.filter((element) => { return (element.name === filterName) }));
    }

    const handleReset = (e) => {
        e.preventDefault();
        setFilterName("");
        const data = JSON.parse(localStorage.getItem("myapp"));
        setState(data || []);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            <section className="page profile_page">
                {
                    (state && state.length > 0) ? (
                        <form onSubmit={(e) => handleFilter(e)}>
                            <div className="form_group">
                                <label htmlFor="name">User Name</label>
                                <input type="text" name="name" id="name" value={filterName} onChange={(e) => setFilterName(e.target.value)} className='filterForm' />
                            </div>
                            <div className="btn">
                                <input type="submit" value="Filter" onClick={(e) => handleFilter(e)} />
                                <button onClick={(e) => handleReset(e)}>Reset</button>
                            </div>
                        </form>
                    ) : null
                }
                {editData.status && filterName.trim() === "" && (
                    <Fragment>
                        <h1 className='title'>Edit User</h1>
                        <form onSubmit={handleUpdate}>
                            <div className="form_group">
                                <label htmlFor="name">User Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={editData.name}
                                    onChange={handleEditChange}
                                />
                            </div>

                            <div className="form_group">
                                <label htmlFor="role">Job Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    id="role"
                                    value={editData.role}
                                    onChange={handleEditChange}
                                />
                            </div>

                            <div className="form_group">
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    id="age"
                                    value={editData.age}
                                    onChange={handleEditChange}
                                />
                            </div>

                            <div className="form_group">
                                <label htmlFor="workingHours">Working Hours</label>
                                <input
                                    type="number"
                                    name="workingHours"
                                    id="workingHours"
                                    value={editData.workingHours}
                                    onChange={handleEditChange}
                                />
                            </div>

                            <div className="form_group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    id="salary"
                                    value={editData.salary}
                                    onChange={handleEditChange}
                                />
                            </div>

                            <div className="btn">
                                <input type="submit" value="Update" />
                            </div>
                        </form>
                    </Fragment>
                )}
                {
                    (state && state.length > 0) ? (
                        <div className="btn">
                            <button onClick={getData}>Refresh</button>
                            <button onClick={handleClearAll}>Clear All</button>
                        </div>
                    ) : (
                        <Fragment>
                            <h1 className='msg'>No Data Found</h1>
                            <button onClick={getData}>Refresh</button>
                        </Fragment>
                    )
                }
                {state && state.length > 0 ? (
                    state.map((element, index) => (
                        <div key={index} className='profile'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{element.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                        <td>{element.role}</td>
                                    </tr>
                                    <tr>
                                        <th>Age</th>
                                        <td>{element.age}</td>
                                    </tr>
                                    <tr>
                                        <th>Working Hours</th>
                                        <td>{element.workingHours} hours</td>
                                    </tr>
                                    <tr>
                                        <th>Salary</th>
                                        <td>Rs.{element.salary}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="btn">
                                <button onClick={() => {
                                    const updatedData = state.filter((_, i) => i !== index);
                                    localStorage.setItem("myapp", JSON.stringify(updatedData));
                                    setState(updatedData);
                                    alert("Deleted Successfully");
                                }}>Delete</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setEditData({
                                        ...element,
                                        status: true,
                                        indexNo: index
                                    });
                                }}>Edit</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <Loader />
                )}
            </section>
        </Fragment>
    );
}

export default Profile;
