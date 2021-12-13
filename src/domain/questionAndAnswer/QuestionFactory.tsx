import questionsJSON from '../../data/questions.json';
import chaptersJSON from '../../data/chapters.json';
import { Question } from "./Question";
import { Answer } from "./Answer";
import { Chapter } from './Chapter';

export class QuestionFactory {
    private _questionList!: Question[];
    public _initialQuestionList!: Question[];
    private _chapterList!: Chapter[];
    private _questionsInChaptersList!: Question[][];
    private _index!: number;
    private _activeChapter!: number;
    private _production!: boolean;
    
    constructor(production: boolean) {
        this._production = production;
        this._activeChapter = 0;
        this.init();
    }

    private init() {
        this.initQuestionList();
        this.initChaptersList();
        this.initQuestionsInChaptersList();
    }

    private initQuestionList() {
        let questions: Question[] = [];
        questionsJSON.forEach((data) => {
            const picture_sources = data.answer.picture_sources == null ? null as any : data.answer.picture_sources;
            if (this._activeChapter === 0 || this._activeChapter === data.chapter) {
                questions.push(
                    new Question(data.question, new Answer(data.answer.text, picture_sources), data.chapter)
                );
            }
        });
        
        this._index = this._production ? 0 : questions.length - 2;
        this._questionList = questions;
        this._initialQuestionList = [...this._questionList];

        if (this._production) {
            this.shuffleQuestionListAndItsAnswers();
        }
    }

    private initChaptersList() {
        let chapters: Chapter[] = [];
        chaptersJSON.forEach((data) => {
            chapters.push(
                new Chapter(data.number, data.name)
            );   
        });

        this._chapterList = chapters;
    }

    public initQuestionsInChaptersList() {
        let questionsInChapters: Question[][] = []
        // Separate loop If the questions are not in the correct order
        for(let i = 0; i < this._chapterList.length; i++) {
            questionsInChapters.push([]);
        }
        for(let i = 0; i < this._initialQuestionList.length; i++) {
            const question = this._initialQuestionList[i];
            questionsInChapters[question.chapter].push(question);
            questionsInChapters[0].push(question);
        }
        this._questionsInChaptersList = questionsInChapters;
    }

    private shuffleQuestionListAndItsAnswers() {
        for (let i = this._questionList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._questionList[i], this._questionList[j]] = [this._questionList[j], this._questionList[i]];
        }
    }

    public getNextQuestion(): Question {
        this._index++;
        if (this._index === this._questionList.length) {
            if (this._production) {
                this.shuffleQuestionListAndItsAnswers();
            }
            this._index = 0;
        }
        return this._questionList[this._index];
    }

    public getCurrentQuestion(): Question {
        return this._questionList[this._index];
    }

    public changeChapter(newChapter: number) {
        this._activeChapter = newChapter;
        this.initQuestionList();
    }

    get questionsInChaptersList(): Question[][] {
        return this._questionsInChaptersList;
    }

    get chapterList(): Chapter[] {
        return this._chapterList;
    }

    get questionList(): Question[] {
        return this._questionList;
    }

    get activeChapter(): number {
        return this._activeChapter;
    }

    get index(): number {
        return this._index + 1;
    }

    get size(): number {
        return this._questionList.length;
    }
}