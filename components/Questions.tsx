import * as React from 'react';
import * as timeago from 'timeago.js';

import { styled } from '../stitches.config';
import ArrowSvg from '../assets/arrow.svg';

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

export default function Questions({ items, onAnswer, getAnswer }) {
  console.log('items', items);
  return (
    <List>
      {items.reverse().map((item) => (
        <Question
          key={item.timestamp}
          item={item}
          onAnswer={onAnswer}
          getAnswer={getAnswer}
        />
      ))}
    </List>
  );
}

function Question({ item, onAnswer, getAnswer }) {
  const [answer, setAnswer] = React.useState(null);
  const [newAnswer, setNewAnswer] = React.useState('');
  const { timestamp, question } = item;
  const createdAt = timeago.format(timestamp.toNumber() * 1000);

  const onRevealAnswer = async () => {
    const answer = await getAnswer(item);
    console.log('answer is', answer);
    setAnswer(answer);
  };

  const onSubmit = (text) => {
    onAnswer(item, text);
  };

  return (
    <Item>
      <Header>
        <Title>{question}</Title>
        <Time>{createdAt}</Time>
      </Header>
      {answer == null && (
        <button type="button" onClick={onRevealAnswer}>
          Reveal answer
        </button>
      )}

      {answer?.answer === '' && (
        <>
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button type="button" onClick={() => onSubmit(newAnswer)}>
            Answer
          </button>
        </>
      )}

      {answer?.length > 0 && <Answer>{answer.answer}</Answer>}
    </Item>
  );
}

function Answer({ children }) {
  return (
    <Content>
      <Arrow />
      <p>{children}</p>
    </Content>
  );
}
