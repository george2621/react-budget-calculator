import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList.js'
import ExpenseForm from './components/ExpenseForm.js'
import Alert from './components/Alert.js'
import { v4 as uuidv4 } from 'uuid';

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 1200 }
// ]

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleCharge = e => {
    setCharge(e.target.value)
  }

  const handleAmount = e => {
    setAmount(e.target.value)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })

    }, 3000)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== ' ' && amount > 0) {
      if (edit) {

        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited' });

      } else {

        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([singleExpense, ...expenses]);
        handleAlert({ type: 'success', text: 'item added' });

      }
      setCharge('');
      setAmount('');

    } else {
      handleAlert({ type: 'danger', text: `charge can't be empty and amount has to be bigger than zero` })
    }
  }


  const clearItems = () => {
    setExpenses([])
    handleAlert({ type: 'danger', text: `all items deleted` })

  }

  const handleDelete = (id) => {
    console.log(`Delete item with id ${id}`);
    const newExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: 'danger', text: `item deleted` })

  }

  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount)
    setEdit(true);
    setId(id);
    console.log(`Edit item with id ${id}`);
  }

  const total = expenses.reduce((acc, curr) => { return acc += Number(curr.amount) }, 0);

  return <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
    <Alert />
    <h1>budget calculator</h1>
    <main className="App">
      <ExpenseForm
        amount={amount}
        charge={charge}
        handleAmount={handleAmount}
        handleCharge={handleCharge}
        handleSubmit={handleSubmit}
        edit={edit} />
      <ExpenseList
        expenses={expenses}
        clearItems={clearItems}
        handleDelete={handleDelete}
        handleEdit={handleEdit} />
    </main>
    <h1>total spending:<span className="total">${total}</span></h1>
  </>
}

export default App;
