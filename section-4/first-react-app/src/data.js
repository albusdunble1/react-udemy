import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

export const listData = [
    {
        image: reactLogo,
        title: "Title 1",
        subtitle: "Subtitle 1",
        hobbies: ['Badminton', 'Swimming'],
        address: {
            state: 'Penang',
            country: 'Malaysia'
        },
        job: 'job 1'
    },
    {
        image: viteLogo,
        title: "Title 2",
        subtitle: "Subtitle 2",
        hobbies: ['Badminton', 'Swimming', 'Gym'],

        job: 'job 2'
    },
    {
        image: null,
        title: "Title 3",
        subtitle: "Subtitle 3",
        hobbies: ['Jogging', 'Running'],
        address: {
            state: 'Kedah',
            country: 'Malaysia'
        },
        job: 'job 3'
    },
    {
        image: reactLogo,
        title: "Title 4",
        subtitle: "Subtitle 4",
        hobbies: ['None'],
        address: {
            state: 'State 4',
            country: 'Country 4'
        },
        job: 'job 4'
    },
    {
        image: viteLogo,
        title: "Title 5",
        subtitle: "Subtitle 5",
        hobbies: ['Games', 'Tennis'],
        address: {
            state: 'State 5',
            country: 'Country 5'
        },
        job: 'job 5'
    },
    {
        image: viteLogo,
        title: "Title 6",
        subtitle: "Subtitle 6",
        hobbies: ['Lol', 'Haha'],
        address: {
            state: 'State 7777',
            country: 'Country 7771'
        },
        job: 'job 6',
        company: 'MORPHEUS CONSULTING'
    },
]


export const EXAMPLES = {
    components: {
      title: 'Components',
      description:
        'Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
      code: `
  function Welcome() {
    return <h1>Hello, World!</h1>;
  }`,
    },
    jsx: {
      title: 'JSX',
      description:
        'JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).',
      code: `
  <div>
    <h1>Welcome {userName}</h1>
    <p>Time to learn React!</p>
  </div>`,
    },
    props: {
      title: 'Props',
      description:
        'Components accept arbitrary inputs called props. They are like function arguments.',
      code: `
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }`,
    },
    state: {
      title: 'State',
      description:
        'State allows React components to change their output over time in response to user actions, network responses, and anything else.',
      code: `
  function Counter() {
    const [isVisible, setIsVisible] = useState(false);
  
    function handleClick() {
      setIsVisible(true);
    }
  
    return (
      <div>
        <button onClick={handleClick}>Show Details</button>
        {isVisible && <p>Amazing details!</p>}
      </div>
    );
  }`,
    },
  };