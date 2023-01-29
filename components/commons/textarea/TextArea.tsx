import style from "./Textarea.module.css";
import { IForm } from "@/pages/msg";
import { SetStateAction, Dispatch } from "react";
interface IPropsTextArea {
  name: string;
  register: Function;
  setform: Dispatch<SetStateAction<IForm>>;
  value: string;
  form: IForm;
  error?: string;
}
export default function TextArea({
  name,
  register,
  setform,
  value,
  form,
  error,
}: IPropsTextArea) {
  return (
    <>
      <div className={style.textArea}>
        <textarea
          name={name}
          {...register(name)}
          id="1"
          rows={10}
          style={{ width: "99%" }}
          placeholder="Текс сообщения"
          value={value}
          onChange={(e) => {
            setform({ ...form, [name]: e.target.value });
          }}
        ></textarea>
      </div>
      <div className={style.error}>{error}</div>
    </>
  );
}
