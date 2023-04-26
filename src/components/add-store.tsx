import { ErrorMessage } from '@hookform/error-message';
import { useCallback, useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Store, StoreForm } from '../types/store.type';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

function AddStore({ onClose }: { onClose: () => void }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<StoreForm>();

  const [addressOpened, setAddressOpened] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    setValue('address', address);
  }, [address, setValue]);

  const onOpenAddress = useCallback(() => {
    setAddressOpened(!addressOpened);
  }, [addressOpened]);

  const getAddress = useCallback((data: Address) => {
    setAddress(data.address);
    setAddressOpened(false);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div
        className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-gray-600/50"
        onClick={onClose}
      />
      <form
        className="relative flex h-screen w-screen flex-col bg-white p-[24px] md:h-auto md:w-[400px] md:rounded-xl"
        // onSubmit={handleSubmit()}
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
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => (
                <p className="text-red-500 ">{message}</p>
              )}
            />
          </div>
          <input
            type="text"
            value={address}
            className={`${
              errors.address ? 'border-red-500' : 'border-gray-300'
            } rounded-md border border-gray-300 px-[8px] py-[6px] outline-none`}
            {...register('address', {
              required: '* 주소를 입력해 주세요',
            })}
            autoComplete="off"
            onClick={onOpenAddress}
            onKeyDown={onOpenAddress}
            onChange={(e) => setAddress(e.target.value)}
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
        <div className="flex flex-col">
          <div className="flex justify-between py-[8px]">
            <p className="font-bold">오픈 시간</p>
            <ErrorMessage
              errors={errors}
              name="startTime"
              render={({ message }) => (
                <p className="text-red-500 ">{message}</p>
              )}
            />
          </div>
          <input
            type="time"
            className={`${
              errors.startTime && 'border-red-500'
            } rounded-md border border-gray-300 px-[8px] py-[6px] outline-none`}
            {...register('startTime', {
              required: '* 오픈 시간을 입력해 주세요',
            })}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between py-[8px]">
            <p className="font-bold">마감 시간</p>
            <ErrorMessage
              errors={errors}
              name="endTime"
              render={({ message }) => (
                <p className="text-red-500 ">{message}</p>
              )}
            />
          </div>
          <input
            type="time"
            className={`${
              errors.endTime && 'border-red-500'
            } rounded-md border border-gray-300 px-[8px] py-[6px] outline-none`}
            {...register('endTime', {
              required: '* 마감 시간을 입력해 주세요',
            })}
          />
        </div>
        <div className="flex w-full justify-center gap-6 pt-[24px]">
          <button
            type="button"
            className="h-[40px] w-[100px] rounded-md border border-gray-400 bg-white shadow-md hover:border-blue-500 hover:text-blue-500"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="submit"
            className="h-[40px] w-[100px] rounded-md bg-blue-500 text-white shadow-md"
          >
            추가
          </button>
        </div>
        {addressOpened && (
          <div className="absolute left-0 top-0 h-full w-full bg-white md:rounded-xl">
            <DaumPostcode onComplete={getAddress} />
            <div className="absolute bottom-16 flex w-full justify-center">
              <button
                className="h-[40px] w-[100px] rounded-md border border-gray-400 bg-white shadow-md hover:border-blue-500 hover:text-blue-500"
                onClick={onOpenAddress}
              >
                취소
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddStore;
