import { FaTrash } from 'react-icons/fa';
import Expense from '../types/Expense';
import { UseMutationResult } from '@tanstack/react-query';

interface ExpenseItemProps {
  expense: Expense;
  deleteExpense: UseMutationResult<void, Error, string, unknown>;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ExpenseItem = ({ expense, deleteExpense, isSelected, onSelect }: ExpenseItemProps) => {
  const isDeleting = deleteExpense.isPending && deleteExpense.variables === expense.id;

  return (
    <li className="list-group-item">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(expense.id)}
          id={expense.id}
        />
        <label className="form-check-label" htmlFor={expense.id}></label>
      </div>
      <div className="expense-details">
        <h5>{expense.description}</h5>
        <p className="mb-1">
          <span className="fw-bold">₹{expense.amount.toFixed(2)}</span> -
          <span className="text-muted"> {expense.category}</span>
        </p>
        <small className="text-muted">{expense.date}</small>
      </div>
      <button
        className="btn btn-danger btn-icon"
        onClick={() => deleteExpense.mutate(expense.id)}
        disabled={isDeleting}
      >
        <FaTrash />
      </button>
    </li>
  );
};

export default ExpenseItem;
