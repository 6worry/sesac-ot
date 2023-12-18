import { useState } from 'react'

const Memo = () => {
    const [ memoList, setMemoList ] = useState([]);
    const [ newMemo, setNewMemo ] = useState('');

    const addMemo = () => {
        setMemoList([ ...memoList, newMemo ]);
        setNewMemo(''); // 추가 후 해당 inputform 클리어
    };

    const DeleteMemo = (index) => {
        const updateMemoList = [...memoList];
        updateMemoList.splice(index, 1);
        setMemoList(updateMemoList);
    };

    // const DeleteMemo = (index) => {
    //     return () => {
    //         const updateMemoList = [...memoList];
    //         updateMemoList.splice(index, 1);
    //         setMemoList(updateMemoList);
    //     }
    // };

    return (
        <div>
            <h1>메모앱</h1>
            <div>
                <input type='text' value={newMemo} onChange={(e) => setNewMemo(e.target.value)} placeholder='메모 입력해라' />
                <button onClick={ addMemo }>추가</button>
            </div>

            <ul>
                {memoList.map((memo, index) => (
                    <li key={ index }>
                        { memo }
                        <button onClick={ () => DeleteMemo(index) }>삭제</button>
                        {/* <button onClick={ DeleteMemo(index) }>삭제</button> */}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Memo;