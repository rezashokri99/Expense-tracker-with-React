import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import EditCmp from "./EditCmp"

const TransActionComponent = ({ transActions, deleteHandler, editHandler }) => {
  const [searchItem, setSearchItem] = useState("");
  const [filterTransAction, setFilterTransAction] = useState(transActions);





  const filterTransActionFn = (search) => {
    if (!search || search === "") {
    return setFilterTransAction(transActions);
    }else {
        const filter = transActions.filter((transAction) =>
          transAction.desc.toLowerCase().includes(search.toLowerCase())
        );
      

        setFilterTransAction(filter);
    }
  };

  const changeSearch = (e) => {
    setSearchItem(e.target.value);
    filterTransActionFn(e.target.value);
  };


  useEffect(()=> {
    filterTransActionFn(searchItem)  
    setFilterTransAction(transActions)
  },[transActions])





  return (
    <div className="transactionsContainer">
      <p>Transactions</p>
      <input className="searchInput"type="text" value={searchItem} onChange={changeSearch} placeholder="Search for Transaction" />
      
      
      
      {transActions.length === 0 ? (
        <p>Please add your expenses</p>
      ) : (
        filterTransAction.map((transAction) => {
          return (
            <div
              key={transAction.id}
              className="transaction"
              style={{
                borderRight: transAction.type === "expense" && "4px solid red",
              }}
            >
              <span>{transAction.desc}</span>
              <div>
                <span>${transAction.amount}</span>

                <a onClick={() => deleteHandler(transAction.id)} className="deleteIcon" >
                  <FaTrash />
                </a>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TransActionComponent;
