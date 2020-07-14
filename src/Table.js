import React, { Component } from 'react'


class Table extends Component{
	constructor(props){
		super(props);
		this.state = {
      		books: null
    	}
	}

	render(){
		if (!this.props.books) return null
		return <div>
		<div className="container">
			<table className="table" style={{"textAlign":"center"}}>
		        <thead id="books">
		          <tr>
		            <th scope="col">ID</th>
		            <th scope="col">Book Title</th>
		            <th scope="col">Author</th>
		            <th scope="col">Price</th>
		          </tr> 
		        </thead>
			        <tbody id="books">
			            {this.props.books.map((book, key)=>{
			                return(
			                    <tr key={key}>
			                    <td>{key}</td>
			                    <td>{book.title}</td>
			                    <td>{book.author_name}</td>
			                    <td>{book.price}</td>      
			             	    </tr>
			                )
			            })}
			         </tbody>
       			</table>
       		</div>
		</div>
	}
}

export default Table;