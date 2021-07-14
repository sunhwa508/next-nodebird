import {ActionType} from "typesafe-actions"
import * as actions from '../reducers/index'

export type Action = ActionType<typeof actions>