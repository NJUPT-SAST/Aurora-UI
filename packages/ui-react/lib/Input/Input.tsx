import React, { useState, type ChangeEvent, useEffect } from 'react';
import styles from './Input.module.scss';
import classnames from 'classnames';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The width of the Input.
   */
  width?: number;
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean;
  /**
   * label,the label of the input
   */
  label?: React.ReactNode;
  /**
   * The type of the mode.
   */
  mode?: 'text' | 'password';
  /**
   * placeholder,the placeholder of the input
   */
  placeholder?: string;
  /**
   * placeholder,the placeholder of the input
   */
  fontsize?: number;
  /**
   * isFillFather, is ture the input fill the father
   */
  isFillFather?: boolean;
  /**
   * function(value:string, e:event) 输入框内容变化时的回调
   */
  onchange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * value ,the value of the input
   */
  value?: string;
  /**
   * defaultValue, the defaultValue of the input
   */
  defaultValue?: string;
  /**
   * isBorder? have the border of the input
   */
  isBorder?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      width = 250,
      disabled = false,
      label = '昵称',
      mode = 'text',
      placeholder = '',
      fontsize = 16,
      onchange,
      isFillFather = false,
      value,
      isBorder = true,
      defaultValue = '',
      ...rest
    },
    ref,
  ) => {
    //设置isUpLabel来调节Label上浮状态
    const [isUpInputLabel, setIsUpInputLabel] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(defaultValue);
    const InputClass = classnames(
      styles['base'],
      styles[disabled ? 'disabled' : ''],
      styles[isFillFather ? 'fill' : ''],
      styles[isBorder ? 'border' : ''],
    );
    useEffect(() => {
      if (placeholder) {
        setIsUpInputLabel(true);
      }
    }, [placeholder]);
    //设置，当input框里面没有内容时，placeHolder也没有内容时，将label框拉下
    const blurInput = () => {
      if (!inputValue && !placeholder && isUpInputLabel) {
        setIsUpInputLabel(false);
      }
    };
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onchange && onchange(e.target.value, e);
    };

    useEffect(() => {
      value !== undefined && setInputValue(value);
    }, [value]);

    return (
      <>
        <div
          className={InputClass}
          style={{ width: `${width}px`, fontSize: `${fontsize}px` }}
          onClick={() => !disabled && setIsUpInputLabel(true)}
        >
          <input
            id="input"
            className={styles['input']}
            ref={ref}
            placeholder={placeholder}
            type={mode}
            disabled={disabled}
            onChange={changeValue}
            onBlur={blurInput}
            autoComplete="off"
            autoSave="off"
            value={inputValue}
            {...rest}
          />
          <label
            htmlFor="input"
            className={`${styles['inputLabel']} ${
              inputValue || placeholder ? styles['isUpInputLabel'] : ''
            }`}
          >
            {label}
          </label>
        </div>
      </>
    );
  },
);

Input.displayName = 'Input';
