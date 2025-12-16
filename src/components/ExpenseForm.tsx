import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { useCreateExpense } from '../hooks/useExpenses';

const ExpenseForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());

  const createExpense = useCreateExpense();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    createExpense.mutate({
      description,
      amount: parseFloat(amount),
      category,
      date: date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
    });
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date());
  };

  const CustomDateInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button className="btn custom-date-input" onClick={onClick} ref={ref}>
      <FaCalendarAlt />
      <span>{value || 'Select Date'}</span>
    </button>
  ));

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
            <label>Date</label>
            <DatePicker
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              customInput={<CustomDateInput />}
              dateFormat="yyyy-MM-dd"
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
