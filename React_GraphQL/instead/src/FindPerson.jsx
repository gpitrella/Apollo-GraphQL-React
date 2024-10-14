import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { FIND_PERSON } from "./persons/graphql-queries";

export const FindPerson = () => {
    const [ gerPerson, result ] = useLazyQuery(FIND_PERSON)
}