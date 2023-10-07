import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {NotFound} from "../pages/404.tsx";
import LoginPage from "../pages/loginPage.tsx";
import SignupPage from "../pages/signupPage.tsx";
import HomePage from "../pages/homePage.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

const routes = createBrowserRouter([
   {
      path: '/',
      element: <App/>,
      children: [
         {
            index: true,
            element:
               <PrivateRoute>
                  <HomePage/>
               </PrivateRoute>
         },
         /*{
            path: '/all-books',
            element: <AllBook/>,
         },
         {
            path: '/book/:id',
            element: <BookDetailsPage/>,
         },
         {
            path: '/add-book',
            element:
               <PrivateRoute>
                  <AddBookPage/>
               </PrivateRoute>,
         },
         {
            path: '/edit-book/:id',
            element:
               <PrivateRoute>
                  <EditBookPage/>
               </PrivateRoute>,
         },
         {
            path: '/my-wishlist',
            element:
               <PrivateRoute>
                  <MyWishListPage/>
               </PrivateRoute>,
         },*/
         {
            path: '/login',
            element: <LoginPage/>,
         },
         {
            path: '/signup',
            element: <SignupPage/>,
         },
         {
            path: '*',
            element: <NotFound/>,
         },
      ]
   }
]);

export default routes;