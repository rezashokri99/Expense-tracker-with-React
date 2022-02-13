/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import TransActionComponent from "./TransActionComponent";
import TransActionForm from "./TransActionForm";
import { useAlert } from "react-alert";



const expenseInitial = () => {
  let localTodos = JSON.parse(localStorage.getItem("expense"))
  let todos;
  if (localTodos) {
    todos = localTodos;
  }else {
      todos = 0 
  }
  return todos;
}

const incomeInitial = () => {
  let localTodos = JSON.parse(localStorage.getItem("income"))
  let todos;
  if (localTodos) {
    todos = localTodos;
  }else {
      todos = 0 
  }
  return todos;
}

const transActionsInitial = () => {
  let localTodos = JSON.parse(localStorage.getItem("transActions"))
  let todos;
  if (localTodos) {
    todos = localTodos;
  }else {
      todos = [];
  }
  return todos;
}


const ExpenseApp = () => {
  const [expense, setExpense] = useState(expenseInitial());
  const [income, setIncome] = useState(incomeInitial());
  const [isShow, setIsShow] = useState(false);
  const [transActions, setTransActions] = useState(transActionsInitial());

  const alert = useAlert();




  const addTransAction = (newTrans) => {
    setTransActions([
      ...transActions,
      { ...newTrans, id: transActions.length },
    ]);
    newTrans.type === "expense"
      ? setExpense((prevExpense) => prevExpense + parseInt(newTrans.amount))
      : setIncome((prevIncome) => prevIncome + parseInt(newTrans.amount));

  };

  const deleteHandler = (id) => {
    const testTrx = transActions;
    // testTrx.map((transAction) => {
    //   if (transAction.id === id) {
    //     testTrx.splice(id, 1);
    //   }
    // })
    // setTransActions(testTrx);
  
    const item = testTrx.filter((transAction) => transAction.id === id);
    const filtered = testTrx.filter((transAction) => transAction.id !== id);
    setTransActions(filtered)
    item[0].type === "expense"
      ? setExpense((prevExpense) => prevExpense - parseInt(item[0].amount))
      : setIncome((prevIncome) => prevIncome - parseInt(item[0].amount));


      filtered.map((transAction, index) => {
        transAction.id = index;
      })
      
      
      localStorage.setItem("transActions", JSON.stringify(filtered))

      alert.show(
        <div
          style={{ fontSize: "14px", letterSpacing: ".7px", marginLeft: "7px" }}
        >
          you Deleted ({item[0].desc})  !
        </div>
      )

      return testTrx;
  }



  useEffect(() => {
    localStorage.setItem(("transActions"), JSON.stringify(transActions))
    localStorage.setItem(("expense"), JSON.stringify(expense))
    localStorage.setItem(("income"), JSON.stringify(income))
  }, [transActions])

  return (
    <>
        <div className="ExpenseContainer">
            <div className="balanceContaiener">
                <p className="balance">
                Balance:{" "}
                <span className={`${income < expense && "red"} ${income > expense && "green"}`} >
                    {income - expense} $
                </span>
                </p>
                <button
                className={`btn ${isShow && "cancel"}`}
                onClick={() => setIsShow((prevShow) => !prevShow)}
                >
                {isShow ? "CANCEL" : "ADD"}
                </button>
            </div>

            {isShow && <TransActionForm addTransAction={addTransAction} setIsShow={setIsShow}/>}

            <div className="result">
                <p>
                Expense: <span style={{ color: "red" }}>{expense} $</span>
                </p>
                <p>
                Income: <span>{income} $</span>
                </p>
            </div>
        </div>
        <TransActionComponent transActions={transActions} deleteHandler={deleteHandler} />

    </>
  );
};

export default ExpenseApp;
