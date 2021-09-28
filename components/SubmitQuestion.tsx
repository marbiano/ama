import * as React from 'react';
import { styled } from '../stitches.config';

const Field = styled('div', {
  position: 'relative',
  width: '100%',
  maxWidth: 600,
  marginBottom: '5rem',
});

const Text = styled('textarea', {
  background: 'transparent',
  display: 'block',
  width: '100%',
  height: '5.5em',
  border: '1px solid $white40',
  borderRadius: 3,
  color: '$white',
  fontSize: '1.1rem',
  lineHeight: 1.5,
  padding: '.5rem 7.5rem .5rem .75rem',
  resize: 'none',

  '&:focus': {
    outline: 'none',
    borderColor: '$white70',
  },
});

const Button = styled('button', {
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
});

export default function SubmitQuestion({ onSubmit }) {
  const [question, setQuestion] = React.useState('');

  return (
    <Field>
      <Text
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button
        type="button"
        disabled={question.length === 0}
        onClick={() => onSubmit(question)}
      >
        Ask
      </Button>
    </Field>
  );
}
