import { ChangeEvent, Dispatch } from 'react';
import { formatMoney, unmaskInputMoney } from './formatters';

type onChangeMoneyInputProps = {
  fieldName?: string;
  setValue?: any;
  clearErrors?: any;
  setInputValue: Dispatch<React.SetStateAction<string>>;
  target?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
};

export function onChangeMoneyInput({
  fieldName,
  setValue,
  clearErrors,
  setInputValue,
  target,
}: onChangeMoneyInputProps) {
  const val = unmaskInputMoney(target?.target.value ?? formatMoney(0));

  clearErrors?.(fieldName);

  if (val < 0) {
    setValue?.(fieldName, 0);
    setInputValue?.(formatMoney(0));
    return;
  }

  setValue?.(fieldName, val);
  setInputValue?.(formatMoney(val));
  clearErrors?.(fieldName);
}
