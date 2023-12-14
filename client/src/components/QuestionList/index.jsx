import React, { useState } from 'react';
import EditQuestionForm from '../EditQuestionForm/index';

const QuestionList = ({ questions = [], questionIds = [] }) => {
  const [editingQuestion, setEditingQuestion] = useState(false);

  const handleEditClick = (index) => {
    setEditingQuestion(true);
  };

  if (!questions.length) {
    return <h3>No Questions Created Yet</h3>;
  }

  
  {
    questionIds.map((questionId) => {
      const { loading, data } = useQuery(QUERY_SINGLE_QUIZ, {
        variables: { quizId: questionID }
      })
    })
  }
  
  return (
    <>
      <h3 className="p-5 display-inline-block" style={{ borderBottom: '1px dotted #1a1a1a' }}>
        Questions
      </h3>
      <div className="flex-row my-4">

        

        {questions.map((question, index) => (
          <div key={index} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              {editingQuestion === true ? (
                <EditQuestionForm
                  questions
                  questionId={questionIds[index]}
                  onCancelEdit={() => setEditingQuestion(null)}
                  onSaveEdit={(updatedQuestion) => {
                    // Handle saving the updated question to your state or data store
                    // Reset editing state
                    setEditingQuestion(null);
                  }}
                />
              ) : (
                <>
                  <h5 className="card-header">{question.question}</h5>
                  <p className="card-body">{question.correct_answer}</p>
                  <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                  <button className="delete-btn">Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionList;
