import { RootState } from "@/redux/store";
import { useState } from "react";
import styleHome from "./../styles/Home.module.css";
import style from "./../styles/Msg.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages } from "../redux/selectors";
import TextArea from "@/components/commons/textarea/TextArea";
import Input from "@/components/commons/input/Input";
import Button from "@/components/commons/button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Submit from "@/components/commons/submit/Submit";
import { addMessage } from "@/redux/appSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    author: yup.string().required("поле обязательное для заполнения"),
    text: yup.string().required("поле обязательное для заполнения"),
  })
  .required();

type IForm = {
  author: string;
  text: string;
};
export type { IForm };

export default function Index() {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => selectMessages(state));
  const [form, setform] = useState<IForm>({
    author: "",
    text: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
    setform({ author: "", text: "" });
    dispatch(addMessage(data));
  });

  return (
    <main>
      <div id="container">
        <div className={style.header}>
          <div className={styleHome.gradient}>
            <h2>Сообщения</h2>
          </div>
          {messages.map((msg) => {
            return (
              <article className={style.msg} key={msg.id}>
                <h2>{msg.author}</h2>
                <div className={style.text}>{msg.text}</div>
              </article>
            );
          })}
          <div className={style.formmessage}>
            <form onSubmit={onSubmit}>
              <Input
                register={register}
                name="author"
                value={form.author}
                setform={setform}
                form={form}
                error={errors.author?.message}
              />
              <TextArea
                register={register}
                name="text"
                form={form}
                value={form.text}
                setform={setform}
                error={errors.text?.message}
              />
              <label htmlFor="submit">
                <Button />
              </label>
              <Submit />
            </form>
            <br />
            <br />
          </div>
        </div>
      </div>
    </main>
  );
}
