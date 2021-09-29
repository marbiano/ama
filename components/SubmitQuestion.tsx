import { motion } from 'framer-motion';
import * as React from 'react';
import { styled } from '../stitches.config';
import { useStore } from '../stores/ama';

const Form = styled('form', {
  position: 'relative',
  width: '100%',
  maxWidth: 600,
  marginBottom: '6rem',
});

const Text = styled('textarea', {
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

export default function SubmitQuestion() {
  const [question, setQuestion] = React.useState('');
  const ask = useStore((state) => state.ask);
  const loading = useStore((state) => state.loading);

  React.useEffect(() => {
    if (loading) {
      setQuestion('');
    }
  }, [setQuestion, loading]);

  const onSubmit = (e) => {
    e.preventDefault();
    ask(question);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: 1.2 }}
    >
      <Form onSubmit={onSubmit}>
        <Text
          placeholder="Have a question for me?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={240}
        />
        <Button type="submit" disabled={question.length === 0}>
          Ask
        </Button>
      </Form>
    </motion.div>
  );
}
