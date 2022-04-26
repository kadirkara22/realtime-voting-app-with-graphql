import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { NEW_QUESTION_MUTATION } from './queries'
import { useNavigate } from 'react-router-dom';

const initialOptions = [{ title: '' }, { title: '' }]
const NewQuestion = () => {
    const navigate = useNavigate();
    const [addQuestion, { loading, data }] = useMutation(NEW_QUESTION_MUTATION)

    const [title, setTitle] = useState('')
    const [options, setOptions] = useState(initialOptions)


    const handleChangeOption = ({ target }) => {
        const newArray = options
        newArray[target.id].title = target.value;
        setOptions([...newArray])
    }

    const handleSave = () => {
        const filledOptions = options.filter((option) => option.title !== '')
        if (title === '' || filledOptions.length < 2) return false;

        console.log(filledOptions)
        addQuestion({
            variables: {
                input: {
                    title,
                    options: {
                        data: filledOptions,
                    }
                }
            }
        })

        setTitle('')
        setOptions(initialOptions)
        navigate('/');
    }

    return (
        <div>
            <h1>Question</h1>
            <input placeholder="Type your Question"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                disabled={loading}
            />
            <h1>Options</h1>
            {
                options.map((option, index) => (
                    <div key={index}>
                        <input placeholder="Type your option..."
                            value={option.title}
                            id={index}
                            onChange={handleChangeOption}
                            disabled={loading}
                        />
                    </div>
                ))
            }
            <button disabled={loading} onClick={() => setOptions([...options, { title: '' }])}>New Option</button>
            <button disabled={loading} onClick={handleSave}>Save</button>
        </div>
    )
}

export default NewQuestion
