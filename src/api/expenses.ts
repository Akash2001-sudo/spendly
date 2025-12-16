import axios from 'axios';
import Expense from '../types/Expense';

const API_URL = 'https://spendly-sehe.onrender.com/api/expenses';

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(API_URL);
  // The backend uses _id, so we map it to id for the frontend
  return response.data.map((expense: any) => ({ ...expense, id: expense._id }));
};

export const createExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  const response = await axios.post(API_URL, expense);
  return { ...response.data, id: response.data._id };
};

export const updateExpense = async (expense: Expense): Promise<Expense> => {
  const { id, ...rest } = expense;
  const response = await axios.put(`${API_URL}/${id}`, rest);
  return { ...response.data, id: response.data._id };
};

export const deleteExpense = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
