/*
 * generic handleSubmit method
*/

import React, {Component, PropTypes} from 'react'
import { SubmissionError } from 'redux-form'

import _ from 'lodash'

function handleSubmit(publisherId, mainKey, parentIds, prevData, currData, createAction, updateAction, deleteAction, parentId='activity') {
        if (!_.isArray(parentIds)) {
            parentIds = [ parentIds ]
        }


        // here ids, can be a single id or a list of ids
        const oldIds = prevData.map(d => d.id).filter(d => d !== undefined)
        const newIds = currData.map(d => d.id).filter(d => d !== undefined)

        const toCreate = _.filter(currData, (d) => !('id' in d))
        let toUpdate = _.filter(currData, (d) => 'id' in d)
        const toDelete = _.difference(oldIds, newIds)

        toUpdate = toUpdate.map(function (data, index) {
            return (
                _.isEqual(prevData[index], data) ? null : data
            )
        });
        toUpdate = _.reject(toUpdate, _.isNull);

        const createPromises = toCreate.map(data => (
            createAction(publisherId, ...parentIds, {
                [parentId]: parentIds[parentIds.length - 1],
                ...data,
            })
        ));

        const updatePromises = toUpdate.map(data => (
            updateAction(publisherId, ...parentIds, data.id, {
                [parentId]: parentIds[parentIds.length - 1],
                    ...data,
            })
        ));

        toDelete.map(dataID => (
            deleteAction(publisherId, ...parentIds, dataID)
        ));

        return Promise.all(_.flatten([createPromises, updatePromises])).then(actions => {

            const errors = {};
            let hasError = false;

            errors[mainKey] = actions.map(action => {
                if (action.error) {
                    hasError = true;
                    return action.error
                }
                return undefined
            });

            if (hasError) {
                throw new SubmissionError(errors)
            }

            return actions
        })
}

export default handleSubmit


