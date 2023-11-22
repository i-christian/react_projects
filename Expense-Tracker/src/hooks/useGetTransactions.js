import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const { userID } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = await getTransactions();
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  const getTransactions = async () => {
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt"),
      );

      return onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });

        setTransactions(docs);

        const balance = totalIncome - totalExpense;
        setTransactionTotals({
          balance: balance,
          expenses: totalExpense,
          income: totalIncome,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { transactions, transactionTotals };
};
