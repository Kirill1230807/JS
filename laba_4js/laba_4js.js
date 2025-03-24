// 1 task
let fruits = ['apple', 'banana', 'orange', 'grape'];
// 1.1
let deleteFruit = fruits.slice(0, -1);
console.log('1 ', fruits);
console.log('1.1 ', deleteFruit);

// 1.2
fruits.unshift('pineapple');
console.log('1.2 ', fruits);

// 1.3
fruits.sort().reverse();
console.log('1.3 ', fruits);

// 1.4
let index = fruits.indexOf("apple");
console.log('1.4 ', index);

// 2
let color = ['blue', 'black', 'red', 'green', 'white', 'yellow']
console.log('2 ', color);

// 2.2
let longest_color = color.reduce((a, b) => a.length > b.length ? a : b);
let shortest_color = color.reduce((a, b) => a.length < b.length ? a : b);
console.log('2.2 ', 'The longest color is: ', longest_color, '\nThe shortest color is: ', shortest_color);

// 2.3
let filtered_color = color.filter(item => item === "blue");
console.log('2.3 ', filtered_color);

// 2,4
let coma_color = color.join(', ');
console.log('2.4 ', coma_color);

// 3
let workers = [
    {name: 'Nikita', age: 30, positions: 'manager'},
    {name: 'Stepan', age: 25, positions: 'developer'},
    {name: 'Ivan', age: 26, positions: 'designer'},
    {name: 'Vasya', age: 27, positions: 'manager'},
    {name: 'Masha', age: 28, positions: 'developer'},
    {name: 'Oleg', age: 29, positions: 'designer'}
]
console.log('3', workers);

// 3.2
let sort_workers = workers.sort((a, b) => a.name.localeCompare(b.name));
console.log('3.2', 'Sort array: ', sort_workers);

// 3.3
let find_developers = workers.filter(worker => worker.positions === 'developer');
console.log('3.3 Found developers: ', find_developers);

// 3.4
let add_worker = workers.push({name: 'Kirill', age: 19, positions: 'developer'});
console.log('3.4 Added worker: ', add_worker, workers);

// 4
let students = [
    {name: 'Alex', age: 20, course: 3},
    {name: 'Vasya', age: 21, course: 4},
    {name: 'Masha', age: 19, course: 2},
    {name: 'Oleg', age: 18, course: 1},
    {name: 'Nikita', age: 22, course: 5},
    {name: 'Stepan', age: 20, course: 3}
]
console.log('4', students);

// 4.2
let delete_student = [];
delete_student = students.filter(student => student.name !== 'Alex');
console.log('4.2 Array without Alex: ', delete_student);

// 4.3
let add_student = [];
add_student = students.unshift({name: 'Kirill', age: 19, course: 2});
console.log('4.3 Array with new student: ', students);

// 4.4
let age_students = [];
age_students = students.sort((a, b) => b.age - a.age);
console.log('4.4 Array sorted by age: ', age_students);

// 4.5
let find_3_course = [];
find_3_course = students.filter(student => student.course === 3);
console.log('4.5 3 course: ', find_3_course);

// 5
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log('5', numbers);

// 5.1
let square = [];
square = numbers.map(number => number * number);
console.log('5.1 Square: ', square);

// 5.2
let filter_even = [];
filter_even = numbers.filter(number => number % 2 === 0);
console.log('5.2 Even numbers: ', filter_even);

// 5.3
let sum_all = [];
sum_all = numbers.reduce((a, b) => a + b);
console.log('5.3 Sum all: ', sum_all);

// 5.4
let additional_numbers = [13, 14, 15, 16, 17];
let combined_numbers = numbers.concat(additional_numbers);
console.log('5.4 Combined numbers: ', combined_numbers);

// 5.5
let delete_first_3 = [];
delete_first_3 = numbers.splice(0, 3);
console.log('5.5 Delete first 3: ', numbers);

// 6
function libraryManagement() {

    let books = [
        { title: "1984", author: "George Orwell", genre: "Dystopian", pages: 328, isAvailable: true },
        { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", pages: 281, isAvailable: true },
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", pages: 180, isAvailable: false }
    ];

    function addBook(title, author, genre, pages) {
        const newBook = { title, author, genre, pages, isAvailable: true };
        books.push(newBook);
    }

    function removeBook(title) {
        books = books.filter(book => book.title !== title);
    }

    function findBooksByAuthor(author) {
        return books.filter(book => book.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        const book = books.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        const totalBooks = books.length;
        const availableBooks = books.filter(book => book.isAvailable).length;
        const borrowedBooks = totalBooks - availableBooks;
        const averagePages = totalBooks > 0 ? books.reduce((sum, book) => sum + book.pages, 0) / totalBooks : 0;

        return {
            totalBooks,
            availableBooks,
            borrowedBooks,
            averagePages
        };
    }

    return {
        addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics
    };
}

const library = libraryManagement();

library.addBook("Brave New World", "Aldous Huxley", "Dystopian", 311);

library.removeBook("1984");

console.log(library.findBooksByAuthor("Harper Lee"));

library.toggleBookAvailability("The Great Gatsby", true);

library.sortBooksByPages();

console.log(library.getBooksStatistics());

// 7
let person = {name: 'Frank', age: 24, course: 5};
console.log('7', person);
// 7.1
let add_subject = [];
add_subject = person.subject = 'Math';
console.log('7', person);
// 7.2
let delete_age = [];
delete_age = delete person.age;
console.log('7.2', person);