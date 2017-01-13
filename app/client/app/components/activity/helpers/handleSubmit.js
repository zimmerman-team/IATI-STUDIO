/*
 * generic handleSubmit method
*/

import React, {Component, PropTypes} from 'react'
import { SubmissionError } from 'redux-form'

function handleSubmit(publisherId, mainKey, activityId, prevData, currData, createAction, updateAction, deleteAction) {
        const oldIds = prevData.map(d => d.id).filter(d => d !== undefined)
        const newIds = currData.map(d => d.id).filter(d => d !== undefined)

        console.log(oldIds, newIds);

        const toCreate = _.filter(currData, (d) => !('id' in d))
        const toUpdate = _.filter(currData, (d) => 'id' in d)
        const toDelete = _.difference(oldIds, newIds)

        console.log(toCreate, toUpdate, toDelete);

        const createPromises = toCreate.map(description => (
            createAction(publisherId, activityId, {
                activity: activityId,
                ...description,
            })
        ))


        const updatePromises = toUpdate.map(description => (
            updateAction(publisherId, activityId, description.id, {
                activity: activityId,
                    ...description,
            })
        ))

        toDelete.map(description => (
            deleteAction(publisherId, activityId, id)
        ));

        return Promise.all(_.flatten([createPromises, updatePromises])).then(actions => {

            const errors = {}
            let hasError = false;

            errors[mainKey] = actions.map(action => {
                if (action.error) {
                    hasError = true
                    return action.error
                }
                return undefined
            })

            if (hasError) {
                throw new SubmissionError(errors)
            }

            return actions
        })
}

export default handleSubmit


