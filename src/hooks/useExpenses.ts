
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api/expenses';
import Expense from '../types/Expense';
import { toast } from 'react-toastify';

export const useGetExpenses = () => {
  return useQuery<Expense[], Error>({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<Expense, Error, Omit<Expense, 'id'>>({
    mutationFn: createExpense,
    onSuccess: () => {
      toast.success('Expense added successfully!');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
    onError: (error) => {
      console.error('Error creating expense:', error);
      toast.error(error.message || 'Failed to add expense.');
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<Expense, Error, Expense>({
    mutationFn: updateExpense,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
    onError: (error) => {
      console.error('Error updating expense:', error);
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteExpense,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
    onError: (error) => {
      console.error('Error deleting expense:', error);
    },
  });
};
