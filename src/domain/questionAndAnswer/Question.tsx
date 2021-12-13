import { Answer } from "./Answer";

export class Question {
    private _question: string;
    private _answer: Answer;
    private _chapter: number;

    constructor(question: string, answer: Answer, chapter: number) {
        this._question = question;
        this._answer = answer;
        this._chapter = chapter;
    }

    get question(): string {
        return this._question;
    }

    get answer(): Answer {
        return this._answer;
    }

    get chapter(): number {
        return this._chapter;
    }
}