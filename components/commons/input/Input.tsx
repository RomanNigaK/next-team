import { IForm } from "@/pages/msg";
import { SetStateAction, Dispatch } from "react";
import { setFlagsFromString } from "v8";
import style from "./Input.module.css";
interface IPropsInput {
  name: string;
  register: Function;
  setform: Dispatch<SetStateAction<IForm>>;
  value: string;
  form: IForm;
  error?: string;
}
export default function Input({
  name,
  register,
  value,
  setform,
  form,
  error,
}: IPropsInput) {
  return (
    <>
      <div className={style.input}>
        <input
          type="text"
          placeholder="Автор"
          name={name}
          {...register(name)}
          value={value}
          onChange={(e) => {
            setform({ ...form, [name]: e.target.value });
          }}
        />
      </div>
      <div className={style.error}>{error}</div>
    </>
  );
}
