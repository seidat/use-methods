"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = __importStar(require("immer"));
var react_1 = require("react");
immer_1.enableAllPlugins();
function useMethods(methodsOrOptions, initialState, initializer) {
    var _a = react_1.useMemo(function () {
        var methods;
        var patchListener;
        if (typeof methodsOrOptions === 'function') {
            methods = methodsOrOptions;
        }
        else {
            methods = methodsOrOptions.methods;
            patchListener = methodsOrOptions.patchListener;
        }
        return [
            function (state, action) {
                return immer_1.default(state, function (draft) {
                    var _a;
                    return (_a = methods(draft))[action.type].apply(_a, action.payload);
                }, patchListener);
            },
            methods,
        ];
    }, [methodsOrOptions]), reducer = _a[0], methodsFactory = _a[1];
    var _b = react_1.useReducer(reducer, initialState, initializer), state = _b[0], dispatch = _b[1];
    var callbacks = react_1.useMemo(function () {
        var actionTypes = Object.keys(methodsFactory(state));
        return actionTypes.reduce(function (accum, type) {
            accum[type] = function () {
                var payload = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    payload[_i] = arguments[_i];
                }
                return dispatch({ type: type, payload: payload });
            };
            return accum;
        }, {});
    }, []);
    return [state, callbacks];
}
exports.default = useMethods;
//# sourceMappingURL=index.js.map