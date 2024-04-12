import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import defaultData from './initialStates/flowChartDefaultdata.json';

export interface FlowChartData {
    name: string,
    type?: string,
    children?: FlowChartData[]
}

const initialState = defaultData satisfies FlowChartData as FlowChartData

const flowChartDataSlice = createSlice({
    name: 'flowChartData',
    initialState,
    reducers: {
        addFlow(state, _action: PayloadAction<FlowChartData>) {
            return state;
        },
    },
})

export const { addFlow } = flowChartDataSlice.actions
export default flowChartDataSlice.reducer