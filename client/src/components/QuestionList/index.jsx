const QuestionList = ({questions = [] }) => {
  if (!questions.length) {
    return <h3>No Questions Created Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Questions
      </h3>
      <div className="flex-row my-4">
        {questions &&
          questions.map((question,index) => (
            <div key={index} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {question.question}
                </h5>
                <p className="card-body">{question.correct_answer}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default QuestionList;
