/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
export function GET_API_SECRET() {
    let API_SECRET = process.env.REACT_APP_API_SECRET;
    if (API_SECRET === undefined || API_SECRET === '')
        return 'secret'
    else
        return API_SECRET
}

export function GET_SCHEMA_ID() {
    let SCHEMA_ID = process.env.REACT_APP_SCHEMA_ID;
    if (SCHEMA_ID === undefined || SCHEMA_ID === '')
        return 'NONE'
    else
        return SCHEMA_ID
}

export function GET_SCHEMA_NAME() {
    let SCHEMA_NAME = process.env.REACT_APP_SCHEMA_NAME;
    if (SCHEMA_NAME === undefined || SCHEMA_NAME === '')
        return 'NONE'
    else
        return SCHEMA_NAME
}

export function GET_SCHEMA_VERSION() {
    let SCHEMA_VERSION = process.env.REACT_APP_SCHEMA_VERSION;
    if (SCHEMA_VERSION === undefined || SCHEMA_VERSION === '')
        return 'NONE'
    else
        return SCHEMA_VERSION
}

export function GET_CRED_DEF_ID() {
    let CRED_ID = process.env.REACT_APP_CRED_DEF_VACCINE;
    if (CRED_ID === undefined || CRED_ID === '')
        return 'NONE'
    else
        return CRED_ID
}

export function GET_PASSCODE() {
    let PASSCODE = process.env.REACT_APP_PASSCODE;
    return PASSCODE
}