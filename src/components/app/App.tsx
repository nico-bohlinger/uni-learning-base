import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListOl, faPager } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard as farCreditCard } from "@fortawesome/free-regular-svg-icons";
import { QuestionFactory } from '../../domain/questionAndAnswer/QuestionFactory';
import FlashcardView from '../flashcardView/FlashcardView';
import ListView from '../listView/ListView';
import './app.scss';

library.add(faListOl, farCreditCard);

const PRODUCTION: boolean = true;
const NAME: string = "foo123";
const VERSION: string = "1.1.0";
const INITIAL_DARK_MODE: boolean = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false;
const INITIAL_LIST_VIEW: boolean = false;

interface IProps { }

interface IState {
    darkMode: boolean;
    questionFactory: QuestionFactory;
    listView: boolean;
};

export default class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const questionFactory = new QuestionFactory(PRODUCTION);

        this.state = {
            darkMode: INITIAL_DARK_MODE,
            questionFactory: questionFactory,
            listView: INITIAL_LIST_VIEW
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

    toggleListView = () => {
        this.setState({listView: !this.state.listView});
    };

    toggleTheme = () => {
        this.setState({darkMode: !this.state.darkMode});
    };

    render() {
        this.typeset();

        const darkModeClass = this.state.darkMode ? "dark" : "light";
        
        return (
            <div id="rootContainer" className={darkModeClass}>
                <div id="headerContainer">
                    <div id="headerBox">
                        <button className={"modeToggle " + (this.state.listView ? "list" : "flashcard")} onClick={this.toggleListView}>
                            {this.state.listView ? <FontAwesomeIcon icon={faPager} /> : <FontAwesomeIcon icon={faListOl} />}
                        </button>
                        <p>{NAME}</p>
                        <button className="modeToggle hidden" >
                            {this.state.listView ? <FontAwesomeIcon icon={faPager} /> : <FontAwesomeIcon icon={faListOl} />}
                        </button>
                    </div>
                </div>
                <div id="mainContainer">
                    {this.state.listView ? <ListView questionFactory={this.state.questionFactory} typeset={this.typeset}/>
                                         : <FlashcardView production={PRODUCTION} questionFactory={this.state.questionFactory} typeset={this.typeset}/>}
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
