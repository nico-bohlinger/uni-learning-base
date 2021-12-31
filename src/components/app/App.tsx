import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListOl, faPager } from "@fortawesome/free-solid-svg-icons";
import { QuestionFactory } from '../../domain/questionAndAnswer/QuestionFactory';
import FlashcardView from '../flashcardView/FlashcardView';
import ListView from '../listView/ListView';
import './app.scss';

enum View {
    Flashcard,
    List
}

const PRODUCTION: boolean = true;
const NAME: string = "foo123";
const VERSION: string = "1.0.0";
const INITIAL_DARK_MODE: boolean = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false;
const INITIAL_MAIN_VIEW: number = View.Flashcard;

interface IProps { }

interface IState {
    darkMode: boolean;
    questionFactory: QuestionFactory;
    mainView: number;
};

export default class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const questionFactory = new QuestionFactory(PRODUCTION);

        this.state = {
            darkMode: INITIAL_DARK_MODE,
            questionFactory: questionFactory,
            mainView: INITIAL_MAIN_VIEW
        }
    }

    getMathJax = () => (window as any).MathJax;

    typeset = () => {
        const mathJax = this.getMathJax();
        if (!mathJax) {
          return null;
        }
        mathJax.startup.promise = mathJax.startup.promise
            .then(() => {
                return mathJax.typesetPromise();
            })
            .catch((err: any) => console.error(`Typeset failed: ${err.message}`));
        return mathJax.startup.promise;
    };

    toggleFlashcardListView = () => {
        let view = this.state.mainView;
        view = (view === View.Flashcard) ? View.List : View.Flashcard;
        this.setState({mainView: view});
    };

    toggleTheme = () => {
        this.setState({darkMode: !this.state.darkMode});
    };

    getMainContainerContent = () => {
        const view = this.state.mainView;
        if (view === View.Flashcard) {
            return <FlashcardView production={PRODUCTION} questionFactory={this.state.questionFactory} typeset={this.typeset}/>;
        }
        else if (view === View.List) {
            return <ListView questionFactory={this.state.questionFactory} typeset={this.typeset}/>;
        }
    }

    render() {
        this.typeset();

        const darkModeClass = this.state.darkMode ? "dark" : "light";
        
        return (
            <div id="rootContainer" className={darkModeClass}>
                <div id="headerContainer">
                    <div id="headerBox">
                        <button className={"headerButtons " + (this.state.mainView === View.Flashcard ? "flashcard" : "list")} onClick={this.toggleFlashcardListView}>
                            {this.state.mainView === View.Flashcard ? <FontAwesomeIcon icon={faListOl} /> : <FontAwesomeIcon icon={faPager} />}
                        </button>
                        <p>{NAME}</p>
                        <button className="headerButtons hidden" >
                            {this.state.mainView === View.Flashcard ? <FontAwesomeIcon icon={faListOl} /> : <FontAwesomeIcon icon={faPager} />}
                        </button>
                    </div>
                </div>
                <div id="mainContainer">
                    {this.getMainContainerContent()}
                    <div>
                        <div className="themeSwitchWrapper">
                            <label className="themeSwitch" htmlFor="darkModeCheckbox">
                                <input type="checkbox" id="darkModeCheckbox" onChange={this.toggleTheme} checked={this.state.darkMode}/>
                                <div className="slider round"></div>
                            </label>
                            <em>Dark Mode {this.state.darkMode ? "on" : "off"}</em>
                        </div>
                    </div>
                    <div id="versionNumberBlock">
                        <p>Version: {VERSION}</p>
                    </div>
                </div>
            </div>
        );
    }
}
