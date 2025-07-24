import { Children, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from './AutProvider';

const PrivateRoute = ({children}) => {
    const{user}=useContext(authContext);
    if(user){
        return children
    }
    return <Navigate to='/Login'></Navigate>
};

export default PrivateRoute;