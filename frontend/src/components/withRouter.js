import React from 'react';
import {useLocation, useNavigate, useOutletContext, useParams} from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    //console.log(props)
    return <Component {...props} {...{location, navigate, params}} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;