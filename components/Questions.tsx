import * as React from 'react';
import * as timeago from 'timeago.js';

import { styled } from '../stitches.config';
import ArrowSvg from '../assets/arrow.svg';
import { useStore } from '../stores/ama';
import {
  Answer as AnswerType,
  Question as QuestionType,
  Store,
} from '../types';

const List = styled('ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const Item = styled('li', {
  '& + &': {
    marginTop: '5rem',
  },
});

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const Title = styled('h3', {
  fontSize: '1rem',
  fontWeight: '400',
  margin: 0,
  color: '$white70',
  maxWidth: '80%',
  lineHeight: '1.5',
});

const Time = styled('time', {
  fontSize: '0.875rem',
  color: '$white40',
});

const Arrow = styled(ArrowSvg, {
  color: '$orange',
  flex: '0 0 auto',
  marginTop: 3,
});

const Content = styled('div', {
  display: 'flex',
  gap: 10,
  marginTop: 5,
  lineHeight: '1.5',
  letterSpacing: '-0.025rem',
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
  }, []);

  if (!items) {
    return;
  }

  return (
    <List>
      {items
        .sort((a, b) => b.timestampAsNumber - a.timestampAsNumber)
        .map((item) => (
          <Question key={item.timestampAsNumber} item={item} />
        ))}
    </List>
  );
}

function Question({ item }: { item: QuestionType }) {
  const [newAnswer, setNewAnswer] = React.useState('');
  const sendAnswer = useStore(sendAnswerSelector);
  const getAnswer = useStore(getAnswerSelector);
  const { timestampAsNumber, text, loading } = item;
  const { answer } = item;
  const createdAt = timeago.format(timestampAsNumber);

  return (
    <Item>
      <Header>
        <Title>{text}</Title>
        <Time>{createdAt}</Time>
      </Header>
      {!loading && (
        <>
          {answer == null && (
            <button type="button" onClick={() => getAnswer(item)}>
              Reveal answer
            </button>
          )}

          {answer?.text === '' && (
            <>
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button type="button" onClick={() => sendAnswer(item, newAnswer)}>
                Answer
              </button>
            </>
          )}

          {answer?.text.length > 0 && <Answer {...answer} />}
        </>
      )}
    </Item>
  );
}

function Answer({ text, loading, added }: AnswerType) {
  return (
    <Content>
      <Arrow />
      <p>
        {text}
        {loading && <span>Loading...</span>}
        {added && <span>Done!</span>}
      </p>
    </Content>
  );
}
