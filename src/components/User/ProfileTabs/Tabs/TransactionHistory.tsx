import React, { useCallback, useEffect, useState } from "react";
import { useGetTransactionsMutation } from "@/api/blockchainApi";
import { format, parse } from "date-fns";
import { formatRelativeWithOptions } from "date-fns/fp";
import { enGB } from "date-fns/locale";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  ChevronRightIcon,
  CopyIcon,
} from "@/components/Common/Icons";
import { TRANSACTION_PAGE_LIMIT } from "@/constants/app.constants";
import { TransactionTypes, TransactionUi } from "@/types/blockchain.type";
import Link from "next/link";
import { toast } from "react-toastify";
import { useTranslate } from "@/providers/translate.provider";
import Loader from "@/components/Common/Loader";
import { UserProfileType } from "@/types/user.type";
import Pagination from "@/components/Common/Pagination";

const TransactionHeader = ({ type }: { type: string }) => {
  const { _t } = useTranslate();
  const transactionTypeText = (type: string) => {
    switch (type) {
      case TransactionTypes.RECEIVED_NFT:
        return _t("Received NFT");
      case TransactionTypes.RECEIVED_HBAR:
        return _t("Received HBAR");
      case TransactionTypes.TRANSFERRED_NFT:
        return _t("Transferred NFT");
      case TransactionTypes.TRANSFERRED_HBAR:
        return _t("Transferred HBAR");
      default:
        return _t("Transaction");
    }
  }
  let isReceived = false;
  if (type === TransactionTypes.RECEIVED_HBAR || type === TransactionTypes.RECEIVED_NFT) {
    isReceived = true;
  }
  return (
    <div className={`flex gap-x-2 items-center ${isReceived ? "text-green" : ""}`}>
      {isReceived ? <ArrowDownLeftIcon /> : <ArrowUpRightIcon />}
      <div className="text-sm">
        {transactionTypeText(type)}
      </div>
    </div>
  );
}

type SortedTransactions = {
  [date: string]: TransactionUi[];
};

type Props = {
  userProfile: UserProfileType;
  isOwner?: boolean;
};

const TransactionHistory = ({ userProfile }: Props) => {
  const { _t } = useTranslate();

  const [transactions, setTransactions] = useState<SortedTransactions>({});
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const [getTransactionHistory, getTransactionHistoryStatus] = useGetTransactionsMutation();

  const handleCopy = (transactionId: string) => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => {
        toast.success(_t("Copied to clipboard"));
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  const fetchTransactionHistory = useCallback(() => {
    getTransactionHistory({
      accountId: userProfile?.accountId,
      page,
      pageSize: TRANSACTION_PAGE_LIMIT,
    })
      .unwrap()
      .then((response) => {
        const { transactions, isLastPage } = response;
        let sortedTransactions: SortedTransactions = {};
        transactions.forEach((item) => {
          const clone: TransactionUi = { ...item, detailsOpen: false };
          const trData = format(new Date(item.transaction.consensus_timestamp), "dd-MM-yyyy");

          if (!sortedTransactions[trData]) {
            sortedTransactions[trData] = [];
          }
          sortedTransactions[trData].push(clone);

        });
        setIsLastPage(isLastPage);
        setTransactions(sortedTransactions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handleToggleTransaction = (key: string, index: number) => {
    const updatedTransactions = { ...transactions };
    updatedTransactions[key][index].detailsOpen =
      !updatedTransactions[key][index].detailsOpen;

    setTransactions(updatedTransactions);
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [page]);

  const formatRelativeLocale: any = {
    lastWeek: "EEEE",
    yesterday: "'Yesterday'",
    today: "'Today'",
    tomorrow: "EEEE",
    nextWeek: "EEEE",
    other: 'EEEE',
  };

  const locale = {
    ...enGB,
    formatRelative: (token: any) => formatRelativeLocale[token],
  };

  return (
    <div className="flex flex-col gap-8 p-12 w-full">
      <div className="text-lg font-semibold">{_t("Transaction history")}</div>
      <div className="relative">
        {getTransactionHistoryStatus.isLoading
          ? (
            <Loader />
          ) : (
            <>
              {Object.keys(transactions).map((key, index) => {
                return (
                  <div key={index} className="flex flex-col w-full gap-3 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{formatRelativeWithOptions({ locale }, new Date(), parse(key, "dd-MM-yyyy", new Date()))}</span>
                      <span className="text-sm">{format(parse(key, "dd-MM-yyyy", new Date()), "d LLL, uuuu")}</span>
                    </div>
                    {transactions[key].map((item, index) => (
                      <div key={`${item.transaction.id}-${index}-${key}`}>
                        <div
                          className="bg-sp-gray-800 p-4 text-16 cursor-pointer"
                          onClick={() => handleToggleTransaction(key, index)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-8">
                              <span className="text-sm">{format(new Date(item.transaction.consensus_timestamp), "H:mm")}</span>
                              <TransactionHeader type={item.transaction.type} />
                            </div>
                            <ChevronRightIcon
                              className={item.detailsOpen ? "rotate-180" : ""}
                            />
                          </div>
                        </div>
                        {item.detailsOpen && (
                          <div className="flex justify-between items-center px-24 pt-3">
                            <div className="flex flex-col items-start gap-3">
                              <span>{_t("Transaction ID")}</span>
                              <div className="flex gap-2">
                                <Link
                                  className="text-orange"
                                  target="blank"
                                  href={`${process.env.NEXT_PUBLIC_HASH_SCAN_TRANSACTIONS_URL}${item.transaction.id}`}
                                >
                                  {item.transaction.id}
                                </Link>
                                <CopyIcon className="cursor-pointer" onClick={() => handleCopy(item.transaction.id)} />
                              </div>
                            </div>
                            <div className="flex flex-col items-start gap-3">
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
            </>
          )}
      </div>
      <div className="flex w-full justify-end items-center">
        <Pagination page={page} setPage={setPage} isLastPage={isLastPage} />
      </div>
    </div>
  );
};

export default TransactionHistory;
