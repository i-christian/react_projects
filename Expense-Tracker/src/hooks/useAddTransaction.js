import {
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const createdAt = serverTimestamp();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
    key,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt,
      key,
    });
  };

  const removeTransaction = async (transactionId) => {
    const transactionDocRef = doc(db, "transactions", transactionId);
    await deleteDoc(transactionDocRef);
  };

  return { addTransaction, removeTransaction };
};
