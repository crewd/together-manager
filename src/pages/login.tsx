import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginData } from '../types/auth.type';
import { useDispatch } from 'react-redux';
import ModalPortal from '../components/modal-portal';
import Spinner from '../components/spinner';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { login } from '../store/modules/authSlice';

function Login() {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginData) => {
    dispatch(login(data));
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-200">
      <form
        className="flex h-full w-full flex-col justify-center bg-white p-[24px] sm:h-auto sm:w-[360px] sm:rounded-xl sm:border sm:shadow-md"
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
        <div className="pb-4">
          <div className="flex justify-between">
            <p className="pb-2">이메일</p>
            {errors.userEmail && (
              <p className="text-red-500">올바른 이메일을 입력해 주세요</p>
            )}
          </div>
          <input
            type="text"
            placeholder="이메일"
            className={`h-[40px] w-full rounded-md border border-gray-300 px-[8px] outline-none focus:border-2 focus:border-blue-500 ${
              errors.userEmail && 'border-red-500 focus:border-red-500'
            }`}
            {...register('userEmail', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <p className="pb-2">비밀번호</p>
            {errors.password && (
              <p className="text-red-500">비밀번호를 입력해 주세요</p>
            )}
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            className={`h-[40px] w-full rounded-md border border-gray-300 px-[8px] outline-none focus:border-2 focus:border-blue-500 ${
              errors.password && 'border-red-500 focus:border-red-500'
            }`}
            {...register('password', {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col pt-8">
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
          <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white/40">
            <Spinner />
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

export default Login;
