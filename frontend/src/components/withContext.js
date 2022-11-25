import React from 'react';
import {useLocation, useNavigate, useOutletContext, useParams} from 'react-router-dom';

function withContext(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    const [cartItems,setcartItems,updateCartItem]=useOutletContext()
    return <Component {...props} {...{location, navigate, params,cartItems,setcartItems,updateCartItem}} />;
  }

  return ComponentWithRouterProp;
}

export default withContext;