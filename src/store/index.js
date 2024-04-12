import { configureStore } from '@reduxjs/toolkit';
import flowChartDataReducer from './slices/flowChartSlice';
import forcedDirectedGraphDataReducer from './slices/forcedDirectedGraphDataSlice';

const store = configureStore({
    reducer: {
        forcedDirectedGraphData: forcedDirectedGraphDataReducer,
        flowChartData: flowChartDataReducer
    }
})

export default store;