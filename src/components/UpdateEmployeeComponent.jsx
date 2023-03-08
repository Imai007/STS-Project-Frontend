import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            customerId: '',
            itemName: '',
            price: '',
            quantity: ''
        }
        this.changeCustomerIdHandler = this.changeCustomerIdHandler.bind(this);
        this.changeItemNameHandler = this.changeItemNameHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({
                customerId: employee.customerId,
                itemName: employee.itemName,
                price : employee.price,
                quantity : employee.quantity
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {customerId: this.state.customerId, itemName: this.state.itemName, price: this.state.price, quantity: this.state.quantity};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Customer Id: </label>
                                            <input placeholder="CustomerId" name="CustomerId" className="form-control" 
                                                value={this.state.customerId} onChange={this.changeCustomerIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Item Name: </label>
                                            <input placeholder="ItemName" name="ItemName" className="form-control" 
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
                                       
                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
