import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import style from './Poll.module.scss';
import { BarChart } from '@mui/x-charts/BarChart';

const Poll = ({ data }) => {
    const [modifiedData, setModifiedData] = useState(
        JSON.parse(localStorage.getItem('pollData')) || data
    );
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        voting();
    }, [selectedAnswers, modifiedData]);

    const submitButtonHandler = (val) => {
        let copiedData = JSON.parse(JSON.stringify(modifiedData));
        copiedData.forEach((values, i) => {
            if (val.id === values.id) {
                copiedData[i].voted = selectedAnswers[values.id];
                values.answers.forEach((answer, i, array) => {
                    if (selectedAnswers[val.id] === answer.option) {
                        array[i].voteCount += 1;
                    }
                });
            }
        });
        let storeSanitizedData = JSON.parse(JSON.stringify(copiedData));
        storeSanitizedData.forEach((val, i, arr) => {
            if (val.voted) {
                delete arr[i].voted;
            }
        });
        localStorage.setItem('pollData', JSON.stringify(storeSanitizedData));
        setModifiedData(copiedData);
    };

    const handleOptionChange = (id, option) => {
        setSelectedAnswers((oldVal) => ({ ...oldVal, [id]: option }));
    };

    const isVotedOrSelected = (val) => {
        if (val.voted || !selectedAnswers[val.id]) {
            return true;
        }
        return false;
    };

    const voting = () => {
        return (
            modifiedData &&
            modifiedData.map((val, i) => {
                return (
                    <div className={style.polls} key={val.id}>
                        <div className={style.left}>
                            <div className={style.question}>{val.question}</div>
                            <div className={style.options}>
                                {val.answers.map((answer) => (
                                    <div key={answer.option}>
                                        <input
                                            type="radio"
                                            name={`answer${i}`}
                                            id={`question${val.id}option${answer.option}`}
                                            onChange={() =>
                                                handleOptionChange(
                                                    val.id,
                                                    answer.option
                                                )
                                            }
                                            disabled={
                                                modifiedData[i]?.voted > -1
                                            }
                                        />
                                        <label
                                            htmlFor={`question${val.id}option${answer.option}`}
                                        >
                                            {answer.answer}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <Button
                                disabled={isVotedOrSelected(val)}
                                onClick={() => submitButtonHandler(val)}
                            >
                                Submit
                            </Button>
                        </div>
                        <div className="right">
                            <BarChart
                                width={300}
                                height={200}
                                series={[
                                    {
                                        data: val.answers.map(
                                            (values) => values.voteCount
                                        ),
                                        label: 'Votes',
                                        color: '#f9a524',
                                    },
                                ]}
                                xAxis={[
                                    {
                                        data: val.answers.map(
                                            (values) => values.answer
                                        ),
                                        scaleType: 'band',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                );
            })
        );
    };

    return <div className={style.poll_wrap}>{voting()}</div>;
};

export default Poll;
