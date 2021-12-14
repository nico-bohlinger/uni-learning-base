import React from 'react';
import { QuestionFactory } from '../../domain/questionAndAnswer/QuestionFactory';
import { Question } from '../../domain/questionAndAnswer/Question';
import './flashcardView.scss';

interface IProps {
    production: boolean;
    questionFactory: QuestionFactory;
    typeset: () => any;
}

interface IState {
    questionNumber: number;
    question: Question;
    answerVisible: boolean;
};

export default class FlashcardView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const questionFactory = props.questionFactory;
        const question = questionFactory.getCurrentQuestion();
        const questionNumber = questionFactory.index;

        this.state = {
            questionNumber: questionNumber,
            question: question,
            answerVisible: props.production ? false : true
        }
    }

    setQuestion = (question: Question) => {
        const newQuestion = question;
        const newIndex = this.props.questionFactory.index;

        this.setState({
            question: newQuestion,
            questionNumber: newIndex,
            answerVisible: false,
        });
    };

    nextQuestion = () => {
        this.setQuestion(this.props.questionFactory.getNextQuestion());
    };

    toogleAnswer = () => {
        this.setState({answerVisible: !this.state.answerVisible});
    };

    onChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.currentTarget.blur();
        const newChapter = Number(event.target.value);
        this.props.questionFactory.changeChapter(newChapter);
        this.setQuestion(this.props.questionFactory.getCurrentQuestion());
    }

    getAnswer = () => {
        const pictureSources = this.state.question.answer.picture_sources;
        const texts = this.state.question.answer.text;

        let answer = [];
        for (let i = 0; i < texts.length; i++) {
            const text = this.state.question.answer.text[i];
            const pictureSource = pictureSources[i];
            if (text !== "") {
                answer.push(<p dangerouslySetInnerHTML={{__html: text}} key={"answer-p-" + i}></p>);
            }
            if (pictureSource !== "") {
                answer.push(<img src={require("../../data/pictures/" + pictureSource)} alt={pictureSource} key={"answer-img-" + i}/>);
            }
        }

        const answerClass = this.state.answerVisible ? "visible" : "hidden"
        return <div className={"answer " + answerClass}>{answer}</div>
    }

    getChapterOptions = () => {
        let chapterOptions: any = [];
        this.props.questionFactory.chapterList.forEach((chapter) => {
            chapterOptions.push(<option value={String(chapter.number)} key={String(chapter.number)}>{chapter.text}</option>);
        })
        return chapterOptions;
    }

    render() {
        this.props.typeset();

        return (
            <React.Fragment>
                <div className="questionBlock">
                    <p className="question">{this.state.question.question}</p>
                    {this.getAnswer()}
                    <div id="questionBottom">
                        <p id="questionNumber">Frage {this.state.questionNumber} von {this.props.questionFactory.size}</p>
                        <div id="buttonContainer">
                            <button id="solutionButton" onClick={this.toogleAnswer}>{this.state.answerVisible ? "Hide" : "Show"} solution</button>
                            <button id="nextButton" onClick={this.nextQuestion}>Next question</button>
                        </div>
                    </div>
                </div>
                <div id="chapterContainer">
                    <p>Chapter:</p>
                    <select id="chapterSelect" value={String(this.props.questionFactory.activeChapter)} onChange={this.onChapterChange}>
                        {this.getChapterOptions()}
                    </select>
                </div>
            </React.Fragment>
        );
    }
}