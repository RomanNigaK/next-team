import { RootState, wrapper } from "@/redux/store";
import { useState, useEffect } from "react";
import styleHome from "./../styles/Home.module.css";
import style from "./../styles/Msg.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages } from "../redux/selectors";
import TextArea from "@/components/commons/textarea/TextArea";
import Input from "@/components/commons/input/Input";
import Button from "@/components/commons/button/Button";
import { useForm } from "react-hook-form";
import Submit from "@/components/commons/submit/Submit";
import { addMessage, clearMessage } from "@/redux/messagesSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Context } from "next-redux-wrapper";

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

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     let gg = await store.dispatch(
//       addMessage({ author: "Anna", text: "112222111" })
//     );

//     return {
//       props: { data: gg },
//     };
//   }
// );

export async function getServerSideProps(context: Context) {
  let response = await fetch("http://localhost:3000/api/hello");
  let data = await response.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
export async function sedDataServer(message: IForm) {
  let response = await fetch("http://localhost:3000/api/hello", {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let data = await response.json();
  return data;
}

export default function Index({ data }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  console.log(data);

  const messages = useSelector((state: RootState) =>
    selectMessages(state, data).concat(data)
  );

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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    reset();

    let res = await sedDataServer(data);
    console.log(res);
    if (res.status === "ok") {
      dispatch(addMessage(data));
    }
    setform({ author: "", text: "" });
  });

  return (
    <main>
      <div id="container">
        <div className={style.header}>
          <div className={styleHome.gradient}>
            <h2>Сообщения</h2>
          </div>
          {messages
            ? messages.map((msg: any) => {
                return (
                  <article className={style.msg} key={msg.id}>
                    <h2>{msg.author}</h2>
                    <div className={style.text}>{msg.text}</div>
                  </article>
                );
              })
            : null}

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
