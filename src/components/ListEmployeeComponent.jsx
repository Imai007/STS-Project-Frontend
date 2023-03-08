import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { BsFillTrashFill,BsPencilFill,BsFillEyeFill,BsFillPlusCircleFill } from "react-icons/bs";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/edit/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            console.log(res.data);
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add/_add');
    }

    render() {
        return (
            <div>
                 <br></br>
                 <div className = "card p-5 row cardshadow3">
                        <table className = "table table-bordered">

                            <thead>
                                <tr>
                                    {/* <th className='text-center'> Order Id</th> */}
                                    <th className='text-center'> Customer Id</th>
                                    <th className='text-center'> Item Name</th>
                                    <th className='text-center'> Price</th>
                                    <th className='text-center'> Quantity</th>
                                    <th className='text-center'> Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                            
                                             <td> {employee.customerId} </td>   
                                             <td> {employee.itemName}</td>
                                             <td> {employee.price}</td>
                                             <td> {employee.quantity}</td>
                                             <td className='text-center'>
                                                 <button onClick={ () => this.viewEmployee(employee.id)} className="btn-hover btn-hover-x color-1"><BsFillEyeFill/></button>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="ml-2 btn-hover btn-hover-x color-7"><BsPencilFill/></button>
                                                 <button onClick={ () => this.deleteEmployee(employee.id)} className="ml-2 btn-hover btn-hover-x color-11"><BsFillTrashFill/> </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

                 <div className = "row mt-4">
                    <button className="btn btn-primary pt-2 pb-2 float-right" id='b4' onClick={this.addEmployee}><BsFillPlusCircleFill/>  Add </button>
                 </div>
            </div>
        )
    }
}

export default ListEmployeeComponent
