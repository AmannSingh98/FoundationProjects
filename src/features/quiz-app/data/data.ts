export const data = [
  {
    id: 1,
    question: 'console.log(typeof null);',
    answers: ['null', 'undefined', 'object', 'boolean'],
    answer: 'object'
  },
  {
    id: 2,
    question: `for (var i = 0; i < 3; i++){setTimeout(()=>console.log(i), 1000);}`,
    answers: ['0 1 2', '3 3 3', 'undefined undefined undefined', 'Error'],
    answer: '3 3 3'
  },
  {
    id: 3,
    question: 'What is a closure in JavaScript?',
    answers: [
      'A way to declare variables globally',
      'A syntax to immediately execute a function',
      'A special kind of loop',
      'A function combined with references to its surrounding state'
    ],
    answer: 'A function combined with references to its surrounding state'
  }
]
