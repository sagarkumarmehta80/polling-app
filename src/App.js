import './variables.module.scss';
import Poll from './components/Poll/Poll';

function App() {
    const data = [
        {
            id: 1,
            question: "What's your favorite programming language?",
            answers: [
                { option: 1, answer: 'C++', voteCount: 2 },
                { option: 2, answer: 'Java', voteCount: 5 },
                { option: 3, answer: 'JS', voteCount: 3 },
            ],
        },
        {
            id: 2,
            question: 'In which continent do you live?',
            answers: [
                { option: 1, answer: 'Asia', voteCount: 2 },
                { option: 2, answer: 'Europe', voteCount: 5 },
                { option: 3, answer: 'North America', voteCount: 6 },
                { option: 4, answer: 'South America', voteCount: 7 },
                { option: 5, answer: 'Africa', voteCount: 8 },
                { option: 6, answer: 'Australia', voteCount: 9 },
                { option: 7, answer: 'Antarctica', voteCount: 0 },
            ],
        },
    ];

    return (
        <div className="App">
            <Poll data={data} />
        </div>
    );
}

export default App;
