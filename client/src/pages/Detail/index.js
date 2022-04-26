import { useMutation, useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import { NEW_QUESTION_MUTATION } from '../New/queries'
import { NEW_VOTE_MUTATION, QUESTION_DETAIL_SUBSCRIPTION } from './queries'

const Detail = () => {
    const { id } = useParams()
    const [isVoted, setIsVoted] = useState(false)

    const [selectedOptionId, setSelectedOptionId] = useState()
    const { loading, error, data } = useSubscription(QUESTION_DETAIL_SUBSCRIPTION, {
        variables: {
            id
        }
    })

    const [newVote, { loading: loadingVote }] = useMutation(NEW_VOTE_MUTATION, {
        onCompleted: () => {
            setIsVoted(true)
        }
    })
    const handleClickVote = () => {
        newVote({
            variables: {
                input: {
                    option_id: selectedOptionId,
                }
            }
        })
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error messsage={error.message} />
    }
    const { questions_by_pk: { options, title } } = data


    const totalvote = options.reduce((t, value) => t + value.votes_aggregate.aggregate.count, 0)
    return (
        <div>
            <h2>{title}</h2>
            {
                options.map((option, i) => (
                    <div key={i} className="vote_title">
                        <label htmlFor={i}>
                            <input
                                type="radio"
                                name="selected"
                                id={i}
                                value={option.id}
                                onChange={({ target }) => setSelectedOptionId(target.value)}
                            />
                            <span>{option.title}</span>
                        </label>
                        {
                            isVoted &&
                            <div className="vote_progress">
                                <progress value={option.votes_aggregate.aggregate.count} max={totalvote} />
                                <span className="vote_count">%{(((option.votes_aggregate.aggregate.count) * 100) / (totalvote === 0 ? 1 : totalvote)).toFixed(1)}</span>
                            </div>
                        }
                    </div>
                ))

            }
            {
                !isVoted && <button disabled={loadingVote} onClick={handleClickVote}>
                    Vote
                </button>
            }

        </div>
    )
}

export default Detail
