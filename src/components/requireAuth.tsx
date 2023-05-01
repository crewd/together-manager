import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

function RequireAuth({ children }: React.PropsWithChildren<{}>) {
  const { token } = useSelector((state: RootState) => ({
    token: state.authReducer.token,
  }));

  return token ? <>{children}</> : <Navigate to="/login" />;
}

export default RequireAuth;
