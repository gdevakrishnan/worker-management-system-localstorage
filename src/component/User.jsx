import React, { Fragment, useState } from 'react'

function User() {
    const initialState = {
        "name": "",
        "role": "",
        "age": "",
        "workingHours": "",
        "salary": ""
    }

    const [newPerson, setNewPerson] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPerson.name.trim() === "" || newPerson.role.trim() === "" || newPerson.age.trim() === "" || newPerson.workingHours.trim() === "" || newPerson.salary.trim() === "") {
            alert("Enter all the fields");
            return;
        }
        const data = JSON.parse(localStorage.getItem("myapp"));

        if (!data) {
            localStorage.setItem("myapp", JSON.stringify([newPerson]));
        } else {
            localStorage.setItem("myapp", JSON.stringify([...data, newPerson]));
        }

        alert("Added Successfully");
    }

    return (
        <Fragment>
            <section className="page user_page">
                <h1 className='title'>Add User</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form_group">
                        <label htmlFor="name">User Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={newPerson.name}
                            onChange={(e) => setNewPerson({ ...newPerson, [e.target.id]: e.target.value })}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="role">Job Role</label>
                        <input
                            type="text"
                            name="role"
                            id="role"
                            value={newPerson.role}
                            onChange={(e) => setNewPerson({ ...newPerson, [e.target.id]: e.target.value })}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            value={newPerson.age}
                            onChange={(e) => setNewPerson({ ...newPerson, [e.target.id]: e.target.value })}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="workingHours">Working Hours</label>
                        <input
                            type="number"
                            name="workingHours"
                            id="workingHours"
                            value={newPerson.workingHours}
                            onChange={(e) => setNewPerson({ ...newPerson, [e.target.id]: e.target.value })}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="salary">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            id="salary"
                            value={newPerson.salary}
                            onChange={(e) => setNewPerson({ ...newPerson, [e.target.id]: e.target.value })}
                        />
                    </div>

                    <div className="btn">
                        <input
                            type="submit"
                            value="Submit"
                            onSubmit={(e) => handleSubmit(e)}
                        />
                        <button onClick={(e) => {
                            e.preventDefault();
                            setNewPerson(initialState);
                        }}>Clear</button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default User