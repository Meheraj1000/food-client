import React, { useContext } from 'react';
import { authContext } from './AutProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({routes}) => {
    const{user}=useContext(authContext);
    if(user){
        return routes
    }
    return <Navigate to='/Login'></Navigate>
};

export default PrivateRoute;