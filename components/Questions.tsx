import * as React from 'react';
import * as timeago from 'timeago.js';
import { motion } from 'framer-motion';

import { styled, keyframes } from '../stitches.config';
import ArrowSvg from '../assets/arrow.svg';
import CheckSvg from '../assets/check.svg';
import BubbleSvg from '../assets/bubble.svg';
import { useStore } from '../stores/ama';
import {
  Answer as AnswerType,
  Question as QuestionType,
  Store,
} from '../types';
import useAddress from '../hooks/use-address';

const pulse = keyframes({
  '0%': { opacity: 'var(--opacity-start, 0)' },
  '100%': { opacity: 'var(--opacity-end, 1)' },
});

const List = styled('ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const Item = styled('li', {
  '& + &': {
    marginTop: '4rem',
  },
});

const Title = styled('h3', {
  fontSize: '1rem',
  fontWeight: '400',
  margin: 0,
  color: '$white70',
  maxWidth: '80%',
  lineHeight: '1.66',
  letterSpacing: '-0.025rem',
});

const Time = styled('time', {
  fontSize: '0.875rem',
  color: '$white40',
  flex: '0 0 auto',
  lineHeight: 1.66,
});

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 10,

  '&.is-loading': {
    color: '$white50',

    [`& ${Title}`]: {
      '--opacity-start': 0.2,
      '--opacity-end': 0.5,
      animation: `${pulse} 750ms infinite alternate ease-in-out`,
    },
    [`& ${Time}`]: {
      color: '$white20',
    },
  },
});

const Arrow = styled(ArrowSvg, {
  color: '$orange',
  flex: '0 0 auto',
  marginTop: 3,
  marginLeft: 5,
});

const Content = styled('div', {
  display: 'flex',
  gap: 10,
  marginTop: 5,
  lineHeight: '1.5',
  letterSpacing: '-0.025rem',
  color: '$white',
  alignItems: 'flex-start',
  position: 'relative',

  '&.is-loading': {
    color: '$white50',

    '& p': {
      '--opacity-start': 0.5,
      '--opacity-end': 0.8,
      animation: `${pulse} 750ms infinite alternate ease-in-out`,
    },

    [`& ${Arrow}`]: {
      '--opacity-start': 0.3,
      '--opacity-end': 0.6,
      animation: `${pulse} 750ms infinite alternate ease-in-out`,
    },
  },

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
});

const itemsSelector = (state: Store) => state.items;
const fetchQuestionsSelector = (state: Store) => state.fetchQuestions;
const sendAnswerSelector = (state: Store) => state.answer;
const getAnswerSelector = (state: Store) => state.getAnswer;

export default function Questions() {
  const items = useStore(itemsSelector);
  const fetchQuestions = useStore(fetchQuestionsSelector);

  React.useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  if (!items) {
    return;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: 1.2 }}
    >
      <List>
        {items
          .sort((a, b) => b.timestampAsNumber - a.timestampAsNumber)
          .map((item) => (
            <Question key={item.timestampAsNumber} item={item} />
          ))}
      </List>
    </motion.div>
  );
}

const NoAnswer = styled('p', {
  fontSize: '0.875rem',
  color: '$white40',
  margin: 0,
  marginTop: 10,
});

const Bubble = styled(BubbleSvg, {
  color: '$orange75',
  width: 21,
  '&:hover': {
    color: '$orange',
  },
});

const Reveal = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: '$white60',
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
  marginTop: 4,
  fontSize: '0.75rem',
  lineHeight: 1,
  textTransform: 'uppercase',
  letterSpacing: '0.05rem',
  paddingBottom: 10,

  '& span': {
    opacity: '0',
    transform: 'translateX(1rem)',
    transition: 'all 200ms ease-out',
  },

  '&:hover span': {
    opacity: '1',
    transform: 'translateX(0)',
  },
});

const AnswerForm = styled('div', {
  marginTop: 16,
  position: 'relative',
  width: '100%',

  '& textarea': {
    background: '$black50',
    display: 'block',
    width: '100%',
    height: '7em',
    border: '1px solid $white20',
    borderRadius: 3,
    color: '$white',
    fontFamily: '$sans',
    fontSize: '1rem',
    lineHeight: 1.5,
    padding: '.5rem 7.5rem .5rem .75rem',
    resize: 'none',

    '&:focus': {
      outline: 'none',
      borderColor: '$white50',
    },
  },
  '& button': {
    position: 'absolute',
    bottom: 8,
    right: 8,
    background: '$orange',
    color: '$white',
    fontSize: '.85rem',
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    border: 0,
    borderRadius: 3,
    padding: '.5em 1em',
    cursor: 'pointer',
    zIndex: 1,

    '&:disabled': {
      background: 'transparent',
      color: '$white20',
      cursor: 'default',
    },
  },
});

const Success = styled('p', {
  color: '$green',
  fontSize: '0.875rem',
  margin: 0,
  marginTop: 10,
});

function Question({ item }: { item: QuestionType }) {
  const [newAnswer, setNewAnswer] = React.useState('');
  const sendAnswer = useStore(sendAnswerSelector);
  const getAnswer = useStore(getAnswerSelector);
  const { address } = useAddress();

  const { timestampAsNumber, text, loading, added } = item;
  const { answer } = item;
  const createdAt = timeago.format(timestampAsNumber);
  const isOwner =
    Number(address) === Number(process.env.NEXT_PUBLIC_OWNER_ADDRESS);

  return (
    <Item>
      <Header className={loading ? 'is-loading' : ''}>
        <Title>{text}</Title>
        <Time>{createdAt}</Time>
      </Header>
      {!loading && (
        <>
          {added && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Success>
                🎉 Thank you for participating, you are part of the blockchain
                now!
              </Success>
            </motion.div>
          )}
          {!added && answer == null && (
            <Reveal type="button" onClick={() => getAnswer(item)}>
              <Bubble />
              <span>Reveal answer</span>
            </Reveal>
          )}

          {answer?.text === '' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <NoAnswer>This question hasn’t been answered yet.</NoAnswer>
              {isOwner && (
                <AnswerForm>
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                  />
                  <button
                    type="button"
                    disabled={newAnswer === ''}
                    onClick={() => sendAnswer(item, newAnswer)}
                  >
                    Answer
                  </button>
                </AnswerForm>
              )}
            </motion.div>
          )}

          {answer?.text.length > 0 && <Answer {...answer} />}
        </>
      )}
    </Item>
  );
}

const Check = styled(CheckSvg, {
  color: '$green',
  width: 20,
  animation: `300ms ease-out 200ms 1 backwards ${pulse}`,
  position: 'absolute',
  top: 5,
  left: '100%',
});

function Answer({ text, loading, added }: AnswerType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Content className={loading ? 'is-loading' : ''}>
        <Arrow />
        <div>
          <p>{text}</p>
          {added && <Check />}
        </div>
      </Content>
    </motion.div>
  );
}
