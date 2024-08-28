import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {  RouterProvider } from 'react-router-dom'
import { router } from './Utils/Routers.jsx'

import { Provider } from 'react-redux'
import  store  from './App/store.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  //</React.StrictMode>,
)
