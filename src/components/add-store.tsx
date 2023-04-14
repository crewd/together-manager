import { ErrorMessage } from '@hookform/error-message';
import { useCallback, useEffect, useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Store, StoreForm } from '../types/store.type';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { StoreActionTypes, addStore } from '../store/modules/store';

function AddStore({ onClose }: { onClose: () => void }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<StoreForm>();

  const [addressOpened, setAddressOpened] = useState(false);
  const [address, setAddress] = useState('');

  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, StoreActionTypes>>();

  const addStoreDispatch: SubmitHandler<StoreForm> = useCallback(
    (data) => {
      const fullAddress = `${data.address} ${data.detailAddress}`;
      const formData: Store = {
        storeName: data.storeName,
        address: fullAddress,
        startTime: data.startTime,
        endTime: data.endTime,
      };
      dispatch(addStore(formData));
      onClose();
    },
    [dispatch, onClose],
  );

  useEffect(() => {
    setValue('address', address);
  }, [address, setValue]);

  const onOpenAddress = useCallback(() => {
    setAddressOpened(true);
  }, []);

  const getAddress = useCallback((data: Address) => {
    setAddress(data.address);
    setAddressOpened(false);
  }, []);

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
      <div
        className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-600/50"
        onClick={onClose}
      />
      <form
        className="relative flex h-screen w-screen flex-col bg-white p-[24px] md:h-[400px] md:w-[400px] md:rounded-xl"
        onSubmit={handleSubmit(addStoreDispatch)}
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
              className="absolute top-0 left-0"
              onComplete={getAddress}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default AddStore;
