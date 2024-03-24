import {
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

interface Transaction {
  description: string;
  transactionAmount: number;
  transactionType: string;
  key: string;
}

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const createdAt = serverTimestamp();

  const addTransaction = async (transaction: Transaction) => {
    const { description, transactionAmount, transactionType, key } = transaction;
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt,
      key,
    });
  };

  const removeTransaction = async (transactionId: string) => {
    const transactionDocRef = doc(db, "transactions", transactionId);
    await deleteDoc(transactionDocRef);
  };

  return { addTransaction, removeTransaction };
};
