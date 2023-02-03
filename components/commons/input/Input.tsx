import { IForm } from "@/pages/msg";
import { SetStateAction, Dispatch } from "react";

import style from "./Input.module.css";
interface IPropsInput {
  name: string;
  register: Function;
  error?: string;
  placeholder?: string;
}
export default function Input({
  name,
  register,
  error,
  placeholder,
}: IPropsInput) {
  return (
    <>
      <div className={style.input}>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          {...register(name)}
        />
      </div>
      <div className={style.error}>{error}</div>
    </>
  );
}
