import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

function NoRequireAuth({ children }: React.PropsWithChildren<{}>) {
  const { token } = useSelector((state: RootState) => ({
    token: state.authReducer.token,
  }));
  return token ? <Navigate to="/" /> : <>{children}</>;
}

export default NoRequireAuth;
