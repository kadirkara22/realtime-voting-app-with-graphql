import { useSubscription } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import { QUESTIONS_SUBSCRIPTION } from './queries'

const Questions = () => {

    const { loading, data } = useSubscription(QUESTIONS_SUBSCRIPTION)

    if (loading) {
        return <Loading />
    }

    return (
        <div >
            {
                data.questions.map((question) => (
                    <div key={question.id} className="question">
                        <Link to={`/q/${question.id}`} className="question_Link">{question.title}</Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Questions
