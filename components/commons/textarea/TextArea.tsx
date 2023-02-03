import style from "./Textarea.module.css";
import { IForm } from "@/pages/msg";
import { SetStateAction, Dispatch } from "react";
interface IPropsTextArea {
  name: string;
  register: Function;
  error?: string;
}
export default function TextArea({ name, register, error }: IPropsTextArea) {
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
        ></textarea>
      </div>
      <div className={style.error}>{error}</div>
    </>
  );
}
