import style from "./Button.module.css";
interface IButtonProps {
  title: string;
}
export default function Button({ title }: IButtonProps) {
  return <div className={style.button}>{title}</div>;
}
