pragma solidity >=0.4.21 <0.7.0;

contract Library{

struct Book{
    uint book_id;
    uint price;
    string title;
    string author_name;
    address payable owner;
    address customer;
}

mapping (address => Book) loanedBooks;
string private name;
address private admin;
Book[] public bookInventory;
uint private numberOfBooks;

constructor(string memory _name) public {
    name = _name;
    admin = msg.sender;
}

function newBookInInventory(string memory title, string memory author_name) public returns (bool) {
    require(msg.sender == admin, "Someone other than the admin tried to put a add a new book to the inventory");
    Book memory newBook = Book({book_id:numberOfBooks, price: 100000000000000000, title:title, author_name:author_name, owner:msg.sender, customer:address(0)});
    bookInventory.push(newBook);
    numberOfBooks++;
    return true;
}

function getInventorySize() public view returns (uint){
    return bookInventory.length;
}

function loanBook(uint book_id) public payable returns (bool){
    require(bookInventory[book_id].price != 0, "Book does not exist in inventory");
    require(bookInventory[book_id].customer == address(0), "Book is not already loaned");
    require(msg.value == bookInventory[book_id].price, "Sender does not have enough money to loan the book");
    bookInventory[book_id].owner.transfer(msg.value);
    bookInventory[book_id].customer = msg.sender;
    return true;
}

function returnBook(uint book_id) public returns (bool){
    require(bookInventory[book_id].price != 0, "Book does not exist in inventory");
    require(bookInventory[book_id].customer == msg.sender, "Sending address does not currently have the book");
    bookInventory[book_id].customer = address(0);
    return true;
}
}