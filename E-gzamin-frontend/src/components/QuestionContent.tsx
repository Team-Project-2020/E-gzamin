import { ReactElement } from "react";
import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionType, AnswerType } from "../types";


type _QuestionContentrPropsType = {
    answers: Array<AnswerType>;
    question: string;
    onDelete: () => void;
    styles: Record<
        | "paper"
        | "testName"
        | "QuestionContent"
        | "QuestionContentLeft"
        | "QuestionContentRight",
        string
    >;
};

const QuestionContent = ({
    answers,
    question,
    onDelete,
    styles,
}: _QuestionContentrPropsType): ReactElement => {
    const getLetter = (value: number): string => String.fromCharCode(97 + value);

    return (
        <div className={styles.QuestionContent}>
            <div className={styles.QuestionContentLeft}>
                <Typography variant="subtitle1">{question}</Typography>
                {answers.map((answer, index) => (
                    <Typography key={index} variant="subtitle2">
                        {getLetter(index)}: {answer.content}
                    </Typography>
                ))}
            </div>
            <div className={styles.QuestionContentRight}>
                {onDelete !== undefined && 
                <IconButton aria-label="delete" color="primary" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>}
            </div>
        </div>
    );
};

export default QuestionContent;