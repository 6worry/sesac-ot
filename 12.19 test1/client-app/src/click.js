function Click({ onButtonClick, onResetClick }) {
    return (
        <div>
            <button onClick={onButtonClick}>클릭해</button>
            <button onClick={onResetClick}>리셋해</button>
        </div>
    );
};

export default Click;