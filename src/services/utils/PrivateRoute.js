import { Route, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const PrivateRoute = ({children, ...rest}) => {
    const session = useSelector(state => state.sessions);
    return (
        <Route {...rest}>
            { 
                (session.isAuthenticated && !session.isLoading) ? (
                    children 
                ):(
                    <Redirect to="/login"/>
                )
            }
        </Route>
    )
}

export default PrivateRoute;