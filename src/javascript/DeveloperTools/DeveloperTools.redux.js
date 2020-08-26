import {createActions, handleActions} from 'redux-actions';
import {registry} from '@jahia/ui-extender';
import {combineReducers} from 'redux';

export const {devToolsSetPath} = createActions('DEV_TOOLS_SET_PATH');

const extractParamsFromUrl = pathname => {
    if (pathname.startsWith('/devtools')) {
        let path = decodeURIComponent(pathname);
        return {path};
    }

    return {path: ''};
};

export const developerToolsRedux = () => {
    const jahiaCtx = window.contextJsParameters;
    const pathName = window.location.pathname.substring((jahiaCtx.contextPath + jahiaCtx.urlbase).length);
    const currentValueFromUrl = extractParamsFromUrl(pathName);
    const pathReducer = handleActions({
        [devToolsSetPath]: (state, action) => action.payload,
        '@@router/LOCATION_CHANGE': (state, action) => action.payload.location.pathname.startsWith('/devtools') ? extractParamsFromUrl(action.payload.location.pathname).path : state
    }, currentValueFromUrl.path);

    registry.add('redux-reducer', 'developerTools', {
        targets: ['root'],
        reducer: combineReducers({path: pathReducer})
    });
};
