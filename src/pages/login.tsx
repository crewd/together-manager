import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-200">
      <form
        className="h-full w-full rounded-xl border bg-white p-[24px] shadow-md md:h-[400px] md:w-[360px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <p className="text-center text-3xl font-bold">투게더</p>
        </div>
        <div className="py-[24px]">
          <p className="text-left text-xl font-bold">사장님 로그인</p>
        </div>
        <div className="pb-[24px]">
          <input
            type="text"
            placeholder="아이디"
            className={`h-[40px] w-full rounded-md border border-gray-300 px-[8px] outline-none focus:border-2 focus:border-blue-500 ${
              errors.userId && 'border-red-500 focus:border-red-500'
            }`}
            {...register('userId', {
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
        <div className="flex flex-col gap-3 pt-[24px]">
          <button
            type="submit"
            className="h-[40px] w-full rounded-md bg-blue-500 text-white"
          >
            로그인
          </button>
          <Link to="/signup">
            <button className="h-[40px] w-full rounded-md bg-green-500 text-white">
              회원가입
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
