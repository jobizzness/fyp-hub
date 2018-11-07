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

export const CREATE_DISCUSSION = 'CREATE_DISCUSSION'
export const UPDATE_PROJECT_LIST = 'UPDATE_PROJECT_LIST'
export const UPDATE_DISCUSSION_LIST = 'UPDATE_DISCUSSION_LIST'
export const UPDATE_DISCUSSION_REPLIES = 'UPDATE_DISCUSSION_REPLIES'
export const CREATE_PROJECT = 'CREATE_PROJECT'

/**
  * @desc opens a modal window to display a message
  * @param string msg - the message to be displayed
  * @return bool - success or failure
*/
const createDiscussion = (discussion, done) => async (dispatch) => {

  const ref = firebase.firestore().collection('discussion')
  try {
    const doc = await ref.add(discussion)
    done(doc)
  } catch (error) {
    done(null, error)
  }
  
}

/**
  * @desc opens a modal window to display a message
  * @param string msg - the message to be displayed
  * @return bool - success or failure
*/
const createProject = (project, done) => async (dispatch) => {

  const ref = firebase.firestore().collection('project')
  try {
    const doc = await ref.add(project)
    done(doc)
  } catch (error) {
    done(null, error)
  }
  
}

/**
  * @desc opens a modal window to display a message
  * @param string msg - the message to be displayed
  * @return bool - success or failure
*/
const createReply = (discussion, reply, done) => async (dispatch) => {
  const ref = firebase.firestore().collection('discussion').doc(discussion.id)
  try {
    const doc = await ref.get()

    if (doc.exists) {
        console.log(reply)
        const response = await ref.collection('replies').add(reply)
        done(response)
    } 
    else {
        done(null, {message: 'Post does not exist'})
    }
  } catch (error) {
      done(null, error)
  }
}

/**
  * @desc opens a modal window to display a message
  * @param string msg - the message to be displayed
  * @return bool - success or failure
*/
const updateDiscussionReply = (discussion, reply, done) => (dispatch) => {

}

/**
  * @desc opens a modal window to display a message
  * @param string msg - the message to be displayed
  * @return bool - success or failure
*/
const getDiscussions = () => async (dispatch) => {

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

/**
  * @desc opens a modal window to display a message
  * @param string msg - the message to be displayed
  * @return bool - success or failure
*/
const getProjects = (user = null) => async (dispatch, getState) => {

  console.log(user, getState())
  const ref = firebase.firestore().collection('project')
  try {
    let response = await ref.get()
    let projects = []

    response.forEach(function (doc) {
      projects.push({
        ...doc.data(),
        id: doc.id
      })
    });

    dispatch({
      type: UPDATE_PROJECT_LIST,
      projects
    })

  } catch (error) {
    console.log(error)
  }

}

/**
  * @desc opens a modal window to display a message
  * @param string msg - the message to be displayed
  * @return bool - success or failure
  */
const getDiscussionReplies = (discussion, done) => async (dispatch) => {
  const ref = firebase.firestore().collection('discussion').doc(discussion.id).collection('replies')
  try {

    let response = await ref.get()
    let list = []

    response.forEach(function (doc) {
      list.push({
        ...doc.data(),
        id: doc.id
      })
    });

    done(list)


  } catch (error) {
    done(null, error)
    console.log(error)
  }

}

export { 
        getDiscussionReplies, getDiscussions, 
        updateDiscussionReply, createDiscussion, 
  createReply, createProject, getProjects
      }