import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';

function AddStore({ onClose }: { onClose: () => void }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [addressOpened, setAddressOpened] = useState(false);
  const [address, setAddress] = useState('');

  const onOpenAddress = () => {
    setAddressOpened(true);
  };

  const getAddress = (data: Address) => {
    setAddressOpened(false);
    setAddress(data.address);
  };

  const onSubmit = (data: any) => console.log(data);

  return (
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-gray-600/50"
      onClick={onClose}
    >
      <form
        className="relative flex h-screen w-screen flex-col bg-white p-[24px] md:h-[400px] md:w-[400px] md:rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="pb-[24px] text-center text-xl font-bold">매장 추가</p>
        <div className="flex flex-col">
          <div className="flex justify-between py-[8px]">
            <p className="font-bold">매장 명</p>
            <ErrorMessage
              errors={errors}
              name="storeName"
              render={({ message }) => (
                <p className="text-red-500 ">{message}</p>
              )}
            />
          </div>
          <input
            type="text"
            className={`${
              errors.storeName && 'border-red-500'
            } rounded-md border border-gray-300 px-[8px] py-[6px] outline-none`}
            {...register('storeName', { required: '* 매장명을 입력해 주세요' })}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between py-[8px]">
            <p className="font-bold">주소</p>
            {!address && (
              <ErrorMessage
                errors={errors}
                name="adress"
                render={({ message }) => (
                  <p className="text-red-500 ">{message}</p>
                )}
              />
            )}
          </div>
          <input
            type="text"
            value={address || ''}
            className={`${
              errors.adress && !address ? 'border-red-500' : 'border-gray-300'
            } rounded-md border border-gray-300 px-[8px] py-[6px] outline-none`}
            {...register('adress', {
              required: '* 주소를 입력해 주세요',
              validate: (value) => (value ? true : false),
            })}
            onClick={onOpenAddress}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between py-[8px]">
            <p className="font-bold">상세 주소</p>
            <ErrorMessage
              errors={errors}
              name="detailAddress"
              render={({ message }) => (
                <p className="text-red-500 ">{message}</p>
              )}
            />
          </div>
          <input
            type="text"
            className={`${
              errors.detailAddress && 'border-red-500'
            } rounded-md border border-gray-300 px-[8px] py-[6px] outline-none`}
            {...register('detailAddress', {
              required: '* 상세 주소를 입력해 주세요',
            })}
          />
        </div>
        <div className="mx-auto pt-[24px]">
          <button
            type="submit"
            className="h-[40px] w-[100px] rounded-md bg-blue-500 text-white"
          >
            추가
          </button>
        </div>
        {addressOpened && (
          <div>
            <DaumPostcode
              className="absolute left-0 top-0"
              onComplete={getAddress}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default AddStore;
