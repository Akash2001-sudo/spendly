import ExpenseItem from './ExpenseItem';
import { useGetExpenses, useDeleteExpense } from '../hooks/useExpenses';

const ExpenseList = () => {
  const { data: expenses, isLoading, isError } = useGetExpenses();
  const deleteExpense = useDeleteExpense();

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  if (isError || !expenses) {
    return <div className="alert alert-danger">Error fetching expenses.</div>;
  }

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="card">
      <div className="card-header">
        <h5>Expenses</h5>
      </div>
      <div className="card-body">
        {expenses.length === 0 ? (
          <div className="alert alert-info text-center">
            No spendings yet!
          </div>
        ) : (
          <ul className="list-group">
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                deleteExpense={deleteExpense}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="card-footer text-end">
        <strong>Total:</strong> ₹{totalExpenses.toFixed(2)}
      </div>
    </div>
  );
};

export default ExpenseList;
