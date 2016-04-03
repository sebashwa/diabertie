import { fromJS } from 'immutable';

// Abstraction to handle pre-composedstate received from server
// (ie, leave top level keys untouched)

export default function immutifyState(obj) {
  let objMut = Object.assign({}, obj);

  Object
    .keys(objMut)
    .forEach(key => {
      objMut[key] = fromJS(objMut[key]);
    });

  return objMut;
}
