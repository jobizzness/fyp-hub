/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
const DEFAULT_PAGE = 'feed';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? DEFAULT_PAGE : path.split('/')[1];
  const slug = page ? path.split('/')[2] : null;

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage({page, slug}));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = ({page, slug}) => async (dispatch) => {
  // If the page is invalid, set to 404. The is also a good spot to check
  // other location things like sub-path or query params.
  if ([DEFAULT_PAGE, 'projects', 'auth', 'profile'].indexOf(page) === -1) {
    page = 'view404';
  }

  dispatch(updateRoute({page, slug}));

  switch(page) {
    case DEFAULT_PAGE:
      await import('../pages/bn-feed/')
      break;
    case 'auth':
      await import ('../pages/bn-auth/');
      break;
    case 'projects':
      await import('../pages/bn-projects/')
      break;
    case 'profile':
      await import('../pages/bn-profile/')
      break;
    default:
      await import('../pages/my-view404.js')
  }
}

const updateRoute = (route) => {
  return {
    type: UPDATE_ROUTE,
    route
  };
}

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

export const updateLayout = (wide) => (dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
}

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
}
