import { Answer } from "./Answer";

export class Question {
    private _id: number;
    private _question: string;
    private _answer: Answer;
    private _chapter: number;

    constructor(id: number, question: string, answer: Answer, chapter: number) {
        this._id = id;
        this._question = question;
        this._answer = answer;
        this._chapter = chapter;
    }

    get id(): number {
        return this._id;
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