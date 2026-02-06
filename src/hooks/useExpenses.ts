
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api/expenses';
import Expense from '../types/Expense';

export const useGetExpenses = () => {
  return useQuery<Expense[], Error>({
    queryKey: ['expenses'],
    queryFn: getExpenses,
    onError: (error) => {
      console.error('Error fetching expenses:', error);
    },
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<Expense, Error, Omit<Expense, 'id'>>({
    mutationFn: createExpense,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
    onError: (error) => {
      console.error('Error creating expense:', error);
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
