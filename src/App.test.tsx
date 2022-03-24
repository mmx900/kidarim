import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {getDDay, getDeathDay, getRemainSurvivalTimeInDays} from "./libs/calculator";
import {differenceInDays, startOfDay, startOfToday, startOfTomorrow, subSeconds} from "date-fns";

test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

test('calculates d-day', () => {
    let result = getDDay({destDate: new Date()});
    expect(result).toBe(0);
    result = getDDay({destDate: startOfTomorrow()});
    expect(result).toBe(1);
});

test('calculates death day', () => {
    const birthday = new Date(1985, 0, 10);
    let result = getDeathDay(birthday, 20);
    expect(result).toEqual(subSeconds(startOfDay(new Date(2005, 0, 10)), 1));
});

test('calculates remain survival time', () => {
    const birthday = new Date(1985, 0, 10);
    const deathDay = new Date(1986, 0, 9);
    let result = getRemainSurvivalTimeInDays(birthday, 1);
    expect(result).toBe(differenceInDays(startOfDay(deathDay), startOfToday()));
});
