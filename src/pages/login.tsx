import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginData } from '../types/auth.type';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { AuthActionTypes, login } from '../store/modules/auth';
import { useDispatch } from 'react-redux';
import ModalPortal from '../components/modal-portal';
import Spinner from '../components/spinner';
import { useState } from 'react';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>();

  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthActionTypes>>();

  const onSubmit = (data: LoginData) => {
    setIsLoading(true);
    dispatch(login(data));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-200">
      <form
        className="flex h-full w-full flex-col justify-center rounded-xl border bg-white p-[24px] shadow-md sm:h-[400px] sm:w-[360px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">투게더</p>
          <p className="text-xl font-bold">사장님 로그인</p>
        </div>
        <div className="py-[24px]">
          <p>
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              직원 사이트로 이동
            </Link>
          </p>
        </div>
        <div className="pb-[24px]">
          <input
            type="text"
            placeholder="아이디"
            className={`h-[40px] w-full rounded-md border border-gray-300 px-[8px] outline-none focus:border-2 focus:border-blue-500 ${
              errors.userEmail && 'border-red-500 focus:border-red-500'
            }`}
            {...register('userEmail', {
              required: '* 아이디를 입력해 주세요',
            })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            className={`h-[40px] w-full rounded-md border border-gray-300 px-[8px] outline-none focus:border-2 focus:border-blue-500 ${
              errors.password && 'border-red-500 focus:border-red-500'
            }`}
            {...register('password', {
              required: '* 비밀번호를 입력해 주세요',
            })}
          />
        </div>
        <div className="flex flex-col pt-[24px]">
          <button
            type="submit"
            className="h-[40px] w-full rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            로그인
          </button>
          <p className="mt-4 text-center">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              회원가입
            </Link>
          </p>
        </div>
      </form>
      {isLoading && (
        <ModalPortal>
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white/40">
            <Spinner />
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

export default Login;
