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

        const createPromises = toCreate.map(data => (
            createAction(publisherId, activityId, {
                activity: activityId,
                ...data,
            })
        ))


        const updatePromises = toUpdate.map(data => (
            updateAction(publisherId, activityId, data.id, {
                activity: activityId,
                    ...data,
            })
        ))

        toDelete.map(dataID => (
            deleteAction(publisherId, activityId, dataID)
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


