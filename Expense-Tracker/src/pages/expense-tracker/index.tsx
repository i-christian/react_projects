import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { v4 as uuidv4 } from "uuid";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Transaction {
  description: string;
  transactionAmount: number;
  transactionType: string;
  key: string;
  createdAt?: any;
}

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const [description, setDescription] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<string>("expense");

  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = uuidv4();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
      key,
    });
    setDescription("");
    setTransactionAmount(0);
  };

  const singUserOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove("auth");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const currentMonthTransactions = (transactions: Transaction[]) => {
    const currentMonth = new Date().getMonth() + 1;
    return transactions.filter((transaction) => {
      const createdAt = transaction.createdAt;
      if (createdAt && createdAt.seconds) {
        const transactionMonth =
          new Date(createdAt.seconds * 1000).getMonth() + 1;
        return transactionMonth === currentMonth;
      }
      return false;
    });
  };

  const displayTransactions = (
    filteredTransactions: Transaction[],
    title: string
  ) => (
    <section className="border p-2 dark:border-blue-700 h-52 overflow-auto">
      <h4 className="text-xl">{title}</h4>
      <ul className="p-3">
        {filteredTransactions.map((transaction) => (
          <li
            key={transaction.key}
            className="border border-slate-900 p-4"
          >
            <h4 className="text-xl italic ">{transaction.description}</h4>
            <p>
              {transaction.transactionAmount.toLocaleString()} -{" "}
              {transaction.createdAt
                ? new Date(
                    transaction.createdAt.seconds * 1000
                  ).toLocaleString()
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );

  const incomeTransactions = currentMonthTransactions(transactions).filter(
    (transaction) => transaction.transactionType === "income"
  );

  const expenseTransactions = currentMonthTransactions(transactions).filter(
    (transaction) => transaction.transactionType === "expense"
  );

  return (
    <main className="dark:bg-indigo-950 overflow-auto dark:text-white m-auto">
      <article className="flex flex-col pt-4 pb-4 w-4/5 justify-center sm:items-center">
        <h1 className=" bg-slate-400 w-fit p-2 dark:text-black rounded-full text-xl text-left ml-4 text-wrap pb-2 sm:text-center">
          {name.split(' ')[0]}
          <span className="hidden sm:inline">'s Expense Tracker</span>
        </h1>

        <article className="flex flex-row p-4 sm:p-2 gap-1 bg-slate-200 dark:bg-slate-400 rounded-3xl m-auto mb-4 mt-4 w-fit sm:w-4/5 dark:text-black">

          <section className="border-0 border-r-8 border-sky-500 p-8 m-auto">
            <h3 className="text-xl">Balance</h3>
            <h2 className="text-center">{balance.toLocaleString()}</h2>
          </section>

          <section className="flex flex-col justify-center items-center sm:flex-row gap-2 p-2 sm:p-0 m-auto">
            <section>
              <h3 className="text-xl sm:m-auto sm:pr-4 sm:border-0 sm:border-r-8 sm:border-sky-500 ">
                INCOME
              </h3>
              <p className="text-center  sm:m-auto sm:border-0 sm:border-r-8 sm:border-sky-500">
                {income.toLocaleString()}
              </p>
            </section>
            <section>
              <h3 className="text-xl">EXPENSES</h3>
              <p className="text-center">{expenses.toLocaleString()}</p>
            </section>
          </section>
        </article>

        <form onSubmit={onSubmit}>
          <section className="flex flex-col gap-2 w-4/5 m-auto">
            <input
              className="rounded-full p-2 border-4 text-black border-slate-400"
              name="description"
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="rounded-full p-2 border-4 text-black border-slate-400"
              name="amount"
              type="number"
              placeholder="amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(Number(e.target.value))}
            />
          </section>
          <section className="flex flex-row items-center justify-center gap-4 text-xl pl-8">
            <input
              type="radio"
              id="expense"
              value="expense"
              className="default:ring-4 hover:cursor-pointer"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense" className="hover:cursor-pointer">
              Expense
            </label>

            <input
              type="radio"
              id="income"
              value="income"
              className="ring-4 hover:cursor-pointer"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income" className="hover:cursor-pointer">
              Income
            </label>

            <button
              type="submit"
              className="mt-2 rounded-md p-2 cursor-pointer w-24 h-10 bg-blue-500 dark:bg-blue-700"
            >
              Add
            </button>
          </section>
        </form>
      </article>

      {profilePhoto && (
        <section className="flex flex-col gap-1 absolute sm:absolute top-0 sm:top-0 right-0 sm:right-0 mt-3 sm:mt-8 mr-6 sm:mr-12">
          <img
            src={profilePhoto}
            className="hidden sm:inline-block rounded-full dark:border-blue-700 w-24"
          ></img>
          <button
            onClick={singUserOut}
            className="mt-2 rounded-md p-2 cursor-pointer w-fit  bg-blue-500 dark:bg-blue-700"
          >
            Sign Out
          </button>
        </section>
      )}

      <article className="sm:mt-8 sm:p-4 pt-2 border-0 border-t-8 border-slate-500">
        <h3 className="text-2xl text-center mb-4">Transaction History</h3>
        <section
            className="text-black text-center flex flex-col gap-4 sm:flex-row justify-center sm:p-4 bg-slate-200 dark:bg-slate-400 rounded-3xl h-fit w-4/5 m-auto overflow-y-auto "
        >
            {displayTransactions(incomeTransactions, "Income Transactions")}
            {displayTransactions(expenseTransactions, "Expense Transactions")}

        </section>
      </article>
    </main>
  );
};
