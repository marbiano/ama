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
  alignItems: 'center',
});

const Title = styled('h3', {
  fontSize: '1rem',
  fontWeight: '400',
  margin: 0,
  color: '$white70',
});

const Time = styled('time', {
  fontSize: '0.875rem',
  color: '$white50',
});

const Arrow = styled(ArrowSvg, {
  color: '$orange',
});

const Content = styled('div', {
  display: 'flex',
  gap: 10,
  marginTop: 5,
});

export default function Questions({ items }) {
  return (
    <List>
      {items.reverse().map((item) => (
        <Question key={item.createdAt} {...item} />
      ))}
    </List>
  );
}

function Question({ question, createdAt }) {
  return (
    <Item>
      <Header>
        <Title>{question}</Title>
        <Time>
          {createdAt.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
            day: 'numeric',
          })}
        </Time>
      </Header>
      <Answer>My birthday is on July.</Answer>
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
