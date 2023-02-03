import Button from "@/components/commons/button/Button";
import Checkbox from "@/components/commons/checkbox/Checkbox";
import Input from "@/components/commons/input/Input";
import Submit from "@/components/commons/submit/Submit";
import { useAppDispatch } from "@/hooks/hooks";
import { clear, getHistoryNumber, sendInputNumber } from "@/redux/numberSlice";
import {
  isLoadNumbers,
  isLoadNumbersHistory,
  selectCurrentNumber,
  selectHistoryNumber,
} from "@/redux/selectors";
import { RootState } from "@/redux/store";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styleNumber from "./../styles/Number.module.css";

interface IFormNumber {
  number: number;
  fractional: boolean;
  negative: boolean;
}

export default function Number() {
  const result = useSelector((store: RootState) => selectCurrentNumber(store));
  const resultHistory = useSelector((store: RootState) =>
    selectHistoryNumber(store)
  );
  const load = useSelector((store: RootState) => isLoadNumbers(store));
  const loadHistory = useSelector((store: RootState) =>
    isLoadNumbersHistory(store)
  );
  const { register, handleSubmit, reset, getValues } = useForm<IFormNumber>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHistoryNumber());
    dispatch(clear());
  }, [dispatch]);

  const onSubmit = handleSubmit(async (data) => {
    dispatch(sendInputNumber(data.number));
  });

  console.log(resultHistory);
  return (
    <div className={styleNumber.body}>
      <div>
        <form onSubmit={onSubmit}>
          <Input
            name="number"
            register={register}
            placeholder="Введите число"
          />
          <div className={styleNumber.groupchek}>
            <Checkbox
              title="Дробное число"
              name="fractional"
              register={register}
              getValues={getValues}
            />
            <Checkbox
              title="Отрицательное"
              name="negative"
              register={register}
              getValues={getValues}
            />
          </div>
          <label htmlFor="submit">
            <Button title="Добавить" />
          </label>
          <Submit />
        </form>
        <div className={styleNumber.header}>
          <h3>{!load ? "Вычесление..." : "Текущий результат"}</h3>
        </div>
        {result.length
          ? result.map((item, index) => {
              return (
                <div key={index + "result"}>
                  <div className={styleNumber.currentResult}>
                    <div className={styleNumber.title}>
                      Введеное число: {item.currentNumber}
                    </div>
                    <div className={styleNumber.title}>
                      Предыдущее число: {item.lastNumber}
                    </div>
                    <div className={styleNumber.title}>
                      Среднее значение: {item.currentAverage}
                    </div>
                  </div>
                </div>
              );
            })
          : "Нет текущих вычеслений"}

        <div className={styleNumber.header}>
          <h3>История вычислений</h3>
        </div>
        {loadHistory
          ? resultHistory
            ? resultHistory.map((item, index) => {
                return (
                  <div key={index + "resultHistory"}>
                    <div className={styleNumber.currentResult}>
                      <div className={styleNumber.title}>
                        Введеное число: {item.currentNumber}
                      </div>
                      <div className={styleNumber.title}>
                        Предыдущее число: {item.lastNumber}
                      </div>
                      <div className={styleNumber.title}>
                        Среднее значение: {item.currentAverage}
                      </div>
                    </div>
                  </div>
                );
              })
            : "Нет истории..."
          : "Загрузка"}
      </div>
    </div>
  );
}
