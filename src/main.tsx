import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import store from "./redux/store.ts";
import {RouterProvider} from "react-router-dom";
import routes from "./routes/routes.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={routes}/>
      </Provider>
   </React.StrictMode>,
)
