import React from 'react';
import { Question } from '../../domain/questionAndAnswer/Question';
import { QuestionFactory } from '../../domain/questionAndAnswer/QuestionFactory';
import './listView.scss';

interface IProps {
    questionFactory: QuestionFactory;
    typeset: () => any;
}

interface IState {
    opened: boolean[];
    showQuestions: boolean[];
    searchString: string;
};

export default class ListView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            opened: new Array(props.questionFactory.questionList.length).fill(false),
            showQuestions: new Array(props.questionFactory.questionList.length).fill(true),
            searchString: ""
        }
    }

    onAnswerToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        let opened = [...this.state.opened];
        let id = Number(event.currentTarget.id.split("-")[1]);
        opened[id] = !opened[id];
        this.setState({opened: opened});
    }

    getQuestions = () => {
        let questionsAndChapters: any = [];
        let id = 0;
        const questionsInChaptersList = this.props.questionFactory.questionsInChaptersList;
        let offset = 0;
        let selectedChapter = this.props.questionFactory.activeChapter;
        let startingChapter = selectedChapter === 0 ? 1 : selectedChapter;
        for(let i = startingChapter; i < questionsInChaptersList.length; i++) {
            questionsAndChapters.push(<p className="chapter" key={"chapter-" + i}>{this.props.questionFactory.chapterList[i].text}</p>);
            
            let questionsInChapter = questionsInChaptersList[i];
            let questions: any = [];
            for (let j = 0; j < questionsInChapter.length; j++) {
                if (this.state.showQuestions[offset + j] === true) {
                    let question = questionsInChapter[j];
                    const questionClass = this.state.opened[id] ? "visible" : "hidden"
                    questions.push(
                        <div className="questionContainer" key={"questionContainer-" + i + "-" + j}>
                            <button className={"question " + questionClass} onClick={this.onAnswerToggle} id={"question-" + id} key={"question-" + i + "-" + j}>{question.question}</button>
                            {this.getAnswer(question, id)}
                        </div>
                    );
                }
                id++;
            }
            offset += questionsInChapter.length;
            if (questions.length === 0) {
                questionsAndChapters.pop();
            }
            questionsAndChapters.push(<div className="allQuestionsContainer" key={"allQuestionsContainer-" + i}>{questions}</div>);
        }

        return questionsAndChapters;
    }

    onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target.value;
        let showQuestions = [];
        if (searchString !== "") {
            const questionList = this.props.questionFactory.questionList;
            for (let i = 0; i < questionList.length; i++) {
                showQuestions[i] = questionList[i].question.toLowerCase().includes(searchString.toLowerCase());
            }
        }
        else {
            showQuestions = new Array(this.props.questionFactory.questionList.length - 1).fill(true);
        }
        this.setState({showQuestions: showQuestions, searchString: searchString});
    }

    onClearButton = () => {
        const showQuestions = new Array(this.props.questionFactory.questionList.length - 1).fill(true);
        this.setState({showQuestions: showQuestions, searchString: ""});
    }

    getAnswer = (question: Question, questionNr: number) => {
        const pictureSources = question.answer.picture_sources;
        const texts = question.answer.text;

        let answer = [];
        for (let i = 0; i < texts.length; i++) {
            const text = question.answer.text[i];
            const pictureSource = pictureSources[i];
            if (text !== "") {
                answer.push(<p dangerouslySetInnerHTML={{__html: text}} key={"answer-p-" + i + "-" + questionNr}></p>);
            }
            if (pictureSource !== "") {
                answer.push(<img src={require("../../data/pictures/" + pictureSource)} alt={pictureSource} key={"answer-img-" + i + "-" + questionNr}/>);
            }
        }

        const answerClass = this.state.opened[questionNr] ? "visible" : "hidden"
        return <div className={"answer " + answerClass}>{answer}</div>
    }

    render() {
        this.props.typeset();
        
        return (
            <div id="listViewContainer">
                <div id="searchContainer">
                    <button className={"clearSearchButton hidden"}>
                        <p>X</p>
                    </button>
                    <input type="text" placeholder="Search..." value={this.state.searchString} onChange={this.onSearchChange}/>
                    <button className={"clearSearchButton " + (this.state.searchString !== "" ? "visible" : "hidden")} onClick={this.onClearButton}>
                        <p>X</p>
                    </button>
                </div>
                {this.getQuestions()}
            </div>
        );
    }
}