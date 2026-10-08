'use client';

import { Goal } from "@/types/goals";
import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useCallback, useContext, useMemo } from "react";


type GoalContextType = {
    goals: Goal[],
    findGoalById: (id: string) => Goal;
    addGoal: (goal: Omit<Goal, 'id'>) => void
    removeGoal: (id: string) => void;
    editGoal: (goal: Omit<Goal, 'id'>) => void;
}

const GoalContext = createContext({} as GoalContextType)

export function GoalContextProvider({ children }: { children: React.ReactNode }) {
    const [goals, setGoals] = useLocalStorage<Goal[]>('@ritimo/goals', []);

    const handleAddGoal = useCallback((goal: Omit<Goal, 'id'>) => {
        setGoals(state => ([...state, { id: crypto.randomUUID(), ...goal }]))
    }, [setGoals])

    const handleRemoveGoal = useCallback((id: string) => {
        setGoals(state => state.filter(item => item.id !== id))
    }, [setGoals])
    const handleEditGoal = useCallback(() => { }, [])

    const handleFindGoalById = useCallback((id: string) => {
        const goal = goals.find(item => item.id === id);
        return goal
    }, [goals]) as () => Goal

    const values: GoalContextType = useMemo(() => ({ goals, addGoal: handleAddGoal, removeGoal: handleRemoveGoal, editGoal: handleEditGoal, findGoalById: handleFindGoalById }), [goals, handleAddGoal, handleEditGoal, handleFindGoalById, handleRemoveGoal])

    return (
        <GoalContext.Provider value={values}>
            {children}
        </GoalContext.Provider>
    )
}

export const useGoal = () => {
    const context = useContext(GoalContext);
    if (!context) {
        throw new Error('GoalContext is not defined')
    }

    return context
}