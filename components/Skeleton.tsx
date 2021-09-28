import { styled } from '../stitches.config';

const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '& + &': {
    marginTop: '6rem',
  },

  '& div': {
    background: '$white03',
    width: '80%',
    height: '1.5rem',
    borderRadius: 2,
  },
  '& div:first-of-type': {
    height: '2.5rem',
    marginBottom: '2rem',
  },

  '& div:last-of-type': {
    marginTop: '1rem',
    width: '60%',
  },
});

function Item({ title = 70 }) {
  return (
    <Root>
      <div style={{ width: `${title}%` }}></div>
      <div></div>
      <div></div>
    </Root>
  );
}

export default function Skeleton() {
  return (
    <div>
      <Item />
      <Item title={50} />
    </div>
  );
}
