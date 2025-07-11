'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';
import cn from '@/utils/class-names';
import Footer from './footer';
import Question from './step-5';
// import Preview from './preview';


const questions = [{
  title: `Competition`,
},]

export default function MultiStepFormOne() {

  const [questionIndex, setQuestionIndex] = useState(0);
  const [preview, setPreview] = useState(false);
  const [summary, setSummary] = useState('');
  const onNext = () => {
    if (questions.length === questionIndex + 1) {
      // Submit here all the questions
      setPreview(true)
      setSummary(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`);

      return;
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const onPreviewDone = () => {
    alert('Congratulations');
    setQuestionIndex(0);
    setPreview(false);
  }

  return (
    <>
      <div
        className={cn(
          'mx-auto grid w-full h-full'
        )}
      >
        {/* {preview ? 
        <Preview title='Preview' questions={questions} summary={summary} /> : */}
        {/* questionIndex >= 0 &&
          <Question
            title={questions[questionIndex].title}
            questionIndex={questionIndex}
          />
        } */}
      </div>
      {preview ? <Footer onNext={onPreviewDone} btnRightLabel='Done' /> : <Footer onNext={onNext} />}
    </>
  );
}

