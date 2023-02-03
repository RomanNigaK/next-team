import { useState } from "react";
import style from "./Checkbox.module.css";
interface ICheckboxProps {
  title: string;
  name: string;
  register: Function;
  getValues: Function;
}

export default function Checkbox({
  title,
  name,
  register,
  getValues,
}: ICheckboxProps) {
  const [state, setstate] = useState(getValues(name));
  function click() {
    setstate(state ? false : true);
  }

  return (
    <>
      <div className={style.box}>
        <label htmlFor={name}>
          <div className={state ? style.circlechek : style.circle}></div>
        </label>
        <div
          className={
            state ? style.toggle + " " + style.toggleactive : style.toggle
          }
        >
          {title}
        </div>
      </div>

      <input
        type="checkbox"
        id={name}
        {...register(name)}
        onChange={click}
        style={{
          position: "absolute",
          marginTop: "-1000px",
          marginLeft: "-1000px",
        }}
      />
    </>
  );
}
