import { LoginPage } from './components/loginpage';
import { UserPage } from './components/userpage';
import { LibrarianPage } from './components/librarianpage';
import { Dashboard } from './components/dashboard';
import { EditBook } from './components/editbook';
import { DeleteBook } from './components/deletebook';


import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Books } from './components/books';
import { Users } from './components/users';
import { BooksList } from './components/BooksList';
import { AddBook } from './addbook';

import { UsersList } from "./components/userslist";
import { EditUser } from "./components/edituser";
import { DeleteUser } from "./components/deleteuser";
import { AddUser } from "./components/adduser";
import { useState } from 'react';



function App() {

  const [searchValue, setSearchValue] = useState("");



  return (
    <>

      {/* <LoginPage /> */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/librarian" element={<LibrarianPage />}>
          <Route index element={<Dashboard />} />
          <Route path='books' element={<Books setSearchValue={setSearchValue} />} >
            <Route index element={<BooksList searchValue={searchValue} />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="edit-book/:id" element={<EditBook />} />
            <Route path="delete-book/:id" element={<DeleteBook />} />
          </Route>
          <Route path='users' element={<Users />} >
            <Route index element={<UsersList />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="edit-user/:id" element={<EditUser />} />
            <Route path="delete-user/:id" element={<DeleteUser />} />
          </Route>
        </Route>

        <Route path="/user" element={<UserPage />}>



        </Route>

      </Routes>
    </>

  );
}

export default App;
