import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import defaultData from './initialStates/forcedDirectedGraphData.json';

export interface ForcedDirectedNode {
    id: string;
    group: string;
    radius?: number;
}

export interface ForcedDirectedLink {
    source: string;
    target: string;
    value?: number;
}

export interface ForcedDirectedGraphData {
    nodes: ForcedDirectedNode[],
    links: ForcedDirectedLink[]
}

const initialState = defaultData satisfies ForcedDirectedGraphData as ForcedDirectedGraphData

const forcedDirectedGraphDataSlice = createSlice({
    name: 'flowChartData',
    initialState,
    reducers: {
        addNode(state, _action: PayloadAction<ForcedDirectedGraphData>) {
            return state;
        }
    },
});

export const { addNode } = forcedDirectedGraphDataSlice.actions;
export default forcedDirectedGraphDataSlice.reducer;