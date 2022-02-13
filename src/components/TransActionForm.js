import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";

const TransActionForm = ({ addTransAction, setIsShow }) => {
  const alert = useAlert();

  const inputRef = useRef()

  const [formValue, setFormValue] = useState({
    desc: "",
    amount: "",
    type: "income",
  });

  const formHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (formValue.desc === "" || !formValue.desc) {
      alert.show(
        <div
          style={{ fontSize: "14px", letterSpacing: ".7px", marginLeft: "7px" }}
        >
          Please fill the description entry !
        </div>
      );
    } else if (formValue.amount === "" || !formValue.amount) {
      alert.show(
        <div
          style={{ fontSize: "14px", letterSpacing: ".7px", marginLeft: "7px" }}
        >
          Please fill the amount entry !
        </div>
      );
    } else if (formValue.amount.includes("e")) {
      alert.show(
        <div
          style={{ fontSize: "14px", letterSpacing: ".7px", marginLeft: "7px" }}
        >
          Please fill the amount with number type !
        </div>
      );
    } else {
      alert.show("Success !", {
        timeout: 2000, // custom timeout just for this one alert
        type: "success",
      });
      addTransAction(formValue);
      setIsShow(false);
    }
  };


  useEffect(()=> {
    inputRef.current.focus()
  }, [])

  return (
    <form className="form" onSubmit={submitForm}>
      <div className="inputs">
        <input
          ref={inputRef}
          type="text"
          placeholder="description"
          value={formValue.desc}
          name="desc"
          onChange={formHandler}
        />
        <input
          type="number"
          placeholder="amount"
          value={formValue.amount}
          name="amount"
          onChange={formHandler}
        />
      </div>

      <div className="radioBox">
        <div>
          <input
            type="radio"
            value="income"
            onChange={formHandler}
            name="type"
            checked={formValue.type === "income"}
            id="income"
          />
          <label htmlFor="income">Income</label>
        </div>

        <div>
          <input
            type="radio"
            value="expense"
            onChange={formHandler}
            name="type"
            checked={formValue.type === "expense"}
            id="expense"
          />
          <label htmlFor="expense">Expense</label>
        </div>
      </div>

      <button
        type="submit"
        className={`btn addTransAction ${
          formValue.type === "expense" && "cancelAdd"
        }`}
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransActionForm;
