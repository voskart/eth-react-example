import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { LIBRARY_ADDRESS, LIBRARY_ABI } from './config'
import Table from "./Table"

class App extends Component {

  async loadBlockchainData() {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    var library = new web3.eth.Contract(LIBRARY_ABI, LIBRARY_ADDRESS);
    const inventorySize = await library.methods.getInventorySize().call();
    console.log(await web3.eth.getBalance(accounts[0]))
    this.setState({ admin : accounts[0]});
    this.setState({ inventorySize : inventorySize});
    this.setState({ library: library});
    this.setState({ account: accounts[0] });
    this.setState({ balance: balance});
    this.getBooks();
  }

  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      balance: 0,
      inventorySize: 0,
      admin: '',
      title: '',
      author: '',
      books : []
    };
    this.loadBlockchainData();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleSubmit(event) {
    await this.state.library.methods.newBookInInventory(this.state.title, this.state.author).send({from: this.state.admin, gas: 4712387});
    var updatedInventory = await this.state.library.methods.getInventorySize().call();
    this.state.inventorySize = updatedInventory;
    event.preventDefault();
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  async getBooks(){
    this.setState ({loading: true});
    var books = [];
    var book = null;
    for (var i = 0; i < this.state.inventorySize ; i++){
      book = await this.state.library.methods.bookInventory(i).call();
      books.push(book);
    };
    this.setState({ bookInventory: books});
    this.setState ({loading: false});
  }

  render() {
    return (
      <div className="container">
        <p>Your account: {this.state.account}</p>
        <p>Your balance: {this.state.balance}</p>
        <p>inventorySize: {this.state.inventorySize}</p>

        <div className="container-fluid">
          <form onSubmit={this.handleSubmit}>
              <input id="title" type="text" name="title" onChange={this.handleChange} className="form-control" placeholder="Sample Title" required />
              <input id="author" type="text" name="author" onChange={this.handleChange} className="form-control" placeholder="Sample Author" required />
              <input type="submit" value="Submit" hidden="" />
          </form>
        </div>
      <div>
        {this.state.loading ? ('Loading') : (<Table {...this.props} books = {this.state.bookInventory}/>)}
      </div>  
      </div>
    );
  }
}

export default App;