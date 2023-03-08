import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { BsCheckCircleFill,BsFillXCircleFill } from "react-icons/bs";

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            customerId: '',
            itemName: '',
            price: '',
            quantity: '',

        }
        this.changeCustomerIdHandler = this.changeCustomerIdHandler.bind(this);
        this.changeItemNameHandler = this.changeItemNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    customerId: employee.customerId,
                    itemName: employee.itemName,
                    price: employee.price,
                    quantity : employee.quantity,
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {customerId: this.state.customerId, itemName: this.state.itemName, price: this.state.price, quantity: this.state.quantity};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeCustomerIdHandler= (event) => {
        this.setState({customerId: event.target.value});
    }

    changeItemNameHandler= (event) => {
        this.setState({itemName: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }
    
    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center p-4 m-2 text-info">Add</h3>
        }else{
            return <h3 className="text-center p-4 m-2 text-info">Update</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Customer Id: </label>
                                            <input placeholder="CustomerId" name="CustomerId" className="form-control" 
                                                value={this.state.customerId} onChange={this.changeCustomerIdHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Item Name: </label>
                                            <input placeholder="ItemName" name="Itemame" className="form-control" 
                                                value={this.state.itemName} onChange={this.changeItemNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Quantity: </label>
                                            <input placeholder="Quantity" name="quantity" className="form-control" 
                                                value={this.state.quantity} onChange={this.changeQuantityHandler}/>
                                        </div>

                                        <div className='btn-group'>
                                        <button className="btn btn-success w-auto" onClick={this.saveOrUpdateEmployee}><BsCheckCircleFill/> Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><BsFillXCircleFill/> Cancel</button>
                                        </div> 
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
