import * as actionTypes from '../actionTypes';
import teams from './teams.json';
import matches from './matches.json';

export const getTeams = () => {
  return {
    type: actionTypes.SAVE_TEAMS,
    payload: teams
  }
}

export const getMatches = () => {
  return {
    type: actionTypes.SAVE_MATCHES,
    payload: matches
  }
}