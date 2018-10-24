/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import "firebase/firestore"

export const CREATE_DISCUSSION = 'CREATE_DISCUSSION';
export const UPDATE_DISCUSSION_LIST = 'UPDATE_DISCUSSION_LIST'

export const createDiscussion = (discussion, done) => async (dispatch) => {

  const ref = firebase.firestore().collection('discussion')
  try {
    const doc = await ref.add(discussion)
    done(doc)
  } catch (error) {
    done(null, error)
  }
  
}

export const createReply = (discussion, reply, done) => async (dispatch) => {

}

export const updateDiscussionReply = (discussion, reply, done) => (dispatch) => {

}

export const getDiscussions = () => async (dispatch) => {

  const ref = firebase.firestore().collection('discussion')
  try {
    let response = await ref.get()
    let list = []

    response.forEach(function(doc){
      list.push({
        ...doc.data(),
        id: doc.id
      })
    });

    dispatch({
      type: UPDATE_DISCUSSION_LIST,
      list
    })

  } catch (error) {
    console.log(error)
  }
  
}