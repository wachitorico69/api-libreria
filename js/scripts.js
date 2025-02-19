//Recupera libros de localStorage o inicializa un array vacío
let books = JSON.parse(localStorage.getItem('books')) || [];

const bookForm = document.getElementById('bookForm'); //el form que tenemos en html
const bookTableBody = document.querySelector('#bookTable tbody'); //la tabla que tenemos en html
let editingIndex = null;

//Función para cargar los libros en la tabla
function renderBooks() {
    bookTableBody.innerHTML = ''; //limpia la tabla
    books.forEach((book, index) => {  //recorre el array de libros
        const row = document.createElement('tr'); //se crea un nuevo renglón en la tabla y en cada una de las 4 celdas los datos de los libros
        row.innerHTML = `
            <td>${book.title}</td>  
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.year}</td>
            <td>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        bookTableBody.appendChild(row); //se agrega el renglón que creamos con datos a la tabla
    });
}

//Maneja el formulario de envío
bookForm.addEventListener('submit', function(event) { //se añade un evento al botón que add book con una función anónima 
    event.preventDefault(); //evita que el form recargue la página

    //Obtener los valores del form
    const title = document.getElementById('title').value;          //guarda el contenido del espacio title que esta en el form
    const author = document.getElementById('author').value;        //guarda el contenido del espacio author que esta en el form
    const publisher = document.getElementById('publisher').value;  //guarda el contenido del espacio publisher que esta en el form
    const year = document.getElementById('year').value;            //guarda el contenido del espacio year que esta en el form

    //Crear un objeto book nuevo
    const newBook = { title, author, publisher, year };

    if (editingIndex !== null) {
        //Actualizar libro existente
        books[editingIndex] = newBook;
        editingIndex = null;
    } else {
        //Añadir el libro nuevo al array
        books.push(newBook);
    }

    //Guardar el array actualizado en localStorage
    localStorage.setItem('books', JSON.stringify(books));

    //Mostrar la lista actualizada de libros
    renderBooks();

    //Limpiar el form
    bookForm.reset();
});

function editBook(index) {
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('publisher').value = book.publisher;
    document.getElementById('year').value = book.year;
    editingIndex = index;
}

function deleteBook(index) {
    books.splice(index,1); //tabla
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.removeItem(JSON.stringify(books[index])); //borra localstorage
    renderBooks();
}

//Render inicial, llama a la función anterior
renderBooks();

//probando github