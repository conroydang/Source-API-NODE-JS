import _ from 'lodash';
import crypto from 'crypto'
function removePasswordFromSourceFn(source: any): any {
  const token = 'password';
  source[token] = undefined;
  return source;
}

function BuildFilterFn(filter: any) : any {
  const result: any = {};

  const idToken = '_id';

  const filterEntries =  _.entries(filter);
  const filterEntriesWithoutId = _.filter(filterEntries, ([k]) => !_.eq(k, idToken));
  
  if (_.some(filterEntries, ([k]) => _.eq(k, idToken))) {
    result[idToken] = filter[idToken];
  }

  for (const [key, value] of filterEntriesWithoutId) {
    if (_.isString(value)) {
      const token = value.split(' ')[0];
      const valueString = value.substring(token.length).trim();

      const getParamFn = getParam(token);
      if (getParamFn === false) {
        result[key] = value;
      } else {
        result[key] = getParamFn(valueString);
      }
    } else {
      result[key] = value;
    }
  }

  console.log(result);
  
  return result;
}

function getParam(token: string) {
  if (_.eq(token, 'ct')) {
    return containParam;
  } else if (_.eq(token, 'gather')) {
    return gatherParam;
  } else if (_.eq(token, 'less')) {
    return lessParam
  } else {
    return false;
  }
}

function containParam(value:string) {
  return {
    '$regex' : value,
    '$options' : 'i'
  }
}

function gatherParam(value: string) {
  return {
    'qty': {
      '$gt': value
    }
  }
}

function lessParam(value: string) {
  return {
    'qty': {
      '$lt': value
    }
  }
}

function hashImage(value:any){
  return crypto.createHash('md5').update(value).digest('hex');
}


export const CollectionService = {
  buildFilterFn: BuildFilterFn,
  removePasswordFromSource: removePasswordFromSourceFn,
  hashImage:hashImage
}