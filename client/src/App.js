import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Username from "./components/Username";
import Register from "./components/Register";



/** Creating root routes*/
const router = createBrowserRouter([
    {path: '/', element: Username,},
    {path: '/register', element: Register,},
    {path: '/login', element: Lo,}
]);
const App = () => {
    return (
        <main>
            <RouterProvider router={router}>

            </RouterProvider>
        </main>
    )
}
export default App
