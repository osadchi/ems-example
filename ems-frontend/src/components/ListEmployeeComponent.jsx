import React, {useEffect, useState} from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees();
    }, [])

    const navigator = useNavigate();

    function getAllEmployees()
    {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee()
    {
        navigator('/add-employee');
    }

    function updateEmployee(id)
    {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id)
    {
        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        });
    }
  return (
    <div className='container'>
        <h2>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee Frist Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(
                        employee =>
                            <tr key={employee.id}>
                                <td className='text-start'>{employee.id}</td>
                                <td className='text-start'>{employee.firstName}</td>
                                <td className='text-start'>{employee.lastName}</td>
                                <td className='text-start'>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger ms-2' onClick={() => removeEmployee(employee.id)}>Remove</button>
                                </td>
                            </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent