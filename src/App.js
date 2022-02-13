import React from 'react';

import "./App.css"
import ExpenseApp from './components/ExpenseApp';

const App = () => {

  return (
    <div className='App'>
      <header className='title'>Expense Tracker</header>
      <ExpenseApp />
    </div>
  );
}

export default App;