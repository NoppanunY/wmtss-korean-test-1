import { combineReducers } from 'redux';

import sessions from './sessions';
import bins from './bins';

export default combineReducers({
    sessions,
    bins,
});