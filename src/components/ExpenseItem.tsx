import Expense from '../types/Expense';
import { UseMutationResult } from '@tanstack/react-query';

interface ExpenseItemProps {
  expense: Expense;
  deleteExpense: UseMutationResult<void, Error, string, unknown>;
}

const ExpenseItem = ({ expense, deleteExpense }: ExpenseItemProps) => {
  const isDeleting = deleteExpense.isPending && deleteExpense.variables === expense.id;

  return (
    <li className="list-group-item">
      <div>
        <h5>{expense.description}</h5>
        <p className="mb-1">
          <span className="fw-bold">₹{expense.amount.toFixed(2)}</span> -
          <span className="text-muted"> {expense.category}</span>
        </p>
        <small className="text-muted">{expense.date}</small>
      </div>
      <button
        className="btn btn-danger"
        onClick={() => deleteExpense.mutate(expense.id)}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <div className="spinner"></div>
        ) : (
          'Delete'
        )}
      </button>
    </li>
  );
};

export default ExpenseItem;
