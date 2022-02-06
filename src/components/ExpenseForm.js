import React from 'react'
import { MdSend } from 'react-icons/md'

const ExpenseForm = ({ charge, amount, handleCharge, handleAmount, handleSubmit, edit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
                <div className='form-group'>
                    <label htmlFor='change'>charge</label>
                    <input
                        type='text'
                        className='form-control'
                        id='charge'
                        name='charge'
                        value={charge}
                        placeholder='e.g. rent'
                        onChange={handleCharge}
                    >
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor='change'>amount</label>
                    <input
                        type='text'
                        className='form-control'
                        id='charge'
                        name='charge'
                        value={amount}
                        placeholder='e.g. 1000'
                        onChange={handleAmount}
                    >
                    </input>
                </div>
            </div>
            <button type="submit" className="btn">
                {edit ? 'Edit' : 'Submit'}
                <MdSend className="btn-icon" /></button>
        </form>
    )
}

export default ExpenseForm

