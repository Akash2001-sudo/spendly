import { useState, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import ExpenseItem from './ExpenseItem';
import { useGetExpenses, useDeleteExpense } from '../hooks/useExpenses';
import { toast } from 'react-toastify';
import Expense from '../types/Expense';

const ExpenseList = () => {
  const { data: expenses = [], isLoading, isError } = useGetExpenses();
  const deleteExpense = useDeleteExpense();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(expenses.map((exp: Expense) => exp.id));
    } else {
      setSelectedIds([]);
    }
  }, [expenses]);

  const handleSelect = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  if (isError) {
    toast.error("Error fetching expenses.");
    return <div className="alert alert-danger">Error fetching expenses.</div>;
  }

  const handleDeleteSelected = async () => {
    const allExpensesSelected = selectedIds.length === expenses.length;
    setIsBulkDeleting(true);
    const deletePromises = selectedIds.map((id) => deleteExpense.mutateAsync(id));

    try {
      await Promise.all(deletePromises);
      if (allExpensesSelected) {
        toast.success("Woohoo!!! All expenses cleared");
      } else {
        toast.success(`${selectedIds.length} expenses deleted.`);
      }
    } catch (error) {
      console.error("Error deleting expenses:", error);
      toast.error("Error deleting expenses.");
    } finally {
      setIsBulkDeleting(false);
      setSelectedIds([]);
    }
  };

  const totalExpenses = expenses.reduce((acc: number, expense: Expense) => acc + expense.amount, 0);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Expenses</h5>
            <div className="d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={expenses.length > 0 && selectedIds.length === expenses.length}
                  title="Select All"
                  id="selectAllExpenses"
                />
                <label className="form-check-label" htmlFor="selectAllExpenses"></label>
              </div>
              <button
                className="btn btn-danger btn-icon"
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0 || isBulkDeleting}
                title="Delete Selected"
                aria-label="Delete Selected Expenses"
              >
                {isBulkDeleting ? <div className="spinner"></div> : <FaTrash />}
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          {expenses.length === 0 ? (
            <div className="alert alert-info text-center">
              No spendings yet!
            </div>
          ) : (
            <ul className="list-group">
              {expenses.map((expense: Expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  deleteExpense={deleteExpense}
                  isSelected={selectedIds.includes(expense.id)}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="card-footer text-end">
          <strong>Total:</strong> ₹{totalExpenses.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default ExpenseList;
