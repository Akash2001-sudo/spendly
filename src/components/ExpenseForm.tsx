import { useState } from 'react';
import { useCreateExpense } from '../hooks/useExpenses';

const ExpenseForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const createExpense = useCreateExpense();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExpense.mutate({
      description,
      amount: parseFloat(amount),
      category,
      date,
    });
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Add Expense</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={createExpense.isPending}>
            {createExpense.isPending ? (
              <>
                <div className="spinner"></div>
                Adding...
              </>
            ) : (
              'Add Expense'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
