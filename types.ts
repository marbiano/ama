import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';

type AsyncRequest = {
  loading?: boolean;
  added?: boolean;
  error?: string | null;
};

export type Answer = AsyncRequest & {
  text?: string;
};

export type Question = AsyncRequest & {
  creator: string;
  text: string;
  timestamp: BigNumber;
  timestampAsNumber: number;
  answer?: Answer;
};

export type Store = {
  contract: Contract;
  items: Question[];
  loading?: boolean;
  fetchQuestions: () => void;
  ask: (text: string) => void;
  getAnswer: (question: Question) => void;
  answer: (question: Question, text: string) => void;
};
