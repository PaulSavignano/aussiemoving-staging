import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App'

// Theme
import AdminThemePage from './theme/containers/AdminThemePage'

// Page
import Page from './pages/containers/Page'
import AdminPage from './pages/containers/AdminPage'
import AdminPageEdit from './pages/containers/AdminPageEdit'

// User
import RequireAuth from './users/components/RequireAuth'
import Signup from './users/components/Signup'
import Signin from './users/components/Signin'
import Recover from './users/components/Recover'
import Contact from './users/components/Contact'
import ProfilePage from './users/containers/ProfilePage'

// Product
import Products from './products/containers/Products'
import Product from './products/containers/Product'
import AdminProductList from './products/containers/AdminProductList'
import Cart from './products/containers/Cart'
import Order from './products/containers/Order'

import TodosPage from './todos/components/TodosPage'


export default history => (
  <Router history={history}>
    <Route path="/" component={App}>
      
      {/* Page */}
      <IndexRoute page="home" component={Page} />
      <Route path="admin/pages/:slug" component={AdminPageEdit} />
      <Route path="admin/pages" component={AdminPage} />

      {/* Theme */}
      <Route path="admin/theme" component={AdminThemePage} />

      {/* User */}
      <Route path="signup" component={Signup} />
      <Route path="signin" component={Signin} />
      <Route path="recover" component={Recover} />
      <Route path="contact" component={Contact} />
      <Route path="profile" component={ProfilePage} />

      {/* Product */}
      <Route path="todos" component={RequireAuth(TodosPage, ['user', 'admin'])} />
      <Route path="products" component={Products} />
      <Route path="product/:slug" component={Product} />
      <Route path="admin/products" component={AdminProductList} />
      <Route path="cart" component={Cart} />
      <Route path="order" component={RequireAuth(Order, ['user'])} />

    </Route>
  </Router>
)
