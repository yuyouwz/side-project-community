import { message } from 'antd';
const isPromise = function (value) {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }
    return false;
}

const defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED'];


export default function promiseMiddleware(config = {}) {
    const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;
    return ref => {
        const { dispatch } = ref;
        return next => action => {
            if (action.payload) {
                if (!isPromise(action.payload) && !isPromise(action.payload.promise)) {
                    return next(action);
                }
            } else {
                return next(action)
            }
            const { type, payload, meta } = action;
            const [
                PENDING,
                FULFILLED,
                REJECTED
            ] = promiseTypeSuffixes;
            const getAction = (newPayload, isRejected) => ({
                type: `${type}_${isRejected ? REJECTED : FULFILLED}`,
                ...((newPayload === null || typeof newPayload === 'undefined') ? {} : {
                    payload: newPayload
                }),
                ...(!!meta ? { meta } : {}),
                ...(isRejected ? {
                    error: true
                } : {})
            });

            let promise;
            let data;
            if (!isPromise(action.payload) && typeof action.payload === 'object') {
                promise = payload.promise;
                data = payload.data;
            } else {
                promise = payload;
                data = null;
            }
            next({
                type: `${type}_${PENDING}`,
                ...(!!data ? { payload: data } : {}),
                ...(!!meta ? { meta } : {})
            });
            const handleReject = reason => {
                const rejectedAction = getAction(reason, true);
                dispatch(rejectedAction)
                if (action.fallback && (typeof action.fallback == "function")) {
                    action.fallback(reason);
                } else {
                    //message.error(reason.toString(), 2.5);
                }
                throw reason;
            };
            const handleFulfill = (value = null) => {
                const resolvedAction = getAction(value, false);
                dispatch(resolvedAction);
                return { value,action:resolvedAction};

            };
            return promise.then(handleFulfill,handleReject);
        }
    }
}