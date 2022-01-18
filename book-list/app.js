// Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// User Interface class for the interaction with the page
class UI {
    addBookToList(book) {  
        let bookRow = document.createElement('tr');
        bookRow.innerHTML = `<td>${book.title}</td>
                                <td>${book.author}</td>
                                <td>${book.isbn}</td>
                                <td>
                                    <i class="material-icons">delete</i>
                                </td>`;
        document.getElementById('bookList').appendChild(bookRow);
        document.getElementById('bookForm').reset();
    }

    deleteBookFromList(target) {
        target.parentNode.parentNode.remove();
    }

    showMessage(className, element) {
        let message = document.createElement('div');
        message.classList.add(className);
        message.innerText = `Please fill in the ${element.id}.`;
        document.getElementById('messageContainer').appendChild(message);
    }
}

// Storage class for handling local storage
class Storage {
    static displayBooks() {
        let books = Storage.getBooks();
        books.forEach(function(book){
            ui.addBookToList(book);
        })
    }

    static addBookToLocalStorage(book) {
        let books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static removeBookFromLocalStorage(isbn) {
        let books = Storage.getBooks();
        books.forEach(function(book, index, books) {
            if (book.isbn == isbn) {
                books.splice(index, 1);
                return;
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', Storage.displayBooks);

document.getElementById('bookForm').addEventListener('submit', function(event) {

    event.preventDefault();

    clearTimeout(clearMessageContainerTimeout);
    
    // Validate the form and display an error message if the form is not valid
    let form = document.getElementById('bookForm');
    if (!validateBookForm(form)) {
        var clearMessageContainerTimeout = setTimeout(function() {
            document.getElementById('messageContainer').innerHTML = '';
            document.getElementById('messageContainer').classList.remove('error');
        }, 3000);
        return;
    }
    
    // Get form values and instantiate a book object
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById('ISBN').value;
    let book = new Book(title, author, isbn);

    Storage.addBookToLocalStorage(book);

    ui.addBookToList(book);
});

// Delete the book from the list
document.getElementById('bookList').addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target && event.target.innerText === 'delete') {
        let row = event.target.parentNode.parentNode.children;
        let elements = [...row];
        let isbn = elements[2].innerText;

        ui.deleteBookFromList(event.target);
        Storage.removeBookFromLocalStorage(isbn);
    } else {
        return;
    }
});

/* --------------------------------------- */
/* --------- Helper functions -------------*/
/* --------------------------------------- */

function validateBookForm(form) {
    let isFormValid = true;
    let elements = [...form.elements];
    elements.pop(); // the last element of the form is a submit button. We don't need it for validation.
    elements.forEach((el) => {
        if (el.value == '') {
            ui.showMessage('error', el);
            isFormValid = false;
        }
    });
    return isFormValid;
}