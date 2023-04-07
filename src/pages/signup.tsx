import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { AuthActionTypes } from '../store/modules/auth';
import { useNavigate } from 'react-router-dom';
import ModalPortal from '../components/modal-portal';
import Spinner from '../components/spinner';
import { SignUpData, SignUpFormData } from '../types/auth.type';

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpFormData>();

  const navigate = useNavigate();

  const returnToLoginPage = () => {
    navigate('/login');
  };

  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthActionTypes>>();

  const onSubmit = (data: SignUpData) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-200">
      <form
        className="flex h-auto w-full flex-col border bg-white p-[24px] sm:w-[360px] sm:rounded-xl sm:shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">투게더</p>
          <p className="text-xl font-bold">사장님 회원가입</p>
        </div>
        <div className="flex flex-col gap-4 py-[24px]">
          <div>
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
          <div>
            <div className="flex justify-between">
              <p className="pb-2">비밀번호 확인</p>
              {errors.passwordCheck && (
                <p className="text-red-500">비밀번호와 일치하지 않습니다</p>
              )}
            </div>{' '}
            <input
              type="password"
              placeholder="비밀번호 확인"
              className={`h-[40px] w-full rounded-md border border-gray-300 px-[8px] outline-none focus:border-2 focus:border-blue-500 ${
                errors.passwordCheck && 'border-red-500 focus:border-red-500'
              }`}
              {...register('passwordCheck', {
                required: true,
                validate: (value) => value === watch('password'),
              })}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <p className="pb-2">이름</p>
              {errors.userName && (
                <p className="text-red-500">이름을 입력해 주세요</p>
              )}
            </div>
            <input
              type="text"
              placeholder="이름"
              className={`h-[40px] w-full rounded-md border border-gray-300 px-[8px] outline-none focus:border-2 focus:border-blue-500 ${
                errors.userName && 'border-red-500 focus:border-red-500'
              }`}
              {...register('userName', {
                required: true,
                pattern: /^[가-힣a-zA-Z]*$/,
              })}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <p className="pb-2">연락처</p>
              {errors.contact && (
                <p className="text-red-500">숫자만 입력해 주세요</p>
              )}
            </div>{' '}
            <input
              type="text"
              placeholder="숫자만 입력해 주세요"
              className={`h-[40px] w-full rounded-md border border-gray-300 px-[8px] outline-none focus:border-2 focus:border-blue-500 ${
                errors.contact && 'border-red-500 focus:border-red-500'
              }`}
              {...register('contact', {
                required: true,
                pattern: /^\d+$/,
              })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-3">
          <button
            type="submit"
            className="h-[40px] w-full rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            회원가입
          </button>
          <button
            className="h-[40px] w-full rounded-md bg-teal-500 text-white hover:bg-blue-600"
            onClick={returnToLoginPage}
          >
            돌아가기
          </button>
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

export default SignUp;
