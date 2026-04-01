import { useState, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import ExpenseItem from './ExpenseItem';
import { useGetExpenses, useDeleteExpense } from '../hooks/useExpenses';
import { toast } from 'react-toastify';
import Expense from '../types/Expense';
import type { ExpenseFilters } from '../api/expenses';

const ExpenseList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [filters, setFilters] = useState<ExpenseFilters>({ sort: 'latest' });
  const { data: expenses = [], isLoading, isError } = useGetExpenses(filters);
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

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((current) => ({
      ...current,
      search: searchInput.trim() || undefined,
      category: categoryInput.trim() || undefined,
    }));
    setSelectedIds([]);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setCategoryInput('');
    setFilters({ sort: 'latest' });
    setSelectedIds([]);
  };

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
          <form className="expense-filters" onSubmit={handleApplyFilters}>
            <div className="expense-filters-grid">
              <div className="form-group expense-filter-field">
                <label htmlFor="expenseSearch">Search Description</label>
                <input
                  id="expenseSearch"
                  type="text"
                  className="form-control"
                  placeholder="Coffee, Uber, rent..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <div className="form-group expense-filter-field">
                <label htmlFor="expenseCategory">Category</label>
                <input
                  id="expenseCategory"
                  type="text"
                  className="form-control"
                  placeholder="Food, Travel..."
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                />
              </div>
              <div className="form-group expense-filter-field">
                <label htmlFor="expenseSort">Sort By</label>
                <select
                  id="expenseSort"
                  className="form-control"
                  value={filters.sort || 'latest'}
                  onChange={(e) =>
                    setFilters((current) => ({
                      ...current,
                      sort: e.target.value as ExpenseFilters['sort'],
                    }))
                  }
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Amount</option>
                  <option value="lowest">Lowest Amount</option>
                </select>
              </div>
            </div>
            <div className="expense-filters-actions">
              <button
                type="button"
                className="btn btn-secondary expense-filter-button"
                onClick={handleClearFilters}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary expense-filter-button">
                Apply
              </button>
            </div>
          </form>
          {expenses.length === 0 ? (
            <div className="alert alert-info text-center">
              No expenses match the current filters.
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
